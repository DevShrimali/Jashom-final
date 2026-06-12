import SplitHeading from "@/components/motion/SplitHeading";
import { Reveal } from "@/components/motion/Reveal";
import Magnetic from "@/components/motion/Magnetic";

export default function FinalCTA() {
  return (
    <section className="relative section bg-carbon text-warmwhite overflow-clip">
      {/* Faded grid on carbon — same treatment as the hero, inverted */}
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:radial-gradient(110%_90%_at_50%_40%,black,transparent)]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_-10%,rgba(232,230,223,0.07),transparent_60%)]"
        aria-hidden="true"
      />

      <div className="container-j relative flex flex-col items-center text-center">
        <SplitHeading className="text-[clamp(2.4rem,5.5vw,4.25rem)] text-warmwhite max-w-[18ch]">
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
