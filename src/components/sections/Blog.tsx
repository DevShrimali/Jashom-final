import SplitHeading from "@/components/motion/SplitHeading";
import { Reveal, Stagger } from "@/components/motion/Reveal";

const POSTS = [
  {
    title: "When to Reach for Custom CUDA Kernels (and When Not To)",
    excerpt: "Framework abstractions cover 90% of workloads. Here's how to recognize the other 10% — and what a kernel rewrite actually buys you.",
    date: "June 2, 2026",
    read: "8 min read",
  },
  {
    title: "TensorRT vs. Raw CUDA: An Inference Latency Field Guide",
    excerpt: "Benchmarks from real production deployments across A100, H100, and L40S — where each approach wins and why.",
    date: "May 19, 2026",
    read: "11 min read",
  },
  {
    title: "GPU Memory Bandwidth Is Your Real Bottleneck",
    excerpt: "Compute is rarely the limit. A practical walkthrough of profiling memory-bound workloads and restructuring around them.",
    date: "May 5, 2026",
    read: "9 min read",
  },
];

export default function Blog() {
  return (
    <section className="section" id="blog">
      <div className="container-j">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-14">
          <SplitHeading className="text-[clamp(2rem,4vw,3rem)] max-w-xl">
            From the engineering desk
          </SplitHeading>
          <Reveal>
            <a href="#blog" className="link-line text-ink font-medium text-[0.9375rem]">
              View all →
            </a>
          </Reveal>
        </div>

        <Stagger className="grid md:grid-cols-3 gap-5" step={0.07}>
          {POSTS.map((p) => (
            <a key={p.title} href="#blog" className="card-j group block p-7 h-full">
              <p className="text-[0.8125rem] text-ink-3 mb-5">
                {p.date} · {p.read}
              </p>
              <h3 className="font-sans font-medium text-[1.125rem] leading-snug text-ink mb-3 group-hover:underline decoration-1 underline-offset-4">
                {p.title}
              </h3>
              <p className="text-[0.9375rem] text-ink-2">{p.excerpt}</p>
              <p className="mt-6 text-sm text-ink font-medium">
                Read more
                <span className="inline-block ml-1 transition-transform duration-200 group-hover:translate-x-1">→</span>
              </p>
            </a>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
