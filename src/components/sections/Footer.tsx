"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const COLUMNS = [
  {
    head: "Services",
    links: ["GPU Optimization Service", "CUDA Development Service", "Hire CUDA Developers"],
  },
  {
    head: "Company",
    links: ["About Us", "Team", "Careers", "Company Brochure"],
  },
  {
    head: "Resources",
    links: ["Blog", "Case Studies", "Portfolio"],
  },
  {
    head: "Legal",
    links: ["Privacy Policy", "Terms of Service", "Security Policy", "Cookie Policy"],
  },
];

export default function Footer() {
  const [theme, setTheme] = useState<"system" | "light" | "dark">("system");
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);

  // Track actual dark state by watching html.classList
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
    setMounted(true);
    const saved = localStorage.getItem("theme") as "system" | "light" | "dark" | null;
    if (saved) {
      setTheme(saved);
    }
  }, []);

  useEffect(() => {
    if (!mounted || theme !== "system") return;

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const listener = (e: MediaQueryListEvent) => {
      const root = document.documentElement;
      if (e.matches) {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    };

    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [theme, mounted]);

  const handleThemeChange = (newTheme: "system" | "light" | "dark") => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);

    const root = document.documentElement;
    if (newTheme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      if (systemTheme === "dark") {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    } else if (newTheme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  };

  return (
    <footer className="bg-linen border-t border-line">
      <div className="container-j pt-16 md:pt-20 pb-10">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <Link href="/" className="inline-flex items-center gap-2 mb-4" aria-label="Jashom home">
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
            <p className="text-[0.9375rem] text-ink-2 max-w-[36ch]">
              Precision GPU engineering for high-performance AI. Gandhinagar, Gujarat, India.
            </p>
            <a
              href="mailto:hello@jashom.com"
              className="link-line inline-block mt-4 text-[0.9375rem] text-ink"
            >
              hello@jashom.com
            </a>
          </div>

          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8">
            {COLUMNS.map((col) => (
              <div key={col.head}>
                <p className="text-sm font-medium text-ink mb-4">{col.head}</p>
                <ul className="flex flex-col gap-2.5">
                  {col.links.map((l) => (
                    <li key={l}>
                      <a href="#" className="link-line text-[0.875rem] text-ink-2 hover:text-ink transition-colors duration-150">
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-line flex flex-wrap items-center justify-between gap-4 text-[0.8125rem] text-ink-3">
          <p>© {new Date().getFullYear()} Jashom Technologies. All rights reserved.</p>

          {/* Segmented Theme Switcher */}
          <div className="flex items-center border border-line bg-linen p-0.5 rounded-none" aria-label="Theme selection">
            <button
              onClick={() => handleThemeChange("system")}
              className={`p-1.5 rounded-none flex items-center justify-center transition-all cursor-pointer ${
                theme === "system" && mounted
                  ? "bg-tint border border-line text-ink"
                  : "text-ink-3 hover:text-ink-2 border border-transparent"
              }`}
              title="System Theme"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
              </svg>
            </button>
            <button
              onClick={() => handleThemeChange("light")}
              className={`p-1.5 rounded-none flex items-center justify-center transition-all cursor-pointer ${
                theme === "light" || (!mounted && theme === "system")
                  ? "bg-tint border border-line text-ink"
                  : "text-ink-3 hover:text-ink-2 border border-transparent"
              }`}
              title="Light Theme"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            </button>
            <button
              onClick={() => handleThemeChange("dark")}
              className={`p-1.5 rounded-none flex items-center justify-center transition-all cursor-pointer ${
                theme === "dark" && mounted
                  ? "bg-tint border border-line text-ink"
                  : "text-ink-3 hover:text-ink-2 border border-transparent"
              }`}
              title="Dark Theme"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            </button>
          </div>

          <a href="#" className="hover:text-ink transition-colors duration-150">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
