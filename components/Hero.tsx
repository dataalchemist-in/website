"use client";

import { motion } from "motion/react";
import { DotGrid } from "./DotGrid";

const headline = "Simple apps for everyday India.".split(" ");
const ease = [0.2, 0.8, 0.2, 1] as const;

export function Hero() {
  return (
    <section
      id="top"
      className="relative isolate flex min-h-[max(100svh,720px)] flex-col overflow-hidden bg-ink text-on-dark"
    >
      <DotGrid className="absolute inset-0 -z-10 size-full" />
      {/* Darken the centre so the headline stays readable over the dots. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_55%_40%_at_50%_46%,rgba(19,34,31,0.85),transparent_75%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-ink to-transparent"
      />

      <div className="mx-auto flex w-full max-w-[920px] flex-1 flex-col items-center justify-center gap-7 px-6 pt-36 pb-16 text-center sm:pt-40 [&_a:focus-visible]:outline-gold">
        <motion.a
          href="#products"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="banner-border group/banner rounded-full p-px no-underline shadow-[0_0_24px_rgba(212,161,42,0.18)]"
        >
          <span className="flex min-h-11 items-center gap-2.5 rounded-full bg-ink/90 px-4 py-1.5 text-left text-[15px] backdrop-blur">
            <span className="relative flex size-2 shrink-0" aria-hidden="true">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-gold opacity-70 motion-reduce:animate-none" />
              <span className="relative inline-flex size-2 rounded-full bg-gold" />
            </span>
            <span className="text-shine-soft">Coming soon: Bookshaw and Kipsa</span>
            <span
              aria-hidden="true"
              className="text-on-dark-muted transition-transform group-hover/banner:translate-x-1 group-hover/banner:text-on-dark"
            >
              →
            </span>
          </span>
        </motion.a>

        <h1 className="font-serif text-display font-normal">
          {headline.map((word, i) => (
            <motion.span
              key={i}
              className={`inline-block ${i >= headline.length - 2 ? "text-shine" : ""}`}
              initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.8, delay: 0.1 + i * 0.08, ease }}
            >
              {word}
              {i < headline.length - 1 && " "}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease }}
          className="max-w-[32em] text-[20px] text-on-dark-muted"
        >
          No queues. No paper. No stress. Just apps that do the boring work for you.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.75, ease }}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href="#products"
            className="inline-flex min-h-12 items-center gap-2 rounded-full bg-on-dark px-6 font-medium text-ink no-underline shadow-[0_0_0_4px_rgba(212,161,42,0.15),0_10px_30px_rgba(212,161,42,0.25)] transition hover:-translate-y-0.5 hover:bg-white hover:text-ink"
          >
            See our products
            <span aria-hidden="true">→</span>
          </a>
          <a
            href="#contact"
            className="inline-flex min-h-12 items-center rounded-full border border-white/20 bg-ink/40 px-6 font-medium text-on-dark no-underline backdrop-blur transition hover:bg-white/10 hover:text-on-dark"
          >
            Get in touch
          </a>
        </motion.div>
      </div>

    </section>
  );
}
