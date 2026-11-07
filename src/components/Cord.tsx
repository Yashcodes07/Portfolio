import { useEffect, useRef, useState } from "react";

const SHOW_DELAY = 1200; // ms after the hero is ready before the cord drops in

export default function Cord({ onToggle, ready = true }: { onToggle: () => void; ready?: boolean }) {
  const cv = useRef<HTMLCanvasElement>(null);
  const toggle = useRef(onToggle);
  toggle.current = onToggle;
  const [show, setShow] = useState(false);
  const shown = useRef(false);
  const kick = useRef<() => void>(() => {});

  // drop the cord in a moment after the hero has loaded, then give it a little swing
  useEffect(() => {
    if (!ready) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t1 = window.setTimeout(() => { shown.current = true; setShow(true); }, reduce ? 0 : SHOW_DELAY);
    const t2 = window.setTimeout(() => kick.current(), reduce ? 0 : SHOW_DELAY + 650);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [ready]);

  useEffect(() => {
    const c = cv.current!;
    const ctx = c.getContext("2d")!;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const W = 140, H = 420;
    c.width = W * dpr; c.height = H * dpr;
    const N = 15, L = 9;
    const ax = W - 40;
    const pts = Array.from({ length: N }, (_, i) => ({ x: ax, y: i * L, px: ax, py: i * L }));
    const restY = (N - 1) * L;
    kick.current = () => { for (let i = 1; i < N; i++) pts[i].px += i * 0.25; };
    let drag = false, mx = 0, my = 0, maxPull = 0;

    const local = (e: PointerEvent) => {
      const r = c.getBoundingClientRect();
      mx = e.clientX - r.left; my = e.clientY - r.top;
    };
    const down = (e: PointerEvent) => {
      if (!shown.current) return;
      local(e);
      const b = pts[N - 1];
      if (Math.hypot(mx - b.x, my - (b.y + 12)) < 34) { drag = true; maxPull = 0; document.body.style.cursor = "grabbing"; }
    };
    const move = (e: PointerEvent) => {
      if (!shown.current) return;
      local(e);
      if (!drag) {
        const b = pts[N - 1];
        document.body.style.cursor = Math.hypot(mx - b.x, my - (b.y + 12)) < 34 ? "grab" : "";
      }
    };
    const up = () => {
      if (!drag) return;
      drag = false; document.body.style.cursor = "";
      if (maxPull > 34) toggle.current();
    };
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);

    let raf = 0;
    const frame = () => {
      for (let i = 1; i < N; i++) {
        const p = pts[i];
        const vx = (p.x - p.px) * 0.985, vy = (p.y - p.py) * 0.985;
        p.px = p.x; p.py = p.y;
        p.x += vx; p.y += vy + 0.5;
      }
      if (drag) {
        const b = pts[N - 1];
        b.x = Math.max(8, Math.min(W - 8, mx)); b.y = Math.max(restY - 10, Math.min(H - 40, my - 12));
        maxPull = Math.max(maxPull, b.y - restY);
      }
      for (let k = 0; k < 10; k++) {
        pts[0].x = ax; pts[0].y = 0;
        for (let i = 0; i < N - 1; i++) {
          const a = pts[i], b = pts[i + 1];
          const dx = b.x - a.x, dy = b.y - a.y;
          const d = Math.hypot(dx, dy) || 1;
          const diff = (d - L) / d;
          const wa = i === 0 ? 0 : 0.5, wb = drag && i + 1 === N - 1 ? 0 : (i === 0 ? 1 : 0.5);
          a.x += dx * diff * wa; a.y += dy * diff * wa;
          b.x -= dx * diff * wb; b.y -= dy * diff * wb;
        }
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);
      const dark = document.documentElement.dataset.mode === "dark";
      const rope = dark ? "#cdbfa7" : "#b99a6b";
      ctx.lineCap = "round"; ctx.lineJoin = "round";
      ctx.beginPath();
      pts.forEach((p, i) => (i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y)));
      ctx.strokeStyle = "rgba(0,0,0,.25)"; ctx.lineWidth = 4.5; ctx.save(); ctx.translate(2, 2); ctx.stroke(); ctx.restore();
      ctx.strokeStyle = rope; ctx.lineWidth = 3.5; ctx.stroke();
      ctx.setLineDash([2, 5]); ctx.strokeStyle = "rgba(60,40,20,.45)"; ctx.lineWidth = 3.5; ctx.stroke(); ctx.setLineDash([]);
      const b = pts[N - 1], a = pts[N - 2];
      const ang = Math.atan2(b.y - a.y, b.x - a.x) - Math.PI / 2;
      ctx.save(); ctx.translate(b.x, b.y); ctx.rotate(ang);
      const g = ctx.createRadialGradient(-3, 12, 2, 0, 16, 16);
      g.addColorStop(0, "#c98a55"); g.addColorStop(0.6, "#7a4524"); g.addColorStop(1, "#3d2010");
      ctx.fillStyle = g; ctx.beginPath(); ctx.ellipse(0, 16, 9, 15, 0, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
  }, []);

  return <canvas ref={cv} className="cord" style={{
        width: 140,
        height: 420,
        right: "clamp(30px, 5vw, 90px)",
        transform: show ? "translateY(0)" : "translateY(-105%)",
        opacity: show ? 1 : 0,
        transition: "transform 1.1s cubic-bezier(0.22, 1.1, 0.36, 1), opacity 0.4s ease",
      }} aria-hidden="true" />;
}