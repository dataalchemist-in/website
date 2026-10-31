"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";

export type WorkflowStep = { caption: string; ms: number; screen: ReactNode };

/**
 * A looping, phone-sized walkthrough of an app's core flow, drawn in code.
 * Plays only while on screen; under reduced motion it stays on the chosen step.
 */
export function Workflow({ label, steps }: { label: string; steps: WorkflowStep[] }) {
  const [step, setStep] = useState(0);
  const [onScreen, setOnScreen] = useState(false);
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const playing = onScreen && !reduced;
  const ms = steps[step].ms;
  const count = steps.length;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setOnScreen(e.isIntersecting), { threshold: 0.5 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!playing) return;
    const t = setTimeout(() => setStep((s) => (s + 1) % count), ms);
    return () => clearTimeout(t);
  }, [playing, step, ms, count]);

  return (
    <figure ref={ref} aria-label={label} className="flex w-full flex-col items-center gap-3">
      <div className="w-full max-w-[236px] rounded-[36px] border border-white/15 bg-[#0b1513] p-2.5 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.7)]">
        <div className="relative h-[390px] overflow-hidden rounded-[28px] bg-surface text-ink">
          <div aria-hidden="true" className="absolute top-2 left-1/2 z-10 h-4 w-16 -translate-x-1/2 rounded-full bg-[#0b1513]" />
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 28 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -28 }}
              transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
              className="absolute inset-0 flex flex-col gap-3 px-3.5 pt-9 pb-4 text-[13px]/[1.35]"
            >
              {steps[step].screen}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <figcaption className="flex w-full max-w-[300px] flex-col gap-1">
        <div className="flex gap-1.5">
          {steps.map((s, i) => (
            <button
              key={s.caption}
              type="button"
              onClick={() => setStep(i)}
              aria-label={`Step ${i + 1}: ${s.caption}`}
              aria-current={i === step}
              className="flex min-h-11 flex-1 items-center focus-visible:outline-2 focus-visible:outline-gold"
            >
              <span className="relative block h-1 w-full overflow-hidden rounded-full bg-white/15">
                {i < step && <span className="absolute inset-0 bg-gold" />}
                {i === step && (
                  <span
                    key={step}
                    className="carousel-fill absolute inset-y-0 left-0 bg-gold"
                    style={{ animationDuration: `${ms}ms`, animationPlayState: playing ? "running" : "paused" }}
                  />
                )}
              </span>
            </button>
          ))}
        </div>
        <p className="text-center text-sm text-on-dark-muted" aria-live="polite">
          <span className="text-on-dark">{step + 1}.</span> {steps[step].caption}
        </p>
      </figcaption>
    </figure>
  );
}

/* Small building blocks for the phone screens. */

export function ScreenTitle({ children, sub }: { children: ReactNode; sub?: ReactNode }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="font-serif text-[19px]/[1.15]">{children}</span>
      {sub && <span className="text-[12px] text-muted-soft">{sub}</span>}
    </div>
  );
}

/** Text that types itself in, one character at a time. */
export function Typed({ text, delay = 0, speed = 0.08 }: { text: string; delay?: number; speed?: number }) {
  return (
    <span aria-label={text}>
      {text.split("").map((ch, i) => (
        <motion.span
          key={i}
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay + i * speed, duration: 0.01 }}
        >
          {ch}
        </motion.span>
      ))}
    </span>
  );
}

export function Appear({
  delay = 0,
  className = "",
  children,
}: {
  delay?: number;
  className?: string;
  children: ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** A finger tap: a soft circle that pulses once at the given moment. */
export function Tap({ delay }: { delay: number }) {
  return (
    <motion.span
      aria-hidden="true"
      className="pointer-events-none absolute top-1/2 left-1/2 size-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink/25"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: [0, 1, 1.4], opacity: [0, 0.8, 0] }}
      transition={{ delay, duration: 0.6 }}
    />
  );
}

export function Search({ text, delay = 0.3 }: { text: string; delay?: number }) {
  return (
    <div className="flex items-center gap-2 rounded-xl border border-line bg-ground px-3 py-2">
      <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4 shrink-0 fill-none stroke-muted-soft stroke-2">
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-4-4" />
      </svg>
      <Typed text={text} delay={delay} />
      <motion.span
        aria-hidden="true"
        className="-ml-1 h-4 w-px bg-ink"
        animate={{ opacity: [1, 0, 1] }}
        transition={{ repeat: Infinity, duration: 1 }}
      />
    </div>
  );
}
