import {
  MotionConfig,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import {
  ClipUp,
  CountUp,
  Reveal,
  ScopeTrace,
  ease,
  useHeroScroll,
} from "./components/motion";
import { cases, hack, site, ticker } from "./data/content";

function useLenis(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 1.35,
    });
    let id = 0;
    const loop = (t: number) => {
      lenis.raf(t);
      id = requestAnimationFrame(loop);
    };
    id = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(id);
      lenis.destroy();
    };
  }, [enabled]);
}

function Ticker({ enabled }: { enabled: boolean }) {
  const row = [...ticker, ...ticker, ...ticker];
  return (
    <div className="ticker-wrap">
      <div className="ticker" aria-hidden="true">
        <motion.div
          className="ticker-track"
          animate={enabled ? { x: ["0%", "-33.333%"] } : { x: "0%" }}
          transition={enabled ? { duration: 36, ease: "linear", repeat: Infinity } : undefined}
        >
          {row.map((t, i) => (
            <span key={`${t}-${i}`}>
              {t}
              <i />
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

function CaseRail({ motionEnabled }: { motionEnabled: boolean }) {
  const section = useRef<HTMLElement>(null);
  const mask = useRef<HTMLDivElement>(null);
  const rail = useRef<HTMLDivElement>(null);
  const [travel, setTravel] = useState(0);
  const { scrollYProgress } = useScroll({
    target: section,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, -travel]);

  useEffect(() => {
    const updateTravel = () => {
      if (!mask.current || !rail.current) return;
      setTravel(Math.max(0, rail.current.scrollWidth - mask.current.clientWidth));
    };

    updateTravel();
    const observer = new ResizeObserver(updateTravel);
    if (mask.current) observer.observe(mask.current);
    if (rail.current) observer.observe(rail.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="cases" id="work" ref={section}>
      <div className="cases-sticky">
        <div className="cases-intro">
          <p className="mono accent">Research</p>
          <h2>Selected research projects.</h2>
          <p className="mono dim cases-hint">Scroll to explore →</p>
        </div>

        <div className="cases-mask" ref={mask}>
          <motion.div ref={rail} className="cases-rail" style={motionEnabled ? { x } : undefined}>
            {cases.map((c, i) => (
              <motion.article
                className="case"
                key={c.code}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ delay: i * 0.04, duration: 0.7, ease }}
              >
                <header>
                  <span className="mono accent">{c.code}</span>
                  <span className="mono dim">{c.when}</span>
                </header>
                <p className="case-where">
                  {c.role} · {c.where}
                </p>
                <h3>{c.title}</h3>
                <p className="case-blurb">{c.blurb}</p>
                <ul className="case-points">
                  {c.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
                <ul className="case-stack">
                  {c.stack.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
                <span className="case-index mono dim">
                  {String(i + 1).padStart(2, "0")} /{" "}
                  {String(cases.length).padStart(2, "0")}
                </span>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { y, opacity } = useHeroScroll(ref);

  return (
    <section className="hero" ref={ref} aria-labelledby="name">
      <motion.div style={{ y, opacity }} className="hero-inner">
        <div className="hero-top">
          <p className="mono dim">{site.place}</p>
          <p className="mono dim">Clinical AI Research</p>
        </div>

        <div className="hero-main">
          <h1 id="name">
            <ClipUp delay={0.12}>Arnav</ClipUp>
            <ClipUp delay={0.28} className="name-b">
              Mana
            </ClipUp>
          </h1>
          <div className="hero-scope" aria-hidden="true">
            <ScopeTrace />
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default function App() {
  const prefersReducedMotion = useReducedMotion();
  const motionEnabled = !prefersReducedMotion;
  useLenis(motionEnabled);
  const { scrollYProgress } = useScroll();
  const bar = useSpring(scrollYProgress, { stiffness: 90, damping: 28 });

  useEffect(() => {
    document.documentElement.classList.toggle("motion-off", !motionEnabled);
    return () => document.documentElement.classList.remove("motion-off");
  }, [motionEnabled]);

  return (
    <MotionConfig reducedMotion="user">
      <motion.div className="bar" style={{ scaleX: bar }} aria-hidden="true" />

      <header className="nav">
        <a href="#top" className="logo">
          {site.monogram}
        </a>
        <nav aria-label="Primary navigation">
          <a href="#work">Research</a>
          <a href="#hack">Leadership</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main id="top">
        <Hero />
        <Ticker enabled={motionEnabled} />
        <CaseRail motionEnabled={motionEnabled} />

        <section className="hack" id="hack">
          <Reveal className="hack-eyebrow">
            <p className="mono accent">Leadership</p>
            <p className="mono hack-when">{hack.when}</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2>
              Hack<em>4</em>Health
            </h2>
          </Reveal>
          <Reveal className="hack-grid" delay={0.1}>
            <p className="hack-line">{hack.line}</p>
            <p className="hack-detail">{hack.detail}</p>
          </Reveal>
          <div className="hack-stats">
            {hack.stats.map((s, i) => (
              <Reveal key={s.s} delay={0.08 + i * 0.07} className="hack-stat">
                <p className="n">
                  <CountUp value={s.n} />
                </p>
                <p className="s">{s.s}</p>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="contact" id="contact">
          <Reveal className="contact-eyebrow">
            <p className="mono accent">Contact</p>
            <p className="mono dim">Open to collaboration</p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2>
              Let&apos;s build better
              <br />
              <em>healthcare.</em>
            </h2>
          </Reveal>
          <Reveal className="contact-actions" delay={0.12}>
            <a className="mailto" href={`mailto:${site.email}`}>
              <span>{site.email}</span>
              <span aria-hidden="true">↗</span>
            </a>
            <div className="contact-meta">
              <a href={site.phoneHref}>{site.phone}</a>
              <a href={site.resume} target="_blank" rel="noreferrer">
                View résumé ↗
              </a>
            </div>
          </Reveal>
        </section>

        <footer className="foot">
          <span className="mono">© 2026</span>
          <span className="mono">{site.name}</span>
        </footer>
      </main>
    </MotionConfig>
  );
}
