"use client";

import { clamp, greyToGold, useCanvasScene, type Point, type Scene } from "./useCanvasScene";

type Ripple = Point & { t0: number };

const RIPPLE_SPEED = 520; // px per second
const RIPPLE_LIFE = 2.6; // seconds

// A quiet dot grid that lights gold around the pointer. Ripples run out from the centre on load and from every tap.
function makeScene(): Scene {
  let w = 0;
  let h = 0;
  let gap = 24;
  let ripples: Ripple[] = [];
  const glow = { x: 0, y: 0 };

  return {
    resize(width, height) {
      w = width;
      h = height;
      gap = width < 640 ? 20 : 26;
      glow.x = w / 2;
      glow.y = h * 0.45;
      ripples = [{ x: w / 2, y: h * 0.45, t0: 0.4 }];
    },
    tap(p, t) {
      ripples.push({ ...p, t0: t });
    },
    draw(ctx, t, pointer) {
      // Without a pointer the glow drifts slowly on its own; with one, it glides after it.
      const target = pointer ?? {
        x: w / 2 + Math.cos(t * 0.25) * w * 0.32,
        y: h * 0.45 + Math.sin(t * 0.37) * h * 0.22,
      };
      glow.x += (target.x - glow.x) * 0.12;
      glow.y += (target.y - glow.y) * 0.12;
      ripples = ripples.filter((r) => t - r.t0 < RIPPLE_LIFE);

      const sigma2 = 2 * (pointer ? 110 : 150) ** 2;
      for (let y = gap / 2; y < h; y += gap)
        for (let x = gap / 2; x < w; x += gap) {
          const dg = (x - glow.x) ** 2 + (y - glow.y) ** 2;
          let b = Math.exp(-dg / sigma2) * (pointer ? 1 : 0.6);
          for (const r of ripples) {
            const age = t - r.t0;
            if (age < 0) continue;
            const ring = Math.hypot(x - r.x, y - r.y) - age * RIPPLE_SPEED;
            b += Math.exp(-(ring * ring) / 900) * 0.9 * (1 - age / RIPPLE_LIFE);
          }
          b = clamp(b);
          ctx.fillStyle = greyToGold(b, 0.13 + b * 0.8);
          const rad = 1.1 + b * 1.5;
          ctx.beginPath();
          ctx.arc(x, y, rad, 0, Math.PI * 2);
          ctx.fill();
        }
    },
  };
}

export function DotGrid({ className = "" }: { className?: string }) {
  const ref = useCanvasScene(makeScene);
  return <canvas ref={ref} aria-hidden="true" className={className} />;
}
