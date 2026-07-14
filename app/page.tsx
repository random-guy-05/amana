const research = [
  {
    number: "01",
    title: "Predicting deterioration before it becomes a crisis",
    org: "UCSF Cardiac Critical Care",
    date: "May 2024 — Present",
    description:
      "Building predictive models and clinical workflows for earlier detection of patient deterioration, in direct collaboration with cardiac critical-care leadership.",
    tags: ["Critical care", "Predictive modeling", "Clinical workflows"],
  },
  {
    number: "02",
    title: "Tracing the biology of a developing heart",
    org: "CU Anschutz",
    date: "June 2024 — Present",
    description:
      "Combining reproducible single-nucleus RNA-seq pipelines with neonatal cardiac fibroblast experiments to study hypoplastic left heart syndrome and therapeutic targets.",
    tags: ["snRNA-seq", "Transcriptomics", "Wet lab"],
  },
  {
    number: "03",
    title: "Connecting sleep apnea to cardiac-arrest outcomes",
    org: "Independent research",
    date: "August 2024 — Present",
    description:
      "Leading analyses across MIMIC and eICU to investigate how obstructive sleep apnea relates to outcomes after cardiac arrest. Submitted to AHA Scientific Sessions 2026.",
    tags: ["MIMIC", "eICU", "Statistical modeling"],
  },
  {
    number: "04",
    title: "Reading cognition in an overnight sleep study",
    org: "George B. Moody PhysioNet Challenge",
    date: "January 2026 — Present",
    description:
      "Designed a multimodal pipeline for cognitive-impairment screening using physiologic signals, sleep stages, expert labels, feature engineering, and ensemble learning.",
    tags: ["Signal processing", "Polysomnography", "Ensembles"],
  },
];

const skills = [
  "Computational biology",
  "Machine learning",
  "Signal processing",
  "Critical care",
  "Statistical modeling",
  "Python",
  "MATLAB",
  "R",
];

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="mark" href="#top" aria-label="Arnav Mana, home">
          AM<span>.</span>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#research">Research</a>
          <a href="#approach">Approach</a>
          <a href="#community">Community</a>
        </nav>
        <a className="header-cta" href="#contact">
          Let&apos;s talk <span aria-hidden="true">↗</span>
        </a>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow"><span /> AI × health researcher · San Jose, CA</p>
          <h1>
            I build AI for the moments <em>medicine can&apos;t miss.</em>
          </h1>
          <p className="hero-deck">
            I&apos;m Arnav Mana—a student researcher working across cardiac critical
            care, computational biology, and translational medicine.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#research">
              Explore my work <span aria-hidden="true">↓</span>
            </a>
            <a
              className="button button-ghost"
              href="/Arnav-Mana-Resume-Summer-2026.pdf"
              target="_blank"
              rel="noreferrer"
            >
              View résumé <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>

        <aside className="signal-panel" aria-label="Selected impact">
          <div className="panel-topline">
            <span>Live research signal</span>
            <span className="status"><i /> Active</span>
          </div>
          <div className="signal-field" aria-hidden="true">
            <span className="pulse pulse-1" />
            <span className="pulse pulse-2" />
            <span className="pulse pulse-3" />
            <span className="pulse pulse-4" />
            <span className="pulse pulse-5" />
            <span className="pulse pulse-6" />
            <span className="pulse pulse-7" />
            <span className="pulse pulse-8" />
            <span className="pulse pulse-9" />
          </div>
          <div className="metrics">
            <div><strong>Top 30</strong><span>PhysioNet<br />unofficial phase</span></div>
            <div><strong>3,000+</strong><span>Hackathon<br />participants</span></div>
            <div><strong>$100K+</strong><span>Sponsorships<br />secured</span></div>
          </div>
        </aside>
      </section>

      <section className="statement" aria-label="Research philosophy">
        <p className="section-label">01 / Thesis</p>
        <p className="statement-copy">
          The most valuable model isn&apos;t the most complicated one. It&apos;s the one
          that survives contact with <span>real biology, real clinicians,</span> and
          <span> real patients.</span>
        </p>
      </section>

      <section className="research-section" id="research">
        <div className="section-heading">
          <div>
            <p className="section-label">02 / Selected research</p>
            <h2>Research, in motion.</h2>
          </div>
          <p>
            Four active lines of work spanning the ICU, the wet lab, and the
            overnight signals hidden inside sleep.
          </p>
        </div>

        <div className="research-list">
          {research.map((item) => (
            <article className="research-item" key={item.number}>
              <p className="item-number">{item.number}</p>
              <div className="item-title">
                <p>{item.org}</p>
                <h3>{item.title}</h3>
              </div>
              <div className="item-detail">
                <p className="item-date">{item.date}</p>
                <p>{item.description}</p>
                <ul aria-label="Methods and focus areas">
                  {item.tags.map((tag) => <li key={tag}>{tag}</li>)}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="approach-section" id="approach">
        <div className="section-heading light">
          <div>
            <p className="section-label">03 / How I work</p>
            <h2>From signal<br />to bedside.</h2>
          </div>
          <p>
            I move between disciplines because clinical problems rarely fit
            inside one. The thread is translation: turning evidence into tools
            that can matter in care.
          </p>
        </div>
        <div className="approach-grid">
          <article>
            <span>Ⅰ</span>
            <h3>Find the signal</h3>
            <p>Start with messy physiologic, genomic, or clinical data and ask a focused question.</p>
          </article>
          <article>
            <span>Ⅱ</span>
            <h3>Test the biology</h3>
            <p>Use reproducible analysis and wet-lab evidence to challenge the story the data tells.</p>
          </article>
          <article>
            <span>Ⅲ</span>
            <h3>Design for care</h3>
            <p>Shape the model around clinical workflows, the people using it, and the decision it supports.</p>
          </article>
        </div>
      </section>

      <section className="community-section" id="community">
        <div className="community-index">04</div>
        <div className="community-copy">
          <p className="section-label">Beyond the lab / Hack4Health</p>
          <h2>Making healthcare AI a team sport.</h2>
          <p>
            As founder and president of Hack4Health, I built a student-led
            healthcare AI initiative around research-driven machine-learning
            competitions and real clinical datasets.
          </p>
        </div>
        <div className="community-stats">
          <div><strong>2,000+</strong><span>community members</span></div>
          <div><strong>3,000+</strong><span>hackathon participants</span></div>
          <div><strong>$100K+</strong><span>sponsorship deals</span></div>
        </div>
      </section>

      <section className="toolkit-section">
        <p className="section-label">05 / Toolkit</p>
        <div className="toolkit-row">
          {skills.map((skill, index) => (
            <span key={skill}><i>{String(index + 1).padStart(2, "0")}</i>{skill}</span>
          ))}
        </div>
      </section>

      <section className="contact-section" id="contact">
        <p className="section-label">06 / Contact</p>
        <h2>Have a hard problem in health?</h2>
        <a href="mailto:2arnavmana@gmail.com">
          Let&apos;s work on it <span aria-hidden="true">↗</span>
        </a>
        <div className="contact-meta">
          <p>Based in San Jose, California</p>
          <p><a href="tel:+14086561171">+1 408 656 1171</a></p>
          <p><a href="mailto:2arnavmana@gmail.com">2arnavmana@gmail.com</a></p>
        </div>
      </section>

      <footer>
        <a className="mark footer-mark" href="#top" aria-label="Back to top">AM<span>.</span></a>
        <p>AI × health · computational biology · translational medicine</p>
        <a href="#top">Back to top ↑</a>
      </footer>
    </main>
  );
}
