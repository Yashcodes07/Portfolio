import { useEffect, useRef } from "react";

type V = [number, number, number];

function icosahedron() {
  const t = (1 + Math.sqrt(5)) / 2;
  const v: V[] = [
    [-1, t, 0], [1, t, 0], [-1, -t, 0], [1, -t, 0],
    [0, -1, t], [0, 1, t], [0, -1, -t], [0, 1, -t],
    [t, 0, -1], [t, 0, 1], [-t, 0, -1], [-t, 0, 1],
  ];
  const n = v.map((p) => {
    const l = Math.hypot(...p);
    return [p[0] / l, p[1] / l, p[2] / l] as V;
  });
  const edges: [number, number][] = [];
  for (let i = 0; i < n.length; i++)
    for (let j = i + 1; j < n.length; j++) {
      const d = Math.hypot(n[i][0] - n[j][0], n[i][1] - n[j][1], n[i][2] - n[j][2]);
      if (d < 1.15) edges.push([i, j]);
    }
  return { v: n, edges };
}

function torus(R = 1, r = 0.38, U = 28, W = 12) {
  const v: V[] = [];
  const edges: [number, number][] = [];
  for (let i = 0; i < U; i++)
    for (let j = 0; j < W; j++) {
      const a = (i / U) * Math.PI * 2;
      const b = (j / W) * Math.PI * 2;
      v.push([(R + r * Math.cos(b)) * Math.cos(a), r * Math.sin(b), (R + r * Math.cos(b)) * Math.sin(a)]);
      const id = i * W + j;
      edges.push([id, i * W + ((j + 1) % W)]);
      edges.push([id, ((i + 1) % U) * W + j]);
    }
  return { v, edges };
}

export default function HeroScene() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ico = icosahedron();
    const tor = torus();
    const dots = Array.from({ length: 110 }, () => ({
      x: (Math.random() - 0.5) * 2.4,
      y: (Math.random() - 0.5) * 2.4,
      z: Math.random() * 2 - 1,
      s: 0.15 + Math.random() * 0.5,
    }));
    let w = 0, h = 0, dpr = 1, raf = 0;
    let mx = 0, my = 0, sx = 0, sy = 0;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const r = canvas.getBoundingClientRect();
      w = r.width; h = r.height;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const onMove = (e: PointerEvent) => {
      mx = (e.clientX / window.innerWidth - 0.5) * 2;
      my = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const shape = (
      m: { v: V[]; edges: [number, number][] },
      cx: number, cy: number, size: number, ax: number, ay: number, az: number, alpha: number,
    ) => {
      const ca = Math.cos(ax), sa = Math.sin(ax), cb = Math.cos(ay), sb = Math.sin(ay), cc = Math.cos(az), sc = Math.sin(az);
      const P = m.v.map(([x, y, z]) => {
        let y1 = y * ca - z * sa, z1 = y * sa + z * ca;
        let x1 = x * cb + z1 * sb; z1 = -x * sb + z1 * cb;
        const x2 = x1 * cc - y1 * sc; y1 = x1 * sc + y1 * cc;
        const f = 3.2 / (3.2 + z1);
        return [cx + x2 * size * f, cy + y1 * size * f, z1] as V;
      });
      ctx.lineWidth = 1.2;
      for (const [i, j] of m.edges) {
        const a = P[i], b = P[j];
        const d = 1 - (a[2] + b[2] + 2) / 4;
        ctx.strokeStyle = `rgba(255,${40 + 30 * d | 0},${40 + 20 * d | 0},${alpha * (0.15 + 0.85 * d)})`;
        ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.stroke();
      }
      ctx.fillStyle = `rgba(255,120,100,${alpha})`;
      for (const p of P) {
        const d = 1 - (p[2] + 1) / 2;
        ctx.beginPath(); ctx.arc(p[0], p[1], 1 + 1.6 * d, 0, 7); ctx.fill();
      }
    };

    const frame = (time: number) => {
      const t = reduce ? 0 : time / 1000;
      sx += (mx - sx) * 0.05; sy += (my - sy) * 0.05;
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";

      const glow = ctx.createRadialGradient(w / 2, h * 0.42, 0, w / 2, h * 0.42, Math.max(w, h) * 0.55);
      glow.addColorStop(0, "rgba(180,20,20,0.28)");
      glow.addColorStop(0.5, "rgba(110,10,15,0.12)");
      glow.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = glow; ctx.fillRect(0, 0, w, h);

      for (const d of dots) {
        const zz = ((d.z + t * 0.05 * d.s * 4 + 1) % 2) - 1;
        const f = 3 / (3 + zz);
        const px = w / 2 + (d.x + sx * 0.15 * f) * w * 0.4 * f;
        const py = h / 2 + (d.y + Math.sin(t * d.s + d.x * 5) * 0.03 + sy * 0.15 * f) * h * 0.4 * f;
        const a = 0.15 + 0.45 * (1 - (zz + 1) / 2);
        ctx.fillStyle = `rgba(255,70,60,${a})`;
        ctx.beginPath(); ctx.arc(px, py, 0.8 + 1.4 * (1 - (zz + 1) / 2), 0, 7); ctx.fill();
      }

      const mobile = w < 700;
      const base = Math.min(w * (mobile ? 0.22 : 0.15), 190);
      const al = mobile ? 0.45 : 0.9;
      shape(ico, w * (mobile ? 0.14 : 0.18) + sx * 18, h * 0.42 + sy * 12, base, t * 0.35 + sy * 0.4, t * 0.5 + sx * 0.5, t * 0.1, al);
      shape(tor, w * (mobile ? 0.88 : 0.82) - sx * 18, h * 0.3 - sy * 12, base * 0.8, 1.1 + t * 0.3 - sy * 0.4, t * 0.45 - sx * 0.5, t * 0.2, al);
      shape(ico, w * (mobile ? 0.8 : 0.72) - sx * 10, h * 0.6, base * 0.38, -t * 0.5, t * 0.6, 0, al * 0.8);
      shape(tor, w * (mobile ? 0.2 : 0.28) + sx * 10, h * 0.62, base * 0.34, t * 0.4, -t * 0.5, 0.5, al * 0.8);

      ctx.globalCompositeOperation = "source-over";
      raf = reduce ? 0 : requestAnimationFrame(frame);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove);
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return <canvas ref={ref} aria-hidden className="pointer-events-none absolute inset-0 z-0 h-full w-full" />;
}
