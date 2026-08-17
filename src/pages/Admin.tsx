import { useMemo, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Boxes,
  ChevronDown,
  ClipboardList,
  Inbox,
  LayoutDashboard,
  Lock,
  LogOut,
  MessageSquareText,
  Pencil,
  Plus,
  RotateCcw,
  Search,
  Trash2,
  X,
} from "lucide-react";
import { CATEGORIES, COMPANY, IMAGE_LIBRARY, tk, type Product } from "../lib/data";
import { useStore, type OrderStatus } from "../lib/store";

const ADMIN_PASS = "helal2025";
type Tab = "dashboard" | "products" | "orders" | "inquiries";

/* ------------------------------- gate ----------------------------------- */
function Gate({ onEnter }: { onEnter: () => void }) {
  const [pass, setPass] = useState("");
  const [error, setError] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (pass === ADMIN_PASS) {
      sessionStorage.setItem("he_admin", "1");
      onEnter();
    } else {
      setError(true);
    }
  };

  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-mist px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md rounded-lg border border-line bg-white p-8 shadow-lg sm:p-10"
      >
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-tint">
          <Lock className="h-6 w-6 text-brand" />
        </span>
        <h1 className="mt-5 text-center text-xl font-extrabold tracking-tight text-navy">
          Admin Panel Access
        </h1>
        <p className="mt-2 text-center text-sm text-steel">
          Restricted area for {COMPANY.short} staff.
        </p>
        <form onSubmit={submit} className="mt-7 space-y-4">
          <div>
            <input
              type="password"
              value={pass}
              onChange={(e) => {
                setPass(e.target.value);
                setError(false);
              }}
              placeholder="Enter admin password"
              className={`w-full rounded-md border px-4 py-3 text-sm font-medium outline-none transition-colors ${
                error ? "border-red-400 focus:border-red-500" : "border-line focus:border-brand"
              }`}
            />
            {error && (
              <p className="mt-2 text-xs font-semibold text-red-500">
                Incorrect password — please try again.
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full rounded-md bg-brand px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-dark"
          >
            Sign In
          </button>
          <p className="text-center text-[12px] text-steel">
            Demo password: <span className="font-mono font-bold text-navy">helal2025</span>
          </p>
        </form>
      </motion.div>
    </div>
  );
}

/* ----------------------------- product form ------------------------------ */
interface ProductForm {
  name: string;
  sku: string;
  brand: string;
  category: string;
  price: string;
  stock: string;
  image: string;
  featured: boolean;
  description: string;
}

const emptyForm: ProductForm = {
  name: "",
  sku: "",
  brand: "SKF",
  category: CATEGORIES[0].id,
  price: "",
  stock: "10",
  image: IMAGE_LIBRARY[2],
  featured: false,
  description: "",
};

function ProductModal({
  initial,
  onSave,
  onClose,
}: {
  initial: ProductForm;
  onSave: (f: ProductForm) => void;
  onClose: () => void;
}) {
  const [f, setF] = useState<ProductForm>(initial);
  const [errors, setErrors] = useState<string[]>([]);

  const save = (e: FormEvent) => {
    e.preventDefault();
    const errs: string[] = [];
    if (f.name.trim().length < 4) errs.push("name");
    if (!f.sku.trim()) errs.push("sku");
    if (!(Number(f.price) > 0)) errs.push("price");
    if (Number(f.stock) < 0 || Number.isNaN(Number(f.stock))) errs.push("stock");
    if (!f.description.trim()) errs.push("description");
    setErrors(errs);
    if (errs.length === 0) onSave(f);
  };

  const field =
    "w-full rounded-md border border-line px-3.5 py-2.5 text-sm font-medium outline-none focus:border-brand";
  const has = (k: string) => errors.includes(k);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[70] flex items-start justify-center overflow-y-auto bg-night/60 p-4 backdrop-blur-sm sm:items-center"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.98 }}
        onClick={(e) => e.stopPropagation()}
        className="my-8 w-full max-w-2xl rounded-lg bg-white p-6 shadow-2xl sm:p-8"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-extrabold tracking-tight text-navy">
            {initial.name ? "Edit Product" : "Add New Product"}
          </h2>
          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-md hover:bg-mist"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={save} className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="mb-1.5 block text-[13px] font-bold text-navy">Product name *</label>
            <input
              value={f.name}
              onChange={(e) => setF({ ...f, name: e.target.value })}
              className={`${field} ${has("name") ? "border-red-400" : ""}`}
              placeholder="e.g. Deep Groove Ball Bearing 6206-2RS"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-[13px] font-bold text-navy">Part number / SKU *</label>
            <input
              value={f.sku}
              onChange={(e) => setF({ ...f, sku: e.target.value })}
              className={`${field} ${has("sku") ? "border-red-400" : ""}`}
              placeholder="e.g. 6206-2RS1"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-[13px] font-bold text-navy">Brand</label>
            <input
              value={f.brand}
              onChange={(e) => setF({ ...f, brand: e.target.value })}
              className={field}
              placeholder="e.g. SKF"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-[13px] font-bold text-navy">Category</label>
            <select
              value={f.category}
              onChange={(e) => setF({ ...f, category: e.target.value })}
              className={field}
            >
              {CATEGORIES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-[13px] font-bold text-navy">Price (৳) *</label>
              <input
                type="number"
                min="0"
                value={f.price}
                onChange={(e) => setF({ ...f, price: e.target.value })}
                className={`${field} ${has("price") ? "border-red-400" : ""}`}
                placeholder="0"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-[13px] font-bold text-navy">Stock qty</label>
              <input
                type="number"
                min="0"
                value={f.stock}
                onChange={(e) => setF({ ...f, stock: e.target.value })}
                className={`${field} ${has("stock") ? "border-red-400" : ""}`}
                placeholder="0"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label className="mb-1.5 block text-[13px] font-bold text-navy">Product image</label>
            <div className="grid max-h-44 grid-cols-4 gap-2 overflow-y-auto rounded-md border border-line p-2 sm:grid-cols-6">
              {IMAGE_LIBRARY.map((img) => (
                <button
                  type="button"
                  key={img}
                  onClick={() => setF({ ...f, image: img })}
                  className={`overflow-hidden rounded-md border-2 transition-all ${
                    f.image === img ? "border-brand" : "border-transparent hover:border-line"
                  }`}
                >
                  <img src={img} alt="" className="aspect-[4/3] w-full object-cover" />
                </button>
              ))}
            </div>
          </div>
          <div className="sm:col-span-2">
            <label className="mb-1.5 block text-[13px] font-bold text-navy">Description *</label>
            <textarea
              value={f.description}
              onChange={(e) => setF({ ...f, description: e.target.value })}
              rows={3}
              className={`${field} resize-none ${has("description") ? "border-red-400" : ""}`}
              placeholder="Short description shown on the product page…"
            />
          </div>
          <label className="flex items-center gap-2.5 sm:col-span-2">
            <button
              type="button"
              onClick={() => setF({ ...f, featured: !f.featured })}
              className={`relative h-5.5 w-10 rounded-full transition-colors ${
                f.featured ? "bg-brand" : "bg-mist"
              }`}
              aria-pressed={f.featured}
            >
              <span
                className={`absolute top-0.5 h-4.5 w-4.5 rounded-full bg-white shadow transition-all ${
                  f.featured ? "left-5" : "left-0.5"
                }`}
              />
            </button>
            <span className="text-sm font-semibold text-navy">
              Show in “Best Sellers” on the homepage
            </span>
          </label>

          <div className="flex justify-end gap-3 border-t border-line pt-5 sm:col-span-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md border-2 border-line px-5 py-2.5 text-sm font-bold text-navy hover:border-brand hover:text-brand"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-brand px-6 py-2.5 text-sm font-bold text-white hover:bg-brand-dark"
            >
              Save Product
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}

/* --------------------------------- main --------------------------------- */
export default function Admin() {
  const store = useStore();
  const [authed, setAuthed] = useState(() => sessionStorage.getItem("he_admin") === "1");
  const [tab, setTab] = useState<Tab>("dashboard");
  const [query, setQuery] = useState("");
  const [modal, setModal] = useState<null | { mode: "add" } | { mode: "edit"; product: Product }>(
    null,
  );
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);

  const filteredProducts = useMemo(() => {
    const n = query.trim().toLowerCase();
    if (!n) return store.products;
    return store.products.filter((p) =>
      `${p.name} ${p.sku} ${p.brand}`.toLowerCase().includes(n),
    );
  }, [store.products, query]);

  const revenue = store.orders
    .filter((o) => o.status !== "Cancelled")
    .reduce((s, o) => s + o.total, 0);
  const pendingCount = store.orders.filter((o) => o.status === "Pending").length;
  const outOfStock = store.products.filter((p) => p.stock === 0).length;

  if (!authed) return <Gate onEnter={() => setAuthed(true)} />;

  const TABS: { id: Tab; label: string; icon: typeof LayoutDashboard; badge?: number }[] = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "products", label: "Products", icon: Boxes },
    { id: "orders", label: "Orders", icon: ClipboardList, badge: pendingCount },
    { id: "inquiries", label: "Inquiries", icon: Inbox, badge: store.inquiries.length },
  ];

  const statusColor: Record<OrderStatus, string> = {
    Pending: "bg-amber-100 text-amber-700",
    Confirmed: "bg-brand-tint text-brand",
    Delivered: "bg-emerald-100 text-emerald-700",
    Cancelled: "bg-red-100 text-red-600",
  };

  return (
    <div className="bg-mist">
      {/* header band */}
      <div className="bg-navy">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-8 sm:px-6 lg:px-8">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand">
              Admin Panel
            </p>
            <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
              {COMPANY.name}
            </h1>
          </div>
          <button
            onClick={() => {
              sessionStorage.removeItem("he_admin");
              setAuthed(false);
            }}
            className="inline-flex items-center gap-2 rounded-md border border-white/25 px-4 py-2.5 text-sm font-bold text-white/80 transition-colors hover:border-white hover:text-white"
          >
            <LogOut className="h-4 w-4" /> Sign Out
          </button>
        </div>
        {/* tabs */}
        <div className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-4 sm:px-6 lg:px-8">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 whitespace-nowrap rounded-t-md px-5 py-3.5 text-sm font-bold transition-colors ${
                tab === t.id
                  ? "bg-mist text-navy"
                  : "text-white/60 hover:bg-white/5 hover:text-white"
              }`}
            >
              <t.icon className="h-4.5 w-4.5" />
              {t.label}
              {t.badge ? (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-brand px-1.5 text-[11px] text-white">
                  {t.badge}
                </span>
              ) : null}
            </button>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* ------------------------------ dashboard ---------------------------- */}
        {tab === "dashboard" && (
          <div className="space-y-8">
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              {[
                { label: "Catalogue products", value: String(store.products.length), sub: `${outOfStock} out of stock` },
                { label: "Total orders", value: String(store.orders.length), sub: `${pendingCount} pending` },
                { label: "Order value (non-cancelled)", value: tk(revenue), sub: "all time" },
                { label: "Customer inquiries", value: String(store.inquiries.length), sub: "from contact form" },
              ].map((s) => (
                <div key={s.label} className="rounded-lg border border-line bg-white p-5">
                  <p className="text-[12px] font-bold uppercase tracking-[0.12em] text-steel">
                    {s.label}
                  </p>
                  <p className="mt-2 text-2xl font-extrabold tracking-tight text-navy sm:text-3xl">
                    {s.value}
                  </p>
                  <p className="mt-1 text-xs font-semibold text-brand">{s.sub}</p>
                </div>
              ))}
            </div>

            <div className="rounded-lg border border-line bg-white p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-extrabold tracking-tight text-navy">Recent orders</h2>
                <button
                  onClick={() => setTab("orders")}
                  className="text-sm font-bold text-brand hover:underline"
                >
                  View all
                </button>
              </div>
              {store.orders.length === 0 ? (
                <p className="py-10 text-center text-sm text-steel">
                  No orders yet — they'll appear here when customers check out from the cart.
                </p>
              ) : (
                <div className="mt-4 divide-y divide-line">
                  {store.orders.slice(0, 5).map((o) => (
                    <div key={o.id} className="flex flex-wrap items-center justify-between gap-3 py-4">
                      <div>
                        <p className="text-sm font-extrabold text-navy">{o.id}</p>
                        <p className="text-xs text-steel">
                          {o.customer.name} · {new Date(o.createdAt).toLocaleString("en-GB")}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm font-extrabold text-navy">{tk(o.total)}</span>
                        <span className={`rounded-full px-3 py-1 text-[11px] font-bold ${statusColor[o.status]}`}>
                          {o.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ------------------------------ products ----------------------------- */}
        {tab === "products" && (
          <div className="space-y-5">
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex min-w-56 flex-1 items-center gap-2 rounded-md border border-line bg-white px-3 py-2.5">
                <Search className="h-4 w-4 shrink-0 text-steel" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search products…"
                  className="w-full bg-transparent text-sm font-medium outline-none"
                />
              </div>
              <button
                onClick={() => setModal({ mode: "add" })}
                className="inline-flex items-center gap-2 rounded-md bg-brand px-4 py-2.5 text-sm font-bold text-white hover:bg-brand-dark"
              >
                <Plus className="h-4 w-4" /> Add Product
              </button>
              <button
                onClick={() => setConfirmDelete("__reset__")}
                className="inline-flex items-center gap-2 rounded-md border-2 border-line bg-white px-4 py-2 text-sm font-bold text-navy hover:border-brand hover:text-brand"
              >
                <RotateCcw className="h-4 w-4" /> Reset Catalogue
              </button>
            </div>

            <div className="overflow-x-auto rounded-lg border border-line bg-white">
              <table className="w-full min-w-[760px] text-left text-sm">
                <thead>
                  <tr className="border-b border-line bg-mist text-[11px] uppercase tracking-[0.12em] text-steel">
                    <th className="px-5 py-3 font-bold">Product</th>
                    <th className="px-4 py-3 font-bold">Category</th>
                    <th className="px-4 py-3 font-bold">Price</th>
                    <th className="px-4 py-3 font-bold">Stock</th>
                    <th className="px-4 py-3 font-bold">Featured</th>
                    <th className="px-4 py-3 text-right font-bold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {filteredProducts.map((p) => (
                    <tr key={p.id} className="transition-colors hover:bg-mist/60">
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <img
                            src={p.image}
                            alt=""
                            className="h-11 w-14 rounded border border-line object-cover"
                          />
                          <div>
                            <p className="font-bold text-navy">{p.name}</p>
                            <p className="text-xs text-steel">
                              {p.brand} · {p.sku}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3.5 text-steel">
                        {CATEGORIES.find((c) => c.id === p.category)?.name ?? p.category}
                      </td>
                      <td className="px-4 py-3.5 font-bold text-navy">{tk(p.price)}</td>
                      <td className="px-4 py-3.5">
                        <span
                          className={`font-bold ${
                            p.stock === 0 ? "text-red-500" : p.stock < 20 ? "text-amber-600" : "text-emerald-600"
                          }`}
                        >
                          {p.stock}
                        </span>
                      </td>
                      <td className="px-4 py-3.5">
                        {p.featured ? (
                          <span className="rounded-full bg-brand-tint px-2.5 py-1 text-[11px] font-bold text-brand">
                            Yes
                          </span>
                        ) : (
                          <span className="text-steel">—</span>
                        )}
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="flex justify-end gap-1.5">
                          <button
                            onClick={() => setModal({ mode: "edit", product: p })}
                            className="flex h-9 w-9 items-center justify-center rounded-md text-steel transition-colors hover:bg-brand-tint hover:text-brand"
                            aria-label={`Edit ${p.name}`}
                          >
                            <Pencil className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => setConfirmDelete(p.id)}
                            className="flex h-9 w-9 items-center justify-center rounded-md text-steel transition-colors hover:bg-red-50 hover:text-red-600"
                            aria-label={`Delete ${p.name}`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredProducts.length === 0 && (
                <p className="py-12 text-center text-sm text-steel">No products match your search.</p>
              )}
            </div>
          </div>
        )}

        {/* ------------------------------- orders ------------------------------ */}
        {tab === "orders" && (
          <div className="space-y-4">
            {store.orders.length === 0 ? (
              <div className="rounded-lg border border-line bg-white py-20 text-center">
                <ClipboardList className="mx-auto h-12 w-12 text-line" />
                <p className="mt-4 text-sm text-steel">
                  No orders yet. Orders placed from the cart page appear here instantly.
                </p>
              </div>
            ) : (
              store.orders.map((o) => (
                <div key={o.id} className="overflow-hidden rounded-lg border border-line bg-white">
                  <button
                    onClick={() => setExpanded(expanded === o.id ? null : o.id)}
                    className="flex w-full flex-wrap items-center justify-between gap-3 px-5 py-4 text-left transition-colors hover:bg-mist/50"
                  >
                    <div className="flex items-center gap-4">
                      <ChevronDown
                        className={`h-4.5 w-4.5 text-steel transition-transform ${
                          expanded === o.id ? "rotate-180" : ""
                        }`}
                      />
                      <div>
                        <p className="text-sm font-extrabold text-navy">{o.id}</p>
                        <p className="text-xs text-steel">
                          {o.customer.name} — {o.customer.phone}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-extrabold text-navy">{tk(o.total)}</span>
                      <span
                        className={`rounded-full px-3 py-1 text-[11px] font-bold ${statusColor[o.status]}`}
                      >
                        {o.status}
                      </span>
                    </div>
                  </button>

                  <AnimatePresence>
                    {expanded === o.id && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        className="overflow-hidden border-t border-line"
                      >
                        <div className="grid gap-6 p-5 sm:grid-cols-2">
                          <div>
                            <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-steel">
                              Customer
                            </h3>
                            <div className="mt-2 space-y-1 text-sm">
                              <p className="font-bold text-navy">{o.customer.name}</p>
                              {o.customer.company && <p className="text-steel">{o.customer.company}</p>}
                              <p className="text-steel">{o.customer.phone}</p>
                              <p className="text-steel">
                                {o.delivery.label === "Counter pickup — Nawabpur (free)"
                                  ? "Pickup from Nawabpur counter"
                                  : o.customer.address}
                              </p>
                              {o.customer.note && (
                                <p className="rounded-md bg-mist px-3 py-2 text-[13px] italic text-steel">
                                  “{o.customer.note}”
                                </p>
                              )}
                            </div>
                          </div>
                          <div>
                            <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-steel">
                              Items
                            </h3>
                            <div className="mt-2 space-y-1.5 text-sm">
                              {o.items.map((i) => (
                                <div key={i.id} className="flex justify-between gap-3">
                                  <span className="text-navy">
                                    {i.name} <span className="text-steel">× {i.qty}</span>
                                  </span>
                                  <span className="font-bold text-navy">{tk(i.price * i.qty)}</span>
                                </div>
                              ))}
                              <div className="flex justify-between border-t border-line pt-1.5 text-steel">
                                <span>{o.delivery.label}</span>
                                <span>{o.delivery.charge === 0 ? "Free" : tk(o.delivery.charge)}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line bg-mist/50 px-5 py-3.5">
                          <p className="text-xs text-steel">
                            Placed {new Date(o.createdAt).toLocaleString("en-GB")}
                          </p>
                          <div className="flex items-center gap-2">
                            <select
                              value={o.status}
                              onChange={(e) => store.setOrderStatus(o.id, e.target.value as OrderStatus)}
                              className="rounded-md border border-line bg-white px-3 py-2 text-xs font-bold text-navy outline-none focus:border-brand"
                            >
                              {(["Pending", "Confirmed", "Delivered", "Cancelled"] as OrderStatus[]).map(
                                (s) => (
                                  <option key={s}>{s}</option>
                                ),
                              )}
                            </select>
                            <button
                              onClick={() => store.deleteOrder(o.id)}
                              className="flex h-9 w-9 items-center justify-center rounded-md text-steel hover:bg-red-50 hover:text-red-600"
                              aria-label="Delete order"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))
            )}
          </div>
        )}

        {/* ------------------------------ inquiries ---------------------------- */}
        {tab === "inquiries" && (
          <div className="space-y-4">
            {store.inquiries.length === 0 ? (
              <div className="rounded-lg border border-line bg-white py-20 text-center">
                <MessageSquareText className="mx-auto h-12 w-12 text-line" />
                <p className="mt-4 text-sm text-steel">
                  No inquiries yet — messages from the contact form land here.
                </p>
              </div>
            ) : (
              store.inquiries.map((inq) => (
                <div key={inq.id} className="rounded-lg border border-line bg-white p-5">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-extrabold text-navy">{inq.name}</p>
                      <p className="text-xs font-semibold text-brand">{inq.contact}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-mist px-3 py-1 text-[11px] font-bold text-navy">
                        {inq.subject}
                      </span>
                      <button
                        onClick={() => store.deleteInquiry(inq.id)}
                        className="flex h-8 w-8 items-center justify-center rounded-md text-steel hover:bg-red-50 hover:text-red-600"
                        aria-label="Delete inquiry"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-steel">{inq.message}</p>
                  <p className="mt-3 text-[11px] font-semibold text-steel/70">
                    {inq.id} · {new Date(inq.createdAt).toLocaleString("en-GB")}
                  </p>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* add / edit modal */}
      <AnimatePresence>
        {modal && (
          <ProductModal
            initial={
              modal.mode === "edit"
                ? {
                    name: modal.product.name,
                    sku: modal.product.sku,
                    brand: modal.product.brand,
                    category: modal.product.category,
                    price: String(modal.product.price),
                    stock: String(modal.product.stock),
                    image: modal.product.image,
                    featured: !!modal.product.featured,
                    description: modal.product.description,
                  }
                : emptyForm
            }
            onSave={(f) => {
              const patch = {
                name: f.name.trim(),
                sku: f.sku.trim(),
                brand: f.brand.trim() || "—",
                category: f.category,
                price: Number(f.price),
                stock: Math.max(0, Number(f.stock)),
                image: f.image,
                featured: f.featured,
                description: f.description.trim(),
              };
              if (modal.mode === "edit") {
                store.updateProduct(modal.product.id, patch);
              } else {
                store.addProduct({ ...patch, specs: [{ label: "Packaging", value: "Original manufacturer box" }] });
              }
              setModal(null);
            }}
            onClose={() => setModal(null)}
          />
        )}
      </AnimatePresence>

      {/* delete / reset confirm */}
      <AnimatePresence>
        {confirmDelete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[75] flex items-center justify-center bg-night/60 p-4"
            onClick={() => setConfirmDelete(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-sm rounded-lg bg-white p-7 text-center shadow-2xl"
            >
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
                <Trash2 className="h-6 w-6 text-red-500" />
              </span>
              <h3 className="mt-4 text-lg font-extrabold text-navy">
                {confirmDelete === "__reset__" ? "Reset catalogue?" : "Delete this product?"}
              </h3>
              <p className="mt-2 text-sm text-steel">
                {confirmDelete === "__reset__"
                  ? "All edits will be discarded and the original 22-item catalogue restored."
                  : "This removes the product from the shop immediately. It cannot be undone."}
              </p>
              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => setConfirmDelete(null)}
                  className="flex-1 rounded-md border-2 border-line px-4 py-2.5 text-sm font-bold text-navy hover:border-brand hover:text-brand"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    if (confirmDelete === "__reset__") store.resetProducts();
                    else store.deleteProduct(confirmDelete);
                    setConfirmDelete(null);
                  }}
                  className="flex-1 rounded-md bg-red-500 px-4 py-2.5 text-sm font-bold text-white hover:bg-red-600"
                >
                  {confirmDelete === "__reset__" ? "Reset" : "Delete"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
