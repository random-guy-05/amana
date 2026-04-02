import { useEffect, useState } from "react";
import { GlowCard } from "../components/GlowCard";
import { Reveal } from "../components/Reveal";
import { SectionHeading } from "../components/SectionHeading";
import type { ProjectItem } from "../data/siteContent";

interface InvestigationsSectionProps {
  projects: ProjectItem[];
  onProjectActive: (index: number) => void;
}

export function InvestigationsSection({
  projects,
  onProjectActive,
}: InvestigationsSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeProject = projects[activeIndex] ?? projects[0];

  useEffect(() => {
    onProjectActive(activeIndex);
  }, [activeIndex, onProjectActive]);

  function moveActive(direction: -1 | 1) {
    setActiveIndex((current) => {
      const nextIndex = current + direction;
      if (nextIndex < 0) {
        return 0;
      }

      if (nextIndex >= projects.length) {
        return projects.length - 1;
      }

      return nextIndex;
    });
  }

  return (
    <section
      id="investigations"
      className="page-section section-panel"
      data-section-label="Research"
      aria-labelledby="investigations-title"
    >
      <div className="section-count" aria-hidden="true">
        02
      </div>
      <SectionHeading
        id="investigations-title"
        kicker="Research"
        title="Selected investigations"
      />
      <Reveal as="p" className="section-intro" delay="short">
        Instead of a project carousel, this section is organized like a compact
        research dossier. Each chapter describes the question, method, signal,
        and why the work matters.
      </Reveal>
      <Reveal className="investigations-layout" delay="medium">
        <div
          className="chapter-rail"
          role="tablist"
          aria-label="Research investigation chapters"
          onKeyDown={(event) => {
            if (event.key === "ArrowDown" || event.key === "ArrowRight") {
              event.preventDefault();
              moveActive(1);
            }

            if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
              event.preventDefault();
              moveActive(-1);
            }
          }}
        >
          {projects.map((project, index) => (
            <button
              key={project.id}
              id={`chapter-tab-${project.id}`}
              type="button"
              role="tab"
              aria-selected={index === activeIndex}
              aria-controls={`chapter-panel-${project.id}`}
              className={`chapter-tab chapter-tab--${project.tone} ${
                index === activeIndex ? "is-active" : ""
              }`}
              onClick={() => setActiveIndex(index)}
            >
              <span className="chapter-tab__number">{project.numeral}</span>
              <span className="chapter-tab__meta">
                <span className="chapter-tab__org">{project.org}</span>
                <span className="chapter-tab__title">{project.title}</span>
              </span>
            </button>
          ))}
        </div>

        {activeProject ? (
          <GlowCard
            className={`chapter-panel tone-panel-${activeProject.tone}`}
            id={`chapter-panel-${activeProject.id}`}
            role="tabpanel"
            aria-labelledby={`chapter-tab-${activeProject.id}`}
          >
            <div className="chapter-panel__header">
              <div>
                <p className="chapter-panel__eyebrow">
                  {activeProject.org} · {activeProject.timeframe}
                </p>
                <h3 className="chapter-panel__title">{activeProject.title}</h3>
              </div>
              <p className="chapter-panel__status">
                <span
                  className={`chapter-panel__status-dot ${
                    activeProject.status === "Ongoing" ? "is-live" : "is-complete"
                  }`}
                />
                {activeProject.status}
              </p>
            </div>
            <div className="chapter-panel__grid">
              <article className="chapter-panel__block">
                <p className="chapter-panel__label">Question</p>
                <p>{activeProject.question}</p>
              </article>
              <article className="chapter-panel__block">
                <p className="chapter-panel__label">Approach</p>
                <p>{activeProject.approach}</p>
              </article>
              <article className="chapter-panel__block">
                <p className="chapter-panel__label">Signal</p>
                <p>{activeProject.signal}</p>
              </article>
              <article className="chapter-panel__block">
                <p className="chapter-panel__label">Why it matters</p>
                <p>{activeProject.significance}</p>
              </article>
            </div>
            <div className="chapter-panel__tools">
              {activeProject.tools.map((tool) => (
                <span className="chapter-panel__tool" key={tool}>
                  {tool}
                </span>
              ))}
            </div>
          </GlowCard>
        ) : null}
      </Reveal>
    </section>
  );
}
