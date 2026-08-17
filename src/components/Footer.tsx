import { ArrowUp, Facebook, Linkedin, Mail, MapPin, Phone, Youtube } from "lucide-react";
import { Link } from "react-router-dom";
import { CATEGORIES, COMPANY } from "../lib/data";
import { LogoMark } from "./Header";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-gradient-to-b from-navy to-night text-white">
      {/* main */}
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-12 lg:py-20 lg:px-8">
        {/* brand */}
        <div className="lg:col-span-4">
          <div className="flex items-center gap-3">
            <LogoMark />
            <div className="leading-tight">
              <p className="text-base font-extrabold tracking-tight">{COMPANY.name}</p>
              <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-white/60">
                {COMPANY.division}
              </p>
            </div>
          </div>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/70">
            A family-run industrial supply house in the heart of Nawabpur, Dhaka — keeping
            factories, workshops and fleets running across Bangladesh with genuine parts and
            straight advice.
          </p>
          <div className="mt-6 flex gap-3">
            {[
              { icon: Facebook, label: "Facebook" },
              { icon: Youtube, label: "YouTube" },
              { icon: Linkedin, label: "LinkedIn" },
            ].map(({ icon: Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-brand"
              >
                <Icon className="h-4.5 w-4.5" />
              </a>
            ))}
          </div>
        </div>

        {/* products */}
        <div className="lg:col-span-3">
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white/50">
            Product Range
          </h3>
          <ul className="mt-5 space-y-2.5">
            {CATEGORIES.map((c) => (
              <li key={c.id}>
                <Link
                  to={`/products?cat=${c.id}`}
                  className="text-sm font-medium text-white/80 transition-colors hover:text-white hover:underline"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* company */}
        <div className="lg:col-span-2">
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white/50">Company</h3>
          <ul className="mt-5 space-y-2.5">
            {[
              { label: "Home", to: "/" },
              { label: "All Products", to: "/products" },
              { label: "Industries", to: "/#industries" },
              { label: "About Us", to: "/#about" },
              { label: "Contact", to: "/contact" },
              { label: "Admin Panel", to: "/admin" },
            ].map((l) => (
              <li key={l.label}>
                <Link
                  to={l.to}
                  className="text-sm font-medium text-white/80 transition-colors hover:text-white hover:underline"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* contact */}
        <div className="lg:col-span-3">
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white/50">
            Contact Us
          </h3>
          <ul className="mt-5 space-y-4 text-sm text-white/80">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-4.5 w-4.5 shrink-0 text-brand" />
              <span>{COMPANY.address}</span>
            </li>
            <li className="flex gap-3">
              <Phone className="mt-0.5 h-4.5 w-4.5 shrink-0 text-brand" />
              <span className="space-y-1">
                {COMPANY.phones.map((p) => (
                  <a key={p.tel} href={`tel:${p.tel}`} className="block hover:text-white">
                    {p.label}
                  </a>
                ))}
              </span>
            </li>
            <li className="flex gap-3">
              <Mail className="mt-0.5 h-4.5 w-4.5 shrink-0 text-brand" />
              <a href={`mailto:${COMPANY.email}`} className="hover:text-white">
                {COMPANY.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* bottom bar */}
      <div className="border-t border-white/10 bg-night/40">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-5 text-[13px] text-white/60 sm:flex-row sm:px-6 lg:px-8">
          <p>
            © {year} {COMPANY.name}. All rights reserved.
          </p>
          <p className="font-medium">
            Genuine parts <span className="mx-1 text-brand">·</span> Honest prices{" "}
            <span className="mx-1 text-brand">·</span> Fast delivery
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 font-bold text-white/80 transition-colors hover:border-brand hover:bg-brand hover:text-white"
          >
            <ArrowUp className="h-4 w-4" /> Back to top
          </button>
        </div>
      </div>
    </footer>
  );
}
