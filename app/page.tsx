const research = [
  {
    institution: "UCSF Cardiac Critical Care",
    period: "May 2024 — Present",
    title: "Predictive models for earlier detection of patient deterioration",
    description:
      "Developing clinical workflows and predictive systems in direct collaboration with cardiac critical-care leadership, with a focus on translation into real hospital settings.",
    methods: "Machine learning / Critical care / Clinical workflows",
  },
  {
    institution: "CU Anschutz",
    period: "June 2024 — Present",
    title: "Computational and wet-lab research in hypoplastic left heart syndrome",
    description:
      "Building reproducible single-nucleus RNA-seq pipelines and transcriptomic workflows alongside neonatal cardiac fibroblast experiments focused on therapeutic targets.",
    methods: "snRNA-seq / Transcriptomics / Wet lab",
  },
  {
    institution: "Independent Research",
    period: "August 2024 — Present",
    title: "Obstructive sleep apnea and outcomes after cardiac arrest",
    description:
      "Leading analyses across MIMIC and eICU databases. The work was submitted to AHA Scientific Sessions 2026 under physician mentorship.",
    methods: "MIMIC / eICU / Statistical modeling",
  },
  {
    institution: "George B. Moody PhysioNet Challenge",
    period: "January 2026 — Present",
    title: "Multimodal screening for cognitive impairment from sleep data",
    description:
      "Designed a pipeline combining physiologic signals, sleep-stage annotations, expert labels, engineered features, and ensemble learning from polysomnography.",
    methods: "Top 30 of 250+ unofficial submissions / Signal processing / Ensembles",
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
        <a className="monogram" href="#top" aria-label="Arnav Mana, home">AM</a>
        <p className="edition">Research portfolio · 2026</p>
        <nav aria-label="Primary navigation">
          <a href="#research">Research</a>
          <a href="#profile">Profile</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <section className="hero" aria-labelledby="hero-name">
        <div className="hero-kicker">
          <p>AI &amp; Health Researcher</p>
          <p>San Jose, California</p>
        </div>
        <h1 id="hero-name" aria-label="Arnav Mana">
          <span>Arnav</span>
          <span>Mana</span>
        </h1>
        <div className="hero-footer">
          <p className="hero-role">Cardiac critical care,<br />computational biology<br />&amp; translational medicine.</p>
          <p className="hero-summary">
            Student researcher building intelligent systems around real clinical
            problems—from physiologic signals to cellular biology.
          </p>
          <a href="#research">View research <span aria-hidden="true">↓</span></a>
        </div>
      </section>

      <section className="thesis" aria-labelledby="thesis-title">
        <p className="section-number">00</p>
        <h2 id="thesis-title">
          Better models begin with a closer understanding of
          <em> biology and care.</em>
        </h2>
        <p className="thesis-note">
          My work crosses data, experiments, and clinical workflows because the
          problems that matter rarely stay inside one discipline.
        </p>
      </section>

      <section className="research-section" id="research">
        <div className="section-heading">
          <p className="section-number">01</p>
          <h2>Selected<br /><em>research</em></h2>
          <p>Four active programs across critical care, cardiovascular biology, and multimodal health data.</p>
        </div>

        <div className="research-list">
          {research.map((item, index) => (
            <article className="research-item" key={item.institution}>
              <p className="research-index">{String(index + 1).padStart(2, "0")}</p>
              <div className="research-main">
                <div className="research-meta">
                  <p>{item.institution}</p>
                  <p>{item.period}</p>
                </div>
                <h3>{item.title}</h3>
              </div>
              <div className="research-detail">
                <p>{item.description}</p>
                <p>{item.methods}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="leadership" aria-labelledby="leadership-title">
        <div className="leadership-topline">
          <p className="section-number">02</p>
          <p>Leadership · August 2025 — Present</p>
        </div>
        <h2 id="leadership-title">Hack<em>4</em>Health</h2>
        <div className="leadership-grid">
          <p className="leadership-statement">
            Building a student research community around real clinical data and
            reproducible machine learning.
          </p>
          <p className="leadership-description">
            I founded and lead Hack4Health, a healthcare AI initiative centered
            on multi-month Kaggle hackathons and research-driven competition.
          </p>
        </div>
        <dl className="impact-list">
          <div><dt>3,000+</dt><dd>Hackathon participants</dd></div>
          <div><dt>2,000+</dt><dd>Community members</dd></div>
          <div><dt>$100K+</dt><dd>Sponsorships secured</dd></div>
        </dl>
      </section>

      <section className="profile-section" id="profile">
        <div className="section-heading profile-heading">
          <p className="section-number">03</p>
          <h2>Methods &amp;<br /><em>focus</em></h2>
          <p>Fluent across analysis, software, and experimental research.</p>
        </div>
        <div className="profile-body">
          <p>
            I&apos;m interested in AI systems that earn their place in healthcare:
            technically rigorous, clinically grounded, and designed for the
            environments where decisions are made.
          </p>
          <ol className="expertise-list">
            {expertise.map((item, index) => (
              <li key={item}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <span>{item}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div className="contact-topline">
          <p className="section-number">04</p>
          <p>Open to research collaboration</p>
        </div>
        <h2>Let&apos;s <em>talk.</em></h2>
        <a className="email-link" href="mailto:2arnavmana@gmail.com">
          <span>2arnavmana@gmail.com</span><span aria-hidden="true">↗</span>
        </a>
        <div className="contact-meta">
          <p>San Jose, California</p>
          <a href="tel:+14086561171">+1 408 656 1171</a>
          <a href="/Arnav-Mana-Resume-Summer-2026.pdf" target="_blank" rel="noreferrer">
            Résumé ↗
          </a>
        </div>
      </section>

      <footer className="footer">
        <p>© 2026 Arnav Mana</p>
        <p>AI × Health</p>
        <a href="#top">Back to top ↑</a>
      </footer>
    </main>
  );
}
