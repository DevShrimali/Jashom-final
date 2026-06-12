import SplitHeading from "@/components/motion/SplitHeading";
import { Reveal } from "@/components/motion/Reveal";

/* Placeholder testimonials — replace quotes and attributions with
   verified client statements before launch. */
const QUOTES = [
  {
    quote:
      "Inference latency dropped from 240ms to 38ms on the same hardware. The Jashom team found headroom our own engineers didn't know existed.",
    name: "Head of ML Platform",
    org: "Enterprise AI company",
  },
  {
    quote:
      "They rewrote our preprocessing pipeline as custom CUDA kernels and cut our training cycle from three weeks to four days.",
    name: "VP of Engineering",
    org: "Computer vision startup",
  },
  {
    quote:
      "Rare combination: deep kernel-level expertise and clear communication with a non-technical board. Both mattered.",
    name: "CTO",
    org: "Cloud infrastructure provider",
  },
];

export default function Testimonials() {
  return (
    <section className="section bg-paper border-y border-line" id="testimonials">
      <div className="container-j">
        <SplitHeading className="text-[clamp(2rem,4vw,3rem)] max-w-xl mb-14 md:mb-20">
          What our clients say
        </SplitHeading>

        {/* Staggered column offsets give the row an editorial rhythm */}
        <div className="grid lg:grid-cols-3 gap-x-10 gap-y-14 lg:[&>*:nth-child(2)]:mt-10 lg:[&>*:nth-child(3)]:mt-20">
          {QUOTES.map((q, i) => (
            <Reveal key={q.name} delay={i * 0.08}>
              <figure className="h-full flex flex-col">
                <blockquote className="font-serif text-[1.35rem] md:text-[1.5rem] leading-[1.35] text-ink">
                  &ldquo;{q.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 pt-5 border-t border-line text-[0.9375rem]">
                  <span className="text-ink font-medium">{q.name}</span>
                  <span className="text-ink-2"> · {q.org}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
