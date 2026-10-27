import Reveal from "../components/Reveal";

const STEPS = [
  {
    num: "01",
    title: "Understand",
    desc: "Defining the problem, the users and the data.",
  },
  {
    num: "02",
    title: "Prototype",
    desc: "Experimenting quickly with models and interfaces.",
  },
  {
    num: "03",
    title: "Build",
    desc: "Engineering clean, maintainable, tested code.",
  },
  {
    num: "04",
    title: "Deploy",
    desc: "Shipping to production and maintaining it.",
  },
];

export default function Process() {
  return (
    <section className="bg-(--color-canvas) py-14">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <h2 className="font-display text-4xl italic sm:text-5xl">
            My Process
          </h2>
          <p className="mt-2 max-w-[340px] text-sm leading-[1.7] text-(--color-ink-dim)">
            How I take an idea from problem to production.
          </p>
        </Reveal>

        <div className="mt-9 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <Reveal key={s.num} delay={i * 0.1} className="border-t border-(--color-ink)/15 pt-5">
              <div className="font-display text-sm text-(--color-accent)">
                {s.num}
              </div>
              <h4 className="mt-3.5 text-[15px] uppercase tracking-wide">
                {s.title}
              </h4>
              <p className="mt-2.5 text-[12.5px] leading-[1.7] text-(--color-ink-dim)">
                {s.desc}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
