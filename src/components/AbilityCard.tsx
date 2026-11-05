import { useEffect, useRef, useState } from "react";

const STATS: [string, number][] = [["Web & UI/UX", 8], ["ML Engineering", 8], ["LLM & AI", 9], ["Tech Writing", 7]];

export default function AbilityCard({ onClose }: { onClose: () => void }) {
  const [flip, setFlip] = useState(false);
  const [shown, setShown] = useState(false);
  const el = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setShown(true), 60);
    const k = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", k);
    return () => { clearTimeout(t); window.removeEventListener("keydown", k); };
  }, [onClose]);

  const move = (e: React.PointerEvent) => {
    const c = el.current!, r = c.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
    c.style.setProperty("--px", String(x * 2)); c.style.setProperty("--py", String(y * 2));
    c.style.setProperty("--ry", `${x * 18}deg`); c.style.setProperty("--rx", `${-y * 14}deg`);
    c.style.setProperty("--lift", "1"); c.classList.add("live");
  };
  const leave = () => {
    const c = el.current!;
    ["--px", "--py", "--ry", "--rx", "--lift"].forEach((v) => c.style.setProperty(v, "0"));
    c.style.setProperty("--ry", "0deg"); c.style.setProperty("--rx", "0deg"); c.classList.remove("live");
  };

  return (
    <div className={`holo ${shown ? "on" : ""}`} role="dialog" aria-modal="true" aria-label="Ability card">
      <button className="holo__x" onClick={onClose}>Close ✕</button>
      <div className="holo__stage">
        <button ref={el} className={`hc ${flip ? "flip" : ""}`} onPointerMove={move} onPointerLeave={leave} onClick={() => setFlip(!flip)} aria-label="Flip card">
          <span className="hc__aura" />
          <span className="hc__in">
            <span className="hc__face hc__front">
              <span className="hc__top"><b>YASH KUMAR</b><em>LV 21</em></span>
              <span className="hc__win">
                <span className="hc__bg" />
                <img className="hc__sub" src="/yash.png" alt="Yash Kumar" />
                <span className="hc__wsh" />
              </span>
              <span className="hc__type">AI ENGINEER · STUDENT</span>
              <span className="hc__stats">
                {STATS.map(([k, v]) => (
                  <span key={k} className="hc__row"><span>{k}</span><span className="hc__meter"><i style={{ width: `${v * 10}%` }} /></span><b className="tnum">{v}</b></span>
                ))}
              </span>
              <span className="hc__foil" /><span className="hc__glare" /><span className="hc__rim" />
            </span>
            <span className="hc__face hc__back">
              <span className="hc__bk">
                <b>YK</b>
                <span>Web · UI/UX · ML · LLMs · Writing</span>
                <em>Available for freelance work</em>
              </span>
              <span className="hc__foil" /><span className="hc__rim" />
            </span>
          </span>
        </button>
        <p className="hc__hint">Move to tilt · click to flip · esc to close</p>
      </div>
    </div>
  );
}
