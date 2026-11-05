import { useEffect, useRef, useState } from "react";
import { CHAPTERS } from "../data";

export default function Story() {
  const root = useRef<HTMLElement>(null);
  const list = useRef<HTMLUListElement>(null);
  const [ch, setCh] = useState(0);
  const [prog, setProg] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const l = list.current; if (!l) return;
      const items = Array.from(l.children) as HTMLElement[];
      const mid = window.innerHeight * 0.5;
      let best = 0, bd = 1e9;
      items.forEach((el, i) => {
        const r = el.getBoundingClientRect();
        const d = Math.abs(r.top + r.height / 2 - mid);
        if (d < bd) { bd = d; best = i; }
      });
      setCh(best);
      const first = items[0].getBoundingClientRect(), last = items[items.length - 1].getBoundingClientRect();
      const a = first.top + first.height / 2, b = last.top + last.height / 2;
      setProg(Math.max(0, Math.min(1, (mid - a) / (b - a))));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); };
  }, []);

  const c = CHAPTERS[ch];
  return (
    <section className="story" id="story" ref={root}
      style={{ ["--c1" as string]: c.c1, ["--c2" as string]: c.c2, ["--p" as string]: prog }}>
      <div className="story__amb" aria-hidden="true" />
      <div className="shell story__stage">
        <div className="story__clock">
          <p className="eyebrow">My story</p>
          <h2 className="story__h">Let's go back<br />in time.</h2>
          <div className="story__yr" aria-label={c.year}>
            {c.year.split("").map((digit, k) => (
              <span className="dg" key={k}>
                <span className="dg__c" style={{ ["--d" as string]: Number(digit) + 10 }}>
                  {Array.from({ length: 30 }).map((_, n) => <i key={n}>{n % 10}</i>)}
                </span>
              </span>
            ))}
          </div>
          <p className="story__when">{c.when}</p>
          <div className="story__meter tnum">
            <span>{String(ch + 1).padStart(2, "0")}</span><span className="story__of">/ {String(CHAPTERS.length).padStart(2, "0")}</span>
            <span className="story__bar"><b /></span>
          </div>
        </div>
        <div className="story__line">
          <div className="story__rail"><b style={{ height: `${prog * 100}%` }} /><span className="story__dot" style={{ top: `${prog * 100}%` }} /></div>
          <ul className="story__list" ref={list}>
            {CHAPTERS.map((x, i) => (
              <li key={x.year} className={`ch ${i === ch ? "on" : ""}`}>
                <p className="ch__date">{x.when}</p>
                <h3 className="ch__t">{x.title}</h3>
                <p className="ch__org">{x.org}</p>
                <ul className="ch__b">{x.bullets.map((b) => <li key={b}>{b}</li>)}</ul>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
