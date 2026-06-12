import SplitHeading from "@/components/motion/SplitHeading";
import { Reveal, Stagger } from "@/components/motion/Reveal";
import CardGlyph, { type GlyphVariant } from "@/components/CardGlyph";

const CASES: Array<{
  category: string;
  title: string;
  tech: string[];
  glyph: GlyphVariant;
}> = [
  {
    category: "Enterprise AI · LLM Deployment",
    title: "LLM Inference Optimization on Constrained GPU Infrastructure",
    tech: ["CUDA", "TensorRT", "LLM"],
    glyph: "chip",
  },
  {
    category: "Infrastructure · GPU Operations",
    title: "GPU Workload Orchestration Framework on Rocky Linux 9.7",
    tech: ["FastAPI", "Docker", "Rocky Linux"],
    glyph: "nodes",
  },
  {
    category: "AI Engineering · Cloud Infrastructure",
    title: "Cloud GPU Fine-Tuning Strategy for Production LLM Deployment",
    tech: ["LoRA", "DeepSpeed", "Cloud GPU"],
    glyph: "tune",
  },
  {
    category: "Infrastructure Monitoring · GPU Data Centers",
    title: "Real-Time GPU Server Hardware Telemetry via Redfish BMC",
    tech: ["Redfish", "BMC", "Telemetry"],
    glyph: "pulse",
  },
];

export default function CaseStudies() {
  return (
    <section className="section" id="case-studies">
      <div className="container-j">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-14 md:mb-16">
          <SplitHeading className="text-[clamp(2rem,4vw,3rem)] max-w-xl">
            Proof, in production
          </SplitHeading>
          <Reveal>
            <a href="#contact" className="link-line text-ink font-medium text-[0.9375rem]">
              View all case studies →
            </a>
          </Reveal>
        </div>

        <Stagger className="grid md:grid-cols-2 gap-5" step={0.07}>
          {CASES.map((c) => (
            <a key={c.title} href="#contact" className="card-neon group block p-7 md:p-9 h-full">
              <CardGlyph variant={c.glyph} />
              <p className="neon-meta text-[0.8125rem] text-ink-2 mb-5">{c.category}</p>
              <h3 className="text-[1.45rem] md:text-[1.7rem] leading-snug mb-8 max-w-[24ch]">
                {c.title}
              </h3>
              <div className="flex flex-wrap items-center gap-2">
                {c.tech.map((t) => (
                  <span
                    key={t}
                    className="neon-chip text-[0.75rem] text-ink-2 bg-tint rounded-full px-3 py-1"
                  >
                    {t}
                  </span>
                ))}
                <span className="neon-cta ml-auto text-sm text-ink-3 transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </div>
            </a>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
