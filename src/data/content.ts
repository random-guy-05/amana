export const site = {
  name: "Arnav Mana",
  monogram: "AM",
  role: "AI & Health Researcher",
  location: "San Jose, California",
  email: "2arnavmana@gmail.com",
  phone: "+1 408 656 1171",
  phoneHref: "tel:+14086561171",
  resume: "/Arnav-Mana-Resume-Summer-2026.pdf",
  summary:
    "Student researcher building intelligent systems around real clinical problems—from physiologic signals to cellular biology.",
  focus: "Cardiac critical care, computational biology & translational medicine.",
  thesis:
    "Better models begin with a closer understanding of biology and care.",
  thesisNote:
    "My work crosses data, experiments, and clinical workflows because the problems that matter rarely stay inside one discipline.",
};

export const research = [
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
      "Leading analyses across MIMIC and eICU databases. Submitted to AHA Scientific Sessions 2026 under physician mentorship.",
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
] as const;

export const leadership = {
  title: "Hack4Health",
  period: "August 2025 — Present",
  statement:
    "Building a student research community around real clinical data and reproducible machine learning.",
  description:
    "I founded and lead Hack4Health, the largest student-led healthcare AI initiative centered on multi-month Kaggle hackathons and research-driven competition.",
  stats: [
    { value: "3,000+", label: "Hackathon participants" },
    { value: "2,000+", label: "Community members" },
    { value: "$100K+", label: "Sponsorships secured" },
  ],
};

export const expertise = [
  "Computational biology",
  "Machine learning",
  "Signal processing",
  "Critical care",
  "Statistical modeling",
  "Python",
  "MATLAB",
  "R",
] as const;
