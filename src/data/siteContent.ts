export type AccentTone = "gold" | "slate" | "indigo" | "forest" | "rose";

export interface HeroFact {
  label: string;
  value: string;
  note: string;
}

export interface HeroHighlight {
  label: string;
  value: string;
}

export interface EvidenceMetric {
  value: string;
  label: string;
}

export interface RecognitionItem {
  id: string;
  number: string;
  category: string;
  title: string;
  framing: string;
  detail: string;
  evidence: string[];
  metrics?: EvidenceMetric[];
}

export interface ProjectItem {
  id: string;
  numeral: string;
  org: string;
  timeframe: string;
  title: string;
  status: "Ongoing" | "Complete";
  tone: AccentTone;
  question: string;
  approach: string;
  signal: string;
  significance: string;
  tools: string[];
}

export interface CapabilityGroup {
  id: string;
  title: string;
  description: string;
  items: string[];
  tone: AccentTone;
}

export interface LeadershipOutcome {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  context: string;
}

export interface ContactAction {
  label: string;
  href?: string;
  kind: "copy-email" | "link";
  ariaLabel: string;
}

export interface SiteContent {
  seoTitle: string;
  name: string;
  eyebrow: string;
  tagline: string;
  bio: string;
  thesis: string;
  collaboratorNote: string;
  heroFacts: HeroFact[];
  heroHighlights: HeroHighlight[];
  heroPhrases: string[];
  recognition: RecognitionItem[];
  projects: ProjectItem[];
  capabilities: CapabilityGroup[];
  leadership: {
    headlineValue: number;
    headlinePrefix: string;
    headlineSuffix: string;
    headlineLabel: string;
    summary: string;
    role: string;
    initiatives: string[];
    outcomes: LeadershipOutcome[];
  };
  contact: {
    email: string;
    phoneHref: string;
    footerEyebrow: string;
    footerTagline: string;
    footerNote: string;
    actions: ContactAction[];
  };
}

export const siteContent: SiteContent = {
  seoTitle: "Arnav Mana | Clinical AI Researcher in Cardiac Critical Care",
  name: "Arnav Mana",
  eyebrow: "Clinical AI Researcher | Computational Biology | Cardiac Critical Care",
  tagline:
    "Building clinically grounded prediction systems for earlier intervention in high-risk cardiac care.",
  bio:
    "I work at the intersection of computational biology, translational cardiology, and clinical AI.",
  thesis:
    "I focus on problems where model performance, biological mechanism, and clinical consequence must align.",
  collaboratorNote:
    "I am seeking teams in cardiac critical care and translational modeling that value rigor and clinical relevance.",
  heroFacts: [
    {
      label: "Current focus",
      value: "Cardiac critical care and translational modeling",
      note: "Focused on problems where earlier signal detection can change intervention timing.",
    },
    {
      label: "Working modes",
      value: "Modeling, literature synthesis, wet-lab collaboration",
      note: "Comfortable moving between analysis, scientific framing, and experimental context.",
    },
    {
      label: "Looking for",
      value: "Rigorous mentors and clinically meaningful problems",
      note: "Best fit is a setting where careful reasoning and execution are expected.",
    },
  ],
  heroHighlights: [
    { label: "Selected investigations", value: "5 live research threads" },
    { label: "Primary domains", value: "Shock prediction, HLHS signaling, CAD inflammation" },
    { label: "Operating style", value: "Structured, fast-moving, execution-focused" },
  ],
  heroPhrases: [
    "Forecasting cardiogenic shock before visible decompensation.",
    "Linking physiologic signal structure to earlier action.",
    "Tracing inflammatory pathways in cardiac disease.",
    "Executing research under clinical-grade standards.",
  ],
  recognition: [
    {
      id: "eagle-scout",
      number: "01",
      category: "Long-horizon execution",
      title: "Eagle Scout",
      framing: "A durable signal of planning discipline and follow-through.",
      detail:
        "This distinction reflects sustained leadership and the ability to deliver complex work end to end.",
      evidence: [
        "Built a track record of planning and finishing complex work.",
        "Demonstrated sustained leadership over one-off wins.",
      ],
    },
    {
      id: "usabo",
      number: "02",
      category: "Scientific fluency",
      title: "USA Biology Olympiad Semifinalist",
      framing: "Evidence of advanced bioscience reasoning at national standards.",
      detail:
        "Reaching semifinals required depth in cellular biology, genetics, physiology, and rapid problem solving.",
      evidence: [
        "Comfort with advanced biology beyond routine coursework.",
        "Strong performance in high-pressure analytical settings.",
      ],
    },
    {
      id: "academic-foundation",
      number: "03",
      category: "Quantitative foundation",
      title: "Academic record with range",
      framing: "Strong baseline across quantitative work and scientific training.",
      detail:
        "Academic consistency supports the broader signal: independent technical depth and reliable execution.",
      evidence: [
        "Coursework spanning calculus, biology, chemistry, and statistics.",
        "Independent AI and computation study through MIT OpenCourseWare.",
      ],
      metrics: [
        { value: "1570", label: "SAT on first attempt" },
        { value: "4.67", label: "Weighted GPA" },
      ],
    },
  ],
  projects: [
    {
      id: "lactate-architecture",
      numeral: "01",
      org: "UCSF Cardiac Critical Care",
      timeframe: "Aug 2025 - Present",
      title: "Forecasting Lactate in Cardiogenic Shock",
      status: "Ongoing",
      tone: "gold",
      question:
        "Can lactate serve as an earlier and more interpretable warning signal for shock progression?",
      approach:
        "Model hemodynamic modifiers and SHARC phenotypes to forecast lactate across evolving failure states.",
      signal:
        "Identify physiologic feature combinations that become informative before overt decompensation.",
      significance:
        "If validated, lactate becomes a forecasting signal rather than a late severity marker.",
      tools: ["Python", "PyTorch", "High-dimensional physiology", "Network analysis"],
    },
    {
      id: "hlhs-axis",
      numeral: "02",
      org: "CU Anschutz School of Medicine",
      timeframe: "May 2024 - Present",
      title: "Glycosphingolipid-Cytokine Axis in HLHS",
      status: "Ongoing",
      tone: "slate",
      question:
        "Which signaling relationships may help explain severity and progression in hypoplastic left heart syndrome?",
      approach:
        "Pair computational pathway reasoning with RT-qPCR and ELISA validation of inflammatory interactions.",
      signal:
        "Test whether specific pathway interactions track with structural and inflammatory severity.",
      significance:
        "Tighten the bridge between computational interpretation and experimentally grounded biology.",
      tools: ["RT-qPCR", "ELISA", "Pathway analysis", "Translational biology"],
    },
    {
      id: "physiograph",
      numeral: "03",
      org: "Computational Cardiology",
      timeframe: "Aug 2025 - Present",
      title: "Latent Shock Topologies with GATv2",
      status: "Ongoing",
      tone: "indigo",
      question:
        "Can graph attention models surface earlier latent shock structure than conventional staging?",
      approach:
        "Apply graph attention over high-fidelity hemodynamic series to capture missed relational structure.",
      signal:
        "Improve early-stage separation of clinically meaningful shock states.",
      significance:
        "Evaluate whether graph-native physiology improves both early detection and interpretability.",
      tools: ["GATv2", "PyTorch", "Time-series physiology", "Representation learning"],
    },
    {
      id: "hypoxia-shield",
      numeral: "04",
      org: "Clinical Outcomes Analysis",
      timeframe: "Aug 2025 - Present",
      title: "Chronic Intermittent Hypoxia and the Metabolic Shield",
      status: "Ongoing",
      tone: "forest",
      question:
        "Does chronic intermittent hypoxia from OSA produce measurable protection after cardiac arrest?",
      approach:
        "Analyze a 2,653-patient cohort with weighting and mixed-effects methods.",
      signal:
        "Assess whether a reproducible ischemic-tolerance pattern appears in real-world outcomes.",
      significance:
        "Test a clinically consequential endogenous-protection hypothesis with population-scale evidence.",
      tools: ["R", "IPTW", "Mixed-effects models", "Outcomes analysis"],
    },
    {
      id: "cytokine-cad",
      numeral: "05",
      org: "Pathophysiology Review",
      timeframe: "Mar 2024 - Nov 2025",
      title: "Cytokine Networks in Coronary Artery Disease",
      status: "Complete",
      tone: "rose",
      question:
        "Where are CAD inflammatory signaling networks mechanistically fragile or therapeutically underexplored?",
      approach:
        "Synthesized 150+ papers to map cytokine interactions and recurring mechanistic failure points.",
      signal:
        "Highlights persistent immune-signaling patterns to guide targeted intervention hypotheses.",
      significance:
        "Strengthened my ability to convert large literature sets into structured mechanistic maps.",
      tools: ["Literature synthesis", "Network mapping", "CAD pathophysiology", "Scientific writing"],
    },
  ],
  capabilities: [
    {
      id: "computation",
      title: "Computation and modeling",
      description:
        "I use modeling to sharpen clinical questions, not only optimize metrics.",
      items: ["Python", "PyTorch", "Graph learning", "Time-series modeling", "Feature interpretation"],
      tone: "gold",
    },
    {
      id: "analysis",
      title: "Quantitative analysis",
      description:
        "I work with observational data and study designs that must stand up to scrutiny.",
      items: ["R", "SQL", "Mixed-effects models", "IPTW", "Cohort analysis"],
      tone: "slate",
    },
    {
      id: "biology",
      title: "Experimental and translational biology",
      description:
        "I connect computational outputs back to mechanism and experimental reality.",
      items: ["RT-qPCR", "ELISA", "Gel electrophoresis", "PAGE", "Molecular pathway reasoning"],
      tone: "forest",
    },
    {
      id: "execution",
      title: "Execution and communication",
      description:
        "Strong research also depends on operating rhythm, clarity, and team execution.",
      items: ["Scientific writing", "Literature synthesis", "Partner outreach", "Mentor coordination", "Project delivery"],
      tone: "indigo",
    },
  ],
  leadership: {
    headlineValue: 100000,
    headlinePrefix: "$",
    headlineSuffix: "+",
    headlineLabel: "mobilized across sponsorships, prize support, and operating resources for Hack4Health",
    summary:
      "I helped turn Hack4Health into a partner-backed initiative connecting students and mentors around applied health AI.",
    role: "Hack4Health · Co-Founder and Co-President",
    initiatives: [
      "Built an external partner network beyond school momentum.",
      "Created systems that made ambitious projects easier to start and finish.",
      "Turned outreach, sponsorship, and mentor recruitment into repeatable operations.",
    ],
    outcomes: [
      {
        label: "Participants engaged across AI4Alzheimers",
        value: 1470,
        context: "Demonstrated sustained participation at scale.",
      },
      {
        label: "Corporate partners secured",
        value: 20,
        suffix: "+",
        context: "Repeated outreach translated into partner support.",
      },
      {
        label: "Research mentors recruited",
        value: 20,
        context: "Recruited mentors with strong publication records.",
      },
      {
        label: "Annual Coder.com fiscal agreement",
        value: 3,
        prefix: "$",
        suffix: "K/yr",
        context: "Converted relationships into stable operating support.",
      },
    ],
  },
  contact: {
    email: "arnavmana.me@gmail.com",
    phoneHref: "",
    footerEyebrow: "Open to high-rigor research collaboration",
    footerTagline:
      "If your team is advancing cardiac critical care, clinical AI, or translational biology, I would value the opportunity to contribute.",
    footerNote:
      "Email is the best way to connect. I work best in environments with high standards, direct feedback, and clinically meaningful goals.",
    actions: [
      {
        label: "Copy email",
        kind: "copy-email",
        ariaLabel: "Copy email address to clipboard",
      },
    ],
  },
};
