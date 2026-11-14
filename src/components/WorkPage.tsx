import { useEffect, useRef, useState } from "react";
import { DOORS } from "../data";
import { WORK, type Project } from "../work";
import "./WorkPage.css";

type DoorLite = { id: string; title: string; blurb?: string };

const STICKY_TOP = 92; // px below the top where cards stick
const STEP = 16; // extra px each stacked card sits lower

/** play only when the video is on screen AND not buried under the next stacked card */
function syncVideo(v: HTMLVideoElement) {
  const want = v.dataset.inview === "1" && v.dataset.covered !== "1";
  v.muted = true; // required for autoplay in Safari/Chrome
  if (want) v.play().catch((err) => console.info("[WorkPage] video play() blocked:", v.src, err));
  else v.pause();
}

function Device({ p }: { p: Project }) {
  const kind = p.device ?? "monitor";
  const vid = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);
  const useVideo = !!p.video && !failed;

  useEffect(() => {
    const v = vid.current;
    if (!v) return;
    const io = new IntersectionObserver(
      ([e]) => {
        v.dataset.inview = e.isIntersecting ? "1" : "0";
        syncVideo(v);
      },
      { threshold: 0.35 }
    );
    io.observe(v);
    return () => io.disconnect();
  }, [useVideo]);

  const media = useVideo ? (
    <video
      ref={vid}
      className="wp-dev__video"
      src={p.video}
      poster={p.shot}
      muted
      loop
      playsInline
      preload="metadata"
      disablePictureInPicture
      aria-label={`${p.title} screen recording`}
      onCanPlay={(e) => syncVideo(e.currentTarget)}
      onError={(e) => {
        const v = e.currentTarget;
        console.warn(
          `[WorkPage] video could not load: ${p.video} (error code ${v.error?.code}). ` +
            "Code 4 = file missing at that path or format not supported by this browser. " +
            "Showing the image instead."
        );
        setFailed(true);
      }}
    />
  ) : p.shot ? (
    <img src={p.shot} alt={`${p.title} screenshot`} loading="lazy" />
  ) : (
    <div className="wp-dev__ph">
      <span>{p.title}</span>
    </div>
  );

  if (kind === "monitor") {
    return (
      <div className="wp-dev wp-dev--monitor">
        <div className="wp-mon">
          <div className="wp-mon__body">
            <div className="wp-dev__screen">
              {media}
              <span className="wp-mon__glare" />
            </div>
          </div>
          <div className="wp-mon__neck" />
          <div className="wp-mon__base" />
        </div>
        <div className="wp-mon__shadow" />
      </div>
    );
  }

  return (
    <div className={`wp-dev wp-dev--${kind}`}>
      <div className="wp-dev__screen">{media}</div>
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
        const v = c.querySelector<HTMLVideoElement>("video");
        if (v) {
          const covered = p > 0.85 ? "1" : "0";
          if (v.dataset.covered !== covered) {
            v.dataset.covered = covered;
            syncVideo(v);
          }
        }
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