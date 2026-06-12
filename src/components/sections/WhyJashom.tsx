import SplitHeading from "@/components/motion/SplitHeading";
import { Reveal, Stagger } from "@/components/motion/Reveal";
import Magnetic from "@/components/motion/Magnetic";

const REASONS = [
  {
    title: "10X GPU performance improvement",
    body: "Kernel-level tuning and memory optimization that compounds into order-of-magnitude gains on real workloads.",
  },
  {
    title: "Production-grade AI systems",
    body: "Everything we ship is validated against production traffic, not benchmark toys.",
  },
  {
    title: "Enterprise-level security",
    body: "Secure data pipelines and strict access controls through every engagement.",
  },
  {
    title: "Rapid implementation cycles",
    body: "Assessment to deployed optimization in weeks. Tight loops, measurable checkpoints.",
  },
  {
    title: "Dedicated technical support",
    body: "Direct access to the engineers who wrote your kernels — no ticket queue.",
  },
  {
    title: "Cost-efficient scaling",
    body: "More throughput per GPU means fewer GPUs. Optimization pays for itself.",
  },
];

export default function WhyJashom() {
  return (
    <section className="section" id="why">
      <div className="container-j">
        <SplitHeading className="text-[clamp(2rem,4vw,3rem)] max-w-xl mb-14 md:mb-16">
          Why choose Jashom?
        </SplitHeading>

        <Stagger className="grid sm:grid-cols-2 lg:grid-cols-3 border-t border-line" step={0.05}>
          {REASONS.map((r) => (
            <div
              key={r.title}
              className="group py-8 pr-8 border-b border-line transition-colors duration-200"
            >
              <h3 className="font-sans font-medium text-[1.0625rem] text-ink mb-2.5 flex items-start gap-3">
                <span className="mt-[0.65em] w-4 h-px bg-ink shrink-0 transition-[width] duration-300 group-hover:w-7" aria-hidden="true" />
                {r.title}
              </h3>
              <p className="text-[0.9375rem] text-ink-2 pl-7">{r.body}</p>
            </div>
          ))}
        </Stagger>

        <Reveal className="mt-14 flex justify-center">
          <Magnetic strength={0.18}>
            <a href="#contact" className="btn btn-primary">
              Start Your AI Transformation
            </a>
          </Magnetic>
        </Reveal>
      </div>
    </section>
  );
}
