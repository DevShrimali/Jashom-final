"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import Magnetic from "@/components/motion/Magnetic";

const SERVICES = [
  {
    label: "GPU Emulator",
    desc: "Develop CUDA without GPU hardware",
    href: "#services",
    iconName: "cpu" as const,
  },
  {
    label: "GPU Profiler",
    desc: "Real-time performance analysis",
    href: "#services",
    iconName: "chart" as const,
  },
  {
    label: "AI Assistant",
    desc: "Custom agents, skills, and GPU-aware optimization",
    href: "#services",
    iconName: "bot" as const,
  },
  {
    label: "Code Analysis",
    desc: "Static & assembly insights",
    href: "#services",
    iconName: "file" as const,
  },
  {
    label: "Multi-GPU",
    desc: "Scale across multiple GPUs",
    href: "#services",
    iconName: "network" as const,
  },
];

function ServiceIcon({ name }: { name: string }) {
  const common = {
    width: 20,
    height: 20,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (name) {
    case "cpu":
      return (
        <svg {...common}>
          <rect x="4" y="4" width="16" height="16" rx="0" />
          <rect x="9" y="9" width="6" height="6" />
          <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 15h3M1 9h3M1 15h3" />
        </svg>
      );
    case "chart":
      return (
        <svg {...common}>
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
      );
    case "bot":
      return (
        <svg {...common}>
          <rect x="3" y="11" width="18" height="10" rx="0" />
          <circle cx="12" cy="5" r="2" />
          <path d="M12 7v4" />
          <line x1="8" y1="16" x2="8.01" y2="16" strokeWidth="2.5" />
          <line x1="16" y1="16" x2="16.01" y2="16" strokeWidth="2.5" />
        </svg>
      );
    case "file":
      return (
        <svg {...common}>
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
      );
    case "network":
      return (
        <svg {...common}>
          <rect x="16" y="16" width="6" height="6" rx="0" />
          <rect x="2" y="16" width="6" height="6" rx="0" />
          <rect x="9" y="2" width="6" height="6" rx="0" />
          <path d="M12 8v4M5 16v-4h14v4" />
        </svg>
      );
    default:
      return null;
  }
}

const LINKS = [
  { label: "Hire Expert", href: "#contact" },
  { label: "Case Studies", href: "#case-studies" },
  { label: "Resources", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const reduced = useReducedMotion();

  // Track dark mode by watching the .dark class on <html>
  useEffect(() => {
    const root = document.documentElement;
    setIsDark(root.classList.contains("dark"));
    const observer = new MutationObserver(() => {
      setIsDark(root.classList.contains("dark"));
    });
    observer.observe(root, { attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,border-color] duration-300 ${
        scrolled
          ? "bg-linen/85 backdrop-blur-md border-b border-line shadow-[0_1px_0_rgba(17,17,19,0.02)]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="container-j flex items-center justify-between h-[68px]">
        <Link href="/" className="flex items-center gap-2" aria-label="Jashom home">
          <img
            src={isDark ? "/logo/jashom-dark.svg" : "/logo/jashom-white.svg"}
            alt="Jashom logo"
            width={24}
            height={24}
            className="h-6 w-auto"
          />
          <span className="font-mono font-medium text-lg md:text-xl text-ink tracking-tight">
            Jashom
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden lg:flex items-center gap-5">
          <div
            className="relative"
            onPointerEnter={() => setServicesOpen(true)}
            onPointerLeave={() => setServicesOpen(false)}
          >
            <button
              className="px-3 py-1.5 rounded-none text-[0.875rem] text-ink-2 hover:text-ink hover:bg-tint transition-all duration-200 flex items-center gap-1.5"
              aria-expanded={servicesOpen}
              onClick={() => setServicesOpen((v) => !v)}
            >
              Services
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true"
                className={`transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`}>
                <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
            <AnimatePresence>
              {servicesOpen && (
                <motion.div
                  initial={{ opacity: 0, transform: reduced ? "none" : "translateY(6px) scale(0.98)" }}
                  animate={{ opacity: 1, transform: "translateY(0px) scale(1)" }}
                  exit={{ opacity: 0, transform: "translateY(4px) scale(0.99)" }}
                  transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
                  style={{ transformOrigin: "top center" }}
                  className="absolute left-1/2 -translate-x-1/2 top-full pt-3 w-[560px]"
                >
                  <div className="bg-paper border border-line rounded-none p-3 shadow-[0_16px_40px_rgba(17,17,19,0.08)] grid grid-cols-2 gap-2">
                    {SERVICES.map((s) => (
                      <a
                        key={s.label}
                        href={s.href}
                        onClick={() => setServicesOpen(false)}
                        className="group flex items-start gap-4 p-3 rounded-none hover:bg-tint transition-all duration-200"
                      >
                        <div className="flex-shrink-0 flex items-center justify-center w-11 h-11 border border-line bg-tint text-ink transition-all duration-200 group-hover:bg-paper group-hover:-translate-y-0.5">
                          <ServiceIcon name={s.iconName} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-mono font-medium text-[0.9375rem] text-ink leading-tight mb-1">
                            {s.label}
                          </h4>
                          <p className="text-[0.8125rem] text-ink-2 leading-snug">
                            {s.desc}
                          </p>
                        </div>
                      </a>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="px-3 py-1.5 rounded-none text-[0.875rem] text-ink-2 hover:text-ink hover:bg-tint transition-all duration-200"
            >
              {l.label}
            </a>
          ))}

          <Magnetic strength={0.2}>
            <a href="#contact" className="btn btn-primary text-sm !py-3 !px-5">
              Schedule a Meeting
            </a>
          </Magnetic>
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden relative z-50 flex flex-col justify-center items-center w-11 h-11 -mr-2"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          <span
            className={`block w-5 h-px bg-ink transition-transform duration-300 ${
              open ? "rotate-45 translate-y-[0.5px]" : "-translate-y-1"
            }`}
          />
          <span
            className={`block w-5 h-px bg-ink transition-transform duration-300 ${
              open ? "-rotate-45" : "translate-y-1"
            }`}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="lg:hidden fixed inset-0 top-0 bg-linen z-40 flex flex-col"
          >
            <div className="container-j pt-24 pb-10 flex-1 overflow-y-auto">
              <p className="text-xs uppercase tracking-wider text-ink-3 mb-3">Services</p>
              {SERVICES.map((s, i) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, transform: reduced ? "none" : "translateY(12px)" }}
                  animate={{ opacity: 1, transform: "translateY(0px)" }}
                  transition={{ delay: 0.05 + i * 0.04, duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                  className="group flex items-start gap-4 py-3 border-b border-line"
                >
                  <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 border border-line bg-tint text-ink transition-all duration-200 group-hover:bg-paper">
                    <ServiceIcon name={s.iconName} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-mono font-medium text-[1.05rem] text-ink leading-tight mb-0.5">
                      {s.label}
                    </h4>
                    <p className="text-[0.8125rem] text-ink-2 leading-snug">
                      {s.desc}
                    </p>
                  </div>
                </motion.a>
              ))}
              <div className="h-6" />
              {LINKS.map((l, i) => (
                <motion.a
                  key={l.label}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, transform: reduced ? "none" : "translateY(12px)" }}
                  animate={{ opacity: 1, transform: "translateY(0px)" }}
                  transition={{ delay: 0.25 + i * 0.04, duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                  className="block py-3 font-mono text-2xl text-ink border-b border-line"
                >
                  {l.label}
                </motion.a>
              ))}
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="btn btn-primary w-full mt-8"
              >
                Schedule a Meeting
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
