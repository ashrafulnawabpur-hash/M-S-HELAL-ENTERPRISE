import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Check, PackageSearch, RotateCcw, Search, SlidersHorizontal, X } from "lucide-react";
import ProductCard from "../components/ProductCard";
import { Crumbs, Reveal } from "../components/ui";
import { BRANDS, CATEGORIES } from "../lib/data";
import { useStore } from "../lib/store";

type SortKey = "featured" | "price-asc" | "price-desc" | "name";

export default function Products() {
  const { products } = useStore();
  const [params, setParams] = useSearchParams();
  const [q, setQ] = useState(params.get("q") ?? "");
  const [cats, setCats] = useState<string[]>(params.get("cat") ? [params.get("cat")!] : []);
  const [brands, setBrands] = useState<string[]>([]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sort, setSort] = useState<SortKey>("featured");
  const [filtersOpen, setFiltersOpen] = useState(false);

  /* react to URL changes (e.g. header mega-menu / footer links) */
  useEffect(() => {
    const urlCat = params.get("cat");
    if (urlCat) setCats([urlCat]);
  }, [params]);

  const toggle = (list: string[], v: string, setter: (l: string[]) => void) => {
    setter(list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);
  };

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    const out = products.filter((p) => {
      if (cats.length && !cats.includes(p.category)) return false;
      if (brands.length && !brands.includes(p.brand)) return false;
      if (inStockOnly && p.stock <= 0) return false;
      if (
        needle &&
        !`${p.name} ${p.sku} ${p.brand}`.toLowerCase().includes(needle)
      )
        return false;
      return true;
    });

    // keep featured ordering by default
    if (sort === "price-asc") out.sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") out.sort((a, b) => b.price - a.price);
    else if (sort === "name") out.sort((a, b) => a.name.localeCompare(b.name));
    else out.sort((a, b) => Number(b.featured ?? false) - Number(a.featured ?? false));
    return out;
  }, [products, q, cats, brands, inStockOnly, sort]);

  const activeFilterCount = cats.length + brands.length + (inStockOnly ? 1 : 0);

  const clearAll = () => {
    setQ("");
    setCats([]);
    setBrands([]);
    setInStockOnly(false);
    setSort("featured");
    setParams({}, { replace: true });
  };

  const FilterBody = (
    <div className="space-y-7">
      {/* search */}
      <div>
        <label className="text-xs font-bold uppercase tracking-[0.16em] text-navy">Search</label>
        <div className="mt-2.5 flex items-center gap-2 rounded-md border border-line bg-white px-3 py-2.5 focus-within:border-brand">
          <Search className="h-4 w-4 shrink-0 text-steel" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Bearing no. or name…"
            className="w-full bg-transparent text-sm font-medium text-ink outline-none placeholder:text-steel/70"
          />
        </div>
      </div>

      {/* categories */}
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-navy">Category</p>
        <div className="mt-3 space-y-1.5">
          {CATEGORIES.map((c) => {
            const active = cats.includes(c.id);
            return (
              <button
                key={c.id}
                onClick={() => toggle(cats, c.id, setCats)}
                className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm font-semibold transition-colors ${
                  active ? "bg-brand-tint text-brand" : "text-steel hover:bg-mist hover:text-navy"
                }`}
              >
                {c.name}
                <span
                  className={`flex h-4.5 w-4.5 items-center justify-center rounded-sm border ${
                    active ? "border-brand bg-brand text-white" : "border-line bg-white"
                  }`}
                >
                  {active && <Check className="h-3 w-3" />}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* brands */}
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-navy">Brand</p>
        <div className="mt-3 grid grid-cols-2 gap-1.5">
          {BRANDS.map((b) => {
            const active = brands.includes(b);
            return (
              <button
                key={b}
                onClick={() => toggle(brands, b, setBrands)}
                className={`rounded-md border px-2 py-2 text-[12px] font-bold tracking-wide transition-colors ${
                  active
                    ? "border-brand bg-brand text-white"
                    : "border-line bg-white text-steel hover:border-brand hover:text-brand"
                }`}
              >
                {b}
              </button>
            );
          })}
        </div>
      </div>

      {/* availability */}
      <button
        onClick={() => setInStockOnly((v) => !v)}
        className={`flex w-full items-center justify-between rounded-md border px-3 py-2.5 text-sm font-semibold transition-colors ${
          inStockOnly ? "border-brand bg-brand-tint text-brand" : "border-line text-steel"
        }`}
      >
        In-stock items only
        <span
          className={`relative h-5 w-9 rounded-full transition-colors ${
            inStockOnly ? "bg-brand" : "bg-line"
          }`}
        >
          <span
            className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-all ${
              inStockOnly ? "left-4.5" : "left-0.5"
            }`}
          />
        </span>
      </button>

      {activeFilterCount > 0 && (
        <button
          onClick={clearAll}
          className="flex w-full items-center justify-center gap-2 rounded-md border-2 border-navy px-4 py-2.5 text-sm font-bold text-navy transition-colors hover:bg-navy hover:text-white"
        >
          <RotateCcw className="h-4 w-4" /> Clear all filters
        </button>
      )}
    </div>
  );

  return (
    <div>
      {/* page title band */}
      <div className="border-b border-line bg-mist">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <Crumbs items={[{ label: "Home", to: "/" }, { label: "Products" }]} />
          <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
                Product Catalogue
              </h1>
              <p className="mt-2 max-w-xl text-[15px] text-steel">
                Over 1,000 genuine SKF bearings with ISO dimensions, real pricing and
                4K-quality product photography — all physically stocked at Nawabpur, Dhaka.
              </p>
            </div>
            <p className="text-sm font-bold text-steel">
              <span className="text-brand">{filtered.length}</span> of {products.length} products
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="grid gap-10 lg:grid-cols-12">
          {/* sidebar (desktop) */}
          <aside className="hidden lg:col-span-3 lg:block">
            <div className="sticky top-32 rounded-lg border border-line bg-white p-5">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-sm font-extrabold uppercase tracking-[0.14em] text-navy">
                  Filters
                </h2>
                <SlidersHorizontal className="h-4 w-4 text-brand" />
              </div>
              {FilterBody}
            </div>
          </aside>

          {/* content */}
          <div className="lg:col-span-9">
            {/* toolbar */}
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <button
                onClick={() => setFiltersOpen(true)}
                className="inline-flex items-center gap-2 rounded-md border border-line bg-white px-4 py-2.5 text-sm font-bold text-navy transition-colors hover:border-brand hover:text-brand lg:hidden"
              >
                <SlidersHorizontal className="h-4 w-4" />
                Filters
                {activeFilterCount > 0 && (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand text-[11px] text-white">
                    {activeFilterCount}
                  </span>
                )}
              </button>

              {/* mobile search */}
              <div className="flex flex-1 items-center gap-2 rounded-md border border-line bg-white px-3 py-2.5 focus-within:border-brand lg:hidden">
                <Search className="h-4 w-4 shrink-0 text-steel" />
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search…"
                  className="w-full bg-transparent text-sm font-medium outline-none placeholder:text-steel/70"
                />
              </div>

              <div className="ml-auto flex items-center gap-2">
                <label htmlFor="sort" className="hidden text-[13px] font-semibold text-steel sm:block">
                  Sort by
                </label>
                <select
                  id="sort"
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortKey)}
                  className="rounded-md border border-line bg-white px-3 py-2.5 text-sm font-semibold text-navy outline-none focus:border-brand"
                >
                  <option value="featured">Featured</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="name">Name A–Z</option>
                </select>
              </div>
            </div>

            {/* active chips */}
            {(cats.length > 0 || brands.length > 0) && (
              <div className="mb-6 flex flex-wrap gap-2">
                {cats.map((c) => (
                  <button
                    key={c}
                    onClick={() => toggle(cats, c, setCats)}
                    className="inline-flex items-center gap-1.5 rounded-full bg-brand-tint px-3 py-1.5 text-xs font-bold text-brand transition-colors hover:bg-brand hover:text-white"
                  >
                    {CATEGORIES.find((x) => x.id === c)?.name}
                    <X className="h-3 w-3" />
                  </button>
                ))}
                {brands.map((b) => (
                  <button
                    key={b}
                    onClick={() => toggle(brands, b, setBrands)}
                    className="inline-flex items-center gap-1.5 rounded-full bg-navy px-3 py-1.5 text-xs font-bold text-white transition-colors hover:bg-brand"
                  >
                    {b}
                    <X className="h-3 w-3" />
                  </button>
                ))}
              </div>
            )}

            {/* grid */}
            {filtered.length > 0 ? (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {filtered.map((p, i) => (
                  <Reveal key={p.id} delay={(i % 3) * 0.05} y={18}>
                    <ProductCard product={p} />
                  </Reveal>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center rounded-lg border border-dashed border-line bg-mist/50 py-24 text-center">
                <PackageSearch className="h-14 w-14 text-line" />
                <h3 className="mt-4 text-lg font-extrabold text-navy">No products found</h3>
                <p className="mt-2 max-w-sm text-sm text-steel">
                  Try a different search term or clear the active filters. You can also send us the
                  part number — we source items that are not listed online.
                </p>
                <button
                  onClick={clearAll}
                  className="mt-6 rounded-md bg-brand px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-brand-dark"
                >
                  Clear filters
                </button>
              </div>
            )}

            {/* sourcing strip */}
            <div className="mt-12 flex flex-wrap items-center justify-between gap-4 rounded-lg bg-navy p-6 sm:p-8">
              <div>
                <h3 className="text-lg font-extrabold tracking-tight text-white sm:text-xl">
                  Can't find your part number?
                </h3>
                <p className="mt-1 text-sm text-white/70">
                  We import on request — typical lead time 2–4 weeks for indent items.
                </p>
              </div>
              <a
                href="/contact"
                className="inline-flex items-center justify-center rounded-md bg-brand px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-dark"
              >
                Enquire Now
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* mobile filter drawer */}
      <AnimatePresence>
        {filtersOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-night/60"
              onClick={() => setFiltersOpen(false)}
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.26, ease: "easeOut" }}
              className="fixed inset-y-0 left-0 z-[61] flex w-full max-w-xs flex-col bg-white"
            >
              <div className="flex items-center justify-between border-b border-line px-5 py-4">
                <h2 className="text-sm font-extrabold uppercase tracking-[0.14em] text-navy">
                  Filters
                </h2>
                <button
                  onClick={() => setFiltersOpen(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-md hover:bg-mist"
                  aria-label="Close filters"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-5">{FilterBody}</div>
              <div className="border-t border-line p-5">
                <button
                  onClick={() => setFiltersOpen(false)}
                  className="w-full rounded-md bg-brand px-5 py-3 text-sm font-bold text-white"
                >
                  Show {filtered.length} products
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
