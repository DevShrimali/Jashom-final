import Counter from "@/components/motion/Counter";
import SplitHeading from "@/components/motion/SplitHeading";
import { Reveal, Stagger } from "@/components/motion/Reveal";

const PARTNERS = ["NVIDIA", "AWS", "Google Cloud", "Microsoft Azure", "PyTorch", "TensorRT", "Triton", "Docker"];

const STATS = [
  { value: 25, suffix: "+", label: "Clients served" },
  { value: 50, suffix: "+", label: "Projects delivered" },
  { value: 10, suffix: "X", label: "Peak performance gain" },
  { value: 100, suffix: "%", label: "Client satisfaction" },
];

export default function TrustStats() {
  return (
    <section className="section bg-carbon text-warmwhite overflow-clip" id="trust">
      <div className="container-j">
        <SplitHeading className="text-[clamp(2rem,4vw,3rem)] text-warmwhite max-w-xl mb-14 md:mb-20">
          Trusted by innovative teams worldwide
        </SplitHeading>
      </div>

      {/* Partner marquee — full bleed */}
      <Reveal>
        <div
          className="relative border-y border-darkline py-7 select-none"
          style={{
            maskImage: "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
          }}
          aria-label="Technology partners"
        >
          <div className="marquee-track gap-16 pr-16">
            {[...PARTNERS, ...PARTNERS].map((p, i) => (
              <span
                key={`${p}-${i}`}
                className="text-xl md:text-2xl font-medium tracking-tight text-darkink2 whitespace-nowrap"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </Reveal>

      <div className="container-j mt-16 md:mt-20">
        <Stagger className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12" step={0.08}>
          {STATS.map((s) => (
            <div key={s.label}>
              <p className="font-serif text-[clamp(2.75rem,5.5vw,4.5rem)] leading-none text-warmwhite">
                <Counter value={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-3 text-[0.9375rem] text-darkink2">{s.label}</p>
            </div>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
