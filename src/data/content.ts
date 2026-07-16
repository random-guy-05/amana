export const site = {
  name: "Arnav Mana",
  monogram: "AM",
  email: "2arnavmana@gmail.com",
  phone: "+1 408 656 1171",
  phoneHref: "tel:+14086561171",
  resume: "/Arnav-Mana-Resume-Summer-2026.pdf",
  place: "San Jose, CA",
};

export const ticker = [
  "Python",
  "R",
  "MATLAB",
  "Machine learning",
  "Signal processing",
  "Statistical modeling",
  "Computational biology",
  "snRNA-seq",
  "MIMIC-IV",
  "Critical care",
] as const;

export const cases = [
  {
    code: "CCU-01",
    where: "UCSF Cardiac Critical Care",
    role: "Student Researcher",
    when: "May 2024 — Present",
    title: "Early detection of clinical deterioration",
    blurb:
      "Developing predictive models and clinical workflows to support earlier recognition of deterioration in cardiac critical care, in collaboration with UCSF CCU leadership.",
    points: [
      "Predictive modeling for earlier identification of patient decline",
      "Deployment-oriented clinical workflow design",
      "Collaboration with cardiac critical care leadership",
    ],
    stack: ["ML", "Critical care", "Workflows"],
  },
  {
    code: "HLHS-02",
    where: "CU Anschutz",
    role: "Research Intern",
    when: "June 2024 — Present",
    title: "Computational analysis of HLHS",
    blurb:
      "Integrating computational and wet-lab methods to study hypoplastic left heart syndrome, including reproducible snRNA-seq pipelines and neonatal cardiac fibroblast culture.",
    points: [
      "Single-nucleus RNA-seq analysis pipelines",
      "Neonatal rat cardiac fibroblast experiments",
      "Investigation of candidate therapeutic targets",
    ],
    stack: ["snRNA-seq", "Wet lab", "Transcriptomics"],
  },
  {
    code: "OSA-03",
    where: "Independent",
    role: "Student Researcher",
    when: "August 2024 — Present",
    title: "Sleep apnea and post-arrest outcomes",
    blurb:
      "Analyzing associations between obstructive sleep apnea and outcomes after cardiac arrest using MIMIC and eICU data. Submitted to AHA Scientific Sessions 2026 with Stanford-affiliated mentorship.",
    points: [
      "Multi-database analysis across MIMIC and eICU",
      "Outcome analysis following cardiac arrest",
      "Abstract submitted to AHA Scientific Sessions 2026",
    ],
    stack: ["MIMIC", "eICU", "Stats"],
  },
  {
    code: "PSG-04",
    where: "PhysioNet Challenge",
    role: "Challenge Participant",
    when: "January 2026 — Present",
    title: "Cognitive screening from sleep signals",
    blurb:
      "Developing a multimodal pipeline for cognitive-impairment screening from polysomnography, combining physiologic signals, sleep-stage annotations, and ensemble models. Ranked in the top 30 of 250+ unofficial entries.",
    points: [
      "Physiologic signals and sleep-stage annotations",
      "Feature engineering and ensemble models",
      "Top-30 ranking among 250+ unofficial entries",
    ],
    stack: ["PSG", "Ensembles", "Signals"],
  },
] as const;

export const hack = {
  name: "Hack4Health",
  when: "Aug 2025 — Present",
  line: "A student-led community running clinical machine-learning hackathons with real-world health data.",
  stats: [
    { n: "3,000+", s: "Hackathon participants" },
    { n: "2,000+", s: "Community members" },
    { n: "$100K+", s: "Sponsorship" },
  ],
};
