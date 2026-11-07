import { useCallback, useEffect, useState } from "react";
import Loader from "./components/Loader";
import Cord from "./components/Cord";
import FlipRole from "./components/FlipRole";
import Doors from "./components/Doors";
import Story from "./components/Story";
import AbilityCard from "./components/AbilityCard";
import ColorReveal from "./components/ColorReveal";
import WorkPage from "./components/WorkPage";

const NAV = [["Home", "#top"], ["Doors", "#work"], ["My story", "#story"], ["Contact", "#contact"]];

function Clock() {
  const [now, setNow] = useState(new Date());
  useEffect(() => { const t = setInterval(() => setNow(new Date()), 15000); return () => clearInterval(t); }, []);
  const time = now.toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit", hour12: true }).toLowerCase();
  const date = now.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
  return (
    <div className="chip clock"><span className="clock__lbl">Local time</span><span className="clock__time tnum">{time}</span><span className="clock__sep">•</span><span className="clock__date">{date}</span></div>
  );
}

export default function App() {
  const [ready, setReady] = useState(false);
  const [card, setCard] = useState(false);
  const [stuck, setStuck] = useState(false);
  const [workId, setWorkId] = useState<string | null>(null);

  // #/work/<doorId> opens that door's project page
  useEffect(() => {
    const read = () => {
      const m = window.location.hash.match(/^#\/work\/(.+)$/);
      setWorkId(m ? decodeURIComponent(m[1]) : null);
    };
    read();
    window.addEventListener("hashchange", read);
    return () => window.removeEventListener("hashchange", read);
  }, []);
  const closeWork = useCallback(() => { window.location.hash = "work"; }, []);

  useEffect(() => { document.body.classList.toggle("ready", ready); }, [ready]);
  useEffect(() => {
    const f = () => setStuck(window.scrollY > 30);
    f(); window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);

  const toggleMode = useCallback(() => {
    const d = document.documentElement;
    const flip = () => { d.dataset.mode = d.dataset.mode === "dark" ? "light" : "dark"; };
    const doc = document as Document & { startViewTransition?: (cb: () => void) => unknown };
    if (doc.startViewTransition) doc.startViewTransition(flip); else flip();
  }, []);
  const done = useCallback(() => setReady(true), []);

  return (
    <>
      <Loader onDone={done} />
      <Cord onToggle={toggleMode} ready={ready} />
      <header className={`hdr rv ${stuck ? "stuck" : ""}`}>
        <div className="shell hdr__in">
          <nav className="nav">{NAV.map(([l, h]) => <a key={l} href={h}>{l}</a>)}</nav>
          <Clock />
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero__vig" />
          <div className="hero__wm" aria-hidden="true">YASH</div>
          <div className="hero__stage">
            <div className="fig" onClick={() => setCard(true)}>
             <ColorReveal src="/y.png" alt="Yash Kumar" />
             <button className="fig__card" onClick={(e) => { e.stopPropagation(); setCard(true); }}>My ability card</button>
            </div>
          </div>
          <div className="shell hero__content">
            <p className="eyebrow rv">Independent · open to work</p>
            <h1 className="h1">
              <span className="line"><span>Hi, I'm Yash.</span></span>
              <span className="line soft"><span style={{ ["--d" as string]: "120ms" }}>I am a</span></span>
            </h1>
            <div className="rv" style={{ ["--d" as string]: "300ms" }}><FlipRole running={ready} /></div>
            <div className="ctas rv" style={{ ["--d" as string]: "500ms" }}>
              <a
                className="btn btn--dark"
                href="mailto:yashk40491@gmail.com?subject=Let's work together"
              >
                Hire me <span className="btn__arr">→</span>
              </a>
              <a className="btn" href="#work">See my work</a>
            </div>
          </div>
          <div className="hero__bar rv"><div className="shell hero__barin"><span>Available for work</span><span className="mid">Remote-first, worldwide</span><span className="scroll">Scroll to explore <i>↓</i></span></div></div>
        </section>

        <Doors />
        <Story />
      </main>

      <footer className="sf" id="contact">
        <div className="shell">
          <p className="eyebrow">Available for new work</p>
          <h2 className="sf__h">Need something built?<br /><span>Let's make it happen.</span></h2>
          <p className="sf__p">AI products, web interfaces, ML systems or technical writing — tell me what you need and I'll reply within a day.</p>
          <div className="ctas">
           <a
            className="btn btn--dark"
            href="mailto:yashk40491@gmail.com?subject=Let's work together"
          >           
            Hire me <span className="btn__arr">→</span>
          </a>
            <a className="btn" href="#work">See my work</a>
          </div>
          <div className="sf__cols">
            <div><h4>Work</h4><a href="#work">Web & UI/UX</a><a href="#work">ML Engineering</a><a href="#work">LLM & AI</a><a href="#work">Technical writing</a></div>
            <div><h4>Navigate</h4><a href="#top">Home</a><a href="#story">My story</a><a href="#contact">Contact</a></div>
            <div><h4>Status</h4><span>Available for work</span><span>Remote-first, worldwide</span></div>
          </div>
          <div className="sf__base"><span>© 2026 Yash Kumar. Designed and built by Yash.</span><a href="#top">Back to top ↑</a></div>
        </div>
      </footer>
      {workId && <WorkPage id={workId} onClose={closeWork} />}
      {card && <AbilityCard onClose={() => setCard(false)} />}
    </>
  );
}