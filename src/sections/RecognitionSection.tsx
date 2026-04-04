import { GlowCard } from "../components/GlowCard";
import { Reveal } from "../components/Reveal";
import { SectionHeading } from "../components/SectionHeading";
import type { RecognitionItem } from "../data/siteContent";

interface RecognitionSectionProps {
  items: RecognitionItem[];
}

export function RecognitionSection({ items }: RecognitionSectionProps) {
  return (
    <section
      id="recognition"
      className="page-section section-panel"
      data-section-label="Evidence"
      aria-labelledby="recognition-title"
    >
      <div className="section-count" aria-hidden="true">
        01
      </div>
      <SectionHeading
        id="recognition-title"
        kicker="Evidence"
        title="Evidence of rigor"
      />
      <Reveal as="p" className="section-intro" delay="short">
        I want the site to show how I work, not just what I have accumulated.
        These are the strongest signals of scientific range, execution discipline,
        and readiness to contribute in serious environments.
      </Reveal>
      <div className="recognition-grid">
        {items.map((item, index) => (
          <Reveal
            className="recognition-item"
            delay={index === 0 ? "none" : index === 1 ? "short" : "medium"}
            key={item.id}
          >
            <GlowCard className="recognition-card" interactive={true}>
              <div className="recognition-card__number-wrap">
                <span className="recognition-card__number">{item.number}</span>
              </div>
              <div className="recognition-card__body">
                <p className="recognition-card__org">{item.category}</p>
                <h3 className="recognition-card__title">{item.title}</h3>
                <p className="recognition-card__framing">{item.framing}</p>
                <p className="recognition-card__detail">{item.detail}</p>
                <ul className="recognition-card__evidence">
                  {item.evidence.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
                {item.metrics ? (
                  <div className="recognition-card__stats">
                    {item.metrics.map((metric) => (
                      <div key={metric.label}>
                        <p className="recognition-card__stat-value">{metric.value}</p>
                        <p className="recognition-card__stat-label">{metric.label}</p>
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            </GlowCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
