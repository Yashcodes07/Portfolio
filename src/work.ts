/**
 * Content for every door's page.
 * Keys must match the `id` of each door in src/data.ts: web, ml, llm, write.
 *
 * Images : put them in /public/Work/ and set shot:  "/Work/name.png"
 * Videos : put .mp4 files in /public/Work/ and set video: "/Work/name.mp4"
 *          (if a video is missing or fails, the `shot` image is shown instead)
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
  /** poster image, also the fallback if the video can't play */
  shot?: string;
  /** screen recording that plays inside the device frame */
  video?: string;
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
        video: "/Work/DC.mp4",
        note: "Screen recording of the build",
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
        video: "/Work/AS.mp4",
        note: "Screen recording of the build",
        link: "https://www.akashsan.in",
        device: "monitor",
      },
      {
        kicker: "WEBSITE BUILD · PROTOTYPE",
        title: "Jordan One Take 4",
        subtitle: "Product page · e-commerce concept",
        description:
          "A product page concept where each colourway flies in with smart-animate transitions, with oversized type, colour swatches, size select and add to cart.",
        tags: ["Design&Build", "Smart-Animate", "E-commerce"],
        shot: "/Work/Jd.png",
        video: "/Work/Jd.mp4",
        note: "Screen recording of the build",
        device: "monitor",
      },
      {
        kicker: "WEBSITE BUILD · FREELANCE",
        title: "Personal Portfolio",
        subtitle: "Product designer portfolio",
        description:
          "A dark, type-led portfolio with a large display headline, a project list with hover previews and an about section.",
        tags: ["Design&Build", "Responsive", "Freelance"],
        shot: "/Work/Pf.png",
        video: "/Work/Pf.mp4",
        note: "Screen recording of the build",
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
        video: "/Work/HD.mp4",
        note: "Screen recording of the live demo",
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
        video: "/Work/RS.mp4",
        note: "Screen recording of the live app",
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
        video: "/Work/Qd.mp4",
        note: "Screen recording of the live app",
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