import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Toast } from "./components/Toast";
import { CountUp } from "./components/CountUp";
import { ScrollFill } from "./components/ScrollFill";
import { VelocityMarquee } from "./components/VelocityMarquee";
import { siteContent } from "./data/siteContent";
import { useCopyToClipboard } from "./hooks/useCopyToClipboard";
import { useMagnetic } from "./hooks/useMagnetic";
import { useSiteEffects } from "./hooks/useSiteEffects";

const navigation = [
  ["Research", "research"],
  ["Approach", "method"],
  ["Impact", "impact"],
  ["Contact", "contact"],
] as const;

const disciplines = [
  "Cardiogenic shock",
  "Graph attention",
  "Continuous physiology",
  "Translational biology",
  "Outcomes analysis",
  "Time-series modeling",
  "Interpretability",
];

const stagger = (index: number): CSSProperties => ({ ["--rd" as string]: `${index * 90}ms` } as CSSProperties);

function Letters({ text, start }: { text: string; start: number }) {
  return (
    <>
      {Array.from(text).map((char, index) => (
        <span className="char" key={index} style={{ ["--i" as string]: start + index } as CSSProperties}>
          <span>{char}</span>
        </span>
      ))}
    </>
  );
}

function ecgPath(width = 320, height = 150) {
  const mid = height * 0.6;
  const cycles = 3;
  const cw = width / cycles;
  let d = `M0 ${mid.toFixed(1)}`;
  for (let i = 0; i < cycles; i += 1) {
    const x = i * cw;
    const px = (f: number) => (x + cw * f).toFixed(1);
    d += ` L${px(0.12)} ${mid.toFixed(1)}`;
    d += ` Q${px(0.16)} ${(mid - height * 0.1).toFixed(1)} ${px(0.2)} ${mid.toFixed(1)}`;
    d += ` L${px(0.32)} ${mid.toFixed(1)}`;
    d += ` L${px(0.35)} ${(mid + height * 0.07).toFixed(1)}`;
    d += ` L${px(0.4)} ${(mid - height * 0.42).toFixed(1)}`;
    d += ` L${px(0.45)} ${(mid + height * 0.22).toFixed(1)}`;
    d += ` L${px(0.5)} ${mid.toFixed(1)}`;
    d += ` L${px(0.62)} ${mid.toFixed(1)}`;
    d += ` Q${px(0.7)} ${(mid - height * 0.17).toFixed(1)} ${px(0.78)} ${mid.toFixed(1)}`;
    d += ` L${px(1)} ${mid.toFixed(1)}`;
  }
  return d;
}

const TRACE = ecgPath();

export default function App() {
  const { copied, copy, clear } = useCopyToClipboard();
  const [menuOpen, setMenuOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const cursorRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const heroCta = useMagnetic<HTMLAnchorElement>();
  const footCta = useMagnetic<HTMLAnchorElement>();

  const active = useSiteEffects({ cursor: cursorRef, progress: progressRef, nav: navRef });

  useEffect(() => {
    document.title = `${siteContent.name} — ${siteContent.title}`;
  }, []);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setLoaded(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!copied) return undefined;
    const timeout = window.setTimeout(clear, 2400);
    return () => window.clearTimeout(timeout);
  }, [clear, copied]);

  function closeMenu() {
    setMenuOpen(false);
  }

  async function copyEmail() {
    await copy(siteContent.email, "Email copied to clipboard");
  }

  return (
    <div className={`shell${loaded ? " is-loaded" : ""}`}>
      <div className="ambient" aria-hidden="true">
        <span className="ambient__grid" />
        <span className="ambient__glow ambient__glow--a" />
        <span className="ambient__glow ambient__glow--b" />
      </div>
      <div className="grain" aria-hidden="true" />
      <div className="cursor-glow" ref={cursorRef} aria-hidden="true" />
      <div className="progress" aria-hidden="true"><span className="progress__bar" ref={progressRef} /></div>

      <Toast message={copied} />

      <header className="nav" ref={navRef}>
        <div className="nav__inner">
          <a className="brand" href="#top" aria-label={`${siteContent.name} — home`}>
            <span className="brand__mark" aria-hidden="true">AM</span>
            <span className="brand__name"><b>Arnav Mana</b> <span>/ Clinical AI</span></span>
          </a>

          <nav className="nav__links" aria-label="Primary">
            {navigation.map(([label, id]) => (
              <a href={`#${id}`} key={id} className={active === id ? "is-active" : ""}>{label}</a>
            ))}
          </nav>

          <div className="nav__end">
            <span className="pill"><span className="dot" aria-hidden="true" />Open to research roles</span>
            <a className="nav__contact" href={`mailto:${siteContent.email}`}>Get in touch <span aria-hidden="true">&#8594;</span></a>
            <button
              className={`burger${menuOpen ? " is-open" : ""}`}
              type="button"
              aria-label={menuOpen ? "Close navigation" : "Open navigation"}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
        {menuOpen && (
          <nav className="mobile-nav" id="mobile-navigation" aria-label="Mobile navigation">
            {navigation.map(([label, id], index) => (
              <a href={`#${id}`} key={id} onClick={closeMenu}>{label}<span>0{index + 1}</span></a>
            ))}
            <a href={`mailto:${siteContent.email}`} onClick={closeMenu}>Get in touch<span>&#8594;</span></a>
          </nav>
        )}
      </header>

      <main>
        <section className="hero wrap" id="top" aria-labelledby="hero-title">
          <div className="hero__grid">
            <div className="hero__lead">
              <p className="eyebrow rise rise-1"><span className="dot" aria-hidden="true" />Clinical AI · Cardiac critical care</p>
              <h1 id="hero-title" className="hero__name" aria-label="Arnav Mana">
                <span className="hero__word"><Letters text="Arnav" start={0} /></span>
                <span className="hero__word hero__word--accent"><Letters text="Mana" start={6} /></span>
              </h1>
              <p className="hero__tag rise rise-3">Making clinical signals <em>easier to act on.</em></p>
              <p className="hero__body rise rise-4">{siteContent.introduction}</p>
              <div className="hero__actions rise rise-5">
                <a className="btn btn--primary" href="#research" ref={heroCta}>Explore the work <span className="arrow" aria-hidden="true">&#8594;</span></a>
                <button className="btn btn--ghost" type="button" onClick={copyEmail}>Copy email</button>
              </div>
              <div className="hero__meta rise rise-6">
                <span>UCSF × CU Anschutz</span>
                <span>Clinical AI / Translational biology</span>
              </div>
            </div>

            <aside className="monitor rise rise-4" aria-label="Live research signal">
              <div className="monitor__inner">
                <div className="monitor__bar">
                  <span>Signal — physiology stream</span>
                  <span className="monitor__live"><span className="dot" aria-hidden="true" />Live</span>
                </div>
                <div className="monitor__screen">
                  <svg className="ecg" viewBox="0 0 320 150" role="img" aria-label="Animated physiologic waveform">
                    <defs>
                      <linearGradient id="ecgGrad" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#b98a3c" />
                        <stop offset="55%" stopColor="#e6c168" />
                        <stop offset="100%" stopColor="#f2dba1" />
                      </linearGradient>
                    </defs>
                    <path id="ecgTrace" className="ecg__trace" d={TRACE} pathLength={1} />
                    <circle className="ecg__pulse" r={3.4}>
                      <animateMotion dur="5s" begin="1.4s" repeatCount="indefinite" rotate="auto">
                        <mpath href="#ecgTrace" />
                      </animateMotion>
                    </circle>
                  </svg>
                </div>
                <div className="monitor__readout">
                  <p>Reading change <b>before crisis.</b></p>
                  <span className="tag" aria-hidden="true">Pattern shift</span>
                </div>
                <dl className="monitor__stats">
                  <div><dt>04</dt><dd>Research projects</dd></div>
                  <div><dt>02</dt><dd>Institutions</dd></div>
                  <div><dt>01</dt><dd>Shared focus</dd></div>
                </dl>
              </div>
            </aside>
          </div>
        </section>

        <section className="manifesto wrap" aria-labelledby="manifesto-title">
          <p className="manifesto__eyebrow reveal"><span className="dot" aria-hidden="true" />The approach</p>
          <h2 id="manifesto-title" className="sr-only">The approach</h2>
          <ScrollFill text="I turn continuous physiology, molecular biology, and outcomes data into models that read change **early** — evidence a care team can **act on** before the crisis is obvious." />
        </section>

        <section className="section work wrap" id="research" aria-labelledby="research-title">
          <div className="section__head">
            <h2 id="research-title" className="reveal">Questions I am <em>working on.</em></h2>
            <p className="section__aside reveal" style={stagger(1)}>Projects spanning cardiogenic shock, congenital heart disease, graph learning, and clinical outcomes.</p>
          </div>
          <div className="work__list">
            {siteContent.projects.map((project, index) => (
              <article className="work__item reveal" style={stagger(index)} key={project.id}>
                <span className="work__num">{String(index + 1).padStart(2, "0")}</span>
                <div className="work__main">
                  <div className="work__top">
                    <span className="work__org"><b>{project.organization}</b> · {project.timeframe}</span>
                    <span className={`status status--${project.status.toLowerCase()}`}><i aria-hidden="true" />{project.status}</span>
                  </div>
                  <h3>{project.title}</h3>
                  <p className="work__q">{project.question}</p>
                  <dl className="work__grid">
                    <div><dt>How I am testing it</dt><dd>{project.approach}</dd></div>
                    <div><dt>Why it matters</dt><dd>{project.significance}</dd></div>
                  </dl>
                  <ul className="chips" aria-label="Methods used">
                    {project.methods.map((method) => <li key={method}>{method}</li>)}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section approach wrap" id="method" aria-labelledby="method-title">
          <div className="section__head">
            <h2 id="method-title" className="reveal">How I work.</h2>
            <p className="section__aside reveal" style={stagger(1)}>Start with a decision, then build the analysis around the evidence that decision needs.</p>
          </div>
          <div className="cards">
            {siteContent.methods.map((method, index) => (
              <article className="card reveal" style={stagger(index)} key={method.title}>
                <div className="card__top">
                  <span className="card__num">{String(index + 1).padStart(2, "0")}</span>
                  <span className="card__mark" aria-hidden="true">+</span>
                </div>
                <h3>{method.title}</h3>
                <p>{method.body}</p>
                <p className="card__skills">{method.skills}</p>
              </article>
            ))}
          </div>
        </section>

        <VelocityMarquee items={disciplines} />

        <section className="section impact wrap" id="impact" aria-labelledby="impact-title">
          <div className="impact__grid">
            <div className="impact__copy reveal">
              <p className="eyebrow eyebrow--plain">04 · Community work</p>
              <h2 id="impact-title">Building useful spaces for <em>health AI.</em></h2>
              <p className="impact__label">{siteContent.impact.label}</p>
              <p className="impact__body">{siteContent.impact.body}</p>
              <a className="textlink" href={`mailto:${siteContent.email}`}>Talk about a project <span aria-hidden="true">&#8594;</span></a>
            </div>
            <dl className="metrics reveal" style={stagger(1)}>
              <div><dt><CountUp value={siteContent.impact.value} /></dt><dd>mobilized through Hack4Health</dd></div>
              {siteContent.impact.metrics.map(([value, label]) => (
                <div key={label}><dt><CountUp value={value} /></dt><dd>{label}</dd></div>
              ))}
            </dl>
          </div>
        </section>
      </main>

      <footer className="foot" id="contact">
        <div className="wrap">
          <div className="foot__cta reveal">
            <p className="eyebrow">Contact</p>
            <h2>Have a clinical question? <em>Let's talk.</em></h2>
            <div className="foot__actions">
              <a className="btn btn--primary" href={`mailto:${siteContent.email}`} ref={footCta}>Email Arnav <span className="arrow" aria-hidden="true">&#8594;</span></a>
              <button className="btn btn--ghost" type="button" onClick={copyEmail}>Copy address</button>
            </div>
            <p className="foot__email">{siteContent.email}</p>
          </div>
          <div className="foot__bar">
            <span>© {new Date().getFullYear()} Arnav Mana — Clinical AI Researcher</span>
            <span>Cardiac critical care · Clinical AI · Translational biology</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
