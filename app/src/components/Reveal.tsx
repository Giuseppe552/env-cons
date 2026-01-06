// src/components/Reveal.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";

type RevealProps = {
  children: React.ReactNode;
  delayMs?: number;
  className?: string;
  as?: React.ElementType;
  once?: boolean;
};

export default function Reveal({
  children,
  delayMs = 0,
  className,
  as: Tag = "div",
  once = true
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReducedMotion(mq.matches);
    onChange();
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (reducedMotion) {
      el.classList.add("is-visible");
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          (e.target as HTMLElement).classList.add("is-visible");
          if (once) obs.unobserve(e.target);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -10% 0px" }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [reducedMotion, once]);

  return (
    <Tag
      ref={ref}
      data-reveal
      style={{ ["--d" as any]: `${delayMs}ms` }}
      className={className}
    >
      {children}
    </Tag>
  );
}
