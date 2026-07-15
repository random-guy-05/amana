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

const ECG_PATH =
  "M0 120 L70 120 C82 120 88 105 100 105 C112 105 120 120 136 120 L168 120 L180 130 L192 42 L205 188 L222 120 L270 120 C288 120 298 84 324 84 C350 84 360 120 386 120 L470 120 C482 120 488 105 500 105 C512 105 520 120 536 120 L568 120 L580 130 L592 42 L605 188 L622 120 L670 120 C688 120 698 84 724 84 C750 84 760 120 786 120 L870 120 C882 120 888 105 900 105 C912 105 920 120 936 120 L968 120 L980 130 L992 42 L1005 188 L1022 120 L1070 120 C1088 120 1098 84 1124 84 C1150 84 1160 120 1186 120 L1200 120";

/** Full-width P-QRS-T rhythm with a continuously looping monitor sweep */
export function ScopeTrace() {
  return (
    <svg className="scope" viewBox="0 0 1200 240" preserveAspectRatio="none" aria-hidden="true">
      <path
        className="scope-ghost"
        d={ECG_PATH}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
      <motion.path
        className="scope-live"
        d={ECG_PATH}
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: [0, 1, 1], opacity: [0.35, 1, 0] }}
        transition={{
          duration: 4.6,
          times: [0, 0.8, 1],
          repeat: Infinity,
          repeatDelay: 0.2,
          ease: "linear",
        }}
      />
    </svg>
  );
}
