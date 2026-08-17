import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "8801772094911";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Hello M/S Helal Enterprise, I need help with SKF bearings.",
)}`;

export default function WhatsAppButton() {
  return (
    <motion.a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="group fixed bottom-6 right-6 z-[85] sm:bottom-8 sm:right-8"
      initial={{ opacity: 0, scale: 0, rotate: -45 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{
        delay: 1.5,
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
      whileHover={{ scale: 1.12, y: -4 }}
      whileTap={{ scale: 0.92 }}
    >
      {/* Pulse rings */}
      <span className="absolute inset-0 -z-10 rounded-full bg-emerald-400/30" >
        <motion.span
          className="absolute inset-0 rounded-full bg-emerald-400/40"
          animate={{ scale: [1, 1.6], opacity: [0.6, 0] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: "easeOut" }}
        />
        <motion.span
          className="absolute inset-0 rounded-full bg-emerald-400/20"
          animate={{ scale: [1, 2.1], opacity: [0.4, 0] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: "easeOut", delay: 0.4 }}
        />
      </span>

      {/* Main button */}
      <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-[0_8px_32px_rgba(16,185,129,0.45),0_0_0_3px_#fff,inset_0_1px_0_rgba(255,255,255,0.2)] transition-all duration-300 group-hover:shadow-[0_12px_40px_rgba(16,185,129,0.55),0_0_0_3px_#fff,inset_0_1px_0_rgba(255,255,255,0.2)] sm:h-[68px] sm:w-[68px]">
        {/* Inner glow */}
        <span className="absolute inset-0 rounded-full bg-gradient-to-t from-transparent via-white/10 to-white/25" />
        <MessageCircle className="relative h-7 w-7 text-white drop-shadow-sm sm:h-8 sm:w-8" strokeWidth={2.2} />
      </span>

      {/* Tooltip */}
      <motion.span
        className="pointer-events-none absolute right-full mr-4 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-lg bg-night px-3.5 py-2 text-[12px] font-bold text-white shadow-xl"
        initial={{ opacity: 0, x: 8 }}
        animate={{ opacity: 0, x: 8 }}
        whileHover={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.25 }}
      >
        <span className="absolute -right-1.5 top-1/2 h-3 w-3 -translate-y-1/2 rotate-45 bg-night" />
        Chat on WhatsApp
      </motion.span>

      {/* Number badge on hover */}
      <motion.span
        className="pointer-events-none absolute -top-2 right-0 rounded-full bg-white px-2.5 py-1 text-[10px] font-extrabold text-emerald-600 shadow-lg"
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 0, y: 4 }}
        whileHover={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
      >
        +880 1772-094911
      </motion.span>
    </motion.a>
  );
}
