import { motion } from "motion/react";
import HeroScene from "../components/HeroScene";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};
const item = {
  hidden: { opacity: 1, y: 26 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function Hero() {
  return (
    <motion.section
      variants={container}
      initial="hidden"
      animate="show"
      className="relative overflow-hidden pb-8"
    >
      <HeroScene />
      <div
        className="pointer-events-none absolute -top-24 right-[-10%] h-[900px] w-[600px] opacity-50"
        style={{
          background:
            "radial-gradient(ellipse at center, var(--color-canvas-2) 0%, transparent 70%)",
        }}
      />
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <motion.h1
          variants={item}
          className="font-display text-center font-semibold leading-[0.85] text-(--color-ink) text-[62px] sm:text-[140px] md:text-[170px]"
        >
          PORTFOLIO
        </motion.h1>

        <motion.div variants={item} className="relative -mt-4 flex justify-center">
          <div className="relative">
            <img
              src="/img/portrait.webp"
              alt="Yash Kumar, AI and machine learning engineer"
              className="aspect-[4/5] w-[62vw] max-w-[400px] rounded-t-[200px] rounded-b-md object-cover object-top shadow-[0_30px_80px_rgba(220,30,30,0.35)] ring-1 ring-(--color-ink)/20"
            />
            <div className="absolute -right-12 top-[42%] hidden h-[118px] w-[118px] items-center justify-center rounded-full border border-(--color-accent)/50 bg-(--color-canvas)/70 text-center backdrop-blur-md sm:flex">
              <span className="absolute left-3 top-3 h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
              <span className="px-3 text-[9px] uppercase tracking-[0.18em] text-(--color-ink)">
                Available For
                <br />
                New Projects
              </span>
            </div>
            <div className="absolute -left-14 bottom-[18%] hidden rounded-full border border-(--color-ink)/20 bg-(--color-canvas)/70 px-4 py-2.5 text-[10px] uppercase tracking-[0.18em] backdrop-blur-md sm:block">
              <span className="text-(--color-accent)">5+</span> Live Projects
            </div>
          </div>
        </motion.div>

        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <motion.div variants={item}>
            <div className="text-[15px] tracking-[0.24em] text-(--color-accent)">
              I'M YASH KUMAR
            </div>
            <h2 className="font-display mt-1 text-4xl font-bold leading-tight">
              AI &amp; ML ENGINEER
            </h2>
            <div className="mt-1 text-[13px] tracking-[0.22em] text-(--color-ink-dim)">
              &amp; FULL-STACK DEVELOPER
            </div>
            <p className="mt-5 max-w-[340px] text-sm leading-[1.8] text-(--color-ink-dim)">
              B.Tech student in AI &amp; Machine Learning at GGSIPU. I build
              intelligent systems and clean, fast web products that solve
              real problems.
            </p>
          </motion.div>

          <motion.div
            variants={item}
            className="flex flex-col items-start md:items-end text-left md:text-right"
          >
            <p className="font-display text-2xl italic leading-snug">
              Turning data
              <br />
              into products
            </p>
            <ul className="mt-6 space-y-2 text-[13px] tracking-[0.08em] text-(--color-ink-dim)">
              {["MACHINE LEARNING", "DEEP LEARNING & NLP", "FULL-STACK WEB", "GENERATIVE AI"].map(
                (item) => (
                  <li key={item}>
                    <span className="text-(--color-accent)">— </span>
                    {item}
                  </li>
                ),
              )}
            </ul>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
