import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useAnimationControls } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  Package,
  Phone,
  Play,
  Pause,
  ShieldCheck,
  Truck,
  Zap,
} from "lucide-react";
import { COMPANY } from "../lib/data";

/* ------------------------------------------------------------------ */
/*  SLIDE DATA                                                          */
/* ------------------------------------------------------------------ */
interface Slide {
  image: string;
  title: string;
  titleHighlight?: string;
  subtitle: string;
  statLabel?: string;
  statValue?: string;
  cta1?: { label: string; href: string };
  cta2?: { label: string; href: string; phone?: string };
  badge?: string;
  accent?: "brand" | "emerald" | "amber" | "white";
}

const SLIDES: Slide[] = [
  {
    image: "/images/hero-industrial.jpg",
    title: "Genuine bearings that keep",
    titleHighlight: "Bangladesh moving.",
    subtitle:
      "M/S Helal Enterprise supplies original SKF bearings, seals, power transmission and maintenance essentials to workshops and factories nationwide — with honest advice and same-day dispatch in Dhaka.",
    statValue: "295+",
    statLabel: "Products In Stock",
    cta1: { label: "Browse Catalogue", href: "/products" },
    cta2: {
      label: `Call ${COMPANY.phones[0].label}`,
      href: `tel:${COMPANY.phones[0].tel}`,
      phone: "true",
    },
    badge: "Trusted industrial supplier · Nawabpur, Dhaka",
    accent: "brand",
  },
  {
    image: "/images/ind-steel.jpg",
    title: "Your authorised",
    titleHighlight: "SKF partner since 1995.",
    subtitle:
      "Walk into our Nawabpur showroom — over 5,000 line items of genuine SKF bearings, seals, lubrication systems and maintenance tools physically in stock. What you see is what you get.",
    statValue: "38",
    statLabel: "Years With SKF",
    cta1: { label: "View Full Range", href: "/products" },
    cta2: { label: "Visit Our Shop", href: "/contact" },
    badge: "SKF Authorised Distributor · M/S HELAL ENTERPRISE",
    accent: "emerald",
  },
  {
    image: "/images/warehouse.jpg",
    title: "From steel mills to textile looms —",
    titleHighlight: "we keep you running.",
    subtitle:
      "Bearings for every sector: rolling mills, power plants, agriculture, marine ports, railways and more. Bulk orders, tender supplies and indent sourcing available nationwide.",
    statValue: "64",
    statLabel: "Districts Delivered",
    cta1: { label: "Industries We Serve", href: "/#industries" },
    cta2: { label: "Request a Quote", href: "/contact" },
    badge: "Premium Product Services · Unmatched Quality",
    accent: "amber",
  },
  {
    image: "/images/about-engineer.jpg",
    title: "Working closely with the customer —",
    titleHighlight: "that's our ideology.",
    subtitle:
      "M/S HELAL ENTERPRISE was the first company in Bangladesh to distribute SKF energy-efficient bearings. With passion and expertise, we deliver excellent service, problem solving and quality products to you.",
    statValue: "49+",
    statLabel: "Years Serving Industry",
    cta1: { label: "About Us", href: "/#about" },
    cta2: { label: "Get in Touch", href: "/contact" },
    badge: "M/S Helal Enterprise · Nawabpur Road, Dhaka-1100",
    accent: "brand",
  },
];

const ACCENT_MAP = {
  brand: { dot: "bg-brand", bar: "bg-brand", glow: "shadow-brand/40 shadow-[0_0_30px_rgba(0,114,198,0.5)]", text: "text-brand" },
  emerald: { dot: "bg-emerald-400", bar: "bg-emerald-400", glow: "shadow-emerald-400/40 shadow-[0_0_30px_rgba(52,211,153,0.4)]", text: "text-emerald-400" },
  amber: { dot: "bg-amber-400", bar: "bg-amber-400", glow: "shadow-amber-400/40 shadow-[0_0_30px_rgba(251,191,36,0.4)]", text: "text-amber-400" },
  white: { dot: "bg-white", bar: "bg-white", glow: "shadow-white/30", text: "text-white" },
};

/* ------------------------------------------------------------------ */
/*  COMPONENT                                                           */
/* ------------------------------------------------------------------ */
import { Magnetic } from "./effects/Motion";

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const slide = SLIDES[current];
  const accent = ACCENT_MAP[slide.accent || "brand"];

  /* ---- navigation ---- */
  const go = useCallback(
    (dir: 1 | -1) => {
      setCurrent((c) => {
        const n = c + dir;
        return n < 0 ? SLIDES.length - 1 : n >= SLIDES.length ? 0 : n;
      });
      setProgress(0);
    },
    [],
  );

  /* ---- auto-advance + progress bar ---- */
  useEffect(() => {
    setProgress(0);
    if (paused) {
      if (timerRef.current) clearInterval(timerRef.current);
      if (progTimerRef.current) clearInterval(progTimerRef.current);
      timerRef.current = null;
      progTimerRef.current = null;
      return;
    }
    timerRef.current = setInterval(() => go(1), 6000);
    progTimerRef.current = setInterval(() => {
      setProgress((p) => (p >= 100 ? 0 : p + 100 / 60)); // 60 steps over 6s
    }, 100);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (progTimerRef.current) clearInterval(progTimerRef.current);
    };
  }, [paused, go]);

  return (
    <section className="relative isolate overflow-hidden bg-night" style={{ minHeight: "100vh" }}>
      {/* ══════════════════ SLIDES ══════════════════ */}
      <div className="absolute inset-0 -z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            {/* ---- background image with KEN BURNS ---- */}
            <motion.img
              src={slide.image}
              alt=""
              className="h-full w-full object-cover"
              loading={current === 0 ? "eager" : "lazy"}
              initial={{ scale: 1.12 }}
              animate={{ scale: 1 }}
              transition={{ duration: 7, ease: [0.22, 0.61, 0.36, 1] }}
            />

            {/* ---- multi-layer gradient overlay ---- */}
            <div className="absolute inset-0 bg-gradient-to-r from-night via-night/75 to-night/20" />
            <div className="absolute inset-0 bg-gradient-to-t from-night via-night/50 to-transparent" />
            {/* gradient mesh orbs */}
            <div className="hero-glow -left-20 -top-20" />
            <div className="hero-glow-2 -bottom-16 -right-16" />
            <div className="absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(0,198,255,0.12),transparent_65%)] blur-3xl" />
            {/* vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#001627_110%)]" />

            {/* ── signature rotating bearing emblem (desktop only) ── */}
            <div
              aria-hidden
              className="absolute right-[6%] bottom-[20%] hidden xl:block opacity-25"
            >
              <motion.svg
                width="180"
                height="180"
                viewBox="0 0 120 120"
                className="animate-spin-slow"
                style={{ animation: "spin 22s linear infinite" }}
              >
                <circle cx="60" cy="60" r="56" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
                <circle cx="60" cy="60" r="34" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="2.5" />
                <circle cx="60" cy="60" r="10" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2" />
                {Array.from({ length: 10 }).map((_, i) => {
                  const a = (i / 10) * Math.PI * 2;
                  return (
                    <circle
                      key={i}
                      cx={60 + Math.cos(a) * 45}
                      cy={60 + Math.sin(a) * 45}
                      r="6.5"
                      fill="rgba(255,255,255,0.5)"
                      stroke="rgba(0,114,198,0.7)"
                      strokeWidth="1"
                    />
                  );
                })}
              </motion.svg>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ══════════════════ CONTENT ══════════════════ */}
      <div className="relative flex min-h-screen max-w-7xl flex-col justify-center px-4 pb-28 pt-24 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">

          {/* ---- LEFT: Main text ---- */}
          <div className="lg:col-span-7 xl:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={`t-${current}`}
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.65, ease: [0.22, 0.61, 0.36, 1] }}
              >
                {/* badge pill */}
                {slide.badge && (
                  <motion.span
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1, duration: 0.45 }}
                    className="inline-flex items-center gap-2.5 rounded-full border border-white/25 bg-white/[0.08] px-5 py-2 text-[11px] font-bold uppercase tracking-[0.22em] text-white backdrop-blur-md"
                  >
                    <span className={`relative flex h-2 w-2 rounded-full ${accent.dot}`}>
                      <span className={`absolute inline-flex h-full w-full animate-ping rounded-full ${accent.dot} opacity-75`} />
                    </span>
                    {slide.badge}
                  </motion.span>
                )}

                {/* heading */}
                <h1 className="mt-7 text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-[3.6rem] xl:text-[4rem]">
                  {slide.title}{" "}
                  {slide.titleHighlight && (
                    <span className={`relative inline-block ${accent.text}`}>
                      {slide.titleHighlight}
                      <motion.span
                        className={`absolute -inset-x-1 -bottom-1 h-[6px] rounded-sm ${accent.bar} opacity-60`}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 0.6, duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
                        style={{ transformOrigin: "left" }}
                      />
                    </span>
                  )}
                </h1>

                {/* subtitle */}
                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.55 }}
                  className="mt-6 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg"
                >
                  {slide.subtitle}
                </motion.p>

                {/* CTAs */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35, duration: 0.5 }}
                  className="mt-9 flex flex-wrap items-center gap-4"
                >
                  {slide.cta1 && (
                    <Magnetic strength={0.3}>
                      <a
                        href={slide.cta1.href}
                        className={`group shine relative inline-flex items-center gap-2.5 overflow-hidden rounded-lg ${accent.bar} px-8 py-4 text-sm font-extrabold text-white shadow-lg ${accent.glow} transition-all duration-300 hover:scale-[1.03] hover:shadow-xl active:scale-[0.98]`}
                      >
                        <span className="relative z-10">{slide.cta1.label}</span>
                        <ArrowRight className="relative z-10 h-4.5 w-4.5 transition-transform duration-300 group-hover:translate-x-1" />
                      </a>
                    </Magnetic>
                  )}
                  {slide.cta2 && (
                    <Magnetic strength={0.25}>
                      <a
                        href={slide.cta2.href}
                        className="group inline-flex items-center gap-2.5 rounded-lg border-2 border-white/35 bg-white/8 px-7 py-3.5 text-sm font-bold text-white backdrop-blur-sm transition-all duration-300 hover:border-white/70 hover:bg-white/15 hover:-translate-y-0.5 active:scale-[0.98]"
                      >
                        {slide.cta2.phone ? (
                          <>
                            <Phone className="h-4.5 w-4.5" />
                            {slide.cta2.label}
                          </>
                        ) : (
                          slide.cta2.label
                        )}
                      </a>
                    </Magnetic>
                  )}
                </motion.div>

                {/* trust line */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.55, duration: 0.5 }}
                  className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/50"
                >
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="h-3.5 w-3.5 text-brand" /> Genuine Parts
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Truck className="h-3.5 w-3.5 text-brand" /> Same-Day Dispatch
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Zap className="h-3.5 w-3.5 text-brand" /> Expert Support
                  </span>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ---- RIGHT: Floating glass stats card ---- */}
          <div className="hidden lg:block lg:col-span-5 xl:col-span-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={`card-${current}`}
                initial={{ opacity: 0, x: 48, rotateY: 6 }}
                animate={{ opacity: 1, x: 0, rotateY: 0 }}
                exit={{ opacity: 0, x: -32, rotateY: -6 }}
                transition={{ duration: 0.65, ease: [0.22, 0.61, 0.36, 1] }}
                className="sticky top-28"
              >
                <div className="rounded-2xl border border-white/15 bg-white/[0.06] p-8 backdrop-blur-2xl shadow-2xl">
                  {/* stat big number */}
                  <p className="text-[11px] font-bold uppercase tracking-[0.26em] text-white/45">
                    {slide.statLabel || "In Stock Now"}
                  </p>
                  <p className="mt-2 text-6xl font-black tracking-tight text-white sm:text-7xl">
                    {slide.statValue || "295+"}
                  </p>

                  {/* mini features */}
                  <div className="mt-8 space-y-4">
                    {[
                      { icon: ShieldCheck, text: "100% Genuine SKF & Premium Brands" },
                      { icon: Package, text: "5,000+ Line Items Physically Stocked" },
                      { icon: Truck, text: "Nationwide Delivery — All 64 Districts" },
                    ].map((row, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: 16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + i * 0.1, duration: 0.45 }}
                        className="flex items-center gap-3.5 rounded-xl bg-white/[0.05] px-4 py-3 backdrop-blur"
                      >
                        <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${accent.bar}/20`}>
                          <row.icon className={`h-4.5 w-4.5 ${accent.text}`} />
                        </span>
                        <span className="text-[13.5px] font-semibold text-white/85">{row.text}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* phone CTA inside card */}
                  <a
                    href={`tel:${COMPANY.phones[0].tel}`}
                    className="mt-8 flex w-full items-center justify-center gap-2.5 rounded-xl bg-white/10 py-3.5 text-sm font-bold text-white backdrop-blur transition-colors hover:bg-white/20"
                  >
                    <Phone className={`h-4 w-4 ${accent.text}`} />
                    Call for Instant Quote
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* ══════════════════ BOTTOM CONTROLS ══════════════════ */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <div className="mx-auto flex max-w-7xl items-end justify-between gap-4 px-4 pb-6 sm:px-6 lg:px-8">

          {/* left: dots + progress */}
          <div className="flex flex-col gap-3">
            {/* dots row */}
            <div className="flex items-center gap-2.5">
              {SLIDES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setCurrent(i); setProgress(0); }}
                  className={`group relative flex items-center gap-1.5 transition-all duration-300 ${
                    i === current ? "" : "opacity-50 hover:opacity-80"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                >
                  <span
                    className={`block h-2 rounded-full transition-all duration-500 ${
                      i === current
                        ? `w-8 ${accent.dot}`
                        : "w-2 bg-white/40 group-hover:bg-white/60"
                    }`}
                  />
                  <span className="hidden text-[10px] font-bold uppercase tracking-wider text-white/60 sm:block">
                    0{i + 1}
                  </span>
                </button>
              ))}
            </div>

            {/* progress bar */}
            <div className="w-48 overflow-hidden rounded-full bg-white/15 sm:w-64">
              <motion.div
                className={`h-1 rounded-full ${accent.bar}`}
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.1, ease: "linear" }}
              />
            </div>
          </div>

          {/* right: nav buttons */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => go(-1)}
              className="group flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-white/8 text-white backdrop-blur-sm transition-all duration-300 hover:border-white/50 hover:bg-white/15 hover:scale-105 active:scale-95"
              aria-label="Previous slide"
            >
              <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
            </button>

            <button
              onClick={() => setPaused((v) => !v)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-white/8 text-white backdrop-blur-sm transition-all duration-300 hover:border-white/50 hover:bg-white/15 active:scale-95"
              aria-label={paused ? "Play slideshow" : "Pause slideshow"}
            >
              {paused ? (
                <Play className="h-3.5 w-3.5 ml-0.5" />
              ) : (
                <Pause className="h-3.5 w-3.5" />
              )}
            </button>

            <button
              onClick={() => go(1)}
              className="group flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-white/8 text-white backdrop-blur-sm transition-all duration-300 hover:border-white/50 hover:bg-white/15 hover:scale-105 active:scale-95"
              aria-label="Next slide"
            >
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>
      </div>

      {/* scroll hint (only on first load) */}
      <AnimatePresence>
        {!paused && current === 0 && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 1.5, duration: 0.6 }}
            className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 md:block"
          >
            <motion.button
              onClick={() =>
                window.scrollTo({ top: window.innerHeight - 80, behavior: "smooth" })
              }
              className="flex flex-col items-center gap-1 text-white/40 transition-colors hover:text-white/70"
              aria-label="Scroll down"
            >
              <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Scroll</span>
              <ChevronDown className="h-4 w-4 animate-bounce" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
