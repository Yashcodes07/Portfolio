import { useEffect, useRef } from "react";

type Props = {
  src: string;
  alt: string;
  className?: string;
  /** Brush size as a fraction of the image width. */
  radius?: number;
  /** Roughly how long (ms) painted colour takes to fade back to grey. */
  fadeMs?: number;
  /** Shows a magenta box where the colour layer is and logs to the console. */
  debug?: boolean;
};

const KEY: Record<string, number> = { left: 0, top: 0, center: 50, right: 100, bottom: 100 };
const pos = (t: string | undefined) => {
  if (!t) return 0.5;
  if (t in KEY) return KEY[t] / 100;
  const n = parseFloat(t);
  return t.endsWith("%") && !isNaN(n) ? n / 100 : 0.5;
};

/**
 * Renders a normal <img> (so your existing `.fig img { ... }` CSS keeps working)
 * plus an overlay canvas that paints colour wherever the cursor passes.
 * Must be placed inside a positioned parent (e.g. `.fig { position: relative }`).
 */
export default function ColorReveal({ src, alt, className, radius = 0.22, fadeMs = 2200, debug = false }: Props) {
  const imgRef = useRef<HTMLImageElement>(null);
  const cvsRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const image = imgRef.current!;
    const canvas = cvsRef.current!;
    const ctx = canvas.getContext("2d")!;
    if (debug) {
      canvas.style.outline = "2px solid magenta";
      canvas.style.background = "rgba(255,0,255,0.15)";
      console.info("[ColorReveal v4] mounted", { dpr: window.devicePixelRatio });
    }
    const mask = document.createElement("canvas");
    const mctx = mask.getContext("2d")!;

    // keep whatever filter your CSS already puts on the image, add grayscale to it
    const baseFilter = getComputedStyle(image).filter;
    const base = baseFilter && baseFilter !== "none" ? baseFilter : "";
    image.style.filter = `${base} grayscale(1) contrast(1.05)`.trim();
    if (base) canvas.style.filter = base;

    let W = 1, H = 1, raf = 0, lastT = 0, idleAt = 0, running = false;
    let last: { x: number; y: number } | null = null;

    // place the canvas exactly over the image, wherever your CSS put it.
    // Uses LAYOUT size/position (unaffected by animations/transforms) and copies
    // the image's transform, so the canvas moves with the photo instead of resizing.
    const sync = () => {
      const w = image.offsetWidth, h = image.offsetHeight;
      canvas.style.left = `${image.offsetLeft}px`;
      canvas.style.top = `${image.offsetTop}px`;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      const cs = getComputedStyle(image);
      canvas.style.opacity = cs.opacity;
      canvas.style.transform = cs.transform === "none" ? "" : cs.transform;
      canvas.style.transformOrigin = cs.transformOrigin;
      const z = parseInt(cs.zIndex, 10);
      canvas.style.zIndex = isNaN(z) ? "" : String(z + 1);
      canvas.style.mixBlendMode = cs.mixBlendMode;
      // copy a bottom fade / mask if your CSS has one
      const m = cs.getPropertyValue("mask-image") || cs.getPropertyValue("-webkit-mask-image");
      if (m && m !== "none") {
        for (const k of ["mask-image", "mask-size", "mask-position", "mask-repeat"]) {
          const v = cs.getPropertyValue(k) || cs.getPropertyValue("-webkit-" + k);
          canvas.style.setProperty(k, v);
          canvas.style.setProperty("-webkit-" + k, v);
        }
      }
      return { width: w, height: h };
    };

    const guard = <A extends unknown[], R>(name: string, fn: (...a: A) => R) =>
      (...a: A): R | undefined => {
        try { return fn(...a); } catch (err) { console.error("[ColorReveal v4] error in " + name, err); }
      };

    const size = () => {
      const r = sync();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = Math.max(1, Math.round(r.width * dpr));
      H = Math.max(1, Math.round(r.height * dpr));
      if (canvas.width !== W || canvas.height !== H) {
        canvas.width = mask.width = W;
        canvas.height = mask.height = H;
      }
    };

    // draw the colour photo respecting object-fit / object-position
    const drawImage = () => {
      const nw = image.naturalWidth, nh = image.naturalHeight;
      if (!nw || !nh) return;
      const cs = getComputedStyle(image);
      let w = W, h = H;
      const fit = cs.objectFit;
      if (fit === "contain" || fit === "cover" || fit === "scale-down") {
        let s = fit === "cover" ? Math.max(W / nw, H / nh) : Math.min(W / nw, H / nh);
        if (fit === "scale-down") s = Math.min(1, s);
        w = nw * s; h = nh * s;
      } else if (fit === "none") { w = nw; h = nh; }
      const [px, py] = cs.objectPosition.split(" ");
      ctx.drawImage(image, (W - w) * pos(px), (H - h) * pos(py), w, h);
    };

    const brush = (x: number, y: number) => {
      const R = W * radius;
      const g = mctx.createRadialGradient(x, y, 0, x, y, R);
      g.addColorStop(0, "rgba(255,255,255,0.85)");
      g.addColorStop(0.6, "rgba(255,255,255,0.35)");
      g.addColorStop(1, "rgba(255,255,255,0)");
      mctx.globalCompositeOperation = "source-over";
      mctx.fillStyle = g;
      mctx.beginPath();
      mctx.arc(x, y, R, 0, Math.PI * 2);
      mctx.fill();
    };

    const frame = (t: number) => {
      try {
        frameInner(t);
      } catch (err) {
        console.error("[ColorReveal v4] error in frame", err);
        running = false;
      }
    };
    const frameInner = (t: number) => {
      const dt = Math.min(64, Math.max(1, t - lastT || 16));
      lastT = t;
      size();

      mctx.globalCompositeOperation = "destination-out";
      mctx.fillStyle = `rgba(0,0,0,${Math.min(1, Math.max(0.001, 1 - Math.exp(-dt / (fadeMs / 4))))})`;
      mctx.fillRect(0, 0, W, H);

      ctx.globalCompositeOperation = "source-over";
      ctx.clearRect(0, 0, W, H);
      drawImage();
      ctx.globalCompositeOperation = "destination-in";
      ctx.drawImage(mask, 0, 0);

      if (t > idleAt) {
        mctx.clearRect(0, 0, W, H);
        ctx.clearRect(0, 0, W, H);
        running = false;
        return;
      }
      raf = requestAnimationFrame(frame);
    };

    const start = () => {
      idleAt = performance.now() + fadeMs + 400;
      if (!running) {
        running = true;
        lastT = performance.now();
        raf = requestAnimationFrame(frame);
      }
    };

    const onMove = (e: PointerEvent) => {
      const r = image.getBoundingClientRect();
      const inside =
        e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
      if (!inside || r.width === 0) { last = null; return; }
      size();
      const x = ((e.clientX - r.left) / r.width) * W;
      const y = ((e.clientY - r.top) / r.height) * H;
      if (last) {
        const dx = x - last.x, dy = y - last.y, dist = Math.hypot(dx, dy);
        const step = Math.max(4, W * radius * 0.3);
        for (let d = step; d < dist; d += step) brush(last.x + (dx * d) / dist, last.y + (dy * d) / dist);
      }
      brush(x, y);
      last = { x, y };
      if (debug && !(onMove as any)._logged) {
        (onMove as any)._logged = true;
        const c = canvas.getBoundingClientRect();
        console.info("[ColorReveal v4] first paint", {
          img: [r.left, r.top, r.width, r.height].map(Math.round),
          canvas: [c.left, c.top, c.width, c.height].map(Math.round),
          canvasPx: [canvas.width, canvas.height],
          z: canvas.style.zIndex, parent: (canvas.offsetParent as HTMLElement | null)?.className,
        });
      }
      start();
    };
    const onLeave = () => { last = null; };

    const sizeSafe = guard("size", size);
    const onMoveSafe = guard("onMove", onMove);
    const ro = new ResizeObserver(() => sizeSafe());
    ro.observe(image);
    // attach listeners first so a failure in size() can never block the effect
    window.addEventListener("resize", sizeSafe);
    window.addEventListener("pointermove", onMoveSafe, { passive: true });
    sizeSafe();
    if (debug) console.info("[ColorReveal v4] listeners attached");
    document.documentElement.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("resize", sizeSafe);
      window.removeEventListener("pointermove", onMoveSafe);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      image.style.filter = "";
    };
  }, [radius, fadeMs, debug]);

  return (
    <>
      <img ref={imgRef} src={src} alt={alt} className={className} draggable={false} onLoad={() => window.dispatchEvent(new Event("resize"))} />
      <canvas ref={cvsRef} aria-hidden="true" style={{ position: "absolute", pointerEvents: "none" }} />
    </>
  );
}