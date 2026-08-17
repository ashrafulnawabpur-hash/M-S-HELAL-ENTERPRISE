import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState, type ReactNode } from "react";

/* ------------------------------------------------------------------ */
/*  Detect fine-pointer (mouse) devices once                            */
/* ------------------------------------------------------------------ */
export const isFinePointer = () =>
  typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches;

/* ------------------------------------------------------------------ */
/*  CursorGlow — branded radial glow that trails the cursor             */
/* ------------------------------------------------------------------ */
export function CursorGlow() {
  const x = useMotionValue(-400);
  const y = useMotionValue(-400);
  const springX = useSpring(x, { stiffness: 250, damping: 28, mass: 0.6 });
  const springY = useSpring(y, { stiffness: 250, damping: 28, mass: 0.6 });
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!isFinePointer()) return;
    setEnabled(true);
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      {/* main glow */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[5] hidden h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full md:block"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
          background:
            "radial-gradient(circle, rgba(0,114,198,0.13) 0%, rgba(0,198,255,0.06) 38%, transparent 65%)",
          mixBlendMode: "screen",
        }}
      />
      {/* crisp dot */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[5] hidden h-2 w-2 rounded-full bg-brand/70 shadow-[0_0_14px_3px_rgba(0,114,198,0.45)] md:block"
        style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}
      />
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  ScrollProgress — gradient bar pinned to top of viewport             */
/* ------------------------------------------------------------------ */
export function ScrollProgress() {
  const scaleX = useMotionValue(0);
  const spring = useSpring(scaleX, { stiffness: 140, damping: 25, mass: 0.4 });

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      scaleX.set(max > 0 ? h.scrollTop / max : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [scaleX]);

  return (
    <motion.div
      aria-hidden
      className="fixed left-0 right-0 top-0 z-[100] h-[3px] origin-left bg-gradient-to-r from-brand via-cyan-400 to-brand"
      style={{ scaleX: spring }}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Magnetic — children gently pull toward the cursor                   */
/* ------------------------------------------------------------------ */
export function Magnetic({
  children,
  strength = 0.35,
  className = "",
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 200, damping: 18, mass: 0.4 });

  const onMove = (e: React.PointerEvent<HTMLElement>) => {
    if (!isFinePointer()) return;
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * strength);
    y.set((e.clientY - cy) * strength);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.span
      className={`inline-block ${className}`}
      style={{ x: sx, y: sy }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      {children}
    </motion.span>
  );
}

/* ------------------------------------------------------------------ */
/*  TiltCard — subtle 3D perspective tilt + glare sweep on hover        */
/* ------------------------------------------------------------------ */
export function TiltCard({
  children,
  className = "",
  maxTilt = 7,
  glare = true,
}: {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
  glare?: boolean;
}) {
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const glareX = useMotionValue(110); // % offscreen
  const rX = useSpring(rotateX, { stiffness: 260, damping: 22, mass: 0.5 });
  const rY = useSpring(rotateY, { stiffness: 260, damping: 22, mass: 0.5 });

  const onMove = (e: React.PointerEvent<HTMLElement>) => {
    if (!isFinePointer()) return;
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width; // 0..1
    const py = (e.clientY - rect.top) / rect.height; // 0..1
    rotateY.set((px - 0.5) * maxTilt * 2);
    rotateX.set(-(py - 0.5) * maxTilt * 2);
    glareX.set(px * 130 - 15);
  };
  const onLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    glareX.set(110);
  };

  return (
    <motion.div
      className={`relative [transform-style:preserve-3d] ${className}`}
      style={{ rotateX: rX, rotateY: rY, transformPerspective: 900 }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      {children}
      {glare && isFinePointer() && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 -z-0 w-1/3 rounded-inherit"
          style={{
            left: glareX as unknown as string,
            background:
              "linear-gradient(105deg, transparent 0%, rgba(255,255,255,0.25) 50%, transparent 100%)",
            filter: "blur(4px)",
          }}
        />
      )}
    </motion.div>
  );
}
