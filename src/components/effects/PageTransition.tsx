import { motion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Per-route entrance shell — every page fades up + de-blurs on mount.
 * Used per <Route element>. Swap-free, glitch-free.
 */
export default function PageTransition({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, filter: "blur(5px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
