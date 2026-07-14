import { useEffect, useState, type CSSProperties } from "react";
import { Toast } from "./components/Toast";
import { siteContent } from "./data/siteContent";
import { useCopyToClipboard } from "./hooks/useCopyToClipboard";
import "./styles/global.css";

const nav = [["Work", "work"], ["Profile", "profile"], ["Contact", "contact"]] as const;

function KineticWord({ children, offset = 0 }: { children: string; offset?: number }) {
  return <span className="kinetic-word" aria-hidden="true">{[...children].map((letter, index) => <i key={index} style={{ "--letter": index + offset } as CSSProperties}>{letter}</i>)}</span>;
}

export default function App() {
  const { copied, copy, clear } = useCopyToClipboard();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.title = `${siteContent.name} — ${siteContent.title}`;
  }, []);

  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const root = document.documentElement;
    const reveal = typeof IntersectionObserver === "undefined" ? null : new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add("in-view");
    }), { threshold: .18 });
    const animated = document.querySelectorAll(".project, .profile__columns article");
    animated.forEach(el => reveal ? reveal.observe(el) : el.classList.add("in-view"));
    const onMove = (event: PointerEvent) => {
      root.style.setProperty("--x", `${event.clientX}px`);
      root.style.setProperty("--y", `${event.clientY}px`);
      root.style.setProperty("--nx", `${event.clientX / innerWidth - .5}`);
      root.style.setProperty("--ny", `${event.clientY / innerHeight - .5}`);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => { reveal?.disconnect(); window.removeEventListener("pointermove", onMove); };
  }, []);

  useEffect(() => {
    if (!copied) return;
    const timeout = window.setTimeout(clear, 2400);
    return () => window.clearTimeout(timeout);
  }, [clear, copied]);

  const copyEmail = () => copy(siteContent.email, "Email copied to clipboard");

  return (
    <div className="site">
      <div className="cursor-orbit" aria-hidden="true"><span /></div>
      <Toast message={copied} />
      <header className="nav">
        <a className="wordmark" href="#top">AM<span>®</span></a>
        <nav className={`nav__links${menuOpen ? " is-open" : ""}`} aria-label={menuOpen ? "Mobile navigation" : "Primary navigation"}>
          {nav.map(([label, id]) => <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>{label}</a>)}
        </nav>
        <button className="menu" type="button" aria-label={menuOpen ? "Close navigation" : "Open navigation"} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? "Close" : "Menu"}</button>
        <a className="nav__email" href={`mailto:${siteContent.email}`}>Email ↗</a>
      </header>

      <main>
        <section className="hero" id="top">
          <p className="kicker">Clinical AI researcher <span>Denver / San Francisco</span></p>
          <h1 aria-label="Arnav Mana"><KineticWord>Arnav</KineticWord><span className="outline"><KineticWord offset={5}>Mana</KineticWord></span></h1>
          <div className="hero__bottom">
            <p>{siteContent.introduction}</p>
            <a href="#work">Selected research <span>↓</span></a>
          </div>
          <div className="hero__stamp" aria-hidden="true"><span>PHYSIOLOGY</span><b>×</b><span>COMPUTATION</span></div>
          <div className="signal-field" aria-hidden="true">{Array.from({ length: 11 }, (_, i) => <span key={i} style={{ "--signal": i } as CSSProperties} />)}</div>
        </section>

        <div className="marquee" aria-hidden="true"><div>CLINICAL SIGNALS — COMPUTATIONAL METHODS — TRANSLATIONAL BIOLOGY — CLINICAL SIGNALS — COMPUTATIONAL METHODS — TRANSLATIONAL BIOLOGY —</div></div>

        <section className="work" id="work" aria-labelledby="work-title">
          <header className="section-title">
            <p>01 / Selected work</p>
            <h2 id="work-title">Research built around<br />clinical decisions.</h2>
          </header>
          <div className="project-list">
            {siteContent.projects.map((project, index) => (
              <article className="project" key={project.id} style={{ "--project": index } as CSSProperties}>
                <div className="project__index">{String(index + 1).padStart(2, "0")}</div>
                <div className="project__body">
                  <div className="project__meta"><span>{project.organization}</span><span>{project.timeframe}</span></div>
                  <h3>{project.title}</h3>
                  <p className="project__question">{project.question}</p>
                  <div className="project__detail">
                    <p>{project.approach}</p>
                    <ul>{project.methods.map(method => <li key={method}>{method}</li>)}</ul>
                  </div>
                </div>
                <div className="project__state">{project.status}</div>
              </article>
            ))}
          </div>
        </section>

        <section className="profile" id="profile" aria-labelledby="profile-title">
          <header className="section-title section-title--light">
            <p>02 / Profile</p>
            <h2 id="profile-title">Across the bedside,<br />bench, and model.</h2>
          </header>
          <div className="profile__grid">
            <p className="profile__lead">I work where clinical physiology, computational methods, and translational biology meet.</p>
            <div className="profile__columns">
              {siteContent.methods.map((method, index) => (
                <article key={method.title}><span>0{index + 1}</span><h3>{method.title}</h3><p>{method.body}</p><small>{method.skills}</small></article>
              ))}
            </div>
          </div>
          <div className="community">
            <p>Beyond the lab</p>
            <h3>Co-founded Hack4Health and helped mobilize <em>$100K+</em> for student-led health AI.</h3>
            <p>{siteContent.impact.body}</p>
          </div>
        </section>
      </main>

      <footer id="contact">
        <p>03 / Contact</p>
        <h2>Let’s work on a<br /><em>hard clinical problem.</em></h2>
        <div className="footer__actions"><a href={`mailto:${siteContent.email}`}>{siteContent.email} ↗</a><button type="button" onClick={copyEmail}>Copy email</button></div>
        <div className="footer__base"><span>© {new Date().getFullYear()} Arnav Mana</span><span>Clinical AI · Cardiac critical care</span></div>
      </footer>
    </div>
  );
}
