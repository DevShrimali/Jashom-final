import SplitHeading from "@/components/motion/SplitHeading";
import { Reveal } from "@/components/motion/Reveal";
import Magnetic from "@/components/motion/Magnetic";

export default function FinalCTA() {
  return (
    <section className="relative section bg-carbon text-warmwhite overflow-clip">
      <div
        className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_-10%,rgba(232,230,223,0.07),transparent_60%)]"
        aria-hidden="true"
      />
      {/* Minimal waves background aligned at the bottom */}
      <div className="absolute bottom-0 inset-x-0 h-44 opacity-[0.08] pointer-events-none select-none" aria-hidden="true">
        <svg className="w-full h-full" viewBox="0 0 1440 200" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Main wave */}
          <path
            d="M -10,120 C 250,50 480,180 720,110 C 960,40 1180,180 1450,110"
            stroke="var(--warm-white)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          {/* Second wave */}
          <path
            d="M -10,150 C 280,80 440,190 690,130 C 940,70 1140,190 1450,130"
            stroke="var(--warm-white)"
            strokeWidth="0.8"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <div className="container-j relative flex flex-col items-center text-center">
        <SplitHeading className="text-[clamp(1.6rem,2.5vw,2.1rem)] text-warmwhite max-w-xl">
          Ready to accelerate your AI journey?
        </SplitHeading>
        <Reveal delay={0.1}>
          <p className="mt-6 text-darkink2 max-w-[50ch]">
            Join the teams already running their AI infrastructure at full speed. One
            conversation is enough to find out what your hardware is really capable of.
          </p>
        </Reveal>
        <Reveal delay={0.18}>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Magnetic strength={0.18}>
              <a href="#contact" className="btn btn-invert-primary">
                Request a Demo
              </a>
            </Magnetic>
            <a href="#case-studies" className="btn btn-invert-secondary">
              View Case Studies
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
