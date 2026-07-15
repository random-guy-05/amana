import {
  motion,
  useInView,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useEffect, useRef, useState, type ReactNode, type RefObject } from "react";

export const ease = [0.19, 1, 0.22, 1] as const;

export function ClipUp({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <span className={`clip ${className ?? ""}`}>
      <motion.span
        className="clip-i"
        initial={{ y: "110%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 1.1, delay, ease }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export function Reveal({
  children,
  className,
  delay = 0,
  y = 36,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.8, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

export function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const numeric = parseFloat(value.replace(/[^0-9.]/g, "")) || 0;
  const hasDollar = value.includes("$");
  const suffix = value.replace(/[$\d.,]/g, "");
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 80, damping: 22 });
  const [display, setDisplay] = useState(
    `${hasDollar ? "$" : ""}0${suffix}`,
  );

  useEffect(() => {
    if (inView) mv.set(numeric);
  }, [inView, mv, numeric]);

  useEffect(() => {
    return spring.on("change", (v) => {
      setDisplay(
        `${hasDollar ? "$" : ""}${Math.round(v).toLocaleString()}${suffix}`,
      );
    });
  }, [spring, hasDollar, suffix]);

  return <span ref={ref}>{display}</span>;
}

export function useHeroScroll(ref: RefObject<HTMLElement | null>) {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  return { y, opacity };
}

/** SVG line that draws like a scope trace */
export function ScopeTrace() {
  return (
    <svg className="scope" viewBox="0 0 1200 120" preserveAspectRatio="none" aria-hidden="true">
      <motion.path
        d="M0 60 C80 60 100 20 160 20 C220 20 240 100 300 100 C360 100 380 40 440 40 C500 40 520 80 580 80 C640 80 660 15 720 15 C780 15 800 95 860 95 C920 95 940 50 1000 50 C1060 50 1080 70 1140 70 C1170 70 1185 60 1200 60"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.9 }}
        transition={{ duration: 2.2, delay: 0.5, ease }}
      />
    </svg>
  );
}
