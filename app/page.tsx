const work = [
  {
    institution: "UCSF Cardiac Critical Care",
    period: "May 2024 — Present",
    title: "Predictive systems for earlier clinical intervention",
    description:
      "Developing predictive models and clinical workflows for earlier detection of patient deterioration, working directly with cardiac critical-care leadership to keep the work grounded in hospital practice.",
    methods: "Machine learning · Critical care · Clinical workflows",
  },
  {
    institution: "CU Anschutz",
    period: "June 2024 — Present",
    title: "Computational and wet-lab research in HLHS",
    description:
      "Studying hypoplastic left heart syndrome through reproducible single-nucleus RNA-seq pipelines, transcriptomic analysis, and neonatal cardiac fibroblast experiments focused on therapeutic targets.",
    methods: "snRNA-seq · Transcriptomics · Wet lab",
  },
  {
    institution: "Independent Research",
    period: "August 2024 — Present",
    title: "Sleep apnea and outcomes after cardiac arrest",
    description:
      "Leading analyses across MIMIC and eICU to investigate the relationship between obstructive sleep apnea and post-cardiac-arrest outcomes. Submitted to AHA Scientific Sessions 2026.",
    methods: "MIMIC · eICU · Statistical modeling",
  },
  {
    institution: "George B. Moody PhysioNet Challenge",
    period: "January 2026 — Present",
    title: "Multimodal screening for cognitive impairment",
    description:
      "Built a pipeline combining physiologic signals, sleep-stage annotations, expert labels, engineered features, and ensemble learning from polysomnography data.",
    methods: "Top 30 / 250+ unofficial submissions · Signal processing · Ensembles",
  },
];

const expertise = [
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
    <main id="top">
      <header className="header">
        <a className="wordmark" href="#top" aria-label="Arnav Mana, home">
          Arnav Mana
        </a>
        <nav aria-label="Primary navigation">
          <a href="#work">Work</a>
          <a href="#profile">Profile</a>
          <a href="#contact">Contact</a>
          <a
            className="nav-resume"
            href="/Arnav-Mana-Resume-Summer-2026.pdf"
            target="_blank"
            rel="noreferrer"
          >
            Résumé <span aria-hidden="true">↗</span>
          </a>
        </nav>
      </header>

      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-meta">
          <p>Student researcher</p>
          <p>San Jose, California</p>
        </div>
        <h1 id="hero-title">
          Research at the intersection of machine intelligence and
          <span> cardiovascular medicine.</span>
        </h1>
        <div className="hero-bottom">
          <p>
            I work across critical care, computational biology, and translational
            research to build systems that address real clinical problems.
          </p>
          <a href="#work">Selected work <span aria-hidden="true">↓</span></a>
        </div>
      </section>

      <section className="work-section" id="work">
        <div className="section-intro">
          <p className="label">Selected work</p>
          <p className="section-count">04 ongoing programs</p>
        </div>
        <div className="work-list">
          {work.map((item, index) => (
            <article className="work-item" key={item.institution}>
              <div className="work-index">0{index + 1}</div>
              <div className="work-body">
                <div className="work-meta">
                  <p>{item.institution}</p>
                  <p>{item.period}</p>
                </div>
                <h2>{item.title}</h2>
                <p className="work-description">{item.description}</p>
                <p className="work-methods">{item.methods}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="leadership-section" aria-labelledby="leadership-title">
        <div className="section-intro">
          <p className="label">Leadership</p>
          <p className="section-count">Hack4Health · President</p>
        </div>
        <div className="leadership-grid">
          <h2 id="leadership-title">
            Building a research community around real clinical problems.
          </h2>
          <div className="leadership-copy">
            <p>
              I founded Hack4Health as a student-led healthcare AI initiative
              centered on research-driven machine-learning competitions, real
              clinical datasets, and reproducible work.
            </p>
            <dl>
              <div>
                <dt>3,000+</dt>
                <dd>Hackathon participants</dd>
              </div>
              <div>
                <dt>2,000+</dt>
                <dd>Community members</dd>
              </div>
              <div>
                <dt>$100K+</dt>
                <dd>Sponsorships secured</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section className="profile-section" id="profile">
        <div className="section-intro">
          <p className="label">Profile</p>
          <p className="section-count">Methods &amp; focus</p>
        </div>
        <div className="profile-grid">
          <div className="profile-statement">
            <p>
              My work moves between clinical data, biological systems, and
              experimental research.
            </p>
            <p>
              The common thread is translation: rigorous analysis shaped by the
              environment where it needs to work.
            </p>
          </div>
          <ul className="expertise-list" aria-label="Areas of expertise">
            {expertise.map((item, index) => (
              <li key={item}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="contact-section" id="contact">
        <p className="label">Contact</p>
        <h2>Open to serious work on difficult problems in health.</h2>
        <a className="email-link" href="mailto:2arnavmana@gmail.com">
          2arnavmana@gmail.com <span aria-hidden="true">↗</span>
        </a>
        <div className="contact-footer">
          <p>San Jose, CA</p>
          <a href="tel:+14086561171">+1 408 656 1171</a>
          <a
            href="/Arnav-Mana-Resume-Summer-2026.pdf"
            target="_blank"
            rel="noreferrer"
          >
            Download résumé
          </a>
        </div>
      </section>

      <footer className="footer">
        <p>© 2026 Arnav Mana</p>
        <p>AI · Health · Computational Biology</p>
        <a href="#top">Back to top ↑</a>
      </footer>
    </main>
  );
}
