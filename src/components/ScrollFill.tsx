import { useEffect, useRef, type CSSProperties } from "react";

interface ScrollFillProps {
  text: string;
  className?: string;
}

interface Word {
  text: string;
  gold: boolean;
}

/** Splits text into words, marking segments wrapped in **double asterisks** as gold. */
function tokenize(text: string): Word[] {
  const words: Word[] = [];
  text.split("**").forEach((part, segment) => {
    const gold = segment % 2 === 1;
    part
      .split(/\s+/)
      .filter(Boolean)
      .forEach((word) => words.push({ text: word, gold }));
  });
  return words;
}

/** Big editorial line whose words illuminate from faint to bright as the block scrolls through the viewport. */
export function ScrollFill({ text, className }: ScrollFillProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const words = tokenize(text);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof window === "undefined") return undefined;

    const spans = Array.from(el.querySelectorAll<HTMLElement>(".w"));
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce || typeof requestAnimationFrame === "undefined") {
      spans.forEach((span) => span.style.setProperty("--wp", "1"));
      return undefined;
    }

    const feather = 7;
    let raf = 0;

    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const progress = Math.min(Math.max((vh * 0.82 - rect.top) / (vh * 0.55), 0), 1);
      const head = progress * (spans.length + feather);
      spans.forEach((span, index) => {
        const wp = Math.min(Math.max((head - index) / feather, 0), 1);
        span.style.setProperty("--wp", wp.toFixed(3));
      });
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [text]);

  return (
    <p ref={ref} className={`fill${className ? ` ${className}` : ""}`}>
      {words.map((word, index) => (
        <span
          className={`w${word.gold ? " w--gold" : ""}`}
          key={`${word.text}-${index}`}
          style={{ ["--wp" as string]: "0" } as CSSProperties}
        >
          {word.text}
        </span>
      ))}
    </p>
  );
}
