import { useEffect, useRef, useState } from "react";
import { DOORS } from "../data";
import { WORK, type Project } from "./Work";
import "./WorkPage.css";

type DoorLite = { id: string; title: string; blurb?: string };

const STICKY_TOP = 92; // px below the top where cards stick
const STEP = 16; // extra px each stacked card sits lower

function Device({ p }: { p: Project }) {
  const kind = p.device ?? "monitor";
  return (
    <div className={`wp-dev wp-dev--${kind}`}>
      <div className="wp-dev__screen">
        {p.shot ? (
          <img src={p.shot} alt={`${p.title} screenshot`} loading="lazy" />
        ) : (
          <div className="wp-dev__ph">
            <span>{p.title}</span>
          </div>
        )}
      </div>
      {kind === "monitor" && <div className="wp-dev__stand" />}
    </div>
  );
}

export default function WorkPage({ id, onClose }: { id: string; onClose: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const [showTop, setShowTop] = useState(false);

  const doors = DOORS as unknown as DoorLite[];
  const door = doors.find((d) => d.id === id);
  const data = WORK[id];
  const title = door?.title ?? id;
  const intro = data?.intro ?? door?.blurb ?? "";
  const projects = data?.projects ?? [];

  useEffect(() => {
    if (!data) {
      console.info(
        `[WorkPage] no entry in work.ts for door id "${id}". Add a key named exactly "${id}". ` +
          `Door ids in DOORS: ${doors.map((d) => d.id).join(", ")}`
      );
    }
  }, [id, data, doors]);

  // go to top on open, lock the page behind, Esc to leave
  useEffect(() => {
    const el = root.current!;
    el.scrollTo(0, 0);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const key = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", key);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", key);
    };
  }, [id, onClose]);

  // stacking effect: as the next card slides over, shrink + dim the one below it
  useEffect(() => {
    const el = root.current!;
    let raf = 0;
    const update = () => {
      raf = 0;
      const cards = Array.from(el.querySelectorAll<HTMLElement>(".wp-card"));
      const top = el.getBoundingClientRect().top;
      cards.forEach((c, i) => {
        const next = cards[i + 1];
        let p = 0;
        if (next) {
          const h = c.offsetHeight;
          const nextTop = next.getBoundingClientRect().top - top;
          const t0 = STICKY_TOP + i * STEP;
          p = Math.min(1, Math.max(0, (t0 + h - nextTop) / Math.max(1, h - STEP)));
        }
        c.style.setProperty("--p", p.toFixed(3));
      });
      setShowTop(el.scrollTop > 400);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [id, projects.length]);

  const go = (hash: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.hash = hash;
  };

  return (
    <div className="wp" ref={root} role="dialog" aria-modal="true" aria-label={`${title} projects`}>
      <header className="wp-hdr">
        <nav className="wp-nav">
          <a href="#top" onClick={go("top")}>Home</a>
          {doors.map((d) => (
            <a
              key={d.id}
              href={`#/work/${d.id}`}
              className={d.id === id ? "is-on" : ""}
              onClick={go(`/work/${d.id}`)}
            >
              {d.title}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              root.current?.querySelector("#wp-contact")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Contact
          </a>
        </nav>
      </header>

      <main className="wp-shell">
        <h1 className="wp-h1">{title}</h1>
        {intro && <p className="wp-intro">{intro}</p>}

        <div className="wp-stack">
          {projects.length === 0 && (
            <article className="wp-card" style={{ ["--i" as string]: 0 }}>
              <div className="wp-card__txt">
                <p className="wp-kicker">COMING SOON</p>
                <h2 className="wp-title">Projects are on the way</h2>
                <p className="wp-desc">
                  Add projects for this door in <code>work.ts</code> under the key <code>{id}</code>.
                </p>
              </div>
            </article>
          )}

          {projects.map((p, i) => (
            <article
              key={p.title + i}
              className="wp-card"
              style={{ ["--i" as string]: i, ["--z" as string]: i + 1 }}
            >
              <div className="wp-card__txt">
                {p.kicker && <p className="wp-kicker">{p.kicker}</p>}
                <h2 className="wp-title">{p.title}</h2>
                {p.subtitle && <p className="wp-sub">{p.subtitle}</p>}
                <p className="wp-desc">{p.description}</p>
                {p.tags && (
                  <ul className="wp-tags">
                    {p.tags.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                )}
                {p.link && (
                  <a className="wp-link" href={p.link} target="_blank" rel="noreferrer">
                    View project ↗
                  </a>
                )}
                {p.note && <p className="wp-note">{p.note}</p>}
              </div>
              <div className="wp-card__vis">
                <Device p={p} />
              </div>
            </article>
          ))}
        </div>
      </main>

      <section className="wp-cta" id="wp-contact">
        <div className="wp-shell">
          <p className="wp-eyebrow"><i /> Available for new work</p>
          <h2 className="wp-cta__h">
            Need something built?
            <br />
            <span>Let's make it happen.</span>
          </h2>
          <p className="wp-cta__p">
            AI products, web interfaces, ML systems or technical writing — tell me what you need and
            I'll reply within a day.
          </p>
          <a className="wp-btn" href="mailto:hello@example.com">
            Hire me <span>→</span>
          </a>

          <div className="wp-cols">
            <div>
              <h4>Work</h4>
              {doors.map((d) => (
                <a key={d.id} href={`#/work/${d.id}`} onClick={go(`/work/${d.id}`)}>
                  {d.title}
                </a>
              ))}
            </div>
            <div>
              <h4>Navigate</h4>
              <a href="#top" onClick={go("top")}>Home</a>
              <a href="#story" onClick={go("story")}>My story</a>
            </div>
            <div>
              <h4>Status</h4>
              <span>Available for work</span>
              <span>Remote-first, worldwide</span>
            </div>
          </div>
          <p className="wp-base">© 2026 Yash Kumar. Designed and built by Yash.</p>
        </div>
      </section>

      <button className="wp-back" onClick={onClose}>
        ← Back to the doors
      </button>
      <button
        className={`wp-up ${showTop ? "is-on" : ""}`}
        aria-label="Scroll to top"
        onClick={() => root.current?.scrollTo({ top: 0, behavior: "smooth" })}
      >
        ↑
      </button>
    </div>
  );
}