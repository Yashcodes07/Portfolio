import Reveal from "../components/Reveal";

const WORK = [
  { brand: "QUEDB", cat: "AI Database Engine", img: "/img/work-quedb.png", href: "https://quedb.vercel.app" },
  { brand: "REPOSAGE", cat: "GitHub Repo Analyzer", img: "/img/work-reposage.png", href: "https://reposage-lake.vercel.app" },
  { brand: "HELMET AI", cat: "YOLOv8 Detection", img: "/img/detection_hd.jpg", href: "https://helmet-detection-project.vercel.app" },
  { brand: "DYNATECH", cat: "Website for Client", img: "/img/work-dynatech.png", href: "https://dynatechcontrols.in" },
];

export default function SelectedWork() {
  return (
    <section className="bg-(--color-canvas) py-14">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mb-8 flex flex-wrap items-end justify-between gap-6">
          <h2 className="font-display text-4xl font-extrabold sm:text-5xl">
            SELECTED WORK
          </h2>
          <p className="max-w-[220px] text-sm leading-[1.7] text-(--color-ink-dim)">
            AI products and web builds, each with a live demo.
          </p>
          <a
            href="https://github.com/Yashcodes07" target="_blank" rel="noreferrer"
            className="whitespace-nowrap border-b border-(--color-accent) pb-1 text-[11px] uppercase tracking-[0.2em] text-(--color-accent) focus-visible:ring-2 focus-visible:ring-(--color-accent)"
          >
            More On GitHub
          </a>
        </Reveal>

        <div id="work" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {WORK.map((w, i) => (
            <Reveal key={w.brand} delay={i * 0.12}>
              <a href={w.href} target="_blank" rel="noreferrer" className="block">
              <div className="group relative aspect-[3/4] overflow-hidden rounded bg-black">
                <img
                  src={w.img}
                  alt={`${w.brand} project`}
                  className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                <div
                  className="absolute inset-0 flex flex-col justify-end p-6"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(10,3,4,0.85) 100%)",
                  }}
                >
                  <div className="font-display text-2xl font-bold tracking-wide text-(--color-ink)">
                    {w.brand}
                  </div>
                  <div className="mt-1 text-[10px] uppercase tracking-[0.18em] text-(--color-ink-dim)">
                    {w.cat}
                  </div>
                </div>
              </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
