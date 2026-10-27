import Reveal from "../components/Reveal";

const STATS = [
  { num: "4", label: "Featured Projects" },
  { num: "18+", label: "Technologies" },
  { num: "3", label: "Technical Blogs" },
  { num: "4", label: "Milestones" },
];

export default function Stats() {
  return (
    <section className="border-y border-(--color-ink)/15 bg-(--color-canvas-2) py-8">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-2 text-center sm:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal
              key={s.label}
              delay={i * 0.08}
              className={`py-1.5 ${i < STATS.length - 1 ? "sm:border-r sm:border-(--color-ink)/15" : ""}`}
            >
              <div className="font-display text-4xl font-bold text-(--color-ink)">
                {s.num}
              </div>
              <div className="mt-1 text-[11px] uppercase tracking-[0.15em] text-(--color-ink-dim)">
                {s.label}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
