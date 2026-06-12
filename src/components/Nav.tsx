"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import Magnetic from "@/components/motion/Magnetic";

const SERVICES = [
  { label: "GPU Optimization Service", href: "#services" },
  { label: "CUDA Development Service", href: "#services" },
  { label: "AI/ML Development", href: "#services" },
  { label: "AI Consulting", href: "#services" },
];

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
  const reduced = useReducedMotion();

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
      <nav className="container-j flex items-center justify-between h-16 md:h-[72px]">
        <Link href="/" className="flex items-center" aria-label="Jashom home">
          <Image
            src="/jashom-logo.svg"
            alt="Jashom"
            width={160}
            height={30}
            className="block"
            style={{ height: 30, width: "auto" }}
            priority
          />
        </Link>

        {/* Desktop */}
        <div className="hidden lg:flex items-center gap-8">
          <div
            className="relative"
            onPointerEnter={() => setServicesOpen(true)}
            onPointerLeave={() => setServicesOpen(false)}
          >
            <button
              className="flex items-center gap-1.5 text-[0.9375rem] text-ink-2 hover:text-ink transition-colors duration-150 py-2"
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
                  className="absolute left-1/2 -translate-x-1/2 top-full pt-3 w-64"
                >
                  <div className="bg-paper border border-line rounded-lg p-2 shadow-[0_16px_40px_rgba(17,17,19,0.08)]">
                    {SERVICES.map((s) => (
                      <a
                        key={s.label}
                        href={s.href}
                        className="block px-3 py-2.5 rounded-md text-[0.9rem] text-ink-2 hover:text-ink hover:bg-tint transition-colors duration-150"
                      >
                        {s.label}
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
              className="link-line text-[0.9375rem] text-ink-2 hover:text-ink transition-colors duration-150"
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
                  className="block py-3 font-serif text-2xl text-ink border-b border-line"
                >
                  {s.label}
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
                  className="block py-3 font-serif text-2xl text-ink border-b border-line"
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
