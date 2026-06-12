"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitHeading from "@/components/motion/SplitHeading";
import { Reveal } from "@/components/motion/Reveal";

gsap.registerPlugin(ScrollTrigger);

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

/* Animated SVG: GPU die schematic with line-draw on scroll */
function ServiceVisual({ variant }: { variant: 0 | 1 }) {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = ref.current;
    if (!svg) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const paths = svg.querySelectorAll<SVGPathElement | SVGRectElement>("[data-draw]");
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: svg, start: "top 80%", once: true },
        onComplete: () => {
          // Micro loops once drawn: connector lines carry a slow data
          // stream, the center node pulses.
          svg.querySelectorAll("[data-flow]").forEach((p) => {
            gsap.set(p, { strokeDasharray: "3 6", strokeDashoffset: 0 });
            gsap.to(p, { strokeDashoffset: -27, duration: 3, repeat: -1, ease: "none" });
          });
          gsap.to(svg.querySelector("[data-pulse]"), {
            attr: { r: 4.5 },
            opacity: 0.45,
            duration: 1.3,
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut",
          });
        },
      });
      paths.forEach((p, i) => {
        const len = (p as SVGGeometryElement).getTotalLength?.() ?? 600;
        tl.fromTo(
          p,
          { strokeDasharray: len, strokeDashoffset: len },
          { strokeDashoffset: 0, duration: 1.6, ease: "expo.out" },
          i * 0.1
        );
      });
    }, svg);
    return () => ctx.revert();
  }, []);

  return (
    <svg
      ref={ref}
      viewBox="0 0 400 300"
      className="w-full h-auto"
      fill="none"
      aria-hidden="true"
    >
      <rect x="100" y="70" width="200" height="160" rx="8" stroke="#18181c" strokeWidth="1.5" data-draw />
      <rect x="135" y="105" width="130" height="90" rx="4" stroke="#18181c" strokeWidth="1" data-draw />
      {variant === 0 ? (
        <>
          {[125, 150, 175].map((y) => (
            <path key={y} d={`M150 ${y} H250`} stroke="#9b9994" strokeWidth="1" data-draw />
          ))}
          <path d="M20 110 H100 M20 150 H100 M20 190 H100" stroke="#9b9994" strokeWidth="1" data-draw data-flow />
          <path d="M300 110 H380 M300 150 H380 M300 190 H380" stroke="#9b9994" strokeWidth="1" data-draw data-flow />
        </>
      ) : (
        <>
          {[150, 175, 200, 225].map((x) => (
            <path key={x} d={`M${x} 120 V180`} stroke="#9b9994" strokeWidth="1" data-draw />
          ))}
          <path d="M140 40 V70 M200 40 V70 M260 40 V70" stroke="#9b9994" strokeWidth="1" data-draw data-flow />
          <path d="M140 230 V260 M200 230 V260 M260 230 V260" stroke="#9b9994" strokeWidth="1" data-draw data-flow />
        </>
      )}
      <circle cx="200" cy="150" r="3" fill="#18181c" data-pulse />
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
                  <ServiceVisual variant={(i % 2) as 0 | 1} />
                </div>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
