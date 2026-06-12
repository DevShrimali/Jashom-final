import SplitHeading from "@/components/motion/SplitHeading";
import { Reveal } from "@/components/motion/Reveal";

const PILLARS = [
  {
    title: "GPU Optimization",
    badge: "High Performance",
    body: "We profile, tune, and restructure AI workloads to extract maximum throughput from NVIDIA hardware — kernel-level optimization, memory efficiency, and inference acceleration that turn idle silicon into measurable speed.",
  },
  {
    title: "CUDA Development",
    badge: "High Performance",
    body: "Custom CUDA kernels, parallel algorithm design, and multi-GPU architectures built from scratch. Production-grade parallel computing engineered around your models and your infrastructure.",
  },
];

export default function WhatWeDo() {
  return (
    <section className="section" id="what-we-do">
      <div className="container-j">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-4">
            <SplitHeading className="text-[clamp(2rem,4vw,3rem)] sticky top-28">
              What we do
            </SplitHeading>
          </div>
          <div className="lg:col-span-8">
            {PILLARS.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.08}>
                <article className={`py-10 ${i === 0 ? "border-b border-line" : ""}`}>
                  <div className="flex flex-wrap items-baseline justify-between gap-3 mb-4">
                    <h3 className="text-[clamp(1.6rem,2.6vw,2.25rem)]">{p.title}</h3>
                    <span className="text-[0.75rem] uppercase tracking-wide text-ink-2 bg-tint rounded-full px-3 py-1">
                      {p.badge}
                    </span>
                  </div>
                  <p className="text-ink-2 max-w-[58ch]">{p.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
