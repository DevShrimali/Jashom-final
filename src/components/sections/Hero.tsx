"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroIllustration from "@/components/HeroIllustration";
import Magnetic from "@/components/motion/Magnetic";

gsap.registerPlugin(ScrollTrigger);

const HEADLINE = ["Powering High-Performance AI", "with Precision GPU Engineering"];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  // Gentle parallax: content drifts up slower than the scroll
  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      gsap.to(contentRef.current, {
        yPercent: -8,
        opacity: 0.4,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section ref={sectionRef} className="relative min-h-svh flex flex-col overflow-clip">
      {/* Faded grid + soft glow, radially masked toward the edges */}
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,rgba(17,17,19,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(17,17,19,0.05)_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:radial-gradient(110%_90%_at_50%_30%,black,transparent)]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_-10%,rgba(24,24,28,0.06),transparent_60%)]"
        aria-hidden="true"
      />

      <div
        ref={contentRef}
        className="container-j relative flex-1 grid lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] gap-12 items-center pt-32 pb-20"
      >
        <div className="flex flex-col justify-center">
        <motion.p
          initial={{ opacity: 0, transform: reduced ? "none" : "translateY(16px)" }}
          animate={{ opacity: 1, transform: "translateY(0px)" }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
          className="inline-flex w-fit items-center gap-2 bg-tint border border-line rounded-full px-4 py-1.5 text-[0.8125rem] text-ink-2 mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--success)]" aria-hidden="true" />
          Next-Gen AI Solutions
        </motion.p>

        <h1 className="text-[clamp(2.2rem,3.5vw,3.3rem)] leading-[1.1] max-w-[32ch]">
          {HEADLINE.map((line, i) => (
            <span key={line} className="block overflow-clip">
              <motion.span
                className="block"
                initial={{ transform: reduced ? "none" : "translateY(105%)" }}
                animate={{ transform: "translateY(0%)" }}
                transition={{ duration: 0.9, delay: 0.2 + i * 0.12, ease: [0.23, 1, 0.32, 1] }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, transform: reduced ? "none" : "translateY(16px)" }}
          animate={{ opacity: 1, transform: "translateY(0px)" }}
          transition={{ duration: 0.7, delay: 0.6, ease: [0.23, 1, 0.32, 1] }}
          className="mt-7 max-w-[52ch] text-[1.0625rem] text-ink-2"
        >
          Jashom delivers expert GPU optimization and CUDA development services — bridging the
          gap between advanced models and the infrastructure they run on, so your AI workloads
          ship faster and cost less.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, transform: reduced ? "none" : "translateY(16px)" }}
          animate={{ opacity: 1, transform: "translateY(0px)" }}
          transition={{ duration: 0.7, delay: 0.72, ease: [0.23, 1, 0.32, 1] }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <Magnetic strength={0.18}>
            <a href="#contact" className="btn btn-primary">
              Start Your AI Transformation
            </a>
          </Magnetic>
          <a href="#contact" className="btn btn-secondary">
            Schedule a Meeting
          </a>
        </motion.div>
        </div>

        {/* Isometric exploded-GPU illustration */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="hidden lg:block"
        >
          <HeroIllustration />
        </motion.div>
      </div>
    </section>
  );
}
