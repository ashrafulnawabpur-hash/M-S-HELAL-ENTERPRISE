import { useState, type ChangeEvent, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Minus,
  PackageOpen,
  Plus,
  ShieldCheck,
  Trash2,
} from "lucide-react";
import { Crumbs, Reveal, btnPrimary } from "../components/ui";
import { tk } from "../lib/data";
import { useStore, type Order } from "../lib/store";

const DELIVERY_OPTIONS = [
  { id: "dhaka", label: "Inside Dhaka (same day)", charge: 100 },
  { id: "outside", label: "Outside Dhaka (courier, 24–48h)", charge: 250 },
  { id: "pickup", label: "Counter pickup — Nawabpur (free)", charge: 0 },
];

interface FormState {
  name: string;
  company: string;
  phone: string;
  address: string;
  note: string;
}

const EMPTY_FORM: FormState = { name: "", company: "", phone: "", address: "", note: "" };

export default function Cart() {
  const { cart, products, setQty, removeFromCart, subtotal, placeOrder } = useStore();
  const [deliveryId, setDeliveryId] = useState("dhaka");
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [placed, setPlaced] = useState<Order | null>(null);

  const lines = cart
    .map((l) => ({ ...l, product: products.find((p) => p.id === l.id) }))
    .filter((l) => l.product);

  const delivery = DELIVERY_OPTIONS.find((d) => d.id === deliveryId)!;
  const total = subtotal + (lines.length ? delivery.charge : 0);

  const set =
    (k: keyof FormState) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  const validate = () => {
    const e: typeof errors = {};
    if (form.name.trim().length < 3) e.name = "Please enter your full name";
    if (!/^\+?[0-9\s-]{7,16}$/.test(form.phone.trim())) e.phone = "Enter a valid phone number";
    if (deliveryId !== "pickup" && form.address.trim().length < 8)
      e.address = "Enter a complete delivery address";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = (ev: FormEvent) => {
    ev.preventDefault();
    if (lines.length === 0 || !validate()) return;
    const order = placeOrder({
      customer: form,
      delivery: { label: delivery.label, charge: delivery.charge },
      items: lines.map((l) => ({
        id: l.product!.id,
        name: l.product!.name,
        sku: l.product!.sku,
        price: l.product!.price,
        qty: l.qty,
      })),
      subtotal,
      total,
    });
    setPlaced(order);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const inputCls = (bad?: string) =>
    `w-full rounded-md border bg-white px-4 py-3 text-sm font-medium text-ink outline-none transition-colors placeholder:text-steel/60 ${
      bad ? "border-red-400 focus:border-red-500" : "border-line focus:border-brand"
    }`;

  /* ------------------------------- success ------------------------------ */
  if (placed) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-lg border border-line bg-white p-8 text-center shadow-lg sm:p-12"
        >
          <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50">
            <BadgeCheck className="h-10 w-10 text-emerald-500" />
          </span>
          <h1 className="mt-6 text-2xl font-extrabold tracking-tight text-navy sm:text-3xl">
            Order received — thank you!
          </h1>
          <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-steel">
            Your order <span className="font-extrabold text-brand">{placed.id}</span> has been
            logged. Our sales team will call{" "}
            <span className="font-bold text-navy">{placed.customer.phone}</span> shortly to confirm
            availability and delivery.
          </p>

          <div className="mt-8 space-y-3 rounded-lg bg-mist p-6 text-left">
            {placed.items.map((i) => (
              <div key={i.id} className="flex justify-between gap-4 text-sm">
                <span className="font-semibold text-navy">
                  {i.name} <span className="text-steel">× {i.qty}</span>
                </span>
                <span className="font-bold text-navy">{tk(i.price * i.qty)}</span>
              </div>
            ))}
            <div className="flex justify-between border-t border-line pt-3 text-sm">
              <span className="text-steel">{placed.delivery.label}</span>
              <span className="font-bold text-navy">
                {placed.delivery.charge === 0 ? "Free" : tk(placed.delivery.charge)}
              </span>
            </div>
            <div className="flex justify-between border-t border-line pt-3">
              <span className="text-base font-extrabold text-navy">Total payable</span>
              <span className="text-base font-extrabold text-brand">{tk(placed.total)}</span>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/products" className={btnPrimary}>
              Continue Shopping <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/"
              className="inline-flex items-center justify-center rounded-md border-2 border-line px-6 py-3 text-sm font-bold text-navy transition-colors hover:border-brand hover:text-brand"
            >
              Back to Home
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  /* -------------------------------- empty -------------------------------- */
  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6">
        <PackageOpen className="mx-auto h-16 w-16 text-line" />
        <h1 className="mt-5 text-2xl font-extrabold tracking-tight text-navy sm:text-3xl">
          Your cart is empty
        </h1>
        <p className="mx-auto mt-3 max-w-md text-steel">
          Browse the catalogue and add the parts you need — or call us and we'll put a quotation
          together for you.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/products" className={btnPrimary}>
            Browse Products <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    );
  }

  /* -------------------------------- main --------------------------------- */
  return (
    <div>
      <div className="border-b border-line bg-mist">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <Crumbs items={[{ label: "Home", to: "/" }, { label: "Shopping Cart" }]} />
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
            Review &amp; Place Order
          </h1>
          <p className="mt-2 max-w-xl text-[15px] text-steel">
            Confirm your items and delivery details — our team will call to finalise payment and
            dispatch.
          </p>
        </div>
      </div>

      <form onSubmit={submit} className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="grid gap-10 lg:grid-cols-12">
          {/* items */}
          <div className="lg:col-span-7">
            <Reveal>
              <div className="overflow-hidden rounded-lg border border-line">
                <div className="hidden grid-cols-12 gap-4 border-b border-line bg-mist px-5 py-3 text-[11px] font-bold uppercase tracking-[0.14em] text-steel sm:grid">
                  <span className="col-span-6">Product</span>
                  <span className="col-span-2 text-center">Quantity</span>
                  <span className="col-span-3 text-right">Subtotal</span>
                  <span className="col-span-1" />
                </div>
                <AnimatePresence initial={false}>
                  {lines.map((l) => (
                    <motion.div
                      key={l.id}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, height: 0 }}
                      className="grid grid-cols-1 gap-4 border-b border-line bg-white px-5 py-5 last:border-0 sm:grid-cols-12 sm:items-center"
                    >
                      <div className="col-span-6 flex items-center gap-4">
                        <Link to={`/products/${l.product!.id}`} className="shrink-0">
                          <img
                            src={l.product!.image}
                            alt={l.product!.name}
                            className="h-16 w-20 rounded-md border border-line object-cover"
                          />
                        </Link>
                        <div className="min-w-0">
                          <Link
                            to={`/products/${l.product!.id}`}
                            className="line-clamp-2 text-sm font-bold text-navy hover:text-brand"
                          >
                            {l.product!.name}
                          </Link>
                          <p className="mt-1 text-xs text-steel">
                            {l.product!.brand} · {l.product!.sku}
                          </p>
                          <p className="mt-0.5 text-xs font-bold text-brand sm:hidden">
                            {tk(l.product!.price)}
                          </p>
                        </div>
                      </div>

                      <div className="col-span-2 flex items-center gap-3 sm:justify-center">
                        <div className="flex items-center rounded-md border border-line">
                          <button
                            type="button"
                            onClick={() => setQty(l.id, l.qty - 1)}
                            className="flex h-9 w-8 items-center justify-center text-navy hover:bg-mist"
                            aria-label="Decrease"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="w-9 text-center text-sm font-extrabold text-navy">
                            {l.qty}
                          </span>
                          <button
                            type="button"
                            onClick={() => setQty(l.id, l.qty + 1)}
                            className="flex h-9 w-8 items-center justify-center text-navy hover:bg-mist"
                            aria-label="Increase"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>

                      <p className="col-span-3 text-sm font-extrabold text-navy sm:text-right">
                        {tk(l.product!.price * l.qty)}
                      </p>

                      <div className="col-span-1 flex sm:justify-end">
                        <button
                          type="button"
                          onClick={() => removeFromCart(l.id)}
                          className="flex h-9 w-9 items-center justify-center rounded-md text-steel transition-colors hover:bg-red-50 hover:text-red-600"
                          aria-label={`Remove ${l.product!.name}`}
                        >
                          <Trash2 className="h-4.5 w-4.5" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </Reveal>

            {/* customer details */}
            <Reveal delay={0.08}>
              <div className="mt-8 rounded-lg border border-line bg-white p-6 sm:p-8">
                <h2 className="text-lg font-extrabold tracking-tight text-navy">
                  Contact &amp; Delivery Details
                </h2>
                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-[13px] font-bold text-navy">
                      Full name <span className="text-brand">*</span>
                    </label>
                    <input
                      value={form.name}
                      onChange={set("name")}
                      placeholder="e.g. Md. Abdul Karim"
                      className={inputCls(errors.name)}
                    />
                    {errors.name && <p className="mt-1.5 text-xs font-semibold text-red-500">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="mb-1.5 block text-[13px] font-bold text-navy">
                      Phone <span className="text-brand">*</span>
                    </label>
                    <input
                      value={form.phone}
                      onChange={set("phone")}
                      placeholder="e.g. 01715-000000"
                      className={inputCls(errors.phone)}
                    />
                    {errors.phone && <p className="mt-1.5 text-xs font-semibold text-red-500">{errors.phone}</p>}
                  </div>
                  <div className="sm:col-span-2">
                    <label className="mb-1.5 block text-[13px] font-bold text-navy">
                      Company / Workshop <span className="font-medium text-steel">(optional)</span>
                    </label>
                    <input
                      value={form.company}
                      onChange={set("company")}
                      placeholder="e.g. Rahman Engineering Works"
                      className={inputCls()}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="mb-1.5 block text-[13px] font-bold text-navy">
                      Delivery address{" "}
                      {deliveryId === "pickup" ? (
                        <span className="font-medium text-steel">(not needed for pickup)</span>
                      ) : (
                        <span className="text-brand">*</span>
                      )}
                    </label>
                    <textarea
                      value={form.address}
                      onChange={set("address")}
                      rows={2}
                      placeholder="House, road, area, district"
                      className={`${inputCls(errors.address)} resize-none`}
                    />
                    {errors.address && (
                      <p className="mt-1.5 text-xs font-semibold text-red-500">{errors.address}</p>
                    )}
                  </div>
                  <div className="sm:col-span-2">
                    <label className="mb-1.5 block text-[13px] font-bold text-navy">
                      Order note <span className="font-medium text-steel">(optional)</span>
                    </label>
                    <textarea
                      value={form.note}
                      onChange={set("note")}
                      rows={2}
                      placeholder="Any instructions — urgent call time, brand preference…"
                      className={`${inputCls()} resize-none`}
                    />
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* summary */}
          <div className="lg:col-span-5">
            <Reveal delay={0.08}>
              <div className="sticky top-32 rounded-lg border border-line bg-white p-6 sm:p-8">
                <h2 className="text-lg font-extrabold tracking-tight text-navy">Order Summary</h2>

                <div className="mt-6 space-y-3">
                  <p className="text-[13px] font-bold text-navy">Delivery method</p>
                  {DELIVERY_OPTIONS.map((d) => (
                    <button
                      type="button"
                      key={d.id}
                      onClick={() => setDeliveryId(d.id)}
                      className={`flex w-full items-center justify-between rounded-md border px-4 py-3 text-left text-sm font-semibold transition-colors ${
                        deliveryId === d.id
                          ? "border-brand bg-brand-tint text-navy"
                          : "border-line text-steel hover:border-brand/50"
                      }`}
                    >
                      <span className="flex items-center gap-2.5">
                        <span
                          className={`flex h-4.5 w-4.5 items-center justify-center rounded-full border-2 ${
                            deliveryId === d.id ? "border-brand" : "border-line"
                          }`}
                        >
                          {deliveryId === d.id && (
                            <span className="h-2 w-2 rounded-full bg-brand" />
                          )}
                        </span>
                        {d.label}
                      </span>
                      <span className="font-bold text-navy">
                        {d.charge === 0 ? "Free" : tk(d.charge)}
                      </span>
                    </button>
                  ))}
                </div>

                <div className="mt-6 space-y-3 border-t border-line pt-6 text-sm">
                  <div className="flex justify-between">
                    <span className="text-steel">
                      Subtotal ({lines.reduce((s, l) => s + l.qty, 0)} items)
                    </span>
                    <span className="font-bold text-navy">{tk(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-steel">Delivery</span>
                    <span className="font-bold text-navy">
                      {delivery.charge === 0 ? "Free" : tk(delivery.charge)}
                    </span>
                  </div>
                  <div className="flex justify-between border-t border-line pt-4">
                    <span className="text-base font-extrabold text-navy">Total</span>
                    <span className="text-xl font-extrabold tracking-tight text-brand">
                      {tk(total)}
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-md bg-brand px-6 py-4 text-[15px] font-bold text-white transition-colors hover:bg-brand-dark"
                >
                  Place Order <ArrowRight className="h-4.5 w-4.5" />
                </button>

                <Link
                  to="/products"
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-md border-2 border-line px-6 py-3 text-sm font-bold text-navy transition-colors hover:border-brand hover:text-brand"
                >
                  <ArrowLeft className="h-4 w-4" /> Continue Shopping
                </Link>

                <p className="mt-5 flex items-start gap-2.5 text-[12px] leading-relaxed text-steel">
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                  No online payment needed. Our team confirms stock and price by phone before
                  dispatch — pay cash on delivery or by bank transfer.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </form>
    </div>
  );
}
