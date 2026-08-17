import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Clock,
  Mail,
  MapPin,
  Phone,
  Send,
} from "lucide-react";
import { Crumbs, Reveal } from "../components/ui";
import YouTubeSection from "../components/YouTubeSection";
import { COMPANY } from "../lib/data";
import { useStore } from "../lib/store";

const SUBJECTS = [
  "Price quotation",
  "Product availability",
  "Interchange / part matching",
  "Bulk & tender enquiry",
  "Delivery status",
  "Other",
];

export default function Contact() {
  const { addInquiry } = useStore();
  const [form, setForm] = useState({ name: "", contact: "", subject: SUBJECTS[0], message: "" });
  const [errors, setErrors] = useState<{ name?: string; contact?: string; message?: string }>({});
  const [sent, setSent] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const err: typeof errors = {};
    if (form.name.trim().length < 3) err.name = "Please enter your name";
    if (form.contact.trim().length < 5) err.contact = "Enter a phone or email we can reply to";
    if (form.message.trim().length < 10) err.message = "Tell us a little more (min. 10 characters)";
    setErrors(err);
    if (Object.keys(err).length) return;
    addInquiry(form);
    setSent(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const inputCls = (bad?: string) =>
    `w-full rounded-md border bg-white px-4 py-3 text-sm font-medium text-ink outline-none transition-colors placeholder:text-steel/60 ${
      bad ? "border-red-400 focus:border-red-500" : "border-line focus:border-brand"
    }`;

  return (
    <div>
      {/* title band */}
      <div className="border-b border-line bg-mist">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <Crumbs items={[{ label: "Home", to: "/" }, { label: "Contact" }]} />
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
            Talk to our counter team
          </h1>
          <p className="mt-2 max-w-xl text-[15px] text-steel">
            Call for instant pricing, email your BOM for a formatted quotation, or drop by the shop
            — we're at the same Nawabpur address since the beginning.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-8 lg:grid-cols-12">
          {/* info column */}
          <div className="space-y-4 lg:col-span-5">
            <Reveal>
              <div className="rounded-lg bg-navy p-7 text-white">
                <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-white/50">
                  Visit the shop
                </h2>
                <div className="mt-4 flex items-start gap-3.5">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                  <div>
                    <p className="font-bold">{COMPANY.name}</p>
                    <p className="mt-1 text-sm leading-relaxed text-white/75">{COMPANY.address}</p>
                  </div>
                </div>
                <div className="mt-5 flex items-start gap-3.5">
                  <Clock className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                  <p className="text-sm text-white/75">{COMPANY.hours}</p>
                </div>
                <div className="mt-5 flex items-start gap-3.5">
                  <Mail className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                  <a href={`mailto:${COMPANY.email}`} className="text-sm font-semibold hover:text-brand">
                    {COMPANY.email}
                  </a>
                </div>
              </div>
            </Reveal>

            {COMPANY.phones.map((p, i) => (
              <Reveal key={p.tel} delay={0.06 + i * 0.05}>
                <a
                  href={`tel:${p.tel}`}
                  className="group flex items-center gap-4 rounded-lg border border-line bg-white p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand hover:shadow-lg"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-brand-tint text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                    <Phone className="h-5.5 w-5.5" />
                  </span>
                  <span className="flex-1">
                    <span className="block text-[11px] font-bold uppercase tracking-[0.16em] text-steel">
                      {p.tag}
                    </span>
                    <span className="mt-0.5 block text-lg font-extrabold tracking-tight text-navy transition-colors group-hover:text-brand">
                      {p.label}
                    </span>
                  </span>
                </a>
              </Reveal>
            ))}
          </div>

          {/* form column */}
          <div className="lg:col-span-7">
            <Reveal delay={0.1}>
              <div className="rounded-lg border border-line bg-white p-7 sm:p-9">
                {sent ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-10 text-center"
                  >
                    <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50">
                      <CheckCircle2 className="h-10 w-10 text-emerald-500" />
                    </span>
                    <h2 className="mt-6 text-2xl font-extrabold tracking-tight text-navy">
                      Message received
                    </h2>
                    <p className="mx-auto mt-3 max-w-sm text-[15px] text-steel">
                      Thank you, {form.name.split(" ")[0]}. Our team will reach you shortly at{" "}
                      <span className="font-bold text-navy">{form.contact}</span>.
                    </p>
                    <button
                      onClick={() => {
                        setSent(false);
                        setForm({ name: "", contact: "", subject: SUBJECTS[0], message: "" });
                      }}
                      className="mt-7 rounded-md bg-brand px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-dark"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <>
                    <h2 className="text-xl font-extrabold tracking-tight text-navy">
                      Send an enquiry
                    </h2>
                    <p className="mt-1.5 text-sm text-steel">
                      We reply by phone or email within working hours — usually within the hour.
                    </p>
                    <form onSubmit={submit} className="mt-7 space-y-5">
                      <div className="grid gap-5 sm:grid-cols-2">
                        <div>
                          <label className="mb-1.5 block text-[13px] font-bold text-navy">
                            Your name <span className="text-brand">*</span>
                          </label>
                          <input
                            value={form.name}
                            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                            placeholder="e.g. Md. Abdul Karim"
                            className={inputCls(errors.name)}
                          />
                          {errors.name && (
                            <p className="mt-1.5 text-xs font-semibold text-red-500">{errors.name}</p>
                          )}
                        </div>
                        <div>
                          <label className="mb-1.5 block text-[13px] font-bold text-navy">
                            Phone or email <span className="text-brand">*</span>
                          </label>
                          <input
                            value={form.contact}
                            onChange={(e) => setForm((f) => ({ ...f, contact: e.target.value }))}
                            placeholder="e.g. 01715-000000"
                            className={inputCls(errors.contact)}
                          />
                          {errors.contact && (
                            <p className="mt-1.5 text-xs font-semibold text-red-500">
                              {errors.contact}
                            </p>
                          )}
                        </div>
                      </div>
                      <div>
                        <label className="mb-1.5 block text-[13px] font-bold text-navy">
                          Subject
                        </label>
                        <select
                          value={form.subject}
                          onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
                          className={inputCls()}
                        >
                          {SUBJECTS.map((s) => (
                            <option key={s}>{s}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="mb-1.5 block text-[13px] font-bold text-navy">
                          Message <span className="text-brand">*</span>
                        </label>
                        <textarea
                          value={form.message}
                          onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                          rows={5}
                          placeholder="e.g. Need 10 pcs 6308-2Z and matching 40×62×12 oil seals — please quote with delivery to Gazipur."
                          className={`${inputCls(errors.message)} resize-none`}
                        />
                        {errors.message && (
                          <p className="mt-1.5 text-xs font-semibold text-red-500">
                            {errors.message}
                          </p>
                        )}
                      </div>
                      <button
                        type="submit"
                        className="inline-flex items-center justify-center gap-2 rounded-md bg-brand px-7 py-3.5 text-sm font-bold text-white transition-colors hover:bg-brand-dark"
                      >
                        <Send className="h-4 w-4" /> Send Message
                      </button>
                    </form>
                  </>
                )}
              </div>
            </Reveal>
          </div>
        </div>

        {/* map */}
        <Reveal className="mt-10">
          <div className="overflow-hidden rounded-lg border border-line">
            <div className="flex flex-wrap items-center justify-between gap-3 bg-navy px-6 py-4">
              <p className="flex items-center gap-2.5 text-sm font-bold text-white">
                <MapPin className="h-4.5 w-4.5 text-brand" /> Find us on Nawabpur Road
              </p>
              <a
                href="https://maps.google.com/?q=Nawabpur+Road,+Dhaka,+Bangladesh"
                target="_blank"
                rel="noreferrer"
                className="text-[13px] font-bold text-brand underline-offset-4 hover:underline"
              >
                Open in Google Maps
              </a>
            </div>
            <iframe
              title="M/S Helal Enterprise location — Nawabpur, Dhaka"
              src="https://www.google.com/maps?q=Nawabpur%20Road%2C%20Dhaka%201100%2C%20Bangladesh&z=15&output=embed"
              className="h-[380px] w-full border-0"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Reveal>
      </div>

      {/* YouTube video section */}
      <YouTubeSection />
    </div>
  );
}
