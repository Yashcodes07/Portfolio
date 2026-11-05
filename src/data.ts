export const ROLES = ["AI Engineer", "Student", "ML Engineer", "UI/UX Designer", "Web Developer", "Technical Writer"];

export const DOORS = [
  { id: "web", n: "01", title: "Web & UI/UX", color: "#E5412D", dark: "#8f2418",
    blurb: "Interfaces that are fast, clear and a little bit delightful — designed in Figma, shipped in React.",
    tags: ["React", "TypeScript", "Figma", "Motion"] },
  { id: "ml", n: "02", title: "ML Engineering", color: "#3F7CE0", dark: "#1d3f80",
    blurb: "From messy data to trained, evaluated and deployed models that hold up outside the notebook.",
    tags: ["PyTorch", "scikit-learn", "MLOps", "Evaluation"] },
  { id: "llm", n: "03", title: "LLM & AI Engineering", color: "#7C5CD6", dark: "#42308a",
    blurb: "RAG pipelines, agents and tool-using assistants, built with guardrails and real evals.",
    tags: ["RAG", "Agents", "Prompting", "Fine-tuning"] },
  { id: "write", n: "04", title: "Technical Writer", color: "#D99A2B", dark: "#7d5710",
    blurb: "Docs, tutorials and write-ups that make hard ideas easy to follow and easy to act on.",
    tags: ["Docs", "Tutorials", "Explainers", "Case studies"] },
];

export const CHAPTERS = [
  { year: "2026", when: "2026 — NOW", title: "AI engineer & student", org: "Independent · remote-first",
    bullets: ["Building LLM-powered products and ML systems end to end, from first sketch to launch.", "Taking on freelance work in AI, web and technical writing."], c1: "229,65,45", c2: "63,124,224" },
  { year: "2025", when: "2025", title: "LLM & AI engineering", org: "Projects & internships",
    bullets: ["Shipped retrieval-augmented assistants and agent workflows with proper evaluation.", "Wrote up the lessons as technical articles."], c1: "124,92,214", c2: "229,65,45" },
  { year: "2024", when: "2024", title: "ML engineering", org: "Coursework & projects",
    bullets: ["Trained and deployed classical and deep-learning models on real datasets.", "Learned to treat data quality and evaluation as the real work."], c1: "63,124,224", c2: "124,92,214" },
  { year: "2023", when: "2023", title: "Web development & UI/UX", org: "Design + code",
    bullets: ["Designed interfaces in Figma and built them in React.", "Started writing documentation and tutorials for my own projects."], c1: "229,65,45", c2: "217,154,43" },
  { year: "2022", when: "2022", title: "Where it started", org: "Computer science",
    bullets: ["Began the degree: code in the classroom, design on the side.", "Found out I like building things people actually use."], c1: "217,154,43", c2: "178,142,132" },
];
