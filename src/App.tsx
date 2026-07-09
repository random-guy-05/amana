import { useEffect, useState } from "react";
import { Toast } from "./components/Toast";
import { siteContent } from "./data/siteContent";
import { useCopyToClipboard } from "./hooks/useCopyToClipboard";

const navigation = [
  ["Research", "research"],
  ["Method", "method"],
  ["Impact", "impact"],
  ["Contact", "contact"],
] as const;

export default function App() {
  const { copied, copy, clear } = useCopyToClipboard();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.title = `${siteContent.name} | ${siteContent.title}`;
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
    <div className="site-shell">
      <Toast message={copied} />
      <header className="site-header">
        <div className="site-header__inner">
          <a className="brand" href="#top" aria-label={`${siteContent.name} home`}>
            <span className="brand__mark" aria-hidden="true">AM</span>
            <span>{siteContent.name}</span>
          </a>

          <nav className="desktop-nav" aria-label="Primary navigation">
            {navigation.map(([label, id]) => <a href={`#${id}`} key={id}>{label}</a>)}
          </nav>

          <a className="header-contact" href={`mailto:${siteContent.email}`}>Email</a>
          <button
            className="menu-button"
            type="button"
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
            title="Menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span /><span /><span />
          </button>
        </div>
        {menuOpen && (
          <nav className="mobile-nav" aria-label="Mobile navigation">
            {navigation.map(([label, id]) => <a href={`#${id}`} key={id} onClick={closeMenu}>{label}</a>)}
            <a href={`mailto:${siteContent.email}`} onClick={closeMenu}>Email</a>
          </nav>
        )}
      </header>

      <main>
        <section className="hero" id="top" aria-labelledby="hero-title">
          <div className="hero__inner">
            <p className="eyebrow">{siteContent.eyebrow}</p>
            <h1 id="hero-title">{siteContent.name}</h1>
            <p className="hero__title">{siteContent.tagline}</p>
            <p className="hero__copy">{siteContent.introduction}</p>
            <div className="hero__actions">
              <a className="button button--primary" href="#research">View research</a>
              <button className="button button--quiet" type="button" onClick={copyEmail}>Copy email</button>
            </div>
          </div>
          <dl className="focus-list" aria-label="Research focus areas">
            {siteContent.focusAreas.map(([number, title, body]) => (
              <div key={number}>
                <dt>{number} <span>{title}</span></dt>
                <dd>{body}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="section section--research" id="research" aria-labelledby="research-title">
          <div className="section-heading">
            <p className="eyebrow">Selected research</p>
            <h2 id="research-title">Focused questions. Measurable clinical relevance.</h2>
          </div>
          <div className="research-list">
            {siteContent.projects.map((project, index) => (
              <article className="research-item" key={project.id}>
                <div className="research-item__meta">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <p>{project.organization}<br />{project.timeframe}</p>
                </div>
                <div className="research-item__main">
                  <div className="research-item__heading">
                    <h3>{project.title}</h3>
                    <span className={`status status--${project.status.toLowerCase()}`}>{project.status}</span>
                  </div>
                  <p className="research-item__question">{project.question}</p>
                  <dl className="research-item__details">
                    <div><dt>Approach</dt><dd>{project.approach}</dd></div>
                    <div><dt>Why it matters</dt><dd>{project.significance}</dd></div>
                  </dl>
                  <ul className="method-tags" aria-label="Methods used">
                    {project.methods.map((method) => <li key={method}>{method}</li>)}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section section--method" id="method" aria-labelledby="method-title">
          <div className="section-heading">
            <p className="eyebrow">Working method</p>
            <h2 id="method-title">Rigorous from question to consequence.</h2>
          </div>
          <div className="method-columns">
            {siteContent.methods.map((method, index) => (
              <article key={method.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{method.title}</h3>
                <p>{method.body}</p>
                <p className="method-columns__skills">{method.skills}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section section--impact" id="impact" aria-labelledby="impact-title">
          <div className="impact-copy">
            <p className="eyebrow">Leadership</p>
            <h2 id="impact-title">{siteContent.impact.value}</h2>
            <p className="impact-copy__label">{siteContent.impact.label}</p>
            <p>{siteContent.impact.body}</p>
          </div>
          <dl className="impact-metrics">
            {siteContent.impact.metrics.map(([value, label]) => <div key={label}><dt>{value}</dt><dd>{label}</dd></div>)}
          </dl>
        </section>
      </main>

      <footer className="footer" id="contact">
        <div>
          <p className="eyebrow">Contact</p>
          <h2>Open to high-rigor research collaboration.</h2>
          <p>For cardiac critical care, clinical AI, and translational biology work.</p>
        </div>
        <div className="footer__actions">
          <a className="button button--primary" href={`mailto:${siteContent.email}`}>Email Arnav</a>
          <button className="button button--quiet" type="button" onClick={copyEmail}>Copy address</button>
          <p>{siteContent.email}</p>
        </div>
      </footer>
    </div>
  );
}
