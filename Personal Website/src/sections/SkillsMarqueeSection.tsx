import { GlowCard } from "../components/GlowCard";
import { Reveal } from "../components/Reveal";
import { SectionHeading } from "../components/SectionHeading";
import type { CapabilityGroup } from "../data/siteContent";

interface SkillsMarqueeSectionProps {
  rows: CapabilityGroup[];
}

export function SkillsMarqueeSection({ rows }: SkillsMarqueeSectionProps) {
  return (
    <section
      id="capabilities"
      className="page-section section-panel"
      data-section-label="Capabilities"
      aria-labelledby="capabilities-title"
    >
      <div className="section-count section-count--small" aria-hidden="true">
        03
      </div>
      <SectionHeading
        id="capabilities-title"
        kicker="Capabilities"
        title="How I contribute"
      />
      <Reveal as="p" className="section-intro" delay="short">
        I try to be useful across the full arc of a project: framing the question,
        doing the analysis, grounding it in biology, and helping the work move
        forward with other people.
      </Reveal>
      <div className="capability-grid">
        {rows.map((row, index) => (
          <Reveal
            className="capability-card-wrap"
            delay={index === 0 ? "none" : index === 1 ? "short" : "medium"}
            key={row.id}
          >
            <GlowCard className={`capability-card tone-panel-${row.tone}`}>
              <p className="capability-card__kicker">{row.title}</p>
              <p className="capability-card__description">{row.description}</p>
              <div className="capability-card__list">
                {row.items.map((item) => (
                  <span className="capability-card__pill" key={item}>
                    {item}
                  </span>
                ))}
              </div>
            </GlowCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
