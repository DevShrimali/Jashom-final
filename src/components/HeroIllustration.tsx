"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

/* Isometric exploded GPU illustration, hand-built from projected
   coordinates. Iso basis: u = (0.866, 0.5), v = (-0.866, 0.5). */

const C = {
  ink: "#18181C",
  graphite: "#1E1E22",
  paper: "#FFFFFF",
  linen: "#F4F3EF",
  tint: "#ECEAE4",
  line: "#E4E3DE",
  gray: "#9B9994",
};

type Pt = [number, number];

function pt(cx: number, cy: number, a: number, b: number): Pt {
  return [cx + 0.866 * (a - b), cy + 0.5 * (a + b)];
}

function path(points: Pt[], close = true): string {
  return (
    points.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ") +
    (close ? " Z" : "")
  );
}

/* Diamond plate centred at (cx, cy), half-extents w (along u) and d (along v) */
function plate(cx: number, cy: number, w: number, d: number): Pt[] {
  return [pt(cx, cy, w, d), pt(cx, cy, w, -d), pt(cx, cy, -w, -d), pt(cx, cy, -w, d)];
}

/* The two visible (lower) side faces of an extruded plate */
function sides(cx: number, cy: number, w: number, d: number, h: number): [string, string] {
  const [A, B, , L] = plate(cx, cy, w, d); // A bottom, B right, L left
  const drop = ([x, y]: Pt): Pt => [x, y + h];
  return [
    path([L, A, drop(A), drop(L)]), // left-facing
    path([A, B, drop(B), drop(A)]), // right-facing
  ];
}

/* Iso line segment from (a,b) along direction (da,db) in plane at (cx,cy) */
function seg(cx: number, cy: number, a: number, b: number, da: number, db: number): string {
  const [x1, y1] = pt(cx, cy, a, b);
  const [x2, y2] = pt(cx, cy, a + da, b + db);
  return `M${x1.toFixed(1)} ${y1.toFixed(1)} L${x2.toFixed(1)} ${y2.toFixed(1)}`;
}

/* ---- main stack geometry (cx 430) ---- */
const SHROUD = { cy: 185, w: 170, d: 125, h: 12 };
const PCB = { cy: 315, w: 170, d: 125, h: 10 };
const BASE = { cy: 440, w: 170, d: 125, h: 16 };

const shroudTop = path(plate(430, SHROUD.cy, SHROUD.w, SHROUD.d));
const shroudSides = sides(430, SHROUD.cy, SHROUD.w, SHROUD.d, SHROUD.h);
const pcbTop = path(plate(430, PCB.cy, PCB.w, PCB.d));
const pcbSides = sides(430, PCB.cy, PCB.w, PCB.d, PCB.h);
const baseTop = path(plate(430, BASE.cy, BASE.w, BASE.d));
const baseSides = sides(430, BASE.cy, BASE.w, BASE.d, BASE.h);

/* Corner pins between layers (x is shared across layers at each corner) */
const corners = (cy: number) => plate(430, cy, 170, 125);
const pinPairs: Array<[Pt, Pt]> = (() => {
  const s = corners(SHROUD.cy);
  const p = corners(PCB.cy);
  const b = corners(BASE.cy);
  // bottom (A=0), right (B=1), left (L=3) corners are visible
  return [
    [[s[0][0], s[0][1] + SHROUD.h], p[0]],
    [[s[1][0], s[1][1] + SHROUD.h], p[1]],
    [[s[3][0], s[3][1] + SHROUD.h], p[3]],
    [[p[0][0], p[0][1] + PCB.h], b[0]],
    [[p[1][0], p[1][1] + PCB.h], b[1]],
    [[p[3][0], p[3][1] + PCB.h], b[3]],
  ] as Array<[Pt, Pt]>;
})();

/* Fan: hole in shroud + floating disc above it */
const holeCenter = pt(430, SHROUD.cy, 55, -35); // (508, 195)
const discCenter: Pt = [holeCenter[0] + 26, holeCenter[1] - 124];

/* Shroud cutout window (left side) */
const cutout = path(plate(430 - 0.866 * 90, SHROUD.cy - 25, 40, 27));

/* PCB die + heatsink fan + traces */
const dieCenter = pt(430, PCB.cy, -15, 15);
const die = path(plate(dieCenter[0], dieCenter[1], 52, 40));
const hsCenter = pt(430, PCB.cy, 78, -20);
const traces = [
  seg(430, PCB.cy, -70, 48, 0, 45),
  seg(430, PCB.cy, -85, 38, 0, 60),
  seg(430, PCB.cy, -98, -20, -40, 0) + " " + seg(430, PCB.cy, -138, -20, 0, -30).slice(1),
  seg(430, PCB.cy, -60, -65, 0, -38),
];

/* CUDA core lattice on the die — grid of parallel cores */
const CORE_A = [-36, -18, 0, 18, 36];
const CORE_B = [-24, -8, 8, 24];
const cores: Array<{ d: string; cx: number; cy: number; active: boolean }> = [];
CORE_A.forEach((a, i) =>
  CORE_B.forEach((b, j) => {
    const [x, y] = pt(430, PCB.cy, -15 + a, 15 + b);
    cores.push({
      d: path(plate(x, y, 6, 6)),
      cx: x,
      cy: y,
      active: (i + j) % 3 === 0,
    });
  })
);

/* Parallel thread lanes leaving the die — dispatch toward the edge */
const threadLanes = [4, 18, 32, 46].map((b) => seg(430, PCB.cy, 42, b, 88, 0));
const laneChevrons = [4, 18, 32, 46].map((b) => {
  const [x, y] = pt(430, PCB.cy, 130, b);
  // small chevron pointing along +u
  return `M${(x - 7).toFixed(1)} ${(y - 6).toFixed(1)} L${x.toFixed(1)} ${y.toFixed(1)} L${(x - 10).toFixed(1)} ${(y + 3).toFixed(1)}`;
});

/* ---- satellites ---- */
// Server rack: 4 stacked cubes
const RACK = { cx: 150, baseY: 218, w: 44, d: 44, h: 26 };
const rackLevels = [0, 1, 2, 3].map((i) => RACK.baseY - i * RACK.h);

// Document card (bottom left)
const DOC = { cx: 175, cy: 455, w: 95, d: 70 };
const docPlate = path(plate(DOC.cx, DOC.cy, DOC.w, DOC.d));
const docLines = [
  seg(DOC.cx, DOC.cy, -60, -40, 95, 0),
  seg(DOC.cx, DOC.cy, -60, -18, 120, 0),
  seg(DOC.cx, DOC.cy, -60, 4, 70, 0),
  seg(DOC.cx, DOC.cy, -20, 26, 80, 0),
  seg(DOC.cx, DOC.cy, -20, 48, 55, 0),
];
const docChecks = [plate(...pt(DOC.cx, DOC.cy, -45, 28), 9, 9), plate(...pt(DOC.cx, DOC.cy, -45, 50), 9, 9)].map((p) =>
  path(p)
);

// Kernel code card (top right) — angle brackets + indented code lines
const SHEET = { cx: 705, cy: 165, w: 80, d: 55 };
const sheetPlate = path(plate(SHEET.cx, SHEET.cy, SHEET.w, SHEET.d));
const sheetBrackets = [
  // <
  path([pt(SHEET.cx, SHEET.cy, -38, -34), pt(SHEET.cx, SHEET.cy, -52, -24), pt(SHEET.cx, SHEET.cy, -38, -14)], false),
  // /
  seg(SHEET.cx, SHEET.cy, -22, -14, 14, -20),
  // >
  path([pt(SHEET.cx, SHEET.cy, 4, -34), pt(SHEET.cx, SHEET.cy, 18, -24), pt(SHEET.cx, SHEET.cy, 4, -14)], false),
];
const sheetLines = [
  seg(SHEET.cx, SHEET.cy, -50, 0, 95, 0),
  seg(SHEET.cx, SHEET.cy, -34, 14, 79, 0),
  seg(SHEET.cx, SHEET.cy, -34, 28, 55, 0),
  seg(SHEET.cx, SHEET.cy, -50, 42, 70, 0),
];

// Chip badge card (left middle) — shapes echo a component legend
const BADGE = { cx: 108, cy: 305, w: 58, d: 42 };
const badgePlate = path(plate(BADGE.cx, BADGE.cy, BADGE.w, BADGE.d));
const badgeSqA = path(plate(...pt(BADGE.cx, BADGE.cy, -22, -12), 13, 13));
const badgeSqB = path(plate(...pt(BADGE.cx, BADGE.cy, 8, 14), 13, 13));
const badgeDot = pt(BADGE.cx, BADGE.cy, -22, 18);
const badgeLines = [
  seg(BADGE.cx, BADGE.cy, 18, -22, 28, 0),
  seg(BADGE.cx, BADGE.cy, 22, -12, 28, 0),
  seg(BADGE.cx, BADGE.cy, 26, -2, 28, 0),
];

// Telemetry panel (bottom right)
const TEL = { cx: 645, cy: 487, w: 128, d: 88 };
const telPlate = path(plate(TEL.cx, TEL.cy, TEL.w, TEL.d));
// bar chart: vertical bars rising from the plane
const telBars = [-66, -46, -26, -6].map((a, i) => {
  const h = [16, 30, 22, 38][i];
  const [x, y] = pt(TEL.cx, TEL.cy, a, 40);
  return { x, y, h };
});
// table grid
const telGrid = [
  seg(TEL.cx, TEL.cy, 18, -64, 88, 0),
  seg(TEL.cx, TEL.cy, 18, -42, 88, 0),
  seg(TEL.cx, TEL.cy, 18, -20, 88, 0),
  seg(TEL.cx, TEL.cy, 18, -64, 0, 44),
  seg(TEL.cx, TEL.cy, 62, -64, 0, 44),
  seg(TEL.cx, TEL.cy, 106, -64, 0, 44),
];
const telText = [
  seg(TEL.cx, TEL.cy, -100, -60, 60, 0),
  seg(TEL.cx, TEL.cy, -100, -44, 44, 0),
  seg(TEL.cx, TEL.cy, -100, -28, 52, 0),
];
const pieCenter = pt(TEL.cx, TEL.cy, 60, 28);

/* Dotted connectors — elbows that follow iso slopes then verticals */
const connectors = [
  // rack → shroud left corner
  `M209 178 L298 229.4 L298 272`,
  // shroud right corner → spec sheet
  `M688 205 L745 172 L745 140`,
  // PCB right → telemetry panel top
  `M690 345 L750 379.6 L750 412`,
  // base bottom → document card
  `M462 595 L380 547.6 L380 505 L352 489`,
  // badge card → PCB left
  `M168 340 L240 381.6 L240 408`,
];

const FLOAT_GROUPS = [".iso-sat-a", ".iso-sat-b", ".iso-sat-c", ".iso-sat-d"];

export default function HeroIllustration() {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = ref.current;
    if (!svg) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      // Entrance: stack layers rise into place, satellites follow
      gsap.from(".iso-layer", {
        y: 28,
        opacity: 0,
        duration: 1.1,
        stagger: 0.14,
        ease: "expo.out",
        delay: 0.35,
      });
      gsap.from([...FLOAT_GROUPS, ".iso-wire"], {
        opacity: 0,
        y: 16,
        duration: 0.9,
        stagger: 0.07,
        ease: "expo.out",
        delay: 0.8,
      });

      // Exploded breathing: shroud and fan drift up, base drifts down
      gsap.to(".iso-shroud", { y: -7, duration: 4.2, yoyo: true, repeat: -1, ease: "sine.inOut" });
      gsap.to(".iso-fan", { y: -12, duration: 4.2, yoyo: true, repeat: -1, ease: "sine.inOut" });
      gsap.to(".iso-base", { y: 6, duration: 4.2, yoyo: true, repeat: -1, ease: "sine.inOut" });

      // Satellites float at offset phases
      FLOAT_GROUPS.forEach((sel, i) => {
        gsap.to(sel, {
          y: i % 2 ? 6 : -6,
          duration: 3.4 + i * 0.5,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
          delay: i * 0.4,
        });
      });

      // Dotted wires crawl
      gsap.to(".iso-wire", {
        strokeDashoffset: -28,
        duration: 3.5,
        repeat: -1,
        ease: "none",
      });

      // Thread lanes stream away from the die
      gsap.to(".iso-thread", {
        strokeDashoffset: -32,
        duration: 2.2,
        repeat: -1,
        ease: "none",
      });

      // Active CUDA cores blink in a rolling pattern
      gsap.to(".iso-core-active", {
        opacity: 0.25,
        duration: 0.9,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        stagger: { each: 0.35, from: "random" },
      });

      // Telemetry bars breathe between readings
      gsap.utils.toArray<SVGLineElement>(".iso-bar").forEach((bar, i) => {
        const y1 = parseFloat(bar.getAttribute("y1") || "0");
        const y2 = parseFloat(bar.getAttribute("y2") || "0");
        gsap.to(bar, {
          attr: { y2: y1 - (y1 - y2) * 0.55 },
          duration: 1.6 + i * 0.3,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
          delay: i * 0.2,
        });
      });

      // Rack status dot blinks
      gsap.to(".iso-status", {
        opacity: 0.15,
        duration: 1.2,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });
    }, svg);

    return () => ctx.revert();
  }, []);

  return (
    <svg
      ref={ref}
      viewBox="0 0 860 660"
      fill="none"
      className="w-full h-auto"
      role="img"
      aria-label="Exploded view of a GPU with optimization telemetry"
    >
      {/* ---- dotted connectors ---- */}
      {connectors.map((d) => (
        <path
          key={d}
          d={d}
          className="iso-wire"
          stroke={C.gray}
          strokeWidth="1"
          strokeDasharray="2 5"
        />
      ))}
      {[
        [298, 272],
        [745, 140],
        [750, 412],
        [352, 489],
        [240, 408],
      ].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="3" stroke={C.ink} strokeWidth="1" fill={C.linen} />
      ))}

      {/* ---- base slab ---- */}
      <g className="iso-layer iso-base">
        <path d={baseSides[0]} fill={C.graphite} stroke={C.ink} strokeWidth="1" />
        <path d={baseSides[1]} fill="#111113" stroke={C.ink} strokeWidth="1" />
        <path d={baseTop} fill={C.graphite} stroke={C.ink} strokeWidth="1.2" />
        {/* screws */}
        {[
          pt(430, BASE.cy, 140, 95),
          pt(430, BASE.cy, 140, -95),
          pt(430, BASE.cy, -140, 95),
        ].map(([x, y]) => (
          <ellipse key={`${x}`} cx={x} cy={y} rx="5" ry="3" stroke={C.gray} strokeWidth="1" />
        ))}
      </g>

      {/* pins PCB → base */}
      {pinPairs.slice(3).map(([a, b], i) => (
        <g key={`pb-${i}`} className="iso-layer">
          <line x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={C.gray} strokeWidth="1" />
          <circle cx={a[0]} cy={a[1]} r="2.5" fill={C.linen} stroke={C.ink} strokeWidth="1" />
        </g>
      ))}

      {/* ---- PCB ---- */}
      <g className="iso-layer">
        <path d={pcbSides[0]} fill={C.tint} stroke={C.ink} strokeWidth="1" />
        <path d={pcbSides[1]} fill={C.line} stroke={C.ink} strokeWidth="1" />
        <path d={pcbTop} fill={C.paper} stroke={C.ink} strokeWidth="1.2" />

        {/* traces */}
        {traces.map((d) => (
          <path key={d} d={d} stroke={C.gray} strokeWidth="0.9" />
        ))}
        {/* parallel thread lanes with direction chevrons */}
        {threadLanes.map((d) => (
          <path key={d} d={d} className="iso-thread" stroke={C.gray} strokeWidth="1" strokeDasharray="3 5" />
        ))}
        {laneChevrons.map((d) => (
          <path key={d} d={d} stroke={C.ink} strokeWidth="1.1" fill="none" />
        ))}
        {/* die with CUDA core lattice */}
        <path d={die} fill={C.paper} stroke={C.ink} strokeWidth="1.2" />
        {cores.map((c, i) => (
          <path
            key={i}
            d={c.d}
            className={c.active ? "iso-core-active" : undefined}
            fill={c.active ? C.ink : C.tint}
            stroke={C.ink}
            strokeWidth="0.6"
          />
        ))}
        {/* heatsink fan */}
        <ellipse cx={hsCenter[0]} cy={hsCenter[1]} rx="34" ry="19.6" fill={C.linen} stroke={C.ink} strokeWidth="1.2" />
        <ellipse cx={hsCenter[0]} cy={hsCenter[1]} rx="12" ry="6.9" fill={C.paper} stroke={C.ink} strokeWidth="1" />
        {Array.from({ length: 8 }, (_, i) => {
          const t = (i / 8) * Math.PI * 2;
          const x1 = hsCenter[0] + Math.cos(t) * 13;
          const y1 = hsCenter[1] + Math.sin(t) * 7.5;
          const x2 = hsCenter[0] + Math.cos(t) * 32;
          const y2 = hsCenter[1] + Math.sin(t) * 18.4;
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={C.gray} strokeWidth="0.9" />;
        })}
        {/* capacitors */}
        {[
          pt(430, PCB.cy, -120, 70),
          pt(430, PCB.cy, -100, 82),
        ].map(([x, y]) => (
          <g key={`${x}`}>
            <rect x={x - 4} y={y - 12} width="8" height="12" fill={C.tint} stroke={C.ink} strokeWidth="0.9" />
            <ellipse cx={x} cy={y - 12} rx="4" ry="2.3" fill={C.paper} stroke={C.ink} strokeWidth="0.9" />
          </g>
        ))}
      </g>

      {/* pins shroud → PCB */}
      {pinPairs.slice(0, 3).map(([a, b], i) => (
        <g key={`sp-${i}`} className="iso-layer">
          <line x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={C.gray} strokeWidth="1" />
          <circle cx={b[0]} cy={b[1]} r="2.5" fill={C.linen} stroke={C.ink} strokeWidth="1" />
        </g>
      ))}

      {/* ---- shroud ---- */}
      <g className="iso-layer iso-shroud">
        <path d={shroudSides[0]} fill="#0c0c0f" stroke={C.ink} strokeWidth="1" />
        <path d={shroudSides[1]} fill="#222226" stroke={C.ink} strokeWidth="1" />
        <path d={shroudTop} fill={C.ink} stroke={C.ink} strokeWidth="1.2" />
        {/* fan hole */}
        <ellipse cx={holeCenter[0]} cy={holeCenter[1]} rx="52" ry="30" fill={C.linen} stroke="#3a3a40" strokeWidth="1" />
        {/* cutout window */}
        <path d={cutout} fill={C.linen} stroke="#3a3a40" strokeWidth="1" />
        {/* vent slots */}
        {[0, 1, 2].map((i) => (
          <path key={i} d={seg(430, SHROUD.cy, 110, 50 + i * 16, 44, 0)} stroke="#4a4a50" strokeWidth="1.4" />
        ))}
      </g>

      {/* floating fan disc */}
      <g className="iso-layer iso-fan">
        <line
          x1={discCenter[0]}
          y1={discCenter[1] + 28}
          x2={holeCenter[0]}
          y2={holeCenter[1] - 8}
          stroke={C.gray}
          strokeWidth="1"
          strokeDasharray="2 5"
        />
        <ellipse cx={discCenter[0]} cy={discCenter[1]} rx="48" ry="27.7" fill={C.ink} stroke={C.ink} />
        <ellipse cx={discCenter[0]} cy={discCenter[1]} rx="13" ry="7.5" fill={C.linen} stroke={C.gray} strokeWidth="1" />
        {Array.from({ length: 6 }, (_, i) => {
          const t = (i / 6) * Math.PI * 2 + 0.4;
          return (
            <line
              key={i}
              x1={discCenter[0] + Math.cos(t) * 14}
              y1={discCenter[1] + Math.sin(t) * 8}
              x2={discCenter[0] + Math.cos(t) * 45}
              y2={discCenter[1] + Math.sin(t) * 26}
              stroke="#4a4a50"
              strokeWidth="1.2"
            />
          );
        })}
      </g>

      {/* ---- satellites ---- */}
      {/* server rack */}
      <g className="iso-sat-a">
        {rackLevels.map((cy) => {
          const top = path(plate(RACK.cx, cy, RACK.w, RACK.d));
          const [l, r] = sides(RACK.cx, cy, RACK.w, RACK.d, RACK.h);
          return (
            <g key={cy}>
              <path d={l} fill={C.tint} stroke={C.ink} strokeWidth="1" />
              <path d={r} fill={C.line} stroke={C.ink} strokeWidth="1" />
              <path d={top} fill={C.paper} stroke={C.ink} strokeWidth="1" />
            </g>
          );
        })}
        {/* status dot on top server */}
        <circle
          className="iso-status"
          cx={pt(RACK.cx, rackLevels[3], 0, -20)[0]}
          cy={pt(RACK.cx, rackLevels[3], 0, -20)[1]}
          r="2.5"
          fill={C.ink}
        />
      </g>

      {/* chip badge card */}
      <g className="iso-sat-b">
        <path d={badgePlate} fill={C.paper} stroke={C.ink} strokeWidth="1.1" />
        <path d={badgeSqA} fill={C.ink} />
        <path d={badgeSqB} fill={C.ink} />
        <ellipse cx={badgeDot[0]} cy={badgeDot[1]} rx="12" ry="6.9" fill={C.ink} />
        {badgeLines.map((d) => (
          <path key={d} d={d} stroke={C.ink} strokeWidth="2.2" />
        ))}
      </g>

      {/* document card */}
      <g className="iso-sat-c">
        <path d={docPlate} fill={C.paper} stroke={C.ink} strokeWidth="1.1" />
        {docLines.map((d, i) => (
          <path key={d} d={d} stroke={i === 0 ? C.ink : C.gray} strokeWidth={i === 0 ? 1.8 : 1.1} />
        ))}
        {docChecks.map((d) => (
          <path key={d} d={d} fill={C.linen} stroke={C.ink} strokeWidth="1" />
        ))}
      </g>

      {/* kernel code card */}
      <g className="iso-sat-d">
        <path d={sheetPlate} fill={C.paper} stroke={C.ink} strokeWidth="1.1" />
        {sheetBrackets.map((d) => (
          <path key={d} d={d} stroke={C.ink} strokeWidth="1.8" fill="none" strokeLinejoin="round" />
        ))}
        {sheetLines.map((d) => (
          <path key={d} d={d} stroke={C.gray} strokeWidth="1.1" />
        ))}
      </g>

      {/* telemetry panel */}
      <g className="iso-sat-a">
        <path d={telPlate} fill={C.paper} stroke={C.ink} strokeWidth="1.1" />
        {/* heading line */}
        <path d={seg(TEL.cx, TEL.cy, -100, -76, 80, 0)} stroke={C.ink} strokeWidth="2" />
        {telText.map((d) => (
          <path key={d} d={d} stroke={C.gray} strokeWidth="1.1" />
        ))}
        {telGrid.map((d) => (
          <path key={d} d={d} stroke={C.gray} strokeWidth="0.9" />
        ))}
        {/* bars */}
        {telBars.map(({ x, y, h }, i) => (
          <line key={i} className="iso-bar" x1={x} y1={y} x2={x} y2={y - h} stroke={C.ink} strokeWidth="5" />
        ))}
        {/* pie */}
        <ellipse cx={pieCenter[0]} cy={pieCenter[1]} rx="26" ry="15" fill={C.paper} stroke={C.ink} strokeWidth="1.1" />
        <path
          d={`M${pieCenter[0]} ${pieCenter[1]} L${pieCenter[0] + 26} ${pieCenter[1]} A26 15 0 0 1 ${pieCenter[0] + 8} ${pieCenter[1] + 14.2} Z`}
          fill={C.ink}
        />
      </g>

      {/* probe node, top right */}
      <g className="iso-sat-b">
        <circle cx="795" cy="84" r="8" stroke={C.ink} strokeWidth="1.2" fill={C.linen} />
        <line x1="801" y1="90" x2="812" y2="101" stroke={C.ink} strokeWidth="1.2" />
        <path d="M795 92 L795 120 L760 140" stroke={C.gray} strokeWidth="1" strokeDasharray="2 5" className="iso-wire" />
      </g>
    </svg>
  );
}
