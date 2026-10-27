import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Reveal from "../components/Reveal";

const QUOTES = [
  { text: "Chaos isn’t a pit. Chaos is a ladder.", show: "Game of Thrones", year: "2011–2019" },
  { text: "I am not in danger. I am the danger.", show: "Breaking Bad", year: "2008–2013" },
  { text: "I don’t pay for suits. My suits are on the house or the house burns down.", show: "Peaky Blinders", year: "2013–2018" },
  { text: "Every lie we tell incurs a debt to the truth.", show: "Chernobyl", year: "2019" },
  { text: "I don’t play the odds, I play the man.", show: "Suits", year: "2011–2019" },
  { text: "I think human consciousness was a tragic misstep in evolution.", show: "True Detective", year: "2014" },
  { text: "The greatest trick the Devil ever pulled was convincing the world he didn't exist.", show: "The Usual Suspects", year: "1995" },
];

export default function Quotes() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const go = (n: number) => setI((n + QUOTES.length) % QUOTES.length);

  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => go(i + 1), 6500);
    return () => clearTimeout(t);
  }, [i, paused]);

  const q = QUOTES[i];

  return (
    <section
      className="relative overflow-hidden bg-(--color-canvas-2) py-16"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[820px] -translate-x-1/2 -translate-y-1/2 opacity-60"
        style={{ background: "radial-gradient(ellipse at center, rgba(190,25,25,0.28) 0%, transparent 70%)" }}
      />
      <div className="relative mx-auto max-w-6xl px-6">
        <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="text-[11px] uppercase tracking-[0.18em] text-(--color-accent)">Off The Keyboard</div>
            <h2 className="font-display mt-2 text-4xl italic sm:text-5xl">Cinematic Wisdom</h2>
          </div>
          <p className="max-w-[260px] text-sm leading-[1.7] text-(--color-ink-dim)">
            Even developers need a break. Lines from the movies and series that stuck with me.
          </p>
        </Reveal>

        <div className="grid items-center gap-10 border-t border-(--color-ink)/15 pt-10 lg:grid-cols-[1fr_260px]">
          <div className="relative min-h-[260px]">
            <span className="font-display pointer-events-none absolute -left-2 -top-10 select-none text-[160px] leading-none text-(--color-accent)/25">“</span>
            <AnimatePresence mode="wait">
              <motion.figure
                key={i}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="relative pt-8"
              >
                <blockquote className="font-display text-3xl italic leading-[1.25] sm:text-4xl md:text-5xl">
                  {q.text}
                </blockquote>
                <figcaption className="mt-7 flex items-center gap-4 text-[12px] uppercase tracking-[0.2em]">
                  <span className="h-px w-10 bg-(--color-accent)" />
                  <span className="text-(--color-ink)">{q.show}</span>
                  <span className="text-(--color-ink-dim)">{q.year}</span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          <div>
            <ul className="space-y-1">
              {QUOTES.map((x, n) => (
                <li key={x.show}>
                  <button
                    onClick={() => setI(n)}
                    aria-label={`Show quote from ${x.show}`}
                    className={`flex w-full items-center gap-3 py-1.5 text-left text-[12px] uppercase tracking-[0.15em] transition-colors focus-visible:ring-2 focus-visible:ring-(--color-accent) ${
                      n === i ? "text-(--color-ink)" : "text-(--color-ink-dim)/60 hover:text-(--color-ink-dim)"
                    }`}
                  >
                    <span className={`font-display text-xs ${n === i ? "text-(--color-accent)" : ""}`}>0{n + 1}</span>
                    <span className={`h-px transition-all ${n === i ? "w-8 bg-(--color-accent)" : "w-3 bg-(--color-ink)/30"}`} />
                    {x.show}
                  </button>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex gap-3">
              {[["Previous", -1, "←"], ["Next", 1, "→"]].map(([l, d, a]) => (
                <button
                  key={l as string}
                  onClick={() => go(i + (d as number))}
                  aria-label={l as string}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-(--color-ink)/25 transition-colors hover:border-(--color-accent) hover:text-(--color-accent) focus-visible:ring-2 focus-visible:ring-(--color-accent)"
                >
                  {a}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
