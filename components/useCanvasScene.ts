"use client";

import { useEffect, useRef } from "react";

export type Point = { x: number; y: number };

/** A canvas animation: sized on resize, drawn every frame with seconds since mount. */
export type Scene = {
  resize(w: number, h: number): void;
  draw(ctx: CanvasRenderingContext2D, t: number, pointer: Point | null): void;
  tap?(p: Point, t: number): void;
};

// Reduced motion draws one frame this far in, after every intro has finished.
const SETTLED_AT = 30;

/**
 * Runs a Scene on a canvas. Pointer and taps are read from the canvas's parent,
 * so they still work while the pointer is over text laid on top of the canvas.
 */
export function useCanvasScene(makeScene: () => Scene) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const host = canvas?.parentElement;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !host || !ctx) return;

    const scene = makeScene();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const start = performance.now();
    const now = () => (performance.now() - start) / 1000;
    let w = 0;
    let h = 0;
    let pointer: Point | null = null;
    let raf = 0;
    let visible = false;

    const local = (e: PointerEvent): Point => {
      const r = canvas.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    const draw = (t: number) => {
      if (!w || !h) return;
      ctx.clearRect(0, 0, w, h);
      scene.draw(ctx, t, pointer);
    };
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      scene.resize(w, h);
      if (reduced) draw(SETTLED_AT);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    if (reduced) return () => ro.disconnect();

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "mouse") pointer = local(e);
    };
    const onLeave = () => (pointer = null);
    const onDown = (e: PointerEvent) => scene.tap?.(local(e), now());
    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerleave", onLeave);
    host.addEventListener("pointerdown", onDown);

    const loop = () => {
      draw(now());
      if (visible) raf = requestAnimationFrame(loop);
    };
    // Stop drawing while the hero is scrolled out of view.
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible) raf = requestAnimationFrame(loop);
    });
    io.observe(canvas);

    return () => {
      ro.disconnect();
      io.disconnect();
      cancelAnimationFrame(raf);
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
      host.removeEventListener("pointerdown", onDown);
    };
  }, [makeScene]);

  return ref;
}

export const clamp = (v: number, lo = 0, hi = 1) => Math.max(lo, Math.min(hi, v));
export const easeInOut = (k: number) => (k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2);

const GREY = [232, 238, 234];
const GOLD = [212, 161, 42];
/** Brand grey-green at k = 0, gold at k = 1. */
export const greyToGold = (k: number, alpha: number) =>
  `rgba(${GREY.map((v, i) => Math.round(v + (GOLD[i] - v) * k)).join(",")},${alpha})`;
