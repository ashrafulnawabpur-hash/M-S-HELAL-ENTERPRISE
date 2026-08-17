import { useEffect, useState, type FormEvent } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  ChevronDown,
  Clock,
  Mail,
  MapPin,
  Menu,
  Phone,
  Search,
  Settings,
  ShoppingCart,
  X,
} from "lucide-react";
import { CATEGORIES, COMPANY } from "../lib/data";
import { useStore } from "../lib/store";

export function LogoMark({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <span
      className={`flex shrink-0 items-center justify-center rounded-lg bg-brand ${className}`}
      aria-hidden
    >
      <svg viewBox="0 0 64 64" className="h-[62%] w-[62%]" fill="none">
        <circle cx="32" cy="32" r="18" stroke="#fff" strokeWidth="6" />
        <circle cx="32" cy="14" r="4" fill="#fff" />
        <circle cx="32" cy="50" r="4" fill="#fff" />
        <circle cx="14" cy="32" r="4" fill="#fff" />
        <circle cx="50" cy="32" r="4" fill="#fff" />
      </svg>
    </span>
  );
}

const NAV = [
  { label: "Home", to: "/" },
  { label: "Products", to: "/products", mega: true },
  { label: "Industries", to: "/#industries" },
  { label: "About Us", to: "/#about" },
  { label: "Contact", to: "/contact" },
];

export default function Header() {
  const { cartCount } = useStore();
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [accordion, setAccordion] = useState(false);
  const [q, setQ] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMegaOpen(false);
    setSearchOpen(false);
    setDrawer(false);
  }, [location.pathname, location.hash]);

  const submitSearch = (e: FormEvent) => {
    e.preventDefault();
    if (!q.trim()) return;
    navigate(`/products?q=${encodeURIComponent(q.trim())}`);
    setQ("");
    setSearchOpen(false);
  };

  return (
    <>
      {/* ------------------------------ utility bar ----------------------------- */}
      <div className="hidden border-b border-line bg-mist lg:block">
        <div className="mx-auto flex h-9 max-w-7xl items-center justify-between px-6 text-[12px] font-medium text-steel">
          <div className="flex items-center gap-5">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-brand" /> {COMPANY.address}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-brand" /> {COMPANY.hours}
            </span>
          </div>
          <div className="flex items-center gap-5">
            <a
              href={`tel:${COMPANY.phones[0].tel}`}
              className="inline-flex items-center gap-1.5 transition-colors hover:text-brand"
            >
              <Phone className="h-3.5 w-3.5 text-brand" /> {COMPANY.phones[0].label}
            </a>
            <a
              href={`mailto:${COMPANY.email}`}
              className="inline-flex items-center gap-1.5 transition-colors hover:text-brand"
            >
              <Mail className="h-3.5 w-3.5 text-brand" /> {COMPANY.email}
            </a>
            <span className="h-3 w-px bg-line" />
            <Link
              to="/admin"
              className="inline-flex items-center gap-1.5 transition-colors hover:text-brand"
            >
              <Settings className="h-3.5 w-3.5" /> Admin
            </Link>
          </div>
        </div>
      </div>

      {/* ------------------------------- main bar ------------------------------- */}
      <div
        className={`sticky top-0 z-50 transition-all duration-400 ${
          scrolled
            ? "glass-white shadow-[0_8px_32px_rgba(0,36,63,0.1)]"
            : "bg-white"
        }`}
        onMouseLeave={() => setMegaOpen(false)}
      >
        <div className="relative mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 md:h-20 lg:gap-8 lg:px-8">
          {/* logo */}
          <Link to="/" className="flex items-center gap-3" aria-label={COMPANY.name}>
            <LogoMark />
            <span className="leading-tight">
              <span className="block text-[15px] font-extrabold tracking-tight text-navy sm:text-base">
                M/S HELAL ENTERPRISE
              </span>
              <span className="block text-[10px] font-bold uppercase tracking-[0.24em] text-brand">
                {COMPANY.division}
              </span>
            </span>
          </Link>

          {/* desktop nav */}
          <nav className="mx-auto hidden items-center gap-7 lg:flex">
            {NAV.map((item) =>
              item.mega ? (
                <div key={item.label} onMouseEnter={() => setMegaOpen(true)}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      `nav-underline flex items-center gap-1 py-2 text-[14.5px] font-bold transition-colors hover:text-brand ${
                        isActive ? "active text-brand" : "text-navy"
                      }`
                    }
                  >
                    {item.label}
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-300 ${
                        megaOpen ? "rotate-180" : ""
                      }`}
                    />
                  </NavLink>
                </div>
              ) : (
                <NavLink
                  key={item.label}
                  to={item.to}
                  end={item.to === "/"}
                  className={({ isActive }) =>
                    `nav-underline py-2 text-[14.5px] font-bold transition-colors hover:text-brand ${
                      isActive ? "active text-brand" : "text-navy"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ),
            )}
          </nav>

          {/* actions */}
          <div className="ml-auto flex items-center gap-1.5 lg:ml-0">
            <button
              onClick={() => {
                setSearchOpen((v) => !v);
                setMegaOpen(false);
              }}
              className="flex h-10 w-10 items-center justify-center rounded-md text-navy transition-colors hover:bg-mist hover:text-brand"
              aria-label="Search products"
            >
              <Search className="h-5 w-5" />
            </button>
            <Link
              to="/cart"
              className="relative flex h-10 w-10 items-center justify-center rounded-md text-navy transition-colors hover:bg-mist hover:text-brand"
              aria-label="Cart"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-brand px-1 text-[11px] font-bold text-white">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </Link>
            <Link
              to="/contact"
              className="ml-2 hidden rounded-md bg-brand px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-brand-dark xl:block"
            >
              Get a Quote
            </Link>
            <button
              onClick={() => setDrawer(true)}
              className="ml-1 flex h-10 w-10 items-center justify-center rounded-md bg-navy text-white lg:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>

          {/* mega menu */}
          <AnimatePresence>
            {megaOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.22 }}
                className="absolute inset-x-0 top-full hidden border-t border-line bg-white shadow-[0_32px_48px_-16px_rgba(0,36,63,0.22)] lg:block"
                onMouseEnter={() => setMegaOpen(true)}
              >
                <div className="mx-auto max-w-7xl px-8 py-8">
                  <div className="grid grid-cols-3 gap-x-8 gap-y-1">
                    {CATEGORIES.map((c) => (
                      <Link
                        key={c.id}
                        to={`/products?cat=${c.id}`}
                        className="group flex items-center gap-4 rounded-lg p-3 transition-colors hover:bg-mist"
                      >
                        <img
                          src={c.image}
                          alt={c.name}
                          className="h-14 w-20 rounded-md object-cover"
                        />
                        <span>
                          <span className="block text-[15px] font-bold text-navy transition-colors group-hover:text-brand">
                            {c.name}
                          </span>
                          <span className="mt-0.5 block text-xs text-steel">{c.tagline}</span>
                        </span>
                      </Link>
                    ))}
                  </div>
                  <div className="mt-6 flex items-center justify-between gap-4 border-t border-line pt-5">
                    <p className="text-sm text-steel">
                      Can't identify a part? Send us a photo or the old bearing number — our
                      counter team will match it.
                    </p>
                    <Link
                      to="/products"
                      className="group inline-flex shrink-0 items-center gap-2 text-sm font-bold text-brand"
                    >
                      View complete catalogue
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* search bar */}
          <AnimatePresence>
            {searchOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.22 }}
                className="absolute inset-x-0 top-full overflow-hidden border-t border-line bg-white shadow-xl"
              >
                <form
                  onSubmit={submitSearch}
                  className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-4 sm:px-6 lg:px-8"
                >
                  <Search className="h-5 w-5 shrink-0 text-brand" />
                  <input
                    autoFocus
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="Search by bearing number, brand or product name…"
                    className="w-full bg-transparent text-[15px] font-medium text-ink outline-none placeholder:text-steel/70"
                  />
                  <button
                    type="submit"
                    className="shrink-0 rounded-md bg-brand px-5 py-2 text-sm font-bold text-white transition-colors hover:bg-brand-dark"
                  >
                    Search
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ---------------------------- mobile drawer --------------------------- */}
      <AnimatePresence>
        {drawer && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-night/60 backdrop-blur-sm"
              onClick={() => setDrawer(false)}
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.28, ease: "easeOut" }}
              className="fixed inset-y-0 right-0 z-[61] flex w-full max-w-sm flex-col bg-white"
            >
              <div className="flex items-center justify-between border-b border-line px-5 py-4">
                <div className="flex items-center gap-2.5">
                  <LogoMark className="h-9 w-9" />
                  <span className="text-sm font-extrabold text-navy">M/S HELAL ENTERPRISE</span>
                </div>
                <button
                  onClick={() => setDrawer(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-md text-navy hover:bg-mist"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <nav className="flex-1 overflow-y-auto px-5 py-4">
                <Link
                  to="/"
                  className="block rounded-md px-3 py-3 text-[15px] font-bold text-navy hover:bg-mist"
                >
                  Home
                </Link>

                <button
                  onClick={() => setAccordion((v) => !v)}
                  className="flex w-full items-center justify-between rounded-md px-3 py-3 text-[15px] font-bold text-navy hover:bg-mist"
                >
                  Products
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${accordion ? "rotate-180" : ""}`}
                  />
                </button>
                <AnimatePresence>
                  {accordion && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="ml-3 space-y-0.5 border-l-2 border-line pb-2 pl-3">
                        <Link
                          to="/products"
                          className="block rounded-md px-3 py-2.5 text-sm font-bold text-brand"
                        >
                          All Products
                        </Link>
                        {CATEGORIES.map((c) => (
                          <Link
                            key={c.id}
                            to={`/products?cat=${c.id}`}
                            className="block rounded-md px-3 py-2.5 text-sm font-semibold text-steel hover:bg-mist hover:text-brand"
                          >
                            {c.name}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <Link
                  to="/#industries"
                  className="block rounded-md px-3 py-3 text-[15px] font-bold text-navy hover:bg-mist"
                >
                  Industries
                </Link>
                <Link
                  to="/#about"
                  className="block rounded-md px-3 py-3 text-[15px] font-bold text-navy hover:bg-mist"
                >
                  About Us
                </Link>
                <Link
                  to="/contact"
                  className="block rounded-md px-3 py-3 text-[15px] font-bold text-navy hover:bg-mist"
                >
                  Contact
                </Link>
                <Link
                  to="/cart"
                  className="block rounded-md px-3 py-3 text-[15px] font-bold text-navy hover:bg-mist"
                >
                  Cart {cartCount > 0 && <span className="text-brand">({cartCount})</span>}
                </Link>
              </nav>

              <div className="space-y-2.5 border-t border-line p-5">
                <a
                  href={`tel:${COMPANY.phones[0].tel}`}
                  className="flex items-center justify-center gap-2 rounded-md bg-brand px-5 py-3 text-sm font-bold text-white"
                >
                  <Phone className="h-4 w-4" /> Call {COMPANY.phones[0].label}
                </a>
                <Link
                  to="/contact"
                  className="flex items-center justify-center gap-2 rounded-md border-2 border-brand px-5 py-2.5 text-sm font-bold text-brand"
                >
                  Request a Quote
                </Link>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
