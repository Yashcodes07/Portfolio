/**
 * Content for every door's page.
 * Keys must match the `id` of each door in src/data.ts: web, ml, llm, write.
 * Screenshots: put images in /public/work/ and set shot: "/work/name.png".
 */
export type Project = {
  title: string;
  subtitle?: string;
  description: string;
  tags?: string[];
  /** small mono label above the title */
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
  web: {
    intro:
      "Fast, clear websites for real businesses, designed and built in React and shipped to production.",
    projects: [
      {
        kicker: "CLIENT WEBSITE · INDUSTRIAL AUTOMATION",
        title: "Dynatech Controls",
        subtitle: "Corporate website for an automation company",
        description:
          "A client website for a Gurugram-based industrial automation firm with 25+ years in PLC, special purpose machines and machine vision. It presents their services, project gallery, partner network and team, with a brochure download and direct contact for enquiries.",
        tags: ["React", "Responsive", "Freelance"],
        shot: "/Work/DC.png",
        link: "https://dynatechcontrols.in",
        device: "monitor",
      },
      {
        kicker: "CLIENT WEBSITE · LOCAL SERVICES",
        title: "AkashSan Cleaning",
        subtitle: "Booking-focused site for a Delhi NCR cleaning service",
        description:
          "A conversion-focused website for a cleaning business covering carpet, tile, chair, flat and office cleaning. It has clear service breakdowns, testimonials, and WhatsApp and call buttons so customers can book in a tap.",
        tags: ["React", "SEO", "WhatsApp CTA", "Freelance"],
        shot: "/Work/AS.png",
        link: "https://www.akashsan.in",
        device: "monitor",
      },
    ],
  },
  ml: {
    intro:
      "From messy data to trained, evaluated and deployed models that hold up outside the notebook.",
    projects: [
      {
        kicker: "COMPUTER VISION",
        title: "Helmet Detection",
        subtitle: "Detecting riders with and without helmets",
        description:
          "A computer vision project that detects whether riders are wearing helmets, built for road-safety monitoring. It is deployed as a live web demo so you can try the model without any setup.",
        tags: ["Computer Vision", "Deep Learning", "Deployed"],
        shot: "/Work/HD.png",
        link: "https://helmet-detection-project.vercel.app",
        device: "monitor",
      },
    ],
  },
  llm: {
    intro:
      "LLM apps, agents and retrieval systems built with guardrails and real evaluation, not just demos.",
    projects: [
      {
        kicker: "LLM · RAG AGENT",
        title: "RepoSage",
        subtitle: "Ask questions about any codebase",
        description:
          "A production-grade RAG agent that reads a code repository and answers questions about it, grounded in the actual source. Built to help developers understand unfamiliar codebases quickly instead of searching file by file.",
        tags: ["RAG", "LLM", "Agents"],
        shot: "/Work/RS.png",
        link: "https://reposage-lake.vercel.app",
        device: "monitor",
      },
      {
        kicker: "LLM · AI ENGINEERING",
        title: "QueDB",
        subtitle: "AI database engine",
        description:
          "An AI-powered database engine that lets you work with your data using natural language instead of writing queries by hand. Built as a live web app.",
        tags: ["LLM", "Natural language", "Databases"],
        shot: "/Work/QD.png",
        link: "https://quedb.vercel.app",
        device: "monitor",
      },
    ],
  },
  write: {
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