import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  Box,
  Cog,
  Factory,
  MapPin,
  PackageCheck,
  Phone,
  Play,
  Quote,
  ShieldCheck,
  Star,
  Truck,
  Wrench,
  Youtube,
} from "lucide-react";
import ProductCard from "../components/ProductCard";
import HeroCarousel from "../components/HeroCarousel";
import YouTubeSection from "../components/YouTubeSection";
import {
  ArrowLink,
  btnNavy,
  btnOutlineLight,
  btnPrimary,
  Kicker,
  Reveal,
  SectionHead,
} from "../components/ui";
import { BRANDS, CATEGORIES, COMPANY } from "../lib/data";
import { useStore } from "../lib/store";

/* ------------------------------ count up hook --------------------------- */
function useCountUp(target: number, start: boolean, duration = 1600) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, target, duration]);
  return value;
}

function Stat({ target, suffix, label, active }: { target: number; suffix: string; label: string; active: boolean }) {
  const v = useCountUp(target, active);
  return (
    <div className="text-center sm:text-left">
      <p className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
        {v.toLocaleString("en-IN")}
        <span className="text-brand">{suffix}</span>
      </p>
      <p className="mt-2 text-sm font-semibold uppercase tracking-[0.14em] text-white/60">{label}</p>
    </div>
  );
}

/* ---------------------------------- page -------------------------------- */
export default function Home() {
  const { products } = useStore();
  const featured = products.slice(0, 48); /* show up to 48 products on homepage */
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-80px" });

  const quickCards = CATEGORIES.slice(0, 4);

  const industries = [
    {
      name: "Steel & Rolling Mills",
      desc: "Bearings and gearboxes rated for heat, dust and 24/7 duty cycles.",
      image: "/images/ind-steel.jpg",
    },
    {
      name: "Textiles & Jute",
      desc: "Precision spindles, sealed units and belts for spinning and weaving lines.",
      image: "/images/ind-textile.jpg",
    },
    {
      name: "Power & Energy",
      desc: "Generator, turbine and transformer maintenance parts with traceable sourcing.",
      image: "/images/ind-energy.jpg",
    },
    {
      name: "Agriculture & Agro-Processing",
      desc: "Rugged mounted units and chains for harvesters, rice and flour mills.",
      image: "/images/ind-agriculture.jpg",
    },
    {
      name: "Marine & Ports",
      desc: "Corrosion-resistant bearings and seals for dockside and river machinery.",
      image: "/images/ind-marine.jpg",
    },
    {
      name: "Rail & Transport",
      desc: "Axle-box bearings, hubs and driveline components for rolling stock and fleets.",
      image: "/images/ind-rail.jpg",
    },
  ];

  const features = [
    {
      icon: ShieldCheck,
      title: "Genuine sourcing",
      desc: "Every consignment is checked against manufacturer markings and batch codes before it reaches the shelf.",
    },
    {
      icon: PackageCheck,
      title: "Deep local stock",
      desc: "Over 5,000 line items held in Nawabpur — so a breakdown rarely waits on an import lead time.",
    },
    {
      icon: Truck,
      title: "Nationwide delivery",
      desc: "Same-day dispatch inside Dhaka and courier service to all 64 districts within 48 hours.",
    },
    {
      icon: Wrench,
      title: "Technical support",
      desc: "Interchanges, fitting guidance and failure advice from a counter team with decades of bench experience.",
    },
  ];

  const testimonials = [
    {
      quote:
        "When our rolling mill lost a spindle bearing at 2 AM, Helal Enterprise confirmed the interchange by phone and had the replacement on our floor before the morning shift.",
      name: "Md. Rafiqul Islam",
      role: "Maintenance Head, Rolling Mill — Narayanganj",
    },
    {
      quote:
        "They are the only shop we trust for sealed motor bearings. Consistent stock, proper invoices, and no substitutes unless we approve them first.",
      name: "Shirin Akter",
      role: "Procurement Manager, Textile Group — Savar",
    },
    {
      quote:
        "We service over sixty rice mills. Their catalog knowledge means we get the exact shaft size and seal material the first time — which saves us return trips.",
      name: "Engr. Tanvir Ahmed",
      role: "Service Engineer, Agro Machinery — Bogura",
    },
  ];

  return (
    <div>
      {/* ================================ HERO CAROUSEL ======================== */}
      <HeroCarousel />

      {/* ========================= QUICK CATEGORY CARDS ======================= */}

      {/* ========================= VIDEO SHOWCASE — DUAL VIDEOS ================== */}
      <section className="bg-night py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <Kicker light>Watch & Learn</Kicker>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-3 max-w-2xl text-3xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-4xl lg:text-[2.75rem]">
              Our story, our products — in motion.
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-white/70">
              Two videos that show who we are and what we deliver across Bangladesh.
            </p>
          </Reveal>

          {/* Dual video layout */}
          <div className="mt-10 grid gap-5 lg:gap-6 lg:grid-cols-2">
            {/* Video 1 — Featured / Primary */}
            <Reveal delay={0.18}>
              <div className="group relative overflow-hidden rounded-xl shadow-[0_24px_48px_-20px_rgba(0,114,198,0.35)] ring-1 ring-white/10">
                <div className="aspect-video w-full bg-black">
                  <iframe
                    title="M/S Helal Enterprise — Company Introduction Video"
                    src="https://www.youtube.com/embed/PC2VbRZvC38?rel=0&modestbranding=1&playsinline=1"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="absolute inset-0 h-full w-full"
                  />
                </div>
                {/* info overlay */}
                <div className="bg-navy px-5 py-4 sm:px-6">
                  <span className="inline-flex items-center gap-2 rounded-full bg-brand/20 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-brand">
                    <Youtube className="h-3.5 w-3.5" /> Featured Video
                  </span>
                  <h3 className="mt-2.5 text-lg font-extrabold tracking-tight text-white sm:text-xl">
                    M/S Helal Enterprise — Who We Are
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-white/60">
                    Meet the team behind Bangladesh's trusted SKF authorised distributor.
                  </p>
                  <a
                    href="https://youtu.be/PC2VbRZvC38"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-brand transition-colors hover:text-white"
                  >
                    Watch on YouTube <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </Reveal>

            {/* Video 2 — Secondary */}
            <Reveal delay={0.26}>
              <div className="group relative overflow-hidden rounded-xl shadow-[0_24px_48px_-20px_rgba(0,114,198,0.35)] ring-1 ring-white/10">
                <div className="aspect-video w-full bg-black">
                  <iframe
                    title="M/S Helal Enterprise — Products & Services Showcase"
                    src="https://www.youtube.com/embed/Ju_m1BRgmvI?rel=0&modestbranding=1&playsinline=1"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="absolute inset-0 h-full w-full"
                  />
                </div>
                {/* info overlay */}
                <div className="bg-navy px-5 py-4 sm:px-6">
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-white/80">
                    <Youtube className="h-3.5 w-3.5" /> Product Showcase
                  </span>
                  <h3 className="mt-2.5 text-lg font-extrabold tracking-tight text-white sm:text-xl">
                    Products &amp; Services at Helal Enterprise
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-white/60">
                    A closer look at our bearing catalogue, stock and customer service.
                  </p>
                  <a
                    href="https://youtu.be/Ju_m1BRgmvI"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-brand transition-colors hover:text-white"
                  >
                    Watch on YouTube <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </Reveal>
          </div>

          {/* CTA row below videos */}
          <Reveal delay={0.32} className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6">
            <p className="text-sm font-semibold text-white/60">
              Subscribe to our channel for product updates, mounting guides and industry news.
            </p>
            <a
              href="https://youtube.com/@helalenterprise"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-red-600 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-red-700"
            >
              <Youtube className="h-4 w-4" /> Visit Channel
            </a>
          </Reveal>
        </div>
      </section>

      {/* ========================= QUICK CATEGORY CARDS ======================= */}
      <section className="relative z-10 -mt-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {quickCards.map((c, i) => (
            <Reveal key={c.id} delay={i * 0.08}>
              <Link
                to={`/products?cat=${c.id}`}
                className="group flex items-center gap-4 rounded-lg border border-line bg-white p-4 shadow-[0_16px_36px_-20px_rgba(0,36,63,0.35)] transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-[0_24px_44px_-18px_rgba(0,114,198,0.4)]"
              >
                <img
                  src={c.image}
                  alt={c.name}
                  className="h-16 w-16 shrink-0 rounded-md object-cover"
                />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[15px] font-bold text-navy transition-colors group-hover:text-brand">
                    {c.name}
                  </span>
                  <span className="mt-0.5 line-clamp-1 block text-xs text-steel">{c.tagline}</span>
                </span>
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-tint text-brand transition-all duration-300 group-hover:bg-brand group-hover:text-white">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ========================= YOUTUBE VIDEOS ======================== */}
      <YouTubeSection />

      {/* ============================ SHOP BY CATEGORY ======================== */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHead
              kicker="Product Range"
              title="Everything a rotating machine needs"
              desc="Six core categories, stocked deep and sourced direct from authorised channels."
            />
            <Reveal delay={0.2} className="hidden lg:block">
              <Link to="/products" className={btnNavy}>
                View Full Catalogue <ArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {CATEGORIES.map((c, i) => {
              const count = products.filter((p) => p.category === c.id).length;
              return (
                <Reveal key={c.id} delay={(i % 3) * 0.08}>
                  <Link
                    to={`/products?cat=${c.id}`}
                    className="group relative block overflow-hidden rounded-lg"
                  >
                    <div className="aspect-[16/10]">
                      <img
                        src={c.image}
                        alt={c.name}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-night via-night/25 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 sm:p-6">
                      <div>
                        <h3 className="text-lg font-extrabold tracking-tight text-white sm:text-xl">
                          {c.name}
                        </h3>
                        <p className="mt-1 text-[13px] text-white/70">{c.tagline}</p>
                        <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.18em] text-white/50">
                          {count} product{count === 1 ? "" : "s"} in stock
                        </p>
                      </div>
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-white/40 text-white transition-all duration-300 group-hover:border-brand group-hover:bg-brand">
                        <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================ FEATURED PRODUCTS ======================= */}
      <section className="bg-mist py-20 lg:py-28">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <SectionHead
            kicker="Full Product Range"
            title={`${products.length}+ Genuine Bearings & Industrial Parts`}
            desc="Browse our complete catalogue — SKF deep groove, spherical, tapered roller, angular contact, insert bearings, seals and more. All stocked at Nawabpur, Dhaka."
            align="center"
          />
          {/* 5-col on 2xl, 4-col on xl, 3-col on lg, 2-col on md */}
          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
            {featured.map((p, i) => (
              <Reveal key={p.id} delay={(i % 10) * 0.04}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-10 text-center">
            <Link to="/products" className={btnNavy}>
              View Full Catalogue ({products.length} products) <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* =============================== INDUSTRIES =========================== */}
      <section id="industries" className="scroll-mt-24 bg-night py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHead
            kicker="Industries Served"
            title="Built for the sectors that build the country"
            desc="From river ports to rolling mills — our parts run where downtime is not an option."
            light
          />
          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((ind, i) => (
              <Reveal key={ind.name} delay={(i % 3) * 0.08}>
                <div className="group relative overflow-hidden rounded-lg">
                  <div className="aspect-[4/3]">
                    <img
                      src={ind.image}
                      alt={ind.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-night via-night/30 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                    <h3 className="text-lg font-extrabold tracking-tight text-white sm:text-xl">
                      {ind.name}
                    </h3>
                    <p className="mt-1.5 max-h-0 overflow-hidden text-[13px] leading-relaxed text-white/75 transition-all duration-500 group-hover:max-h-24">
                      {ind.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================================= ABOUT ============================== */}
      <section id="about" className="scroll-mt-24 bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* ---- intro split ---- */}
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="relative">
              <Reveal>
                <div className="overflow-hidden rounded-lg">
                  <img
                    src="/images/about-engineer.jpg"
                    alt="Engineer inspecting machinery"
                    className="aspect-[4/3] w-full object-cover"
                  />
                </div>
              </Reveal>
              <Reveal delay={0.15}>
                <div className="absolute -bottom-6 -right-2 hidden rounded-lg bg-brand p-6 text-white shadow-xl sm:block lg:-right-8">
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/75">
                    Authorised SKF Distributor
                  </p>
                  <p className="mt-1 text-4xl font-extrabold tracking-tight">Since 1995</p>
                </div>
              </Reveal>
              <Reveal delay={0.25}>
                <div className="absolute -left-2 top-6 hidden w-44 overflow-hidden rounded-lg border-4 border-white shadow-xl lg:block">
                  <img
                    src="/images/prod-bearing-1.jpg"
                    alt="Machining workshop"
                    className="aspect-square w-full object-cover"
                  />
                </div>
              </Reveal>
            </div>

            <div>
              <Reveal>
                <span className="inline-flex items-center gap-2 rounded-full bg-brand-tint px-4 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.2em] text-brand">
                  <ShieldCheck className="h-4 w-4" />
                  SKF Authorised Distributor
                </span>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 className="mt-4 text-3xl font-extrabold leading-[1.1] tracking-tight text-navy sm:text-4xl lg:text-[2.75rem]">
                  M/S HELAL ENTERPRISE
                </h2>
                <p className="mt-2 text-[13px] font-bold uppercase tracking-[0.22em] text-steel">
                  M/S Helal Enterprise · Nawabpur, Dhaka
                </p>
              </Reveal>
              <Reveal delay={0.16}>
                <p className="mt-5 text-base leading-relaxed text-steel sm:text-lg">
                  As an SKF Authorised Distributor, M/S Helal Enterprise is your access to
                  the world leader in rolling-bearing technology, power transmission and lubrication
                  solutions. We supply products to all types of industry — large or small.
                </p>
              </Reveal>
              <Reveal delay={0.24}>
                <p className="mt-4 border-l-4 border-brand bg-mist px-5 py-4 text-[15px] font-semibold leading-relaxed text-navy">
                  Contact us for premium product services — unmatched quality and customer
                  satisfaction.
                </p>
              </Reveal>
            </div>
          </div>

          {/* ---- story blocks ---- */}
          <div className="mt-16 grid gap-6 lg:mt-20 lg:grid-cols-3">
            {/* Our Company */}
            <Reveal>
              <div className="flex h-full flex-col rounded-lg border border-line bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-8">
                <h3 className="text-lg font-extrabold tracking-tight text-navy">Our Company</h3>
                <span className="mt-2 h-[3px] w-10 bg-brand" />
                <p className="mt-5 text-[14.5px] leading-relaxed text-steel">
                  M/S Helal Enterprise is an authorised distributor of SKF in Bangladesh.
                  Established in 1995 from a single bearings counter on Nawabpur Road, the company's
                  objective has always been to meet customer needs by combining well-trained sales
                  staff with a large, dependable inventory.
                </p>
                <p className="mt-3 text-[14.5px] leading-relaxed text-steel">
                  Demand for a wider range of correlated bearing products from one reliable source
                  steered the founder into diversification. Today we distribute SKF lubrication
                  systems, seals, power transmission products, bearing maintenance tools and
                  solutions — alongside the complete bearing range.
                </p>
                {/* timeline */}
                <div className="mt-6 space-y-4 border-t border-line pt-6">
                  {[
                    { year: "1995", text: "Established in Nawabpur, Dhaka" },
                    { year: "2000s", text: "Grew into full-line industrial parts supplier" },
                    { year: "Today", text: "Full SKF product range, nationwide network" },
                  ].map((m) => (
                    <div key={m.year} className="flex items-start gap-3.5">
                      <span className="flex h-9 min-w-[4.25rem] items-center justify-center rounded-sm bg-navy px-2 text-[12px] font-extrabold text-white">
                        {m.year}
                      </span>
                      <span className="pt-2 text-[13.5px] font-semibold leading-snug text-navy">
                        {m.text}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="mt-auto pt-5 text-[13px] font-semibold leading-relaxed text-brand">
                  Our instant customer service, backed by genuine SKF products, makes our customers'
                  businesses more efficient, competitive and profitable.
                </p>
              </div>
            </Reveal>

            {/* Ideology quote */}
            <Reveal delay={0.1}>
              <div className="relative flex h-full flex-col overflow-hidden rounded-lg bg-navy p-7 text-white sm:p-8">
                <Quote className="h-10 w-10 text-brand" />
                <h3 className="mt-5 text-xl font-extrabold leading-snug tracking-tight sm:text-2xl">
                  “Working closely with the customer”
                </h3>
                <p className="mt-4 text-[14.5px] leading-relaxed text-white/75">
                  This ideology of M/S Helal Enterprise builds a loyal relationship between
                  customer and company. Keeping in close touch also means fast, efficient product
                  updates reach end users first.
                </p>
                <div className="mt-6 rounded-md bg-white/10 p-5 backdrop-blur">
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/60">
                    A Bangladesh first
                  </p>
                  <p className="mt-2 text-[14.5px] font-semibold leading-relaxed text-white">
                    Helal Enterprise was the first company in Bangladesh to distribute SKF's
                    innovative, energy-efficient bearing range.
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Our Location */}
            <Reveal delay={0.2}>
              <div className="flex h-full flex-col rounded-lg bg-mist p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-8">
                <h3 className="text-lg font-extrabold tracking-tight text-navy">Our Location</h3>
                <span className="mt-2 h-[3px] w-10 bg-brand" />
                <p className="mt-5 text-[14.5px] leading-relaxed text-steel">
                  We are situated in Dhaka, right in the heart of Bangladesh's industry. Our
                  customers stretch from one end of the country to the other — and our central
                  location means national distribution can be as quick as an overnight delivery.
                </p>
                <p className="mt-3 text-[14.5px] leading-relaxed text-steel">
                  With passion and expertise, Helal Enterprise is always implementing positive
                  changes to keep delivering excellent service, problem solving and quality products
                  to you.
                </p>
                <div className="mt-auto pt-6">
                  <div className="rounded-lg border border-line bg-white p-5">
                    <div className="flex items-start gap-3.5">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-brand-tint text-brand">
                        <MapPin className="h-5 w-5" />
                      </span>
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-steel">
                          Dhaka Branch
                        </p>
                        <p className="mt-1 text-[15px] font-extrabold leading-snug text-navy">
                          219–220, Nawabpur Road, Dhaka-1100
                        </p>
                      </div>
                    </div>
                    <ArrowLink
                      className="mt-4"
                      onClick={() => (window.location.href = "/contact")}
                    >
                      Get directions &amp; contact details
                    </ArrowLink>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* ---- features ---- */}
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f, i) => (
              <Reveal key={f.title} delay={i * 0.07}>
                <div className="group h-full rounded-lg border border-line p-5 transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-lg">
                  <span className="flex h-11 w-11 items-center justify-center rounded-md bg-brand-tint text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                    <f.icon className="h-5.5 w-5.5" />
                  </span>
                  <h3 className="mt-4 text-[15px] font-extrabold text-navy">{f.title}</h3>
                  <p className="mt-1.5 text-[13.5px] leading-relaxed text-steel">{f.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================================ STATS =============================== */}
      <section ref={statsRef} className="relative overflow-hidden bg-gradient-to-br from-brand via-brand-dark to-brand-darker py-16 lg:py-20">
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: "radial-gradient(circle at 2px 2px, #fff 1.5px, transparent 0)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white/20 blur-3xl" />
        <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-accent/20 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl grid-cols-2 gap-10 px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
          <Stat target={30} suffix="+" label="Years serving industry" active={statsInView} />
          <Stat target={30} suffix="+" label="Years with SKF" active={statsInView} />
          <Stat target={5000} suffix="+" label="Items in stock" active={statsInView} />
          <Stat target={64} suffix="" label="Districts delivered" active={statsInView} />
        </div>
      </section>

      {/* ============================ BRAND MARQUEE =========================== */}
      <section className="border-b border-line bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <p className="text-center text-xs font-bold uppercase tracking-[0.24em] text-steel">
              We stock products from world-leading manufacturers
            </p>
          </Reveal>
          <div className="relative mt-8 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
            <div className="flex w-max animate-marquee items-center gap-14">
              {[...BRANDS, ...BRANDS].map((b, i) => (
                <span
                  key={i}
                  className="flex items-center gap-14 text-2xl font-extrabold tracking-tight text-navy/25 transition-colors hover:text-brand"
                >
                  {b}
                  <Cog className="h-4 w-4 text-line" />
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================= TESTIMONIALS =========================== */}
      <section className="bg-mist py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHead
            kicker="Client Voices"
            title="Trusted on the factory floor"
            align="center"
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.1}>
                <figure className="flex h-full flex-col rounded-lg border border-line bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                  <Quote className="h-8 w-8 text-brand" />
                  <div className="mt-4 flex gap-1">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star key={s} className="h-4 w-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-ink">
                    “{t.quote}”
                  </blockquote>
                  <figcaption className="mt-6 border-t border-line pt-4">
                    <p className="text-sm font-extrabold text-navy">{t.name}</p>
                    <p className="mt-0.5 text-[12.5px] text-steel">{t.role}</p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================================ CTA BAND ============================ */}
      <section className="relative overflow-hidden bg-night py-20 lg:py-24">
        <div className="absolute inset-y-0 right-0 hidden w-1/2 lg:block">
          <img
            src="/images/warehouse.jpg"
            alt="Parts warehouse"
            className="h-full w-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-night via-night/70 to-transparent" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Kicker light>Need a hard-to-find part?</Kicker>
          <Reveal delay={0.1}>
            <h2 className="mt-4 max-w-2xl text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-[2.75rem] lg:leading-[1.12]">
              Send us the old part number — we'll match it, quote it and ship it.
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/contact" className={btnPrimary}>
                Request a Quote <ArrowRight className="h-4 w-4" />
              </Link>
              <a href={`mailto:${COMPANY.email}`} className={btnOutlineLight}>
                <BadgeCheck className="h-4 w-4" /> {COMPANY.email}
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm font-semibold text-white/60">
              <span className="inline-flex items-center gap-2">
                <Factory className="h-4.5 w-4.5 text-brand" /> Bulk & tender enquiries welcome
              </span>
              <span className="inline-flex items-center gap-2">
                <Box className="h-4.5 w-4.5 text-brand" /> Cash on delivery inside Dhaka
              </span>
              <span className="inline-flex items-center gap-2">
                <ShieldCheck className="h-4.5 w-4.5 text-brand" /> GST/VAT invoice available
              </span>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
