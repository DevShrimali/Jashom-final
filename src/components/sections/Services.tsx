"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import SplitHeading from "@/components/motion/SplitHeading";
import { Reveal } from "@/components/motion/Reveal";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const SERVICES = [
  {
    title: "GPU Optimization Service",
    body: "End-to-end performance engineering for AI infrastructure: workload profiling, kernel tuning, memory and bandwidth optimization, and inference acceleration with TensorRT and Triton. Typical engagements deliver multi-x throughput gains on existing hardware.",
    points: ["Workload profiling & bottleneck analysis", "Inference acceleration (TensorRT, Triton)", "Memory & bandwidth optimization"],
    href: "#contact",
  },
  {
    title: "CUDA Development Service",
    body: "Custom kernel development and parallel algorithm engineering for teams that need performance beyond what frameworks provide. From single-kernel rewrites to multi-GPU system architecture, built and validated against your production workloads.",
    points: ["Custom kernel development", "Parallel algorithm optimization", "Multi-GPU system architecture"],
    href: "#contact",
  },
];

const INK = "#18181c";
const GRAY = "#9b9994";
const TINT = "#eceae4";

/* GPU Optimization — a performance gauge sweeping toward maximum,
   throughput streaks accelerating underneath. Reads as "faster" in one glance. */
function GaugeVisual() {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = ref.current;
    if (!svg) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      // Needle sweeps up quickly, eases back, repeats
      gsap.fromTo(
        ".gauge-needle",
        { rotation: -78, svgOrigin: "200 190" },
        {
          rotation: 72,
          duration: 2.2,
          ease: "power3.inOut",
          yoyo: true,
          repeat: -1,
          repeatDelay: 0.5,
          scrollTrigger: { trigger: svg, start: "top 80%", once: true },
        }
      );
      // Progress arc follows the needle
      gsap.fromTo(
        ".gauge-arc",
        { strokeDashoffset: 408 },
        {
          strokeDashoffset: 75,
          duration: 2.2,
          ease: "power3.inOut",
          yoyo: true,
          repeat: -1,
          repeatDelay: 0.5,
          scrollTrigger: { trigger: svg, start: "top 80%", once: true },
        }
      );
      // Throughput streaks flow right
      gsap.to(".gauge-streak", {
        strokeDashoffset: -36,
        duration: 1.4,
        repeat: -1,
        ease: "none",
      });
    }, svg);
    return () => ctx.revert();
  }, []);

  return (
    <svg ref={ref} viewBox="0 0 400 300" className="w-full h-auto" fill="none" aria-hidden="true">
      {/* tick marks */}
      {Array.from({ length: 13 }, (_, i) => {
        const t = Math.PI * (1 - i / 12);
        const major = i % 3 === 0;
        const r1 = major ? 112 : 120;
        // toFixed keeps SSR/client markup identical (raw trig differs by 1 ULP)
        const x1 = (200 + Math.cos(t) * r1).toFixed(2);
        const y1 = (190 - Math.sin(t) * r1).toFixed(2);
        const x2 = (200 + Math.cos(t) * 130).toFixed(2);
        const y2 = (190 - Math.sin(t) * 130).toFixed(2);
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={major ? INK : GRAY} strokeWidth={major ? 1.6 : 1} />;
      })}
      {/* track + progress arc */}
      <path d="M70 190 A130 130 0 0 1 330 190" stroke={TINT} strokeWidth="7" strokeLinecap="round" />
      <path
        className="gauge-arc"
        d="M70 190 A130 130 0 0 1 330 190"
        stroke={INK}
        strokeWidth="7"
        strokeLinecap="round"
        strokeDasharray="408"
        strokeDashoffset="408"
      />
      {/* needle */}
      <g className="gauge-needle">
        <line x1="200" y1="190" x2="200" y2="92" stroke={INK} strokeWidth="2.4" strokeLinecap="round" />
        <circle cx="200" cy="190" r="7" fill={INK} />
        <circle cx="200" cy="190" r="2.5" fill="#f4f3ef" />
      </g>
      {/* throughput streaks */}
      {[232, 250, 268].map((y, i) => (
        <line
          key={y}
          className="gauge-streak"
          x1={70 + i * 24}
          y1={y}
          x2={330 - i * 24}
          y2={y}
          stroke={GRAY}
          strokeWidth="1.4"
          strokeDasharray="14 22"
          strokeLinecap="round"
        />
      ))}
    </svg>
  );
}

/* CUDA Development — one block of code fanning out into a grid of cores
   lighting up in parallel. Reads as "code becomes parallel compute". */
function ParallelVisual() {
  const ref = useRef<SVGSVGElement>(null);

  const rows = [0, 1, 2, 3];
  const cols = [0, 1, 2, 3];
  const coreX = (c: number) => 248 + c * 34;
  const coreY = (r: number) => 84 + r * 34;
  const branchD = (r: number) =>
    `M132 150 C 180 150, 190 ${coreY(r) + 11}, 236 ${coreY(r) + 11}`;

  useEffect(() => {
    const svg = ref.current;
    if (!svg) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      // Cores light up in a diagonal parallel wave
      gsap.fromTo(
        ".core-lit",
        { opacity: 0.12 },
        {
          opacity: 1,
          duration: 0.7,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          stagger: { grid: [4, 4], from: "start", each: 0.12 },
          scrollTrigger: { trigger: svg, start: "top 80%", once: true },
        }
      );
      // Pulses travel from the code block along each branch
      gsap.utils.toArray<SVGCircleElement>(".branch-pulse").forEach((dot, i) => {
        gsap.to(dot, {
          motionPath: { path: branchD(i), autoRotate: false },
          duration: 1.5,
          repeat: -1,
          ease: "none",
          delay: i * 0.35,
        });
        gsap.fromTo(
          dot,
          { opacity: 0 },
          { opacity: 1, duration: 0.3, repeat: -1, repeatDelay: 1.2, delay: i * 0.35 }
        );
      });
    }, svg);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <svg ref={ref} viewBox="0 0 400 300" className="w-full h-auto" fill="none" aria-hidden="true">
      {/* code block */}
      <rect x="42" y="100" width="90" height="100" rx="8" stroke={INK} strokeWidth="1.5" />
      <path d="M68 132 L58 141 L68 150" stroke={INK} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M86 132 L96 141 L86 150" stroke={INK} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="74" y1="152" x2="82" y2="130" stroke={INK} strokeWidth="1.4" strokeLinecap="round" />
      <line x1="58" y1="168" x2="112" y2="168" stroke={GRAY} strokeWidth="1.2" />
      <line x1="58" y1="182" x2="96" y2="182" stroke={GRAY} strokeWidth="1.2" />
      {/* branches */}
      {rows.map((r) => (
        <path key={r} d={branchD(r)} stroke={GRAY} strokeWidth="1.1" />
      ))}
      {/* traveling pulses */}
      {rows.map((r) => (
        <circle key={r} className="branch-pulse" r="3" fill={INK} opacity="0" />
      ))}
      {/* core grid */}
      {rows.map((r) =>
        cols.map((c) => (
          <g key={`${r}-${c}`}>
            <rect x={coreX(c)} y={coreY(r)} width="22" height="22" rx="4" stroke={GRAY} strokeWidth="1" fill={TINT} />
            <rect className="core-lit" x={coreX(c)} y={coreY(r)} width="22" height="22" rx="4" fill={INK} opacity="0.12" />
          </g>
        ))
      )}
    </svg>
  );
}

export default function Services() {
  return (
    <section className="section bg-paper border-y border-line" id="services">
      <div className="container-j">
        <div className="max-w-2xl mb-16 md:mb-20">
          <SplitHeading className="text-[clamp(2rem,4vw,3rem)] mb-5">
            Which services we provide
          </SplitHeading>
          <Reveal>
            <p className="text-ink-2">
              Two core disciplines, one outcome: AI systems that run at the speed the hardware
              was built for.
            </p>
          </Reveal>
        </div>

        <div className="flex flex-col gap-20 md:gap-24">
          {SERVICES.map((s, i) => (
            <div
              key={s.title}
              className={`grid md:grid-cols-2 gap-10 md:gap-16 items-center ${
                i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
              }`}
            >
              <Reveal>
                <div>
                  <h3 className="text-[clamp(1.6rem,2.8vw,2.4rem)] mb-4">{s.title}</h3>
                  <p className="text-ink-2 mb-6 max-w-[55ch]">{s.body}</p>
                  <ul className="flex flex-col gap-2.5 mb-8">
                    {s.points.map((pt) => (
                      <li key={pt} className="flex items-center gap-3 text-[0.9375rem] text-ink">
                        <span className="w-4 h-px bg-ink shrink-0" aria-hidden="true" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                  <a href={s.href} className="link-line text-ink font-medium text-[0.9375rem]">
                    Explore service →
                  </a>
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <div className="bg-linen border border-line rounded-lg p-6 md:p-10">
                  {i === 0 ? <GaugeVisual /> : <ParallelVisual />}
                </div>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
