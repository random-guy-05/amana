import { useEffect, useRef } from "react";

interface ECGPreviewProps {
  width?: number;
  height?: number;
  color?: string;
  speed?: number; // cycles per second
  amplitude?: number; // 0..1
}

export function ECGPreview({
  width = 320,
  height = 120,
  color = "var(--gold)",
  speed = 0.7,
  amplitude = 0.85,
}: ECGPreviewProps) {
  const ref = useRef<SVGSVGElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const tRef = useRef(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      return undefined;
    }

    const svg = ref.current;
    if (!svg) return undefined;

    const path = svg.querySelector("path");
    if (!path) return undefined;

    const start = performance.now();

    function ecgAt(x: number, t: number) {
      // Simple stylised ECG-like waveform: baseline sine + occasional spike (QRS-like)
      const phase = (x * 2 * Math.PI) / width - t * speed * 2 * Math.PI;
      const baseline = Math.sin(phase * 1.2) * 0.06 * amplitude;

      // Add a Gaussian spike at moving center to simulate QRS
      const spikeCenter = (t * speed * width) % width;
      const dx = x - spikeCenter;
      const spike = Math.exp(-((dx * dx) / (2 * (4 + 8 * (1 - amplitude))))) * 0.6 * amplitude;

      return baseline + spike;
    }

    function render(now: number) {
      tRef.current = (now - start) / 1000;
      const t = tRef.current;
      const samples = 200;
      let d = "";
      for (let i = 0; i <= samples; i++) {
        const x = (i / samples) * width;
        const y = height / 2 - ecgAt(x, t) * (height * 0.4);
        d += i === 0 ? `M ${x},${y}` : ` L ${x},${y}`;
      }
      path.setAttribute("d", d);
      rafRef.current = requestAnimationFrame(render);
    }

    rafRef.current = requestAnimationFrame(render);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [width, height, speed, amplitude]);

  return (
    <figure className="ecg-preview" role="img" aria-label="Animated ECG preview showing simulated cardiac waveform">
      <svg ref={ref} width={width} height={height} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id="ecgGlow" x1="0" x2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.22" />
            <stop offset="100%" stopColor={color} stopOpacity="0.06" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="transparent" />
        <path d="" stroke={color} strokeWidth={2} fill="none" strokeLinecap="round" />
        <path d="" stroke="url(#ecgGlow)" strokeWidth={12} fill="none" strokeLinecap="round" opacity="0.14" />
      </svg>
    </figure>
  );
}
