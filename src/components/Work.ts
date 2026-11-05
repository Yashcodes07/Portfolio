/**
 * Content for every door's page.
 *
 * The KEY of each entry must match the `id` of the door in your DOORS array
 * (src/data.ts). Open the browser console on a door page: it logs the id it
 * is looking for, so you can copy it here.
 *
 * Screenshots: put images in /public/work/ and use e.g. shot: "/work/cliq.png".
 * Without a `shot`, a neutral placeholder is shown inside the device frame.
 */
export type Project = {
  title: string;
  subtitle?: string;
  description: string;
  tags?: string[];
  /** small mono label above the title, e.g. "PRODUCT DESIGN" */
  kicker?: string;
  /** small line at the bottom of the card */
  note?: string;
  /** "phone" | "monitor" (default "monitor") */
  device?: "phone" | "monitor";
  shot?: string;
  link?: string;
};

export type Category = {
  intro: string;
  projects: Project[];
};

export const WORK: Record<string, Category> = {
  // ↓ replace these keys with your real door ids
  "web": {
    intro:
      "Interfaces researched, structured and prototyped: from user flows and wireframes to polished, interactive designs ready to build.",
    projects: [
      {
        kicker: "PRODUCT DESIGN",
        title: "Project name",
        subtitle: "One-line summary",
        description:
          "Two or three lines about the problem, what you designed and the result. Replace this text with your own project description.",
        tags: ["Dashboard", "Design system", "Prototype"],
        note: "Screens shown inside a device frame",
        device: "monitor",
      },
      {
        kicker: "MOBILE APP",
        title: "Second project",
        subtitle: "One-line summary",
        description: "Short description of this project and your role in it.",
        tags: ["Mobile", "Figma"],
        device: "phone",
      },
    ],
  },
  "ml": {
    intro:
      "From messy data to trained, evaluated and deployed models that hold up outside the notebook.",
    projects: [
      {
        kicker: "MACHINE LEARNING",
        title: "Project name",
        subtitle: "One-line summary",
        description: "What the model does, how you trained and evaluated it, and what it achieved.",
        tags: ["PyTorch", "scikit-learn", "MLOps"],
      },
    ],
  },
  "llm": {
    intro:
      "LLM apps, agents and retrieval systems built with guardrails and real evaluation, not just demos.",
    projects: [
      {
        kicker: "LLM · AI ENGINEERING",
        title: "Your AI project",
        subtitle: "One-line summary",
        description:
          "A few lines on what it does, the stack behind it (models, retrieval, tools) and how you measured quality.",
        tags: ["LLM", "RAG", "Agents"],
        note: "Replace with your real AI project",
      },
      {
        kicker: "LLM · AI ENGINEERING",
        title: "Another AI project",
        subtitle: "One-line summary",
        description: "Short description of this project.",
        tags: ["Evaluation", "Prompting"],
      },
    ],
  },
  "write": {
    intro:
      "Tutorials and write-ups that make hard ideas easy to follow and easy to act on.",
    projects: [
      {
        kicker: "TECHNICAL WRITING",
        title: "Article or guide title",
        subtitle: "One-line summary",
        description: "Who it is for, what it explains and where it was published.",
        tags: ["Tutorial", "Explainer"],
        link: "https://example.com",
      },
    ],
  },
};