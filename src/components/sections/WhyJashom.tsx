import SplitHeading from "@/components/motion/SplitHeading";
import { Reveal, Stagger } from "@/components/motion/Reveal";
import Magnetic from "@/components/motion/Magnetic";

function Icon({ name }: { name: string }) {
  const common = {
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  switch (name) {
    case "gauge": // performance
      return (
        <svg {...common}>
          <path d="M4.5 16.5 A8.5 8.5 0 0 1 19.5 16.5" />
          <path d="M12 16.5 L16 9.5" />
          <circle cx="12" cy="16.5" r="1.4" fill="currentColor" stroke="none" />
          <path d="M4 12.5 l1.8.6 M20 12.5 l-1.8.6 M12 7.5 v2" />
        </svg>
      );
    case "layers": // production-grade systems
      return (
        <svg {...common}>
          <path d="M12 3.5 L20.5 8 L12 12.5 L3.5 8 Z" />
          <path d="M3.5 12.5 L12 17 L20.5 12.5" />
          <path d="M3.5 16.5 L12 21 L20.5 16.5" />
        </svg>
      );
    case "shield": // security
      return (
        <svg {...common}>
          <path d="M12 3 L19.5 6 V11.5 C19.5 16.5 16.5 19.8 12 21.5 C7.5 19.8 4.5 16.5 4.5 11.5 V6 Z" />
          <path d="M9 11.8 L11.2 14 L15.2 9.5" />
        </svg>
      );
    case "cycle": // rapid cycles
      return (
        <svg {...common}>
          <path d="M19.5 12 A7.5 7.5 0 1 1 17.3 6.7" />
          <path d="M17.5 3.5 L17.5 7 L14 7" />
        </svg>
      );
    case "headset": // support
      return (
        <svg {...common}>
          <path d="M4.5 13 V12 a7.5 7.5 0 0 1 15 0 v1" />
          <rect x="3.5" y="13" width="4" height="6" rx="2" />
          <rect x="16.5" y="13" width="4" height="6" rx="2" />
          <path d="M18.5 19 a3.5 3.5 0 0 1 -3.5 2.5 h-2" />
        </svg>
      );
    case "scale": // cost-efficient scaling
      return (
        <svg {...common}>
          <path d="M4 20 V14 M9.5 20 V10 M15 20 V6.5" />
          <path d="M15.5 3.5 L20.5 3.5 L20.5 8.5" />
          <path d="M20.5 3.5 L14.5 9.5" />
        </svg>
      );
    default:
      return null;
  }
}

const REASONS = [
  {
    icon: "gauge",
    title: "10X GPU performance improvement",
    body: "Kernel-level tuning and memory optimization that compounds into order-of-magnitude gains on real workloads.",
  },
  {
    icon: "layers",
    title: "Production-grade AI systems",
    body: "Everything we ship is validated against production traffic, not benchmark toys.",
  },
  {
    icon: "shield",
    title: "Enterprise-level security",
    body: "Secure data pipelines and strict access controls through every engagement.",
  },
  {
    icon: "cycle",
    title: "Rapid implementation cycles",
    body: "Assessment to deployed optimization in weeks. Tight loops, measurable checkpoints.",
  },
  {
    icon: "headset",
    title: "Dedicated technical support",
    body: "Direct access to the engineers who wrote your kernels — no ticket queue.",
  },
  {
    icon: "scale",
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
            <div key={r.title} className="group py-8 pr-8 border-b border-line">
              <span className="inline-flex items-center justify-center w-11 h-11 rounded-lg bg-tint text-ink mb-4 transition-transform duration-300 ease-out group-hover:-translate-y-0.5">
                <Icon name={r.icon} />
              </span>
              <h3 className="font-sans font-medium text-[1.0625rem] text-ink mb-2">{r.title}</h3>
              <p className="text-[0.9375rem] text-ink-2">{r.body}</p>
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
