"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

type Props = {
  as?: "h1" | "h2" | "h3" | "p";
  children: React.ReactNode;
  className?: string;
};

/* GSAP SplitText line-mask reveal, triggered on scroll.
   Heading is visible by default; the split + animation only runs
   once fonts are ready, so there's no flash of unstyled measurement. */
export default function SplitHeading({ as: Tag = "h2", children, className }: Props) {
  const ref = useRef<HTMLHeadingElement | HTMLParagraphElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let split: SplitText | null = null;
    let trigger: ScrollTrigger | null = null;
    let cancelled = false;

    document.fonts.ready.then(() => {
      if (cancelled || !el) return;
      split = SplitText.create(el, {
        type: "lines",
        linesClass: "gsap-line-inner",
        mask: "lines",
        autoSplit: true, // re-split if the container width changes before reveal
        onSplit(self) {
          const tween = gsap.from(self.lines, {
            yPercent: 110,
            duration: 0.9,
            stagger: 0.09,
            ease: "expo.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              once: true,
            },
          });
          trigger = tween.scrollTrigger ?? null;
          return tween;
        },
      });
    });

    return () => {
      cancelled = true;
      trigger?.kill();
      split?.revert();
    };
  }, []);

  return (
    <Tag ref={ref as React.Ref<never>} className={className}>
      {children}
    </Tag>
  );
}
