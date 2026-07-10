import { useEffect, useState, type RefObject } from "react";

interface SiteRefs {
  cursor: RefObject<HTMLDivElement | null>;
  progress: RefObject<HTMLSpanElement | null>;
  nav: RefObject<HTMLElement | null>;
}

const SECTION_IDS = ["research", "method", "impact", "contact"] as const;

/** Wires scroll progress, sticky nav, active-section tracking, scroll reveals and pointer spotlights. */
export function useSiteEffects({ cursor, progress, nav }: SiteRefs) {
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    const fine = window.matchMedia?.("(pointer: fine)").matches ?? false;
    const cleanups: Array<() => void> = [];

    // Scroll reveals
    const revealEls = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    if (typeof IntersectionObserver === "undefined" || reduce) {
      revealEls.forEach((el) => el.classList.add("is-in"));
    } else {
      const revealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-in");
              revealObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.16, rootMargin: "0px 0px -8% 0px" },
      );
      revealEls.forEach((el) => revealObserver.observe(el));
      cleanups.push(() => revealObserver.disconnect());
    }

    // Scroll progress + sticky nav
    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const ratio = max > 0 ? doc.scrollTop / max : 0;
      if (progress.current) progress.current.style.transform = `scaleX(${ratio})`;
      if (nav.current) nav.current.classList.toggle("is-stuck", doc.scrollTop > 12);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    cleanups.push(() => window.removeEventListener("scroll", onScroll));

    // Active section
    if (typeof IntersectionObserver !== "undefined") {
      const ratios = new Map<string, number>();
      const sectionObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => ratios.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0));
          let best = "";
          let bestRatio = 0;
          ratios.forEach((value, key) => {
            if (value > bestRatio) {
              bestRatio = value;
              best = key;
            }
          });
          if (best) setActive(best);
        },
        { threshold: [0.2, 0.5, 0.8], rootMargin: "-20% 0px -40% 0px" },
      );
      SECTION_IDS.forEach((id) => {
        const el = document.getElementById(id);
        if (el) sectionObserver.observe(el);
      });
      cleanups.push(() => sectionObserver.disconnect());
    }

    // Pointer spotlight (cursor glow + card highlights + hero parallax + monitor tilt).
    // All reads are cached and all writes are batched into a single rAF to avoid layout thrash.
    if (fine && !reduce) {
      const glow = cursor.current;
      const tilt = document.querySelector<HTMLElement>(".monitor__inner");
      const hero = document.querySelector<HTMLElement>(".hero");
      const root = document.documentElement;

      let heroRect = hero?.getBoundingClientRect() ?? null;
      const refreshRect = () => { heroRect = hero?.getBoundingClientRect() ?? null; };
      window.addEventListener("scroll", refreshRect, { passive: true });
      window.addEventListener("resize", refreshRect);
      cleanups.push(() => window.removeEventListener("scroll", refreshRect));
      cleanups.push(() => window.removeEventListener("resize", refreshRect));

      let px = 0;
      let py = 0;
      let frame = 0;
      const apply = () => {
        frame = 0;
        if (glow) {
          glow.style.transform = `translate3d(${px}px, ${py}px, 0)`;
          glow.classList.add("is-active");
        }
        root.style.setProperty("--px", (px / window.innerWidth - 0.5).toFixed(3));
        root.style.setProperty("--py", (py / window.innerHeight - 0.5).toFixed(3));
        if (tilt && heroRect) {
          if (py <= heroRect.bottom) {
            const mx = (px - (heroRect.left + heroRect.width / 2)) / heroRect.width;
            const my = (py - (heroRect.top + heroRect.height / 2)) / heroRect.height;
            tilt.style.transform = `perspective(1000px) rotateY(${(mx * 7).toFixed(2)}deg) rotateX(${(-my * 7).toFixed(2)}deg)`;
          } else {
            tilt.style.transform = "";
          }
        }
      };
      const onPointerMove = (event: PointerEvent) => {
        px = event.clientX;
        py = event.clientY;
        if (!frame) frame = requestAnimationFrame(apply);
      };
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      cleanups.push(() => {
        window.removeEventListener("pointermove", onPointerMove);
        if (frame) cancelAnimationFrame(frame);
      });

      // Per-card highlight position, computed from the card's own offset (no rect reads on move).
      const spotlights = Array.from(document.querySelectorAll<HTMLElement>(".work__item, .card"));
      const localMoves = spotlights.map((el) => {
        const handler = (event: PointerEvent) => {
          el.style.setProperty("--mx", `${event.offsetX}px`);
          el.style.setProperty("--my", `${event.offsetY}px`);
        };
        el.addEventListener("pointermove", handler, { passive: true });
        return () => el.removeEventListener("pointermove", handler);
      });
      cleanups.push(() => localMoves.forEach((fn) => fn()));
    }

    return () => cleanups.forEach((fn) => fn());
  }, [cursor, progress, nav]);

  return active;
}
