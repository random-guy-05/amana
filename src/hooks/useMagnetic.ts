import { useEffect, useRef } from "react";

/**
 * Pulls an element toward the pointer for a subtle magnetic hover.
 * No-ops on touch devices and when reduced motion is requested.
 */
export function useMagnetic<T extends HTMLElement>(strength = 0.28) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof window === "undefined") return undefined;

    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia?.("(pointer: fine)").matches;
    if (reduce || !fine) return undefined;

    function move(event: PointerEvent) {
      const rect = el!.getBoundingClientRect();
      const x = event.clientX - (rect.left + rect.width / 2);
      const y = event.clientY - (rect.top + rect.height / 2);
      el!.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
    }

    function reset() {
      el!.style.transform = "";
    }

    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", reset);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", reset);
    };
  }, [strength]);

  return ref;
}
