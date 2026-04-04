import { Reveal } from "../components/Reveal";
import { ECGPreview } from "../components/ECGPreview";
import type { SiteContent } from "../data/siteContent";

interface HeroSectionProps {
  content: SiteContent;
  typedText: string;
}

export function HeroSection({ content, typedText }: HeroSectionProps) {
  const nameParts = content.name.split(" ");
  const firstName = nameParts.shift() ?? content.name;
  const lastName = nameParts.join(" ");

  return (
    <section
      id="hero"
      className="page-section hero-section"
      data-section-label="Overview"
      aria-labelledby="hero-title"
    >
      <div className="hero-glow" aria-hidden="true" />
      <div className="hero-grid">
        <div className="hero-copy">
          <p className="hero-eyebrow">{content.eyebrow}</p>
          <h1 className="hero-title hero-title--always-visible" id="hero-title">
            <span>{firstName}</span>
            <span>{lastName}</span>
          </h1>
          <Reveal as="p" className="hero-tagline" delay="short">
            {content.tagline}
          </Reveal>
          <Reveal as="p" className="hero-bio" delay="medium">
            {content.bio}
          </Reveal>
          <Reveal as="p" className="hero-collaborator-note" delay="medium">
            {content.collaboratorNote}
          </Reveal>
          <Reveal className="hero-actions" delay="long">
            <a className="button button--primary" href="#investigations">
              Explore selected investigations
            </a>
            <a className="button button--secondary" href="#contact">
              Discuss collaboration
            </a>
          </Reveal>
        </div>
        <div className="hero-sidebar">
          <Reveal className="hero-panel hero-panel--thesis" delay="short">
            <p className="hero-panel__label">Research thesis</p>
            <p className="hero-panel__body">{content.thesis}</p>
          </Reveal>
          <Reveal className="hero-panel hero-panel--live hero-panel--ecg" delay="medium">
            <p className="hero-panel__label">Current thread</p>
            <p className="hero-panel__body hero-panel__body--live">
              {typedText}
              <span className="type-caret" aria-hidden="true" />
            </p>
            <div className="hero-panel__ecg">
              <ECGPreview width={280} height={84} />
              <button
                className="button button--ghost"
                type="button"
                onClick={() => {
                  // placeholder for expanding into interactive demo
                  const el = document.getElementById("ecg-interactive-placeholder");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Open demo
              </button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
