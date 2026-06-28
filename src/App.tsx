import { useEffect, useRef, useState, type MouseEvent as ReactMouseEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PasswordGate } from "./components/PasswordGate";
import { ProgressBar } from "./components/ProgressBar";
import { Toast } from "./components/Toast";
import { siteContent } from "./data/siteContent";
import { useActiveSection } from "./hooks/useActiveSection";
import { useCopyToClipboard } from "./hooks/useCopyToClipboard";
import { useScrollSignals } from "./hooks/useScrollSignals";

const sectionIds = [
  "hero",
  "proof",
  "work",
  "capabilities",
  "leadership",
  "contact",
] as const;

function formatCompactMetric(value: number, prefix?: string, suffix?: string) {
  const compact = new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);

  return `${prefix ?? ""}${compact}${suffix ?? ""}`;
}

function describeSection(sectionId: string | null) {
  switch (sectionId) {
    case "hero":
      return "Overview";
    case "proof":
      return "Proof";
    case "work":
      return "Work";
    case "capabilities":
      return "Capabilities";
    case "leadership":
      return "Leadership";
    case "contact":
      return "Contact";
    default:
      return "Research dossier";
  }
}

export default function App() {
  const { progress, navHidden } = useScrollSignals();
  const activeSection = useActiveSection([...sectionIds]);
  const { copied, copy, clear } = useCopyToClipboard();
  const shellRef = useRef<HTMLDivElement>(null);
  const [unlocked, setUnlocked] = useState(() => sessionStorage.getItem("pg_auth") === "1");
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    const storedTheme = localStorage.getItem("site_theme");
    if (storedTheme === "light" || storedTheme === "dark") {
      return storedTheme;
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });
  const [activeProjectId, setActiveProjectId] = useState(
    () => siteContent.projects[0]?.id ?? "",
  );
  const [activeRecognitionId, setActiveRecognitionId] = useState(
    () => siteContent.recognition[0]?.id ?? "",
  );

  useEffect(() => {
    document.title = siteContent.seoTitle;
  }, []);

  useEffect(() => {
    if (!copied) {
      return undefined;
    }

    const timeout = window.setTimeout(clear, 2400);
    return () => window.clearTimeout(timeout);
  }, [clear, copied]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("site_theme", theme);
  }, [theme]);

  async function handleCopyEmail() {
    await copy(siteContent.contact.email, "Email copied to clipboard");
  }

  function cycleProject(direction: "next" | "prev") {
    const currentIndex = siteContent.projects.findIndex((project) => project.id === activeProject?.id);
    const normalizedIndex = currentIndex < 0 ? 0 : currentIndex;
    const delta = direction === "next" ? 1 : -1;
    const nextIndex =
      (normalizedIndex + delta + siteContent.projects.length) % siteContent.projects.length;
    setActiveProjectId(siteContent.projects[nextIndex]?.id ?? "");
  }

  function handlePointerMove(event: ReactMouseEvent<HTMLDivElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width) * 100;
    const y = ((event.clientY - bounds.top) / bounds.height) * 100;
    shellRef.current?.style.setProperty("--cursor-x", `${x.toFixed(2)}%`);
    shellRef.current?.style.setProperty("--cursor-y", `${y.toFixed(2)}%`);
  }

  function handlePointerLeave() {
    shellRef.current?.style.setProperty("--cursor-x", "54%");
    shellRef.current?.style.setProperty("--cursor-y", "24%");
  }

  const activeProject =
    siteContent.projects.find((project) => project.id === activeProjectId) ??
    siteContent.projects[0];
  const activeRecognition =
    siteContent.recognition.find((item) => item.id === activeRecognitionId) ??
    siteContent.recognition[0];
  const activeProjectIndex = Math.max(
    0,
    siteContent.projects.findIndex((project) => project.id === activeProject?.id),
  );
  const compactLeadershipMetric = formatCompactMetric(
    siteContent.leadership.headlineValue,
    siteContent.leadership.headlinePrefix,
    siteContent.leadership.headlineSuffix,
  );
  const activeSectionLabel = describeSection(activeSection);

  return (
    <>
      {!unlocked && <PasswordGate onUnlocked={() => setUnlocked(true)} />}
      <div
        ref={shellRef}
        className="app-shell"
        onMouseMove={handlePointerMove}
        onMouseLeave={handlePointerLeave}
      >
        <ProgressBar progress={progress} />
        <Toast message={copied} />

        <header className={`top-nav ${navHidden ? "is-hidden" : ""}`}>
          <motion.div 
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="top-nav__inner"
          >
            <a className="top-nav__brand" href="#hero" aria-label="Arnav Mana home">
              <span className="brand-monogram">AM</span>
              <span>{siteContent.name}</span>
            </a>

            <nav className="top-nav__links" aria-label="Primary">
              <a href="#proof">Proof</a>
              <a href="#work">Work</a>
              <a href="#capabilities">Method</a>
              <a href="#leadership">Leadership</a>
              <a href="#contact">Contact</a>
            </nav>

            <div className="top-nav__meta">
              <p className="top-nav__section" aria-live="polite">
                {activeSection ? `Viewing ${activeSectionLabel}` : activeSectionLabel}
              </p>
              <button
                className="nav-button"
                type="button"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                {theme === "dark" ? "Light" : "Dark"}
              </button>
              <button className="nav-button nav-button--strong" type="button" onClick={handleCopyEmail}>
                Copy email
              </button>
            </div>
          </motion.div>
        </header>

        <main>
          <section id="hero" className="hero-section page-section" aria-labelledby="hero-title">
            <div className="hero-scene" aria-hidden="true">
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="heart-stage"
              >
                <svg className="heart-visual" viewBox="0 0 640 520" role="img" aria-label="Beating heart with ECG signal">
                  <defs>
                    <linearGradient id="heartFill" x1="0" x2="1" y1="0" y2="1">
                      <stop offset="0%" stopColor="var(--heart-light)" />
                      <stop offset="55%" stopColor="var(--heart)" />
                      <stop offset="100%" stopColor="var(--heart-dark)" />
                    </linearGradient>
                    <filter id="heartGlow" x="-30%" y="-30%" width="160%" height="160%">
                      <feGaussianBlur stdDeviation="10" result="blur" />
                      <feColorMatrix
                        in="blur"
                        type="matrix"
                        values="1 0 0 0 0.62 0 0.45 0 0 0.08 0 0 0.2 0 0.08 0 0 0 0.45 0"
                      />
                      <feMerge>
                        <feMergeNode />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>
                  <g className="heart-beat">
                    <path
                      className="heart-shadow"
                      d="M319 437C204 363 129 286 129 194c0-63 42-112 101-112 37 0 69 20 89 55 20-35 52-55 89-55 59 0 101 49 101 112 0 92-75 169-190 243Z"
                    />
                    <path
                      className="heart-body"
                      d="M319 423C211 354 142 281 142 196c0-55 36-96 87-96 41 0 73 27 90 71 17-44 49-71 90-71 51 0 87 41 87 96 0 85-69 158-177 227Z"
                    />
                    <path
                      className="heart-vein heart-vein-one"
                      d="M317 165c-4 64-18 112-59 166"
                    />
                    <path
                      className="heart-vein heart-vein-two"
                      d="M320 171c16 44 45 81 88 114"
                    />
                    <path
                      className="heart-vein heart-vein-three"
                      d="M287 223c-34 0-63-13-88-39"
                    />
                    <path
                      className="heart-vessel vessel-one"
                      d="M289 127c-18-45-45-73-86-86"
                    />
                    <path
                      className="heart-vessel vessel-two"
                      d="M352 127c20-48 55-77 104-88"
                    />
                    <path
                      className="heart-vessel vessel-three"
                      d="M320 125c4-50 21-89 51-116"
                    />
                  </g>
                  <path className="ecg-shadow" d="M28 283h151l23-33 28 73 45-163 47 171 31-48h259" />
                  <path className="ecg-line" d="M28 283h151l23-33 28 73 45-163 47 171 31-48h259" />
                  <circle className="ecg-dot" cx="274" cy="161" r="6" />
                </svg>
                <div className="heart-caption">
                  <span>live physiologic signal</span>
                  <strong>ECG / model / mechanism</strong>
                </div>
              </motion.div>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="hero-inner"
            >
              <p className="section-kicker">Clinical AI research portfolio</p>
              <h1 className="hero-title" id="hero-title">
                {siteContent.name}
              </h1>
              <p className="hero-tagline">
                I build prediction systems where physiology, mechanism, and bedside action have to
                agree.
              </p>
              <div className="hero-statement">
                <p>{siteContent.bio}</p>
                <p>{siteContent.thesis}</p>
              </div>

              <div className="hero-actions">
                <a className="button button--primary" href="#work">
                  View research
                </a>
                <a className="button button--secondary" href="#contact">
                  Contact
                </a>
              </div>
            </motion.div>

            <div className="hero-notes" aria-label="Personal research notes">
              {siteContent.heroHighlights.map((highlight) => (
                <article key={highlight.label}>
                  <p>{highlight.label}</p>
                  <strong>{highlight.value}</strong>
                </article>
              ))}
            </div>
          </section>

          <section id="proof" className="page-section content-band" aria-labelledby="proof-title">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="section-heading"
            >
              <p className="section-kicker">Proof of execution</p>
              <h2 className="section-title" id="proof-title">
                Signals of rigor
              </h2>
              <p className="section-intro">
                Evidence across scientific fluency, sustained execution, and quantitative consistency.
              </p>
            </motion.div>

            <div className="proof-layout">
              <div className="proof-tabs" role="tablist" aria-label="Recognition highlights">
                {siteContent.recognition.map((item) => (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`proof-tab${item.id === activeRecognition?.id ? " is-active" : ""}`}
                    key={item.id}
                    id={`recognition-tab-${item.id}`}
                    role="tab"
                    type="button"
                    aria-selected={item.id === activeRecognition?.id}
                    aria-controls={`recognition-panel-${item.id}`}
                    onClick={() => setActiveRecognitionId(item.id)}
                  >
                    <span>{item.number}</span>
                    <strong>{item.title}</strong>
                  </motion.button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                {activeRecognition ? (
                  <motion.article
                    key={activeRecognition.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="proof-focus"
                    id={`recognition-panel-${activeRecognition.id}`}
                    role="tabpanel"
                    aria-labelledby={`recognition-tab-${activeRecognition.id}`}
                  >
                    <p className="proof-category">{activeRecognition.category}</p>
                    <h3>{activeRecognition.title}</h3>
                    <p>{activeRecognition.detail}</p>
                    <ul>
                      {activeRecognition.evidence.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                    {activeRecognition.metrics ? (
                      <div className="proof-metrics">
                        {activeRecognition.metrics.map((metric) => (
                          <div key={metric.label}>
                            <strong>{metric.value}</strong>
                            <p>{metric.label}</p>
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </motion.article>
                ) : null}
              </AnimatePresence>
            </div>
          </section>

          <section id="work" className="page-section content-band work-band" aria-labelledby="work-title">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="section-heading"
            >
              <p className="section-kicker">Selected work</p>
              <h2 className="section-title" id="work-title">
                Research casebook
              </h2>
              <p className="section-intro">
                Focused investigations in cardiac critical care, translational biology, and clinical AI.
              </p>
            </motion.div>

            <div className="project-studio">
              <AnimatePresence mode="wait">
                {activeProject ? (
                  <motion.article
                    key={activeProject.id}
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    id={`project-panel-${activeProject.id}`}
                    role="tabpanel"
                    aria-labelledby={`project-tab-${activeProject.id}`}
                    className={`project-feature tone-${activeProject.tone}`}
                  >
                    <header>
                      <p>
                        Case {activeProjectIndex + 1} of {siteContent.projects.length}
                      </p>
                      <span className={`status-tag status-${activeProject.status.toLowerCase()}`}>
                        {activeProject.status}
                      </span>
                    </header>

                    <h3>{activeProject.title}</h3>
                    <p className="project-question">{activeProject.question}</p>

                    <div className="project-signal" aria-hidden="true">
                      <span />
                      <span />
                      <span />
                      <span />
                      <span />
                      <span />
                      <span />
                    </div>

                    <dl className="project-map">
                      <div>
                        <dt>Approach</dt>
                        <dd>{activeProject.approach}</dd>
                      </div>
                      <div>
                        <dt>Signal</dt>
                        <dd>{activeProject.signal}</dd>
                      </div>
                      <div>
                        <dt>Why it matters</dt>
                        <dd>{activeProject.significance}</dd>
                      </div>
                    </dl>

                    <ul className="tool-list" aria-label={`${activeProject.title} tools`}>
                      {activeProject.tools.map((tool) => (
                        <li key={tool}>{tool}</li>
                      ))}
                    </ul>

                    <div className="project-controls" aria-label="Project navigation">
                      <button 
                        type="button" 
                        className="button button--secondary" 
                        onClick={() => cycleProject("prev")}
                      >
                        Previous
                      </button>
                      <button 
                        type="button" 
                        className="button button--secondary" 
                        onClick={() => cycleProject("next")}
                      >
                        Next
                      </button>
                    </div>
                  </motion.article>
                ) : null}
              </AnimatePresence>

              <div className="project-index" role="tablist" aria-label="Research projects">
                {siteContent.projects.map((project) => (
                  <motion.button
                    key={project.id}
                    id={`project-tab-${project.id}`}
                    role="tab"
                    type="button"
                    whileHover={{ x: 5 }}
                    className={`project-index__item${project.id === activeProject?.id ? " is-active" : ""}`}
                    aria-selected={project.id === activeProject?.id}
                    aria-controls={`project-panel-${project.id}`}
                    onClick={() => setActiveProjectId(project.id)}
                  >
                    <i aria-hidden="true" />
                    <span>{project.numeral}</span>
                    <strong>{project.title}</strong>
                    <p>{project.org}</p>
                  </motion.button>
                ))}
              </div>
            </div>
          </section>

          <section id="capabilities" className="page-section content-band" aria-labelledby="capabilities-title">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="section-heading"
            >
              <p className="section-kicker">Method</p>
              <h2 className="section-title" id="capabilities-title">
                Ways I contribute
              </h2>
            </motion.div>

            <div className="method-list">
              {siteContent.capabilities.map((group, index) => (
                <motion.article 
                  className={`method-item tone-${group.tone}`} 
                  key={group.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <h3>{group.title}</h3>
                  <p>{group.description}</p>
                  <ul>
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </motion.article>
              ))}
            </div>
          </section>

          <section id="leadership" className="page-section content-band leadership-band" aria-labelledby="leadership-title">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="section-heading"
            >
              <p className="section-kicker">Leadership</p>
              <h2 className="section-title" id="leadership-title">
                Leadership with outcomes
              </h2>
            </motion.div>

            <div className="leadership-layout">
              <motion.article 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="leadership-story"
              >
                <p className="leadership-role">{siteContent.leadership.role}</p>
                <p>{siteContent.leadership.summary}</p>
                <strong>{compactLeadershipMetric}</strong>
                <span>{siteContent.leadership.headlineLabel}</span>
              </motion.article>

              <div className="outcome-grid">
                {siteContent.leadership.outcomes.map((outcome, index) => (
                  <motion.article 
                    className="outcome-card" 
                    key={outcome.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
                    whileHover={{ y: -5 }}
                  >
                    <strong>
                      {formatCompactMetric(outcome.value, outcome.prefix, outcome.suffix)}
                    </strong>
                    <h3>{outcome.label}</h3>
                    <p>{outcome.context}</p>
                  </motion.article>
                ))}
              </div>
            </div>
          </section>
        </main>

        <footer id="contact" className="footer-contact content-band" aria-labelledby="contact-title">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="section-kicker">Contact</p>
            <h2 className="section-title" id="contact-title">
              Open to high-rigor research collaboration.
            </h2>
            <p>{siteContent.contact.footerTagline}</p>
            <p>{siteContent.contact.footerNote}</p>
          </motion.div>

          <motion.div 
            className="footer-actions"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="button button--primary" 
              href={`mailto:${siteContent.contact.email}`}
            >
              Email me
            </motion.a>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="button button--secondary" 
              type="button" 
              onClick={handleCopyEmail}
            >
              Copy address
            </motion.button>
            <p>{siteContent.contact.email}</p>
          </motion.div>
        </footer>
      </div>
    </>
  );
}
