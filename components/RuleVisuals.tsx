"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef, type ReactNode } from "react";

// Small looping pictures for the "How we build" rules. They play only while on screen.

const LOOP = 3.2; // seconds per loop

function Stage({ children }: { children: (play: boolean) => ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-40px" });
  const reduced = useReducedMotion();
  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="bg-dots-dark relative flex h-28 items-center justify-center overflow-hidden rounded-[18px] bg-ink text-on-dark"
    >
      {children(inView && !reduced)}
    </div>
  );
}

const loop = (play: boolean, times: number[], delay = 0) =>
  play ? { duration: LOOP, times, repeat: Infinity, delay, ease: "easeInOut" as const } : { duration: 0 };

const Tick = ({ className = "size-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={`fill-none stroke-current stroke-[3] ${className}`}>
    <path d="m5 12 5 5 9-10" />
  </svg>
);

/** Three taps light up in turn, then a tick. */
export function TapsVisual() {
  return (
    <Stage>
      {(play) => (
        <div className="flex items-center gap-3">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="grid size-9 place-items-center rounded-full border border-white/20 font-serif text-sm"
              animate={play ? { backgroundColor: ["rgba(212,161,42,0)", "rgba(212,161,42,1)", "rgba(212,161,42,1)", "rgba(212,161,42,0)"], color: ["#e8eeea", "#13221f", "#13221f", "#e8eeea"], scale: [1, 0.85, 1, 1] } : { backgroundColor: "rgba(212,161,42,1)", color: "#13221f" }}
              transition={loop(play, [0, 0.12 + i * 0.15, 0.85, 1])}
            >
              {i + 1}
            </motion.span>
          ))}
          <motion.span
            className="grid size-9 place-items-center rounded-full bg-verdigris"
            animate={play ? { scale: [0, 0, 1, 1, 0] } : { scale: 1 }}
            transition={loop(play, [0, 0.55, 0.65, 0.9, 1])}
          >
            <Tick />
          </motion.span>
        </div>
      )}
    </Stage>
  );
}

/** A buried menu path fades out; one big, friendly button gets tapped. */
export function SimpleVisual() {
  return (
    <Stage>
      {(play) => (
        <div className="relative flex flex-col items-center gap-2">
          <motion.span
            className="text-[11px] text-on-dark-muted line-through"
            animate={play ? { opacity: [1, 1, 0, 0, 1] } : { opacity: 0 }}
            transition={loop(play, [0, 0.25, 0.4, 0.9, 1])}
          >
            Settings › Advanced › Options
          </motion.span>
          <motion.span
            className="rounded-full bg-gold px-6 py-2 text-[15px] font-bold text-ink"
            animate={play ? { scale: [0.9, 0.9, 1.08, 0.94, 1.08, 1, 0.9] } : { scale: 1.08 }}
            transition={loop(play, [0, 0.3, 0.45, 0.6, 0.7, 0.9, 1])}
          >
            Pay ₹2,000
          </motion.span>
        </div>
      )}
    </Stage>
  );
}

/** "₹2,000 to Ramesh" turns into dots as the lock snaps shut. */
export function PrivateVisual() {
  return (
    <Stage>
      {(play) => (
        <div className="flex items-center gap-3">
          <span className="grid size-9 place-items-center rounded-xl bg-white/10 text-gold">
            <svg viewBox="0 0 24 24" className="size-5 fill-none stroke-current stroke-2">
              <rect x="5" y="11" width="14" height="10" rx="2" />
              <motion.path
                d="M8 11V8a4 4 0 0 1 8 0v3"
                animate={play ? { y: [-3, -3, 0, 0, -3] } : { y: 0 }}
                transition={loop(play, [0, 0.3, 0.4, 0.9, 1])}
              />
            </svg>
          </span>
          <span className="relative inline-grid font-medium">
            <motion.span
              className="col-start-1 row-start-1"
              animate={play ? { opacity: [1, 1, 0, 0, 1] } : { opacity: 0 }}
              transition={loop(play, [0, 0.3, 0.4, 0.9, 1])}
            >
              ₹2,000 to Ramesh
            </motion.span>
            <motion.span
              className="col-start-1 row-start-1 tracking-[0.2em] text-gold"
              animate={play ? { opacity: [0, 0, 1, 1, 0] } : { opacity: 1 }}
              transition={loop(play, [0, 0.3, 0.4, 0.9, 1])}
            >
              ••••••••••••
            </motion.span>
          </span>
        </div>
      )}
    </Stage>
  );
}

/** A loading bar fills almost at once, then a tick. */
export function FastVisual() {
  return (
    <Stage>
      {(play) => (
        <div className="flex w-44 items-center gap-3">
          <span className="relative h-2 flex-1 overflow-hidden rounded-full bg-white/15">
            <motion.span
              className="absolute inset-y-0 left-0 rounded-full bg-gold"
              animate={play ? { width: ["0%", "0%", "100%", "100%", "0%"] } : { width: "100%" }}
              transition={loop(play, [0, 0.2, 0.32, 0.9, 1])}
            />
          </span>
          <motion.span
            className="grid size-8 place-items-center rounded-full bg-verdigris"
            animate={play ? { scale: [0, 0, 1, 1, 0] } : { scale: 1 }}
            transition={loop(play, [0, 0.32, 0.42, 0.9, 1])}
          >
            <Tick className="size-3.5" />
          </motion.span>
        </div>
      )}
    </Stage>
  );
}
