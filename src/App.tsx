import { useEffect, useState } from "react";
import { Toast } from "./components/Toast";
import { siteContent } from "./data/siteContent";
import { useCopyToClipboard } from "./hooks/useCopyToClipboard";

const navigation = [
  ["Research", "research"],
  ["Approach", "method"],
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
    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion || typeof IntersectionObserver === "undefined") {
      elements.forEach((element) => element.classList.add("is-revealed"));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14 },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
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
            <span className="brand__name">{siteContent.name}</span>
          </a>

          <nav className="desktop-nav" aria-label="Primary navigation">
            {navigation.map(([label, id]) => <a href={`#${id}`} key={id}>{label}</a>)}
          </nav>

          <div className="header-actions">
            <span className="availability"><span className="availability__dot" />Open to research roles</span>
            <a className="header-contact" href={`mailto:${siteContent.email}`} aria-label="Email Arnav">Get in touch <span aria-hidden="true">-&gt;</span></a>
          </div>

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
            <a href={`mailto:${siteContent.email}`} onClick={closeMenu}>Get in touch</a>
          </nav>
        )}
      </header>

      <main>
        <section className="hero" id="top" aria-labelledby="hero-title">
          <div className="hero__veil" aria-hidden="true" />
          <div className="hero__inner">
            <div className="hero__copy" data-reveal>
              <p className="eyebrow"><span className="eyebrow__line" />Clinical AI / Cardiac critical care</p>
              <h1 id="hero-title">Arnav <em>Mana</em></h1>
              <p className="hero__title">Building earlier signals for the moments that matter.</p>
              <p className="hero__body">{siteContent.introduction}</p>
              <div className="hero__actions">
                <a className="button button--primary" href="#research">Explore the work <span aria-hidden="true">-&gt;</span></a>
                <button className="button button--quiet" type="button" onClick={copyEmail}>Copy email</button>
              </div>
              <div className="hero__meta">
                <span>UCSF / CU Anschutz</span>
                <span>Computational biology / Translational research</span>
              </div>
            </div>

            <aside className="hero__signal" data-reveal aria-label="Current research signal">
              <div className="signal-card__top">
                <span>Current signal</span>
                <span className="signal-card__live"><span className="availability__dot" />Live thread</span>
              </div>
              <div className="signal-graph" aria-hidden="true">
                <span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span />
              </div>
              <p className="signal-card__title">From physiology to earlier action.</p>
              <p className="signal-card__body">A research practice built around the handoff between model, mechanism, and patient.</p>
              <dl className="signal-stats">
                <div><dt>04</dt><dd>active threads</dd></div>
                <div><dt>02</dt><dd>research homes</dd></div>
                <div><dt>01</dt><dd>clinical question</dd></div>
              </dl>
            </aside>
          </div>
          <div className="hero__bottom" data-reveal>
            <span>Scroll to explore</span>
            <span className="hero__scroll-line" aria-hidden="true" />
            <span>01 / 04</span>
          </div>
        </section>

        <section className="statement" aria-labelledby="statement-title" data-reveal>
          <div className="statement__number">01</div>
          <div>
            <p className="eyebrow">The throughline</p>
            <h2 id="statement-title">The question comes before the model.</h2>
          </div>
          <p className="statement__body">I move between high-dimensional physiology, biological mechanism, and outcomes data to find signals that are interpretable enough to change a decision.</p>
        </section>

        <section className="section section--research" id="research" aria-labelledby="research-title">
          <div className="section-heading" data-reveal>
            <div>
              <p className="eyebrow">02 / Selected research</p>
              <h2 id="research-title">Focused questions. Measurable clinical relevance.</h2>
            </div>
            <p className="section-heading__aside">Four active threads across cardiac critical care, translational biology, and clinical AI.</p>
          </div>
          <div className="research-list">
            {siteContent.projects.map((project, index) => (
              <article className={`research-item research-item--${index + 1}`} data-reveal key={project.id}>
                <div className="research-item__meta">
                  <span className="research-item__number">{String(index + 1).padStart(2, "0")}</span>
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
                <span className="research-item__arrow" aria-hidden="true">-&gt;</span>
              </article>
            ))}
          </div>
        </section>

        <section className="section section--method" id="method" aria-labelledby="method-title">
          <div className="section-heading" data-reveal>
            <div>
              <p className="eyebrow">03 / Working method</p>
              <h2 id="method-title">Rigorous from question to consequence.</h2>
            </div>
            <p className="section-heading__aside">The work is interdisciplinary by design. Each layer has to make the next one more honest.</p>
          </div>
          <div className="method-columns">
            {siteContent.methods.map((method, index) => (
              <article data-reveal key={method.title}>
                <div className="method-columns__top"><span>{String(index + 1).padStart(2, "0")}</span><span className="method-columns__mark" aria-hidden="true">+</span></div>
                <h3>{method.title}</h3>
                <p>{method.body}</p>
                <p className="method-columns__skills">{method.skills}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section section--impact" id="impact" aria-labelledby="impact-title">
          <div className="impact-copy" data-reveal>
            <p className="eyebrow">04 / Leadership</p>
            <h2 id="impact-title">Scale with substance.</h2>
            <p className="impact-copy__label">{siteContent.impact.label}</p>
            <p>{siteContent.impact.body}</p>
            <a className="text-link" href={`mailto:${siteContent.email}`}>Talk about the next project <span aria-hidden="true">-&gt;</span></a>
          </div>
          <dl className="impact-metrics" data-reveal>
            <div><dt>{siteContent.impact.value}</dt><dd>mobilized through Hack4Health</dd></div>
            {siteContent.impact.metrics.map(([value, label]) => <div key={label}><dt>{value}</dt><dd>{label}</dd></div>)}
          </dl>
        </section>
      </main>

      <footer className="footer" data-reveal id="contact">
        <div className="footer__heading">
          <p className="eyebrow">Open channel</p>
          <h2>Working on the heart? Let&apos;s talk.</h2>
        </div>
        <div className="footer__actions">
          <p>For cardiac critical care, clinical AI, and translational biology work.</p>
          <div className="footer__buttons">
            <a className="button button--primary" href={`mailto:${siteContent.email}`}>Email Arnav <span aria-hidden="true">-&gt;</span></a>
            <button className="button button--quiet" type="button" onClick={copyEmail}>Copy address</button>
          </div>
          <p className="footer__email">{siteContent.email}</p>
        </div>
        <div className="footer__bottom"><span>Arnav Mana / Clinical AI Researcher</span><span>Built around better questions</span></div>
      </footer>
    </div>
  );
}
