import { useEffect, useRef, useState, type MouseEvent as ReactMouseEvent } from "react";
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
          <div className="top-nav__inner">
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
          </div>
        </header>

        <main>
          <section id="hero" className="hero-section page-section" aria-labelledby="hero-title">
            <div className="hero-scene" aria-hidden="true">
              <span className="trace trace-one" />
              <span className="trace trace-two" />
              <span className="trace trace-three" />
              <span className="scene-label scene-label-one">model</span>
              <span className="scene-label scene-label-two">mechanism</span>
              <span className="scene-label scene-label-three">care</span>
            </div>

            <div className="hero-inner">
              <p className="section-kicker">Clinical AI research portfolio</p>
              <h1 className="hero-title" id="hero-title">
                {siteContent.name}
              </h1>
              <p className="hero-tagline">{siteContent.tagline}</p>
              <p className="hero-bio">{siteContent.bio}</p>
              <p className="hero-thesis">{siteContent.thesis}</p>

              <div className="hero-actions">
                <a className="button button--primary" href="#work">
                  View research
                </a>
                <a className="button button--secondary" href="#contact">
                  Contact
                </a>
              </div>
            </div>

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
            <div className="section-heading">
              <p className="section-kicker">Proof of execution</p>
              <h2 className="section-title" id="proof-title">
                Signals of rigor
              </h2>
              <p className="section-intro">
                Evidence across scientific fluency, sustained execution, and quantitative consistency.
              </p>
            </div>

            <div className="proof-layout">
              <div className="proof-tabs" role="tablist" aria-label="Recognition highlights">
                {siteContent.recognition.map((item) => (
                  <button
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
                  </button>
                ))}
              </div>

              {activeRecognition ? (
                <article
                  className="proof-focus"
                  id={`recognition-panel-${activeRecognition.id}`}
                  role="tabpanel"
                  aria-labelledby={`recognition-tab-${activeRecognition.id}`}
                  key={activeRecognition.id}
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
                </article>
              ) : null}
            </div>
          </section>

          <section id="work" className="page-section content-band work-band" aria-labelledby="work-title">
            <div className="section-heading">
              <p className="section-kicker">Selected work</p>
              <h2 className="section-title" id="work-title">
                Research casebook
              </h2>
              <p className="section-intro">
                Focused investigations in cardiac critical care, translational biology, and clinical AI.
              </p>
            </div>

            <div className="project-studio">
              {activeProject ? (
                <article
                  id={`project-panel-${activeProject.id}`}
                  role="tabpanel"
                  aria-labelledby={`project-tab-${activeProject.id}`}
                  className={`project-feature tone-${activeProject.tone}`}
                  key={activeProject.id}
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
                    <button type="button" className="button button--secondary" onClick={() => cycleProject("prev")}>
                      Previous
                    </button>
                    <button type="button" className="button button--secondary" onClick={() => cycleProject("next")}>
                      Next
                    </button>
                  </div>
                </article>
              ) : null}

              <div className="project-index" role="tablist" aria-label="Research projects">
                {siteContent.projects.map((project) => (
                  <button
                    key={project.id}
                    id={`project-tab-${project.id}`}
                    role="tab"
                    type="button"
                    className={`project-index__item${project.id === activeProject?.id ? " is-active" : ""}`}
                    aria-selected={project.id === activeProject?.id}
                    aria-controls={`project-panel-${project.id}`}
                    onClick={() => setActiveProjectId(project.id)}
                  >
                    <span>{project.numeral}</span>
                    <strong>{project.title}</strong>
                    <p>{project.org}</p>
                  </button>
                ))}
              </div>
            </div>
          </section>

          <section id="capabilities" className="page-section content-band" aria-labelledby="capabilities-title">
            <div className="section-heading">
              <p className="section-kicker">Method</p>
              <h2 className="section-title" id="capabilities-title">
                Ways I contribute
              </h2>
            </div>

            <div className="method-list">
              {siteContent.capabilities.map((group) => (
                <article className={`method-item tone-${group.tone}`} key={group.id}>
                  <h3>{group.title}</h3>
                  <p>{group.description}</p>
                  <ul>
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          <section id="leadership" className="page-section content-band leadership-band" aria-labelledby="leadership-title">
            <div className="section-heading">
              <p className="section-kicker">Leadership</p>
              <h2 className="section-title" id="leadership-title">
                Leadership with outcomes
              </h2>
            </div>

            <div className="leadership-layout">
              <article className="leadership-story">
                <p className="leadership-role">{siteContent.leadership.role}</p>
                <p>{siteContent.leadership.summary}</p>
                <strong>{compactLeadershipMetric}</strong>
                <span>{siteContent.leadership.headlineLabel}</span>
              </article>

              <div className="outcome-grid">
                {siteContent.leadership.outcomes.map((outcome) => (
                  <article className="outcome-card" key={outcome.label}>
                    <strong>
                      {formatCompactMetric(outcome.value, outcome.prefix, outcome.suffix)}
                    </strong>
                    <h3>{outcome.label}</h3>
                    <p>{outcome.context}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        </main>

        <footer id="contact" className="footer-contact content-band" aria-labelledby="contact-title">
          <div>
            <p className="section-kicker">Contact</p>
            <h2 className="section-title" id="contact-title">
              Open to high-rigor research collaboration.
            </h2>
            <p>{siteContent.contact.footerTagline}</p>
            <p>{siteContent.contact.footerNote}</p>
          </div>

          <div className="footer-actions">
            <a className="button button--primary" href={`mailto:${siteContent.contact.email}`}>
              Email me
            </a>
            <button className="button button--secondary" type="button" onClick={handleCopyEmail}>
              Copy address
            </button>
            <p>{siteContent.contact.email}</p>
          </div>
        </footer>
      </div>
    </>
  );
}
