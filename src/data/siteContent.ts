export interface ResearchProject {
  id: string;
  status: "Ongoing" | "Complete";
  organization: string;
  timeframe: string;
  title: string;
  question: string;
  approach: string;
  significance: string;
  methods: string[];
}

export const siteContent = {
  name: "Arnav Mana",
  title: "Clinical AI Researcher",
  eyebrow: "Computational biology · Cardiac critical care · Clinical AI",
  tagline: "Clinically grounded prediction systems for earlier action in high-risk cardiac care.",
  introduction:
    "I work across computational biology, translational cardiology, and clinical AI, with an emphasis on questions where model performance, biological mechanism, and bedside consequence must agree.",
  email: "arnavmana.me@gmail.com",
  focusAreas: [
    ["01", "Forecasting", "Earlier physiologic signal detection in evolving shock."],
    ["02", "Mechanism", "Computational hypotheses grounded in experimental biology."],
    ["03", "Translation", "Models designed around clinical decisions, not metrics alone."],
  ] as const,
  projects: [
    {
      id: "lactate-forecasting",
      status: "Ongoing",
      organization: "UCSF Cardiac Critical Care",
      timeframe: "Aug 2025 - Present",
      title: "Forecasting Lactate in Cardiogenic Shock",
      question: "Can lactate become an earlier, interpretable warning signal for shock progression?",
      approach: "Model hemodynamic modifiers and SHARC phenotypes across evolving failure states.",
      significance: "Test whether a late severity marker can become a forecasting signal for intervention timing.",
      methods: ["Python", "PyTorch", "Physiology", "Network analysis"],
    },
    {
      id: "hlhs-axis",
      status: "Ongoing",
      organization: "CU Anschutz School of Medicine",
      timeframe: "May 2024 - Present",
      title: "Glycosphingolipid-Cytokine Axis in HLHS",
      question: "Which signaling relationships may explain severity and progression in hypoplastic left heart syndrome?",
      approach: "Pair computational pathway reasoning with RT-qPCR and ELISA validation of inflammatory interactions.",
      significance: "Tighten the connection between computational interpretation and experimentally grounded biology.",
      methods: ["RT-qPCR", "ELISA", "Pathway analysis", "Translational biology"],
    },
    {
      id: "shock-topologies",
      status: "Ongoing",
      organization: "Computational Cardiology",
      timeframe: "Aug 2025 - Present",
      title: "Latent Shock Topologies with GATv2",
      question: "Can graph attention models surface latent shock structure earlier than conventional staging?",
      approach: "Apply graph attention to high-fidelity hemodynamic series to capture relational physiology.",
      significance: "Evaluate whether graph-native physiology improves early detection and interpretability.",
      methods: ["GATv2", "PyTorch", "Time series", "Representation learning"],
    },
    {
      id: "hypoxia-shield",
      status: "Ongoing",
      organization: "Clinical Outcomes Analysis",
      timeframe: "Aug 2025 - Present",
      title: "Chronic Intermittent Hypoxia and the Metabolic Shield",
      question: "Does chronic intermittent hypoxia from OSA produce measurable protection after cardiac arrest?",
      approach: "Analyze a 2,653-patient cohort with weighting and mixed-effects methods.",
      significance: "Test a clinically consequential endogenous-protection hypothesis at population scale.",
      methods: ["R", "IPTW", "Mixed-effects models", "Outcomes analysis"],
    },
  ] satisfies ResearchProject[],
  methods: [
    {
      title: "Modeling with clinical intent",
      body: "I use time-series, graph, and predictive models to sharpen decisions that matter at the bedside.",
      skills: "Python, PyTorch, graph learning, feature interpretation",
    },
    {
      title: "Quantitative rigor",
      body: "I work with observational studies and study designs that need to hold up under clinical scrutiny.",
      skills: "R, SQL, mixed-effects models, IPTW, cohort analysis",
    },
    {
      title: "Mechanism and communication",
      body: "I connect computational outputs back to biological mechanism and communicate the evidence clearly.",
      skills: "Literature synthesis, RT-qPCR, ELISA, scientific writing",
    },
  ],
  impact: {
    value: "$100K+",
    label: "mobilized for Hack4Health through sponsorships, prize support, and operating resources.",
    body: "As co-founder and co-president, I helped build a partner-backed health AI initiative that connected students, mentors, and organizations around applied work.",
    metrics: [
      ["1,470", "participants engaged across AI4Alzheimers"],
      ["20+", "corporate partners secured"],
      ["20", "research mentors recruited"],
    ] as const,
  },
} as const;
