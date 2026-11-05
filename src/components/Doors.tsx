import { useEffect, useRef, useState } from "react";
import { DOORS } from "../data";
import "./Doors.css";

/**
 * Optional extra fields you can add to each item in DOORS:
 *   plate    – text on the brass nameplate (falls back to title)
 *   kicker   – small mono line under the title (falls back to blurb)
 *   services – checklist shown beside the open door (falls back to tags)
 */
type DoorData = (typeof DOORS)[number] & {
  plate?: string;
  kicker?: string;
  services?: string[];
};

// Muted door colours: navy, plum, sage, rust
const PALETTE = [
  { c: "#1f2f52", d: "#0f1830" },
  { c: "#4a2f45", d: "#25141f" },
  { c: "#5f7560", d: "#334234" },
  { c: "#9a4a2c", d: "#5a2514" },
];

type Props = {
  /** Called after the zoom-in animation. Defaults to setting location.hash = door id. */
  onEnter?: (id: string) => void;
};

export default function Doors({ onEnter }: Props) {
  const [active, setActive] = useState<string | null>(null);
  const [entering, setEntering] = useState<string | null>(null);
  const pointer = useRef<string>("mouse");
  const timer = useRef<number | undefined>(undefined);
  const rowRef = useRef<HTMLDivElement>(null);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  // Touch: tapping outside the row closes the open door
  useEffect(() => {
    const away = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" && !rowRef.current?.contains(e.target as Node)) {
        setActive(null);
      }
    };
    document.addEventListener("pointerdown", away);
    return () => document.removeEventListener("pointerdown", away);
  }, []);

  const enter = (id: string) => {
    setEntering(id);
    timer.current = window.setTimeout(() => {
      if (onEnter) onEnter(id);
      else window.location.hash = `/work/${id}`;
      setEntering(null);
      setActive(null);
    }, 650);
  };

  const click = (id: string) => {
    if (entering) return;
    // touch: first tap opens the door, second tap enters
    if (pointer.current === "touch" && active !== id) {
      setActive(id);
      return;
    }
    enter(id);
  };

  return (
    <section className="dx" id="work">
      <div className="shell">
        <p className="eyebrow">My work, one door per skill</p>
        <h2 className="h2">
          Magic happens
          <br />
          behind the doors
        </h2>

        <div
          ref={rowRef}
          className={`dx__row ${active || entering ? "has-active" : ""}`}
          onMouseLeave={() => pointer.current === "mouse" && !entering && setActive(null)}
        >
          {(DOORS as DoorData[]).map((d, i) => {
            const tone = PALETTE[i % PALETTE.length];
            const isOpen = active === d.id || entering === d.id;
            const services = d.services ?? d.tags;
            return (
              <div
                key={d.id}
                className={[
                  "dx-slot",
                  isOpen ? "is-active" : "",
                  entering === d.id ? "is-entering" : "",
                  i >= DOORS.length / 2 ? "is-flip" : "",
                ].join(" ")}
                style={{ ["--c" as string]: tone.c, ["--cd" as string]: tone.d }}
                onPointerEnter={(e) => {
                  pointer.current = e.pointerType;
                  if (e.pointerType === "mouse" && !entering) setActive(d.id);
                }}
              >
                <div className="dx-stage">
                  <button
                    type="button"
                    className={`dx-door ${isOpen ? "is-open" : ""}`}
                    onPointerDown={(e) => (pointer.current = e.pointerType)}
                    onKeyDown={() => (pointer.current = "mouse")}
                    onFocus={() => !entering && setActive(d.id)}
                    onBlur={() => pointer.current === "mouse" && setActive(null)}
                    onClick={() => click(d.id)}
                    aria-expanded={isOpen}
                    aria-label={`${d.title} — open door`}
                  >
                    <span className="dx-frame" />
                    <span className="dx-room" />
                    <span className="dx-leaf">
                      <span className="dx-plate">{d.plate ?? d.title}</span>
                      <span className="dx-enter">Click to enter</span>
                      <span className="dx-knob" />
                      <span className="dx-key" />
                    </span>
                  </button>
                </div>

                <div className="dx-info" aria-hidden={!isOpen}>
                  <h3>{d.title}</h3>
                  <p className="dx-kicker">{d.kicker ?? d.blurb}</p>
                  <ul>
                    {services.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        <p className="dx__hint">Hover a door to peek inside · tap on touch screens</p>
      </div>
    </section>
  );
}