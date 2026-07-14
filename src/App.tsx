import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef } from "react";
import { Reveal, RevealArticle, RevealLi, ease } from "./components/Reveal";
import { expertise, leadership, research, site } from "./data/content";

function Ambient() {
  return (
    <div className="ambient" aria-hidden="true">
      <motion.div
        className="ambient-orb ambient-orb-a"
        animate={{ x: [0, 40, -20, 0], y: [0, -30, 20, 0], scale: [1, 1.08, 0.96, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="ambient-orb ambient-orb-b"
        animate={{ x: [0, -50, 30, 0], y: [0, 40, -25, 0], scale: [1, 0.94, 1.1, 1] }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="ambient-grain" />
    </div>
  );
}

function Header() {
  return (
    <motion.header
      className="header"
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease }}
    >
      <a className="monogram" href="#top" aria-label={`${site.name}, home`}>
        {site.monogram}
      </a>
      <p className="edition">Research portfolio · 2026</p>
      <nav aria-label="Primary navigation">
        <a href="#research">Research</a>
        <a href="#profile">Profile</a>
        <a href="#contact">Contact</a>
      </nav>
    </motion.header>
  );
}

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.15]);

  return (
    <section className="hero" ref={ref} aria-labelledby="hero-name">
      <motion.div style={{ y, opacity }} className="hero-inner">
        <motion.div
          className="hero-kicker"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease }}
        >
          <p>{site.role}</p>
          <p>{site.location}</p>
        </motion.div>

        <h1 id="hero-name" aria-label={site.name}>
          <motion.span
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.25, ease }}
          >
            Arnav
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.38, ease }}
          >
            Mana
          </motion.span>
        </h1>

        <motion.div
          className="hero-footer"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.55, ease }}
        >
          <p className="hero-role">
            Cardiac critical care,
            <br />
            computational biology
            <br />
            &amp; translational medicine.
          </p>
          <p className="hero-summary">{site.summary}</p>
          <a href="#research">
            View research <span aria-hidden="true">↓</span>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}

function ResearchItem({
  item,
  index,
}: {
  item: (typeof research)[number];
  index: number;
}) {
  return (
    <RevealArticle className="research-item" delay={index * 0.06}>
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
    </RevealArticle>
  );
}

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <>
      <Ambient />
      <motion.div className="progress" style={{ scaleX }} aria-hidden="true" />
      <main id="top">
        <Header />
        <Hero />

        <section className="thesis" aria-labelledby="thesis-title">
          <Reveal>
            <p className="section-number">00</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 id="thesis-title">
              Better models begin with a closer understanding of
              <em> biology and care.</em>
            </h2>
          </Reveal>
          <Reveal className="thesis-note" delay={0.16}>
            <p>{site.thesisNote}</p>
          </Reveal>
        </section>

        <section className="research-section" id="research">
          <Reveal className="section-heading">
            <p className="section-number">01</p>
            <h2>
              Selected
              <br />
              <em>research</em>
            </h2>
            <p>
              Four active programs across critical care, cardiovascular biology,
              and multimodal health data.
            </p>
          </Reveal>

          <div className="research-list">
            {research.map((item, index) => (
              <ResearchItem key={item.institution} item={item} index={index} />
            ))}
          </div>
        </section>

        <section className="leadership" aria-labelledby="leadership-title">
          <Reveal className="leadership-topline">
            <p className="section-number">02</p>
            <p>Leadership · {leadership.period}</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 id="leadership-title">
              Hack<em>4</em>Health
            </h2>
          </Reveal>
          <Reveal className="leadership-grid" delay={0.14}>
            <p className="leadership-statement">{leadership.statement}</p>
            <p className="leadership-description">{leadership.description}</p>
          </Reveal>
          <dl className="impact-list">
            {leadership.stats.map((stat, index) => (
              <Reveal key={stat.label} delay={0.08 + index * 0.08}>
                <dt>{stat.value}</dt>
                <dd>{stat.label}</dd>
              </Reveal>
            ))}
          </dl>
        </section>

        <section className="profile-section" id="profile">
          <Reveal className="section-heading profile-heading">
            <p className="section-number">03</p>
            <h2>
              Methods &amp;
              <br />
              <em>focus</em>
            </h2>
            <p>Fluent across analysis, software, and experimental research.</p>
          </Reveal>
          <div className="profile-body">
            <Reveal>
              <p>
                I&apos;m interested in AI systems that earn their place in
                healthcare: technically rigorous, clinically grounded, and
                designed for the environments where decisions are made.
              </p>
            </Reveal>
            <ol className="expertise-list">
              {expertise.map((item, index) => (
                <RevealLi key={item} delay={index * 0.04}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <span>{item}</span>
                </RevealLi>
              ))}
            </ol>
          </div>
        </section>

        <section className="contact-section" id="contact">
          <Reveal className="contact-topline">
            <p className="section-number">04</p>
            <p>Open to research collaboration</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2>
              Let&apos;s <em>talk.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <a className="email-link" href={`mailto:${site.email}`}>
              <span>{site.email}</span>
              <span aria-hidden="true">↗</span>
            </a>
          </Reveal>
          <Reveal className="contact-meta" delay={0.2}>
            <p>{site.location}</p>
            <a href={site.phoneHref}>{site.phone}</a>
            <a href={site.resume} target="_blank" rel="noreferrer">
              Résumé ↗
            </a>
          </Reveal>
        </section>

        <footer className="footer">
          <p>© 2026 {site.name}</p>
          <p>AI × Health</p>
          <a href="#top">Back to top ↑</a>
        </footer>
      </main>
    </>
  );
}
