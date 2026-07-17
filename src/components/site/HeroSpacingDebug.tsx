import { useEffect, useState } from "react";

/**
 * Live hero-spacing checklist overlay.
 *
 * Enable by appending `?debug=hero` to the URL. Renders a small fixed panel
 * with pass/fail rows for the active viewport (mobile / tablet / lg / xl).
 * Updates on resize, scroll, and image-load so you can drag the window edge
 * and watch every breakpoint flip green without reloading.
 */

type Bp = "mobile" | "tablet" | "lg" | "xl";

const EXPECTATIONS: Record<Bp, { imgMinW: number; imgMaxW: number; layout: "stacked" | "side-by-side" }> = {
  mobile: { imgMinW: 200, imgMaxW: 380, layout: "stacked" },
  tablet: { imgMinW: 380, imgMaxW: 560, layout: "side-by-side" },
  lg:     { imgMinW: 440, imgMaxW: 560, layout: "side-by-side" },
  xl:     { imgMinW: 520, imgMaxW: 680, layout: "side-by-side" },
};

function currentBp(w: number): Bp {
  if (w < 768) return "mobile";
  if (w < 1280) return w < 1024 ? "tablet" : "lg";
  return "xl";
}

type Row = { label: string; ok: boolean; detail?: string };

function evaluateHero(): { vp: { w: number; h: number }; bp: Bp; rows: Row[] } | null {
  const section = document.querySelector<HTMLElement>("#home");
  const img = section?.querySelector("img");
  const heading = section?.querySelector("h1");
  if (!section || !img || !heading) return null;

  const vp = { w: window.innerWidth, h: window.innerHeight };
  const bp = currentBp(vp.w);
  const exp = EXPECTATIONS[bp];
  const iRect = img.getBoundingClientRect();
  const hRect = heading.getBoundingClientRect();
  const docW = document.documentElement.scrollWidth;
  const aspect = iRect.width === 0 || iRect.height === 0 ? 0 : iRect.width / iRect.height;
  const natural = img.naturalWidth && img.naturalHeight ? img.naturalWidth / img.naturalHeight : 1;

  const rows: Row[] = [
    { label: "image loaded", ok: img.complete && img.naturalWidth > 0 },
    {
      label: `image width ∈ [${exp.imgMinW}, ${exp.imgMaxW}]`,
      ok: iRect.width >= exp.imgMinW && iRect.width <= exp.imgMaxW,
      detail: `${Math.round(iRect.width)}px`,
    },
    {
      label: "no horizontal overflow",
      ok: docW <= vp.w + 1,
      detail: `doc ${docW} / vp ${vp.w}`,
    },
    {
      label: "image inside viewport",
      ok: iRect.left >= -1 && iRect.right <= vp.w + 1,
      detail: `L${Math.round(iRect.left)} R${Math.round(iRect.right)}`,
    },
    {
      label: "side padding ≥ 16px",
      ok: hRect.left >= 16,
      detail: `${Math.round(hRect.left)}px`,
    },
    {
      label: "aspect ratio within 5%",
      ok: natural > 0 && Math.abs(aspect - natural) / natural < 0.05,
    },
    exp.layout === "side-by-side"
      ? {
          label: "image right of heading",
          ok: iRect.left >= hRect.right - 10,
          detail: `img.L ${Math.round(iRect.left)} / h.R ${Math.round(hRect.right)}`,
        }
      : {
          label: "image below heading (stacked)",
          ok: iRect.top >= hRect.top + 20,
        },
    {
      label: "headline above the fold",
      ok: hRect.top < vp.h,
      detail: `top ${Math.round(hRect.top)}px`,
    },
  ];

  return { vp, bp, rows };
}

export function HeroSpacingDebug() {
  const [enabled, setEnabled] = useState(false);
  const [data, setData] = useState<ReturnType<typeof evaluateHero>>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setEnabled(new URLSearchParams(window.location.search).get("debug") === "hero");
  }, []);

  useEffect(() => {
    if (!enabled) return;
    let raf = 0;
    const tick = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setData(evaluateHero()));
    };
    tick();
    const img = document.querySelector("#home img");
    img?.addEventListener("load", tick);
    window.addEventListener("resize", tick);
    window.addEventListener("scroll", tick, { passive: true });
    const id = window.setInterval(tick, 500);
    return () => {
      cancelAnimationFrame(raf);
      img?.removeEventListener("load", tick);
      window.removeEventListener("resize", tick);
      window.removeEventListener("scroll", tick);
      window.clearInterval(id);
    };
  }, [enabled]);

  if (!enabled) return null;
  if (!data) {
    return (
      <div style={panelStyle}>
        <div style={headerStyle}>hero checklist</div>
        <div style={{ opacity: 0.7 }}>waiting for #home …</div>
      </div>
    );
  }

  const allOk = data.rows.every((r) => r.ok);
  return (
    <div style={panelStyle}>
      <div style={headerStyle}>
        <span>hero · {data.bp}</span>
        <span style={{ opacity: 0.7 }}>{data.vp.w}×{data.vp.h}</span>
        <span style={{ color: allOk ? "#4ade80" : "#f87171" }}>{allOk ? "PASS" : "FAIL"}</span>
      </div>
      {data.rows.map((r) => (
        <div key={r.label} style={rowStyle}>
          <span style={{ color: r.ok ? "#4ade80" : "#f87171", width: 12 }}>{r.ok ? "✓" : "✗"}</span>
          <span style={{ flex: 1 }}>{r.label}</span>
          {r.detail && <span style={{ opacity: 0.6 }}>{r.detail}</span>}
        </div>
      ))}
    </div>
  );
}

const panelStyle: React.CSSProperties = {
  position: "fixed",
  bottom: 12,
  right: 12,
  zIndex: 9999,
  width: 320,
  padding: 10,
  borderRadius: 8,
  background: "rgba(10,10,15,0.92)",
  color: "#e5e7eb",
  font: "11px/1.5 ui-monospace,Menlo,monospace",
  border: "1px solid rgba(255,255,255,0.1)",
  boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
  pointerEvents: "none",
};
const headerStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  gap: 8,
  fontWeight: 600,
  marginBottom: 6,
  paddingBottom: 6,
  borderBottom: "1px solid rgba(255,255,255,0.08)",
};
const rowStyle: React.CSSProperties = {
  display: "flex",
  gap: 8,
  alignItems: "baseline",
};
