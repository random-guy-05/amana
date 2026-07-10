import { useEffect, useRef } from "react";

interface VelocityMarqueeProps {
  items: string[];
}

/** Two opposing marquee rows whose speed and skew react to scroll velocity. */
export function VelocityMarquee({ items }: VelocityMarqueeProps) {
  const rowA = useRef<HTMLDivElement>(null);
  const rowB = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const rows = [rowA.current, rowB.current];
    if (rows.some((row) => !row) || typeof window === "undefined") return undefined;

    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce || typeof requestAnimationFrame === "undefined") return undefined;

    const dirs = [-1, 1];
    const halves = rows.map((row) => (row ? row.scrollWidth / 2 : 0));
    const xs = [0, -halves[1]];
    let velocity = 0;
    let lastY = window.scrollY;
    let raf = 0;

    const measure = () => {
      rows.forEach((row, i) => {
        if (row) halves[i] = row.scrollWidth / 2;
      });
      if (xs[1] === 0) xs[1] = -halves[1];
    };
    if (document.fonts?.ready) document.fonts.ready.then(measure);
    window.addEventListener("resize", measure);

    const onScroll = () => {
      const y = window.scrollY;
      velocity = y - lastY;
      lastY = y;
    };

    const tick = () => {
      velocity *= 0.9;
      const skew = Math.max(-9, Math.min(9, velocity * -0.35));
      rows.forEach((row, i) => {
        if (!row) return;
        const speed = 0.55 + Math.min(Math.abs(velocity) * 0.35, 22);
        xs[i] += dirs[i] * speed;
        if (xs[i] <= -halves[i]) xs[i] += halves[i];
        if (xs[i] >= 0) xs[i] -= halves[i];
        row.style.transform = `translateX(${xs[i].toFixed(2)}px) skewX(${skew.toFixed(2)}deg)`;
      });
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [items]);

  const loop = [...items, ...items];

  return (
    <div className="vband" aria-hidden="true">
      <div className="vband__row" ref={rowA}>
        {loop.map((item, index) => (
          <span className="vword" key={`a-${item}-${index}`}>{item}<i>✦</i></span>
        ))}
      </div>
      <div className="vband__row vband__row--alt" ref={rowB}>
        {loop.map((item, index) => (
          <span className="vword" key={`b-${item}-${index}`}>{item}<i>✦</i></span>
        ))}
      </div>
    </div>
  );
}
