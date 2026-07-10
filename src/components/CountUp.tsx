import { useEffect, useRef, useState } from "react";

interface CountUpProps {
  value: string;
  duration?: number;
}

const PARTS = /^(\D*)([\d,]*\.?\d+)(.*)$/s;

/** Animates the numeric portion of a label (e.g. "$100K+", "1,470") from zero when scrolled into view. */
export function CountUp({ value, duration = 1500 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const node = ref.current;
    const match = value.match(PARTS);
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    if (!node || !match || reduce || typeof IntersectionObserver === "undefined" || typeof requestAnimationFrame === "undefined") {
      setDisplay(value);
      return undefined;
    }

    const [, prefix, numberStr, suffix] = match;
    const target = Number(numberStr.replace(/,/g, ""));
    const hasComma = numberStr.includes(",");
    const decimals = numberStr.includes(".") ? numberStr.split(".")[1].length : 0;

    const format = (n: number) => {
      const fixed = n.toFixed(decimals);
      const rendered = hasComma ? Number(fixed).toLocaleString("en-US", { minimumFractionDigits: decimals }) : fixed;
      return `${prefix}${rendered}${suffix}`;
    };

    setDisplay(format(0));

    let raf = 0;
    let start = 0;
    const run = () => {
      const observer = new IntersectionObserver(
        (entries) => {
          if (!entries[0].isIntersecting) return;
          observer.disconnect();
          const step = (now: number) => {
            if (!start) start = now;
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setDisplay(format(target * eased));
            if (progress < 1) raf = requestAnimationFrame(step);
          };
          raf = requestAnimationFrame(step);
        },
        { threshold: 0.4 },
      );
      observer.observe(node);
      return observer;
    };

    const observer = run();
    return () => {
      observer.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [value, duration]);

  return <span ref={ref}>{display}</span>;
}
