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
            <SplitHeading className="text-[clamp(1.6rem,2.5vw,2.1rem)] mb-6">
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
              <div className="h-full flex flex-col items-start justify-center bg-linen border border-line rounded-none p-10">
                <p className="font-mono text-3xl mb-3">Message received.</p>
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
        {/* Banner at the bottom of the contact section */}
        <div className="mt-16 pt-8 border-t border-line flex justify-center">
          <a
            href="https://chatgpt.com/?q=How+can+Jashom+help+my+company+with+GPU+optimization+and+CUDA+development%3F"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1.5 text-[0.875rem] text-ink-2 hover:text-ink transition-colors relative py-1"
          >
            <span>Not sure how this helps you? Ask</span>
            <svg
              className="w-3.5 h-3.5 fill-current"
              viewBox="0 0 16 16"
              aria-hidden="true"
            >
              <path d="M14.949 6.547a3.94 3.94 0 0 0-.348-3.273 4.11 4.11 0 0 0-4.4-1.934A4.1 4.1 0 0 0 8.423.2 4.15 4.15 0 0 0 6.305.086a4.1 4.1 0 0 0-1.891.948 4.04 4.04 0 0 0-1.158 1.753 4.1 4.1 0 0 0-1.563.679A4 4 0 0 0 .554 4.72a3.99 3.99 0 0 0 .502 4.731 3.94 3.94 0 0 0 .346 3.274 4.11 4.11 0 0 0 4.402 1.933c.382.425.852.764 1.377.995.526.231 1.095.35 1.67.346 1.78.002 3.358-1.132 3.901-2.804a4.1 4.1 0 0 0 1.563-.68 4 4 0 0 0 1.14-1.253 3.99 3.99 0 0 0-.506-4.716m-6.097 8.406a3.05 3.05 0 0 1-1.945-.694l.096-.054 3.23-1.838a.53.53 0 0 0 .265-.455v-4.49l1.366.778q.02.011.025.035v3.722c-.003 1.653-1.361 2.992-3.037 2.996m-6.53-2.75a2.95 2.95 0 0 1-.36-2.01l.095.057L5.29 12.09a.53.53 0 0 0 .527 0l3.949-2.246v1.555a.05.05 0 0 1-.022.041L6.473 13.3c-1.454.826-3.311.335-4.15-1.098m-.85-6.94A3.02 3.02 0 0 1 3.07 3.949v3.785a.51.51 0 0 0 .262.451l3.93 2.237-1.366.779a.05.05 0 0 1-.048 0L2.585 9.342a2.98 2.98 0 0 1-1.113-4.094zm11.216 2.571L8.747 5.576l1.362-.776a.05.05 0 0 1 .048 0l3.265 1.86a3 3 0 0 1 1.173 1.207 2.96 2.96 0 0 1-.27 3.2 3.05 3.05 0 0 1-1.36.997V8.279a.52.52 0 0 0-.276-.445m1.36-2.015-.097-.057-3.226-1.855a.53.53 0 0 0-.53 0L6.249 6.153V4.598a.04.04 0 0 1 .019-.04L9.533 2.7a3.07 3.07 0 0 1 3.257.139c.474.325.843.778 1.066 1.303.223.526.289 1.103.191 1.664zM5.503 8.575 4.139 7.8a.05.05 0 0 1-.026-.037V4.049c0-.57.166-1.127.476-1.607s.752-.864 1.275-1.105a3.08 3.08 0 0 1 .134-.134z" />
            </svg>
            <span className="font-semibold">ChatGPT</span>
            <span className="absolute bottom-0 left-0 right-0 h-[1.2px] bg-ink-3/40 group-hover:bg-ink-2 transition-colors" />
          </a>
        </div>
      </div>
    </section>
  );
}
