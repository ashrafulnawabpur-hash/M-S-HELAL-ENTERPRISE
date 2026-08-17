import { useState, type MouseEvent } from "react";
import { Link } from "react-router-dom";
import { Check, ShoppingCart } from "lucide-react";
import { tk, type Product } from "../lib/data";
import { useStore } from "../lib/store";
import { TiltCard } from "./effects/Motion";

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useStore();
  const [added, setAdded] = useState(false);
  const inStock = product.stock > 0;

  const handleAdd = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!inStock) return;
    addToCart(product.id, 1);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1400);
  };

  return (
    <TiltCard maxTilt={5} className="h-full">
      <Link
        to={`/products/${product.id}`}
        className="group flex h-full flex-col overflow-hidden rounded-xl border border-line/60 bg-white/80 backdrop-blur-sm transition-all duration-300 card-glow hover:-translate-y-1.5 hover:border-brand/30 hover:shadow-[0_24px_48px_-16px_rgba(0,36,63,0.2)]"
      >
      <div className="relative aspect-[4/3] overflow-hidden bg-mist">
        <img
          src={product.image || "/images/skf/ai-dg-01.jpg"}
          alt={product.name}
          loading="lazy"
          onError={(e) => {
            const target = e.currentTarget;
            if (!target.dataset.fallback) {
              target.dataset.fallback = "1";
              target.src = "/images/skf/ai-dg-01.jpg";
            }
          }}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-108"
        />
        <span className="absolute left-3 top-3 rounded-sm bg-white/95 px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-wider text-navy shadow-sm">
          {product.brand}
        </span>
        {!inStock && (
          <span className="absolute inset-0 flex items-center justify-center bg-white/70">
            <span className="rounded-sm bg-navy px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-white">
              Out of stock
            </span>
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand">
          {String(product.sku)}
        </p>
        <h3 className="mt-1.5 line-clamp-2 text-[15px] font-bold leading-snug text-navy transition-colors group-hover:text-brand">
          {product.name}
        </h3>

        <div className="mt-3 flex items-center gap-2 text-[12px] font-semibold">
          {inStock ? (
            product.stock < 20 ? (
              <span className="inline-flex items-center gap-1.5 text-amber-600">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                Low stock — {product.stock} left
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-emerald-600">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                In stock
              </span>
            )
          ) : (
            <span className="inline-flex items-center gap-1.5 text-red-600">
              <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
              Out of stock
            </span>
          )}
        </div>

        <div className="mt-auto flex items-end justify-between gap-3 pt-4">
          <div>
            <p className="text-[11px] font-medium text-steel">Net price</p>
            <p className="text-lg font-extrabold tracking-tight text-navy">{tk(product.price)}</p>
          </div>
          <button
            onClick={handleAdd}
            disabled={!inStock}
            className={`flex h-10 w-10 items-center justify-center rounded-md transition-all duration-300 ${
              added
                ? "bg-emerald-500 text-white"
                : inStock
                  ? "bg-brand-tint text-brand group-hover:bg-brand group-hover:text-white"
                  : "cursor-not-allowed bg-mist text-steel/50"
            }`}
            aria-label={`Add ${product.name} to cart`}
          >
            {added ? <Check className="h-4.5 w-4.5" /> : <ShoppingCart className="h-4.5 w-4.5" />}
          </button>
        </div>
      </div>
      </Link>
    </TiltCard>
  );
}
