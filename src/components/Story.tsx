import { useEffect, useRef, useState } from "react";
import { CHAPTERS } from "../data";
import "./Story.css";

const clamp01 = (n: number) => Math.max(0, Math.min(1, n));

export default function Story() {
  const root = useRef<HTMLElement>(null);
  const list = useRef<HTMLUListElement>(null);
  const cvs = useRef<HTMLCanvasElement>(null);
  const vel = useRef(0); // raw scroll velocity in px/ms, signed (down = positive)
  const cols = useRef({ c1: "229,65,45", c2: "63,124,224" });
  const [ch, setCh] = useState(0);
  const [prog, setProg] = useState(0);

  const c = CHAPTERS[ch];
  cols.current = { c1: c.c1, c2: c.c2 };

  /* ---------- scroll: active chapter, progress, depth of each chapter, velocity ---------- */
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let lastY = window.scrollY;
    let lastT = performance.now();

    const onScroll = () => {
      const l = list.current;
      if (!l) return;

      const now = performance.now();
      const dy = window.scrollY - lastY;
      vel.current = dy / Math.max(8, now - lastT);
      lastY = window.scrollY;
      lastT = now;

      const items = Array.from(l.children) as HTMLElement[];
      const vh = window.innerHeight;
      const mid = vh * 0.5;
      let best = 0,
        bd = 1e9;

      items.forEach((el, i) => {
        const r = el.getBoundingClientRect();
        const centre = r.top + r.height / 2;
        const d = Math.abs(centre - mid);
        if (d < bd) {
          bd = d;
          best = i;
        }
        if (reduce) return;
        // time-tunnel depth: chapters already passed rush towards you and vanish,
        // chapters still ahead sit far away, small and blurred, then fly into focus
        const dn = (centre - mid) / (vh * 0.55);
        const past = dn < 0;
        const e = Math.pow(clamp01(Math.abs(dn)), 1.3);
        const scale = past ? 1 + e * 0.22 : 1 - e * 0.16;
        const opacity = 1 - e * (past ? 1 : 0.85);
        const blur = e * (past ? 10 : 6);
        el.style.opacity = opacity.toFixed(3);
        el.style.transform = `scale(${scale.toFixed(3)})`;
        el.style.filter = blur > 0.2 ? `blur(${blur.toFixed(1)}px)` : "none";
      });

      setCh(best);
      const first = items[0].getBoundingClientRect();
      const last = items[items.length - 1].getBoundingClientRect();
      const a = first.top + first.height / 2;
      const b = last.top + last.height / 2;
      setProg(Math.max(0, Math.min(1, (mid - a) / (b - a))));
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  /* ---------- warp tunnel: stars + time rings, speed follows your scroll ---------- */
  useEffect(() => {
    const canvas = cvs.current;
    const section = root.current;
    if (!canvas || !section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    type Star = { a: number; r: number; z: number };
    const small = window.innerWidth < 760;
    const mk = (z?: number): Star => ({
      a: Math.random() * Math.PI * 2,
      r: 0.12 + Math.random() * 1.1,
      z: z ?? 0.04 + Math.random() * 0.96,
    });
    const stars: Star[] = Array.from({ length: small ? 90 : 170 }, () => mk());
    const rings: number[] = [0.95, 0.76, 0.58, 0.42, 0.28, 0.17];

    let W = 1, H = 1, raf = 0, last = 0, visible = false, v = 0;

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = Math.max(1, Math.round(r.width * dpr));
      H = Math.max(1, Math.round(r.height * dpr));
      canvas.width = W;
      canvas.height = H;
    };

    const frame = (t: number) => {
      raf = requestAnimationFrame(frame);
      if (!visible) return;
      const dt = Math.min(48, Math.max(1, t - (last || t)));
      last = t;

      // ease the signed scroll velocity; raw value decays when you stop scrolling
      vel.current *= 0.93;
      v += (Math.max(-3, Math.min(3, vel.current)) - v) * 0.08;
      const speed = 0.00007 + v * 0.0005; // z units per ms (negative = rewinding)

      const cx = W / 2, cy = H / 2, k = Math.min(W, H) * 0.25;
      const { c1, c2 } = cols.current;
      ctx.clearRect(0, 0, W, H);
      ctx.lineCap = "round";

      // time rings
      const base = Math.min(W, H) * 0.06;
      for (let i = 0; i < rings.length; i++) {
        rings[i] -= speed * dt;
        if (rings[i] < 0.05) rings[i] = 1;
        else if (rings[i] > 1.02) rings[i] = 0.06;
        const z = rings[i];
        const rad = base / z;
        const alpha = Math.max(0, Math.min(0.5, (1 - z) * 0.9)) * (z < 0.12 ? z / 0.12 : 1);
        ctx.strokeStyle = `rgba(${i % 2 ? c2 : c1},${alpha.toFixed(3)})`;
        ctx.lineWidth = (1 + (1 - z) * 2.2) * (W / 1400 + 0.6);
        ctx.beginPath();
        ctx.arc(cx, cy, rad, 0, Math.PI * 2);
        ctx.stroke();
      }

      // star streaks
      const tail = Math.max(-0.5, Math.min(0.5, speed * 150));
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        s.z -= speed * dt;
        const x0 = Math.cos(s.a) * s.r, y0 = Math.sin(s.a) * s.r;
        const sx = cx + (x0 / s.z) * k, sy = cy + (y0 / s.z) * k;
        if (s.z < 0.04 || Math.abs(sx - cx) > W || Math.abs(sy - cy) > H) {
          stars[i] = mk(speed >= 0 ? 1 : 0.05);
          continue;
        }
        if (s.z > 1.02) {
          stars[i] = mk(0.05);
          continue;
        }
        const zt = Math.max(0.03, Math.min(1.6, s.z + tail));
        const tx = cx + (x0 / zt) * k, ty = cy + (y0 / zt) * k;
        const alpha = Math.min(0.9, 0.12 + Math.abs(speed) * 700) * (1 - s.z * 0.55);
        ctx.strokeStyle = `rgba(${i % 3 ? c1 : c2},${alpha.toFixed(3)})`;
        ctx.lineWidth = (0.7 + (1 - s.z) * 2.4) * (W / 1400 + 0.6);
        ctx.beginPath();
        ctx.moveTo(tx, ty);
        ctx.lineTo(sx, sy);
        ctx.stroke();
      }
    };

    resize();
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) last = 0;
    });
    io.observe(section);
    window.addEventListener("resize", resize);
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, []);

  const spin = prog * 900; // minute hand: 2.5 full turns backwards over the whole story

  return (
    <section
      className="story"
      id="story"
      ref={root}
      style={{ ["--c1" as string]: c.c1, ["--c2" as string]: c.c2, ["--p" as string]: prog }}
    >
      <div className="story__amb" aria-hidden="true">
        <canvas className="story__warp" ref={cvs} />
        <svg className="story__clk" viewBox="0 0 200 200">
          <g transform="translate(100 100)">
            <circle r="96" className="clk-ring" />
            <circle r="90" className="clk-ring clk-ring--thin" />
            {Array.from({ length: 60 }).map((_, i) => (
              <line
                key={i}
                x1="0"
                x2="0"
                y1={i % 5 ? -85 : -81}
                y2="-89"
                transform={`rotate(${i * 6})`}
                className={i % 5 ? "clk-tick" : "clk-tick clk-tick--major"}
              />
            ))}
            <line className="clk-hand clk-hand--hr" x1="0" y1="6" x2="0" y2="-50" transform={`rotate(${-spin / 12})`} />
            <line className="clk-hand clk-hand--min" x1="0" y1="8" x2="0" y2="-76" transform={`rotate(${-spin})`} />
            <circle r="3" className="clk-pin" />
          </g>
        </svg>
        <div className="story__flash" key={ch} />
      </div>

      <div className="shell story__stage">
        <div className="story__clock">
          <p className="eyebrow">My story</p>
          <h2 className="story__h">
            Let's go back
            <br />
            in time.
          </h2>
          <div className="story__yr" aria-label={c.year}>
            {c.year.split("").map((digit, k) => (
              <span className="dg" key={k}>
                <span className="dg__c" style={{ ["--d" as string]: Number(digit) + 10 }}>
                  {Array.from({ length: 30 }).map((_, n) => (
                    <i key={n}>{n % 10}</i>
                  ))}
                </span>
              </span>
            ))}
          </div>
          <p className="story__when">{c.when}</p>
          <div className="story__meter tnum">
            <span>{String(ch + 1).padStart(2, "0")}</span>
            <span className="story__of">/ {String(CHAPTERS.length).padStart(2, "0")}</span>
            <span className="story__bar">
              <b />
            </span>
          </div>
        </div>
        <div className="story__line">
          <div className="story__rail">
            <b style={{ height: `${prog * 100}%` }} />
            <span className="story__dot" style={{ top: `${prog * 100}%` }} />
          </div>
          <ul className="story__list" ref={list}>
            {CHAPTERS.map((x, i) => (
              <li key={x.when} className={`ch ${i === ch ? "on" : ""}`}>
                <p className="ch__date">{x.when}</p>
                <h3 className="ch__t">{x.title}</h3>
                <p className="ch__org">{x.org}</p>
                <ul className="ch__b">
                  {x.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}