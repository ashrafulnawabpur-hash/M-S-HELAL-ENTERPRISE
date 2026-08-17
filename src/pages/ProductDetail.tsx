import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Check,
  Minus,
  Play,
  Phone,
  Plus,
  ShieldCheck,
  ShoppingCart,
  Truck,
  Warehouse,
} from "lucide-react";
import ProductCard from "../components/ProductCard";
import { Crumbs, Reveal } from "../components/ui";
import { CATEGORIES, COMPANY, tk } from "../lib/data";
import { useStore } from "../lib/store";

export default function ProductDetail() {
  const { id } = useParams();
  const { products, addToCart } = useStore();
  const product = products.find((p) => p.id === id);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-28 text-center">
        <h1 className="text-2xl font-extrabold text-navy">Product not found</h1>
        <p className="mt-2 text-steel">This item may have been removed from the catalogue.</p>
        <Link
          to="/products"
          className="mt-6 inline-flex items-center gap-2 rounded-md bg-brand px-6 py-3 text-sm font-bold text-white hover:bg-brand-dark"
        >
          <ArrowLeft className="h-4 w-4" /> Back to catalogue
        </Link>
      </div>
    );
  }

  const category = CATEGORIES.find((c) => c.id === product.category);
  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);
  const inStock = product.stock > 0;

  const handleAdd = () => {
    addToCart(product.id, qty);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  };

  return (
    <div>
      {/* breadcrumbs */}
      <div className="border-b border-line bg-mist">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
          <Crumbs
            items={[
              { label: "Home", to: "/" },
              { label: "Products", to: "/products" },
              ...(category
                ? [{ label: category.name, to: `/products?cat=${category.id}` }]
                : []),
              { label: product.sku },
            ]}
          />
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* image */}
          <Reveal>
            <div className="sticky top-32 overflow-hidden rounded-lg border border-line bg-mist">
              <img
                src={product.image}
                alt={product.name}
                className="aspect-[4/3] w-full object-cover"
              />
              <span className="absolute left-5 top-5 rounded-sm bg-white px-3 py-1.5 text-xs font-extrabold uppercase tracking-wider text-navy shadow">
                {product.brand}
              </span>
            </div>
          </Reveal>

          {/* info */}
          <div>
            <Reveal delay={0.05}>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand">
                {category?.name ?? "Industrial Part"}
              </p>
              <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-navy sm:text-3xl lg:text-4xl">
                {product.name}
              </h1>
              <p className="mt-2 text-sm font-semibold text-steel">
                Part No. <span className="text-navy">{product.sku}</span>
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 border-y border-line py-5">
                <div>
                  <p className="text-xs font-medium text-steel">Net price (excl. delivery)</p>
                  <p className="text-3xl font-extrabold tracking-tight text-navy">
                    {tk(product.price)}
                  </p>
                </div>
                <div className="text-sm font-semibold">
                  {inStock ? (
                    <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3.5 py-1.5 text-emerald-700">
                      <span className="h-2 w-2 rounded-full bg-emerald-500" />
                      {product.stock < 20
                        ? `Only ${product.stock} left in stock`
                        : "In stock — ready to dispatch"}
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-2 rounded-full bg-red-50 px-3.5 py-1.5 text-red-700">
                      <span className="h-2 w-2 rounded-full bg-red-500" />
                      Out of stock — available on indent
                    </span>
                  )}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <p className="mt-6 leading-relaxed text-steel">{product.description}</p>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-8 flex flex-wrap items-stretch gap-4">
                <div className="flex items-center rounded-md border border-line">
                  <button
                    onClick={() => setQty((v) => Math.max(1, v - 1))}
                    className="flex h-12 w-11 items-center justify-center rounded-l-md text-navy transition-colors hover:bg-mist"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-12 text-center text-base font-extrabold text-navy">{qty}</span>
                  <button
                    onClick={() => setQty((v) => Math.min(99, v + 1))}
                    className="flex h-12 w-11 items-center justify-center rounded-r-md text-navy transition-colors hover:bg-mist"
                    aria-label="Increase quantity"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>

                <button
                  onClick={handleAdd}
                  disabled={!inStock}
                  className={`flex flex-1 items-center justify-center gap-2 rounded-md px-6 py-3 text-sm font-bold text-white transition-all sm:flex-initial sm:min-w-52 ${
                    added
                      ? "bg-emerald-500"
                      : inStock
                        ? "bg-brand hover:bg-brand-dark"
                        : "cursor-not-allowed bg-steel/50"
                  }`}
                >
                  {added ? (
                    <>
                      <Check className="h-4.5 w-4.5" /> Added to Cart
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="h-4.5 w-4.5" /> Add to Cart
                    </>
                  )}
                </button>

                <a
                  href={`tel:${COMPANY.phones[0].tel}`}
                  className="flex items-center justify-center gap-2 rounded-md border-2 border-navy px-6 py-3 text-sm font-bold text-navy transition-colors hover:bg-navy hover:text-white"
                >
                  <Phone className="h-4.5 w-4.5" /> Bulk Price?
                </a>

                <a
                  href={product.name.toLowerCase().includes("spherical")
                    ? "https://www.youtube.com/watch?v=7j3iBLJZqKU"
                    : product.name.toLowerCase().includes("tapered")
                      ? "https://www.youtube.com/watch?v=gP0vLfQWVKc"
                      : product.name.toLowerCase().includes("insert") || product.name.toLowerCase().includes("pillow")
                        ? "https://www.youtube.com/watch?v=7j3iBLJZqKU"
                        : "https://www.youtube.com/watch?v=8V2Fvhkq6Lw"
                  }
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 rounded-md border-2 border-red-600 px-5 py-3 text-sm font-bold text-red-600 transition-colors hover:bg-red-600 hover:text-white"
                >
                  <Play className="h-4.5 w-4.5" /> Watch Mounting Video
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.25}>
              <ul className="mt-8 space-y-3">
                {[
                  { icon: ShieldCheck, text: "100% genuine — verified manufacturer marking" },
                  { icon: Truck, text: "Same-day dispatch inside Dhaka city" },
                  { icon: Warehouse, text: `Physical stock at ${COMPANY.address}` },
                ].map((row, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-semibold text-navy">
                    <span className="flex h-8 w-8 items-center justify-center rounded-md bg-brand-tint text-brand">
                      <row.icon className="h-4 w-4" />
                    </span>
                    {row.text}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>

        {/* specs */}
        <div className="mt-16 grid gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div>
              <h2 className="text-xl font-extrabold tracking-tight text-navy">
                Technical Specifications
              </h2>
              <div className="mt-5 overflow-hidden rounded-lg border border-line">
                {product.specs.map((s, i) => (
                  <div
                    key={s.label}
                    className={`grid grid-cols-2 gap-4 px-5 py-3.5 text-sm ${
                      i % 2 === 0 ? "bg-mist/60" : "bg-white"
                    }`}
                  >
                    <span className="font-semibold text-steel">{s.label}</span>
                    <span className="font-bold text-navy">{s.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div>
              <h2 className="text-xl font-extrabold tracking-tight text-navy">About this item</h2>
              <p className="mt-5 leading-relaxed text-steel">{product.description}</p>
              <ul className="mt-4 space-y-2.5 text-sm text-steel">
                <li className="flex gap-2.5">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                  Supplied in original manufacturer packaging with batch traceability.
                </li>
                <li className="flex gap-2.5">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                  VAT invoice and delivery challan issued with every order.
                </li>
                <li className="flex gap-2.5">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                  Fitting and interchange advice available free of charge over the phone.
                </li>
              </ul>
            </div>
          </Reveal>
        </div>

        {/* related */}
        {related.length > 0 && (
          <div className="mt-20">
            <div className="flex items-end justify-between gap-4">
              <h2 className="text-xl font-extrabold tracking-tight text-navy sm:text-2xl">
                Related products
              </h2>
              <Link
                to={category ? `/products?cat=${category.id}` : "/products"}
                className="text-sm font-bold text-brand hover:underline"
              >
                View category
              </Link>
            </div>
            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
