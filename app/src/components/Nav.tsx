// src/components/Nav.tsx
"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

type NavItem = { href: `#${string}`; label: string };

function cx(...parts: Array<string | false | undefined | null>) {
  return parts.filter(Boolean).join(" ");
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
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
  const [activeId, setActiveId] = useState<`#${string}`>(items[0]?.href ?? "#services");
  const activeIdRef = useRef<`#${string}`>(activeId);

  const [progress, setProgress] = useState(0);
  const [isMobileNav, setIsMobileNav] = useState(false);
  const [isNarrow, setIsNarrow] = useState(false);

  const sectionIds = useMemo(() => items.map((i) => i.href), [items]);

  const sectionElsRef = useRef<HTMLElement[]>([]);
  const rafRef = useRef<number | null>(null);

  // Mobile tab refs (only used to scroll the active tab into view after a tap)
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const lastClickRef = useRef<string | null>(null);

  // Tap-lock: prevent scrollspy from overriding the clicked tab during smooth scroll.
  const lockRef = useRef<{ until: number; target: `#${string}` | null }>({ until: 0, target: null });

  // Keep ref in sync with state (prevents stale-closure bugs)
  useEffect(() => {
    activeIdRef.current = activeId;
  }, [activeId]);

  useEffect(() => {
    const mqMobile = window.matchMedia("(max-width: 760px)");
    const mqNarrow = window.matchMedia("(max-width: 420px)");

    const apply = () => {
      setIsMobileNav(mqMobile.matches);
      setIsNarrow(mqNarrow.matches);
    };

    apply();
    mqMobile.addEventListener?.("change", apply);
    mqNarrow.addEventListener?.("change", apply);

    return () => {
      mqMobile.removeEventListener?.("change", apply);
      mqNarrow.removeEventListener?.("change", apply);
    };
  }, []);

  // Cache section elements (refresh if nav items change)
  useEffect(() => {
    sectionElsRef.current = sectionIds
      .map((id) => document.querySelector<HTMLElement>(id))
      .filter(Boolean) as HTMLElement[];
  }, [sectionIds]);

  useEffect(() => {
    const getHeaderHeight = () => {
      const header = document.querySelector<HTMLElement>(".header");
      if (!header) return 92;
      const h = header.getBoundingClientRect().height;
      return h > 0 ? h : 92;
    };

    const computeActive = (headerH: number) => {
      const probeY = Math.ceil(headerH) + 12;
      const sections = sectionElsRef.current;
      if (!sections.length) return null;

      // Primary: section containing the probe line
      for (const s of sections) {
        const r = s.getBoundingClientRect();
        if (r.top <= probeY && r.bottom >= probeY) return `#${s.id}` as `#${string}`;
      }

      // Fallback: last section above probe (near bottom)
      let lastAbove: HTMLElement | null = null;
      for (const s of sections) {
        const r = s.getBoundingClientRect();
        if (r.top <= probeY) lastAbove = s;
      }
      return lastAbove ? (`#${lastAbove.id}` as `#${string}`) : null;
    };

    const update = () => {
      const headerH = getHeaderHeight();

      // Keep scroll-margin aligned to *actual* header height.
      document.documentElement.style.setProperty("--header-offset", `${Math.ceil(headerH)}px`);

      // Progress (rAF-throttled)
      const doc = document.documentElement;
      const scrollTop = doc.scrollTop || document.body.scrollTop;
      const scrollHeight = doc.scrollHeight - doc.clientHeight;
      const p = scrollHeight > 0 ? clamp(scrollTop / scrollHeight, 0, 1) : 0;
      setProgress(p);

      const nextActive = computeActive(headerH);
      if (!nextActive) return;

      // If we recently tapped a tab, don't let scrollspy override it until we reach it or timeout.
      const now = Date.now();
      if (lockRef.current.target && now < lockRef.current.until) {
        if (nextActive !== lockRef.current.target) {
          return; // still travelling
        }
        // Reached target; release lock early
        lockRef.current = { until: 0, target: null };
      }

      if (nextActive !== activeIdRef.current) {
        activeIdRef.current = nextActive;
        setActiveId(nextActive);
      }
    };

    const onScrollOrResize = () => {
      if (rafRef.current != null) return;
      rafRef.current = window.requestAnimationFrame(() => {
        rafRef.current = null;
        update();
      });
    };

    update();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);
    window.addEventListener("orientationchange", onScrollOrResize);

    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
      window.removeEventListener("orientationchange", onScrollOrResize);
    };
  }, [sectionIds]);

  // If user clicked a tab on mobile, ensure it scrolls into view once.
  useEffect(() => {
    if (!isMobileNav) return;
    if (!lastClickRef.current) return;

    const el = linkRefs.current[activeId];
    if (!el) return;

    try {
      el.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    } catch {
      // ignore
    } finally {
      lastClickRef.current = null;
    }
  }, [activeId, isMobileNav]);

  const mobileWrapStyle: React.CSSProperties = {
    maxWidth: "var(--container)",
    marginLeft: "auto",
    marginRight: "auto",
    width: "100%",
    padding: "10px 14px",
    display: "grid",
    gap: 6
  };

  const brandStyleMobile: React.CSSProperties = {
    minWidth: 0,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    fontSize: 13,
    letterSpacing: "-0.01em"
  };

  const ctaStyleMobile: React.CSSProperties = {
    padding: isNarrow ? "8px 11px" : "9px 12px",
    fontSize: 12
  };

  const tabsRail: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: 6,
    minWidth: 0,
    padding: "2px",
    borderRadius: 999,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "color-mix(in oklab, var(--fg) 12%, var(--line))",
    background: "color-mix(in oklab, var(--surface) 72%, transparent)",
    overflowX: "auto",
    WebkitOverflowScrolling: "touch" as any,
    scrollbarWidth: "none" as any
  };

  const tabBase: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: isNarrow ? "7px 10px" : "7px 12px",
    borderRadius: 999,

    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "transparent",

    background: "transparent",
    color: "var(--muted)",
    fontSize: 12,
    lineHeight: 1,
    whiteSpace: "nowrap",
    textDecoration: "none",
    transition:
      "background var(--dur-1) var(--ease), border-color var(--dur-1) var(--ease), color var(--dur-1) var(--ease)"
  };

  const tabActive: React.CSSProperties = {
    color: "var(--fg)",
    borderColor: "color-mix(in oklab, var(--fg) 14%, var(--line))",
    background: "color-mix(in oklab, var(--surface) 86%, transparent)"
  };

  const onNavClick = (href: `#${string}`) => {
    // set highlight immediately
    activeIdRef.current = href;
    setActiveId(href);

    // lock scrollspy briefly until we arrive (or timeout)
    lockRef.current = { target: href, until: Date.now() + 900 };

    // mobile: remember for tab auto-scroll
    lastClickRef.current = href;
  };

  return (
    <header className="header">
      <div className="progressTrack" aria-hidden="true">
        <div className="progressBar" style={{ width: `${Math.round(progress * 100)}%` }} />
      </div>

      {!isMobileNav ? (
        <div className="container nav">
          <div className="brand">{brand}</div>

          <nav className="navlinks navlinks--scroll" aria-label="Primary navigation">
            {items.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={cx("pill", activeId === item.href && "pill--active")}
                onClick={() => onNavClick(item.href)}
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
      ) : (
        <div style={mobileWrapStyle}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 10,
              minWidth: 0
            }}
          >
            <div className="brand" style={brandStyleMobile} title={brand}>
              {brand}
            </div>

            <a className="btn" style={ctaStyleMobile} href={ctaHref} aria-label={ctaLabel}>
              {ctaLabel}
            </a>
          </div>

          <nav aria-label="Primary navigation" style={tabsRail}>
            {items.map((item) => {
              const isActive = activeId === item.href;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  ref={(node) => {
                    linkRefs.current[item.href] = node;
                  }}
                  onClick={() => onNavClick(item.href)}
                  style={{ ...tabBase, ...(isActive ? tabActive : null) }}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
