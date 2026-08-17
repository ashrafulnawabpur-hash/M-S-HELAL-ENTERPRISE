import { useEffect, useRef, useState } from "react";
import { BrowserRouter, Link, Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import PageTransition from "./components/effects/PageTransition";
import { StoreProvider } from "./lib/store";
import { localBusinessJsonLd } from "./lib/seo";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";
import { btnPrimary } from "./components/ui";

function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const timer = window.setTimeout(() => {
        const el = document.getElementById(hash.slice(1));
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 80);
      return () => window.clearTimeout(timer);
    }
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname, hash]);
  return null;
}

/* ── Global SEO meta updater per route ── */
function PageSEO() {
  const { pathname } = useLocation();
  useEffect(() => {
    const map: Record<string, { t: string; d: string }> = {
      "/": {
        t: "M/S Helal Enterprise — SKF Bearings & Industrial Parts Dhaka Bangladesh",
        d: "Authorized SKF distributor since 1987. 295+ genuine SKF bearings, seals, power transmission & maintenance tools at Nawabpur, Dhaka. Deep groove, spherical roller, tapered & pillow block bearings.",
      },
      "/products": {
        t: "SKF Bearing Catalogue — 295+ Genuine Bearings | M/S Helal Enterprise",
        d: "Browse 295+ genuine SKF ball bearings, roller bearings, angular contact, spherical roller, tapered, thrust & pillow block bearings. Prices from ৳390. Filter by brand, type & size. Dhaka, Bangladesh.",
      },
      "/cart": {
        t: "Cart & Checkout | M/S Helal Enterprise — SKF Bearings Dhaka",
        d: "Review your SKF bearing order and check out. Free counter pickup at Nawabpur, Dhaka or nationwide courier delivery.",
      },
      "/contact": {
        t: "Contact M/S Helal Enterprise — SKF Bearing Supplier Nawabpur Dhaka",
        d: "Call +880 1715-078403 for SKF bearing prices. Shop 219-220 Nawabpur Road, Dhaka 1100. Email helalent@gmail.com. Open Sat–Thu 9AM–8PM.",
      },
      "/admin": {
        t: "Admin Panel | M/S Helal Enterprise",
        d: "Admin dashboard for M/S Helal Enterprise product and order management.",
      },
    };
    // Product detail — dynamic
    const isProduct = pathname.startsWith("/products/");
    const meta = isProduct
      ? {
          t: `SKF Bearing ${pathname.split("/products/")[1]} | M/S Helal Enterprise`,
          d: "Genuine SKF bearing with full technical specifications, real stock and competitive pricing at M/S Helal Enterprise, Nawabpur, Dhaka.",
        }
      : map[pathname] || map["/"];

    document.title = meta.t;
    let metaDesc = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (metaDesc) metaDesc.content = meta.d;

    // JSON-LD
    const ldId = "ld-local-business";
    document.getElementById(ldId)?.remove();
    const ld = document.createElement("script");
    ld.id = ldId;
    ld.type = "application/ld+json";
    ld.text = JSON.stringify(localBusinessJsonLd());
    document.head.appendChild(ld);
  }, [pathname]);
  return null;
}

/* ── Cursor glow effect ── */
function CursorGlow() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);
  const raf = useRef(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (raf.current) cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(() => {
        setPos({ x: e.clientX, y: e.clientY });
        setVisible(true);
      });
    };
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);
    const onDown = () => setHovering(true);
    const onUp = () => setHovering(false);
    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  if (typeof window === "undefined") return null;
  return (
    <div
      className="cursor-glow"
      style={{
        left: pos.x,
        top: pos.y,
        transform: `translate(-50%, -50%) ${hovering ? "scale(2.2)" : "scale(1)"}`,
        opacity: visible ? 0.35 : 0,
        width: hovering ? "48px" : "20px",
        height: hovering ? "48px" : "20px",
      }}
    />
  );
}

/* ── Scroll progress bar ── */
function ScrollProgress() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
      setPct(Math.min(100, Math.max(0, pct)));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return <div className="scroll-progress" style={{ width: `${pct}%` }} />;
}

function NotFound() {
  return (
    <div className="mx-auto flex max-w-7xl flex-col items-center px-4 py-28 text-center">
      <p className="gradient-text font-display text-8xl font-extrabold tracking-tight">
        404
      </p>
      <h1 className="mt-4 font-display text-2xl font-extrabold text-navy sm:text-3xl">
        Page not found
      </h1>
      <p className="mt-3 max-w-md text-steel">
        The page you're looking for doesn't exist. Head back to the catalogue or contact our team.
      </p>
      <div className="mt-8 flex gap-3">
        <Link to="/" className={btnPrimary}>
          Go Home
        </Link>
        <Link
          to="/products"
          className="inline-flex items-center justify-center rounded-md border-2 border-brand px-6 py-3 text-sm font-bold text-brand transition-all hover:bg-brand hover:text-white hover:shadow-lg active:scale-[0.98]"
        >
          Browse Products
        </Link>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <BrowserRouter>
        <ScrollManager />
        <PageSEO />
        <CursorGlow />
        <ScrollProgress />
        <div className="flex min-h-screen flex-col font-sans text-ink antialiased">
          <Header />
          <main className="flex-1">
            <PageTransition>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </PageTransition>
          </main>
          <Footer />
          <WhatsAppButton />
        </div>
      </BrowserRouter>
    </StoreProvider>
  );
}
