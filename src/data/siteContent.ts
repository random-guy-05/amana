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
  introduction:
    "I study how physiology, biology, and clinical data can give care teams a clearer read on patients before shock is obvious.",
  email: "arnavmana.me@gmail.com",
  projects: [
    {
      id: "lactate-forecasting",
      status: "Ongoing",
      organization: "UCSF Cardiac Critical Care",
      timeframe: "Aug 2025 - Present",
      title: "Forecasting Lactate in Cardiogenic Shock",
      question: "Can lactate become an earlier warning signal for shock progression?",
      approach: "Model hemodynamic modifiers and SHARC phenotypes across evolving failure states.",
      significance: "Test whether a late severity marker can help identify when intervention is needed.",
      methods: ["Python", "PyTorch", "Physiology", "Network analysis"],
    },
    {
      id: "hlhs-axis",
      status: "Ongoing",
      organization: "CU Anschutz School of Medicine",
      timeframe: "May 2024 - Present",
      title: "Glycosphingolipid-Cytokine Axis in HLHS",
      question: "Which signaling relationships may explain progression in hypoplastic left heart syndrome?",
      approach: "Pair pathway analysis with RT-qPCR and ELISA validation of inflammatory interactions.",
      significance: "Connect computational findings to mechanisms that can be tested in the lab.",
      methods: ["RT-qPCR", "ELISA", "Pathway analysis", "Translational biology"],
    },
    {
      id: "shock-topologies",
      status: "Ongoing",
      organization: "Computational Cardiology",
      timeframe: "Aug 2025 - Present",
      title: "Latent Shock Topologies with GATv2",
      question: "Can graph attention models surface shock structure earlier than conventional staging?",
      approach: "Apply graph attention to high-fidelity hemodynamic series to model relational physiology.",
      significance: "Evaluate whether graph-based modeling improves early detection without losing interpretability.",
      methods: ["GATv2", "PyTorch", "Time series", "Representation learning"],
    },
    {
      id: "hypoxia-shield",
      status: "Ongoing",
      organization: "Clinical Outcomes Analysis",
      timeframe: "Aug 2025 - Present",
      title: "Chronic Intermittent Hypoxia and the Metabolic Shield",
      question: "Does chronic intermittent hypoxia from OSA change outcomes after cardiac arrest?",
      approach: "Analyze a 2,653-patient cohort with inverse-probability weighting and mixed-effects models.",
      significance: "Test a clinically meaningful protection hypothesis at population scale.",
      methods: ["R", "IPTW", "Mixed-effects models", "Outcomes analysis"],
    },
  ] satisfies ResearchProject[],
  methods: [
    {
      title: "Start with the decision",
      body: "I use time-series, graph, and predictive models to answer a defined clinical question.",
      skills: "Python, PyTorch, graph learning, feature interpretation",
    },
    {
      title: "Keep the analysis honest",
      body: "I make assumptions visible and use study designs that can hold up to clinical scrutiny.",
      skills: "R, SQL, mixed-effects models, IPTW, cohort analysis",
    },
    {
      title: "Connect model to mechanism",
      body: "I connect computational outputs back to biology and communicate the evidence clearly.",
      skills: "Literature synthesis, RT-qPCR, ELISA, scientific writing",
    },
  ],
  impact: {
    value: "$100K+",
    label: "mobilized for Hack4Health through sponsorships, prizes, and operating support.",
    body: "As co-founder and co-president, I helped grow a health AI initiative that brought students, mentors, and organizations together around applied projects.",
    metrics: [
      ["1,470", "participants engaged across AI4Alzheimers"],
      ["20+", "corporate partners secured"],
      ["20", "research mentors recruited"],
    ] as const,
  },
} as const;
