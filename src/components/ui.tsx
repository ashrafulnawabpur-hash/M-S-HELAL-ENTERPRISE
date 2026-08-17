import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { ReactNode } from "react";

/* ------------------------- scroll reveal wrapper ------------------------ */
export function Reveal({
  children,
  delay = 0,
  className,
  y = 26,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, delay, ease: [0.22, 0.61, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------ kicker chip ----------------------------- */
export function Kicker({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] ${
        light ? "text-white" : "text-brand"
      }`}
    >
      <span className={`h-[3px] w-7 ${light ? "bg-white" : "bg-brand"}`} />
      {children}
    </span>
  );
}

/* ---------------------------- section heading --------------------------- */
export function SectionHead({
  kicker,
  title,
  desc,
  align = "left",
  light = false,
}: {
  kicker: string;
  title: string;
  desc?: string;
  align?: "left" | "center";
  light?: boolean;
}) {
  return (
    <div className={align === "center" ? "text-center" : ""}>
      <Reveal>
        <div className={align === "center" ? "flex justify-center" : ""}>
          <Kicker light={light}>{kicker}</Kicker>
        </div>
      </Reveal>
      <Reveal delay={0.08}>
        <h2
          className={`mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1] ${
            light ? "text-white" : "text-navy"
          }`}
        >
          {title}
        </h2>
      </Reveal>
      {desc && (
        <Reveal delay={0.16}>
          <p
            className={`mt-4 max-w-2xl text-base leading-relaxed sm:text-lg ${
              light ? "text-white/70" : "text-steel"
            } ${align === "center" ? "mx-auto" : ""}`}
          >
            {desc}
          </p>
        </Reveal>
      )}
    </div>
  );
}

/* ------------------------------ arrow link ------------------------------ */
export function ArrowLink({
  children,
  onClick,
  className = "",
}: {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`group/link inline-flex items-center gap-2 text-sm font-bold text-brand ${className}`}
    >
      <span className="border-b-2 border-transparent transition-colors group-hover/link:border-brand">
        {children}
      </span>
      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1.5" />
    </button>
  );
}

/* ------------------------------ breadcrumbs ----------------------------- */
export function Crumbs({ items }: { items: { label: string; to?: string }[] }) {
  return (
    <nav className="flex flex-wrap items-center gap-1.5 text-[13px] text-steel">
      {items.map((it, i) => (
        <span key={i} className="flex items-center gap-1.5">
          {i > 0 && <span className="text-line">/</span>}
          {it.to ? (
            <Link to={it.to} className="transition-colors hover:text-brand">
              {it.label}
            </Link>
          ) : (
            <span className="font-semibold text-navy">{it.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

/* ------------------------------ button styles --------------------------- */
/* shine = light sweep on hover · btn-glow = branded halo                  */
export const btnPrimary =
  "shine btn-glow inline-flex items-center justify-center gap-2 rounded-md bg-brand px-6 py-3 text-sm font-bold text-white transition-all duration-200 hover:bg-brand-dark active:scale-[0.97] hover:-translate-y-0.5";
export const btnOutlineLight =
  "inline-flex items-center justify-center gap-2 rounded-md border-2 border-white/80 px-6 py-[10px] text-sm font-bold text-white backdrop-blur-sm transition-all duration-200 hover:bg-white hover:text-navy active:scale-[0.97] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-white/10";
export const btnOutline =
  "shine inline-flex items-center justify-center gap-2 rounded-md border-2 border-brand px-6 py-[10px] text-sm font-bold text-brand transition-all duration-200 hover:bg-brand hover:text-white active:scale-[0.97] hover:-translate-y-0.5";
export const btnNavy =
  "shine inline-flex items-center justify-center gap-2 rounded-md bg-navy px-6 py-3 text-sm font-bold text-white transition-all duration-200 hover:bg-night active:scale-[0.97] hover:-translate-y-0.5 hover:shadow-xl hover:shadow-navy/20";
