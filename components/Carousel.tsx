"use client";

import { useReducedMotion } from "motion/react";
import { Children, useEffect, useRef, useState, type ReactNode } from "react";

// Long enough for each app walkthrough (Kipsa's is about 16s) to play once.
const SLIDE_SECONDS = 17;

/**
 * Horizontal, swipeable carousel that advances on its own.
 * It pauses while the visitor hovers, touches or focuses it, while it is off screen,
 * and never auto-advances under reduced motion.
 */
export function Carousel({ label, names, children }: { label: string; names: string[]; children: ReactNode }) {
  const track = useRef<HTMLDivElement>(null);
  const slides = Children.toArray(children);
  const [index, setIndex] = useState(0);
  const [held, setHeld] = useState(false);
  const [onScreen, setOnScreen] = useState(false);
  const reduced = useReducedMotion();
  const running = !reduced && !held && onScreen;

  const go = (i: number) => {
    const el = track.current;
    const slide = el?.children[(i + slides.length) % slides.length] as HTMLElement | undefined;
    if (!el || !slide) return;
    el.scrollTo({
      left: slide.offsetLeft - (el.clientWidth - slide.clientWidth) / 2,
      behavior: reduced ? "auto" : "smooth",
    });
  };

  // The current slide is the one whose centre is nearest the track's centre.
  const onScroll = () => {
    const el = track.current;
    if (!el) return;
    const mid = el.scrollLeft + el.clientWidth / 2;
    let best = 0;
    Array.from(el.children).forEach((c, i) => {
      const s = c as HTMLElement;
      const best0 = el.children[best] as HTMLElement;
      if (Math.abs(s.offsetLeft + s.clientWidth / 2 - mid) < Math.abs(best0.offsetLeft + best0.clientWidth / 2 - mid))
        best = i;
    });
    setIndex(best);
  };

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setOnScreen(e.isIntersecting), { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const arrow =
    "grid size-11 place-items-center rounded-full border border-line bg-ground text-ink transition hover:bg-ink hover:text-ground focus-visible:outline-2 focus-visible:outline-verdigris";

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      className="flex flex-col gap-6"
      onPointerEnter={(e) => e.pointerType === "mouse" && setHeld(true)}
      onPointerLeave={() => setHeld(false)}
      onTouchStart={() => setHeld(true)}
      onFocus={() => setHeld(true)}
      onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setHeld(false)}
    >
      <div
        ref={track}
        onScroll={onScroll}
        className="-mx-6 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-6 pb-2 [scrollbar-width:none] motion-reduce:scroll-auto [&::-webkit-scrollbar]:hidden"
      >
        {slides.map((slide, i) => (
          <div
            key={i}
            role="group"
            aria-roledescription="slide"
            aria-label={`${names[i]}, ${i + 1} of ${slides.length}`}
            className="flex w-[min(100%,1100px)] shrink-0 snap-center"
          >
            {slide}
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => go(i)}
              aria-label={`Show ${names[i]}`}
              aria-current={i === index}
              className="group grid min-h-11 place-items-center px-1 focus-visible:outline-2 focus-visible:outline-verdigris"
            >
              <span
                className={`relative block h-2 overflow-hidden rounded-full transition-all duration-300 ${
                  i === index ? "w-14 bg-line" : "w-2 bg-chip-line group-hover:bg-muted"
                }`}
              >
                {i === index && (
                  <span
                    // Restart the fill whenever the slide changes; when it ends, move on.
                    key={`${index}`}
                    className="carousel-fill absolute inset-y-0 left-0 rounded-full bg-verdigris"
                    style={{
                      animationDuration: `${SLIDE_SECONDS}s`,
                      animationPlayState: running ? "running" : "paused",
                    }}
                    onAnimationEnd={() => go(index + 1)}
                  />
                )}
              </span>
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={() => go(index - 1)} aria-label="Previous app" className={arrow}>
            <span aria-hidden="true">←</span>
          </button>
          <button type="button" onClick={() => go(index + 1)} aria-label="Next app" className={arrow}>
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>
    </div>
  );
}
