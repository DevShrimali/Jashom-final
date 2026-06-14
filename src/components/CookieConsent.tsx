"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check local storage for consent
    const consent = localStorage.getItem("jashom_cookie_consent");
    if (!consent) {
      // Delay showing the popup for a more natural feel
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("jashom_cookie_consent", "accepted");
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("jashom_cookie_consent", "declined");
    setIsVisible(false);
  };

  const handleClose = () => {
    // Just close for the current session without saving a permanent preference
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 15, scale: 0.98 }}
          transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
          className="fixed bottom-6 right-6 z-50 w-full max-w-[330px] bg-paper dark:bg-[#17171a] border border-line dark:border-[#28282c] rounded-[10px] p-[18px] shadow-[0_16px_40px_rgba(17,17,19,0.06)] dark:shadow-[0_16px_40px_rgba(0,0,0,0.35)]"
        >
          <div className="flex justify-between items-start mb-3.5">
            <div className="flex items-center gap-2.5">
              {/* Retro Pixel Mascot SVG */}
              <div className="flex-shrink-0 w-7 h-7 flex items-center justify-center bg-transparent">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ imageRendering: "pixelated" }}
                >
                  {/* Hat / Bandana */}
                  <rect x="3" y="1" width="10" height="3" fill="#e8e6df" />
                  <rect x="2" y="3" width="12" height="1" fill="#e8e6df" />
                  <rect x="1" y="4" width="14" height="2" fill="#e8e6df" />

                  {/* Face */}
                  <rect x="3" y="6" width="10" height="5" fill="#2c2c30" />

                  {/* Eyes (NVIDIA Green) */}
                  <rect x="5" y="7" width="2" height="2" fill="#76b900" />
                  <rect x="9" y="7" width="2" height="2" fill="#76b900" />

                  {/* Mouth */}
                  <rect x="6" y="10" width="4" height="1" fill="#e8e6df" />

                  {/* Collars / Clothes */}
                  <rect x="2" y="11" width="12" height="2" fill="#e8e6df" />
                  <rect x="4" y="13" width="8" height="2" fill="#e8e6df" />
                </svg>
              </div>

              <div className="flex flex-col">
                <span className="font-mono font-bold text-[0.9375rem] text-ink uppercase tracking-wide leading-none">
                  Jashom
                </span>
                <span className="font-mono text-[0.625rem] text-ink-2 uppercase tracking-wider mt-0.5">
                  Cookie Protocol
                </span>
              </div>
            </div>

            <button
              onClick={handleClose}
              className="text-ink-2 hover:text-ink hover:bg-tint dark:hover:bg-[#202024] rounded-none transition-all duration-200 p-1.5"
              aria-label="Close"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="mb-4.5">
            <p className="font-mono text-[0.75rem] text-ink-2 leading-relaxed">
              We use cookies to optimize CUDA telemetry, analyze cluster traffic, and accelerate GPU inference.
            </p>
          </div>

          <div className="flex flex-col gap-2.5">
            <button
              onClick={handleAccept}
              className="w-full btn btn-cyan-3d py-2 text-[0.8125rem] font-mono font-bold text-center"
            >
              ACCEPT COOKIES →
            </button>
            <button
              onClick={handleDecline}
              className="w-full py-2 text-[0.6875rem] font-mono text-ink-2 hover:text-ink hover:bg-tint dark:hover:bg-[#202024] rounded-none transition-all duration-200 cursor-pointer text-center flex items-center justify-center uppercase"
            >
              DECLINE & ACCELERATE
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
