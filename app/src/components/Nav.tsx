// src/components/Nav.tsx
"use client";

import React, { useEffect, useMemo, useState } from "react";

type NavItem = { href: `#${string}`; label: string };

function cx(...parts: Array<string | false | undefined | null>) {
  return parts.filter(Boolean).join(" ");
}

export default function Nav({
  brand,
  items,
  ctaHref = "#contact",
  ctaLabel = "Enquire"
}: {
  brand: string;
  items: NavItem[];
  ctaHref?: `#${string}`;
  ctaLabel?: string;
}) {
  const [activeId, setActiveId] = useState(items[0]?.href ?? "#services");
  const [progress, setProgress] = useState(0);

  const sectionIds = useMemo(() => items.map((i) => i.href), [items]);

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.querySelector<HTMLElement>(id))
      .filter(Boolean) as HTMLElement[];

    const activeObs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];

        if (visible?.target?.id) setActiveId(`#${visible.target.id}`);
      },
      { threshold: [0.12, 0.2, 0.35], rootMargin: "-15% 0px -70% 0px" }
    );

    sections.forEach((s) => activeObs.observe(s));

    const onScroll = () => {
      const doc = document.documentElement;
      const scrollTop = doc.scrollTop || document.body.scrollTop;
      const scrollHeight = doc.scrollHeight - doc.clientHeight;
      const p = scrollHeight > 0 ? Math.min(1, Math.max(0, scrollTop / scrollHeight)) : 0;
      setProgress(p);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      activeObs.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [sectionIds]);

  return (
    <header className="header">
      <div className="progressTrack" aria-hidden="true">
        <div className="progressBar" style={{ width: `${Math.round(progress * 100)}%` }} />
      </div>

      <div className="container nav">
        <div className="brand">{brand}</div>

        <nav className="navlinks navlinks--scroll" aria-label="Primary navigation">
          {items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={cx("pill", activeId === item.href && "pill--active")}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="navCta">
          <a className="btn" href={ctaHref} aria-label={ctaLabel}>
            {ctaLabel}
          </a>
        </div>
      </div>
    </header>
  );
}
