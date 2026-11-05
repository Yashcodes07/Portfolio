import { useEffect, useState } from "react";
import { ROLES } from "../data";

export default function FlipRole({ running }: { running: boolean }) {
  const [i, setI] = useState(0);
  const [flip, setFlip] = useState(false);
  const next = (i + 1) % ROLES.length;

  useEffect(() => {
    if (!running) return;
    const t = setInterval(() => setFlip(true), 2600);
    return () => clearInterval(t);
  }, [running]);

  useEffect(() => {
    if (!flip) return;
    const t = setTimeout(() => { setI((v) => (v + 1) % ROLES.length); setFlip(false); }, 720);
    return () => clearTimeout(t);
  }, [flip]);

  return (
    <div className="cal" aria-label={`Role: ${ROLES[i]}`}>
      <div className="cal__body">
        <div className="cal__stand" />
        <div className="cal__sizer" aria-hidden="true">{ROLES.map((r) => <span key={r}>{r}</span>)}</div>
        <div className="cal__page"><div className="cal__word">{ROLES[flip ? next : i]}</div></div>
        <div className={`cal__leaf ${flip ? "go" : ""}`}>
          <div className="cal__front"><div className="cal__word">{ROLES[i]}</div></div>
          <div className="cal__back" />
        </div>
        <div className="cal__rings">{Array.from({ length: 12 }).map((_, k) => <i key={k} />)}</div>
        <span className="cal__no tnum">{String(i + 1).padStart(2, "0")} / {String(ROLES.length).padStart(2, "0")}</span>
      </div>
    </div>
  );
}
