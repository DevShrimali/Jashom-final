"use client";

import { useState } from "react";
import SplitHeading from "@/components/motion/SplitHeading";
import { Reveal } from "@/components/motion/Reveal";

const SERVICES = [
  "GPU Optimization Service",
  "CUDA Development Service",
  "AI/ML Development",
  "AI Consulting",
];

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: wire to form backend / API route before launch
    setStatus("sent");
  };

  return (
    <section className="section bg-paper border-y border-line" id="contact">
      <div className="container-j">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-5">
            <SplitHeading className="text-[clamp(2rem,4vw,3rem)] mb-6">
              Let&rsquo;s build high-performance AI systems
            </SplitHeading>
            <Reveal>
              <p className="text-ink-2 max-w-[48ch] mb-8">
                Tell us about your infrastructure and your performance targets. We respond to
                every inquiry within 24 hours.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="text-[0.9375rem] text-ink-2 flex flex-col gap-1.5">
                <p>Gandhinagar, Gujarat, India</p>
                <a href="mailto:hello@jashom.com" className="link-line w-fit text-ink">
                  hello@jashom.com
                </a>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            {status === "sent" ? (
              <div className="h-full flex flex-col items-start justify-center bg-linen border border-line rounded-lg p-10">
                <p className="font-serif text-3xl mb-3">Message received.</p>
                <p className="text-ink-2">
                  Thank you — we&rsquo;ll get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <Reveal delay={0.08}>
                <form onSubmit={onSubmit} className="grid sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="name" className="text-sm text-ink-2">Name</label>
                    <input id="name" name="name" required autoComplete="name" className="field-j" placeholder="Your name" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="email" className="text-sm text-ink-2">Email</label>
                    <input id="email" name="email" type="email" required autoComplete="email" className="field-j" placeholder="you@company.com" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="company" className="text-sm text-ink-2">Company</label>
                    <input id="company" name="company" autoComplete="organization" className="field-j" placeholder="Company name" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="phone" className="text-sm text-ink-2">Phone</label>
                    <input id="phone" name="phone" type="tel" autoComplete="tel" className="field-j" placeholder="+91" />
                  </div>
                  <div className="flex flex-col gap-1.5 sm:col-span-2">
                    <label htmlFor="service" className="text-sm text-ink-2">Service interest</label>
                    <select id="service" name="service" required defaultValue="" className="field-j">
                      <option value="" disabled>Select a service</option>
                      {SERVICES.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-col gap-1.5 sm:col-span-2">
                    <label htmlFor="message" className="text-sm text-ink-2">Project description</label>
                    <textarea id="message" name="message" rows={5} required className="field-j resize-y" placeholder="What are you running, and how fast does it need to be?" />
                  </div>
                  <div className="sm:col-span-2 flex flex-wrap items-center justify-between gap-4">
                    <p className="text-[0.8125rem] text-ink-3 max-w-[40ch]">
                      Your details are used only to respond to this inquiry.
                    </p>
                    <button type="submit" className="btn btn-primary">
                      Send Message
                    </button>
                  </div>
                </form>
              </Reveal>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
