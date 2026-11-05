import { useEffect, useState } from "react";

const PILLS = [
  { label: "Web & UI/UX", c: "#E5412D", t: "#fff" },
  { label: "ML Engineering", c: "#3F7CE0", t: "#fff" },
  { label: "LLM & AI", c: "#7C5CD6", t: "#fff" },
  { label: "Technical Writing", c: "#D99A2B", t: "#1a1717" },
];

export default function Loader({ onDone }: { onDone: () => void }) {
  const [p, setP] = useState(0);
  const [out, setOut] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const t0 = performance.now();
    const dur = 2600;
    let raf = 0;
    const tick = (t: number) => {
      const k = Math.min(1, (t - t0) / dur);
      setP(Math.round((1 - Math.pow(1 - k, 2.2)) * 100));
      if (k < 1) raf = requestAnimationFrame(tick);
      else {
        setTimeout(() => { setOut(true); onDone(); }, 250);
        setTimeout(() => setGone(true), 1700);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);

  if (gone) return null;
  const shown = Math.floor(p / 25.01) + (p >= 8 ? 1 : 0);
  return (
    <div className={`loader ${out ? "out" : ""}`} style={{ ["--p" as string]: p / 100 }}>
      <div className="ld__bg" />
      <div className="ld__stack">
        {PILLS.map((pl, i) => (
          <div key={pl.label} className={`ld__pill ${i < shown ? "on" : ""}`}
            style={{ ["--k" as string]: i, ["--c" as string]: pl.c, ["--t" as string]: pl.t, ["--dir" as string]: i % 2 ? 1 : -1 }}>
            <span>{pl.label}</span>
          </div>
        ))}
      </div>
      <div className="ld__hud">
        <div className="ld__top"><span><b>Yash Kumar</b> · Portfolio</span><span>AI · Web · ML · Writing</span></div>
        <div className="ld__bot">
          <div className="ld__num"><small>Opening up the work</small>{String(p).padStart(3, "0")}</div>
          <div className="ld__bar"><i /></div>
        </div>
      </div>
    </div>
  );
}
