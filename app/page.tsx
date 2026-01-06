// src/app/page.tsx
"use client";

import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";

const NAV = [
  { href: "#services", label: "Services" },
  { href: "#background", label: "Background" },
  { href: "#credentials", label: "Credentials" },
  { href: "#research", label: "Research" },
  { href: "#contact", label: "Contact" }
] as const;

const PROFILE = {
  name: "Dr Victor Hrymak",
  title: "Environmental Health & Safety",
  roleLine: "Programme Chair for the TU Dublin MSc in Environmental Health & Safety (over 20 years).",
  summary:
    "Dr Victor Hrymak is chair of the MSc in Environmental Health & Safety at Technological University Dublin, a position he has held for over twenty years. He is also a fire & safety consultant, expert witness in court cases, and a workplace safety researcher, with over 30 years of workplace safety experience across public and private sector organisations.",
  contact: {
    email: "victor.hrymak@TUDublin.ie",
    telDisplay: "(01) 220 5660",
    telHref: "tel:012205660"
  }
} as const;

function cx(...parts: Array<string | false | undefined | null>) {
  return parts.filter(Boolean).join(" ");
}

function Reveal({
  children,
  delayMs = 0,
  as: Tag = "div",
  className
}: {
  children: React.ReactNode;
  delayMs?: number;
  as?: React.ElementType;
  className?: string;
}) {
  return (
    <Tag
      data-reveal
      style={{ ["--d" as any]: `${delayMs}ms` }}
      className={className}
    >
      {children}
    </Tag>
  );
}

export default function Page() {
  const [activeId, setActiveId] = useState<string>("#services");
  const [showPortrait, setShowPortrait] = useState(true);

  const sectionIds = useMemo(() => NAV.map((n) => n.href), []);

  useEffect(() => {
    // Reveal-on-scroll
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const revealObs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) e.target.classList.add("is-visible");
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -10% 0px" }
    );
    els.forEach((el) => revealObs.observe(el));

    // Active section highlighting for nav
    const sections = sectionIds
      .map((id) => document.querySelector<HTMLElement>(id))
      .filter(Boolean) as HTMLElement[];

    const activeObs = new IntersectionObserver(
      (entries) => {
        // pick the most visible intersecting section
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];

        if (visible?.target?.id) setActiveId(`#${visible.target.id}`);
      },
      { threshold: [0.12, 0.2, 0.35], rootMargin: "-15% 0px -70% 0px" }
    );

    sections.forEach((s) => activeObs.observe(s));

    return () => {
      revealObs.disconnect();
      activeObs.disconnect();
    };
  }, [sectionIds]);

  return (
    <>
      <a className="skipLink" href="#main">
        Skip to content
      </a>

      <header className="header">
        <div className="container nav">
          <div className="brand">{PROFILE.name}</div>

          <nav className="navlinks navlinks--scroll" aria-label="Primary navigation">
            {NAV.map((item) => (
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
            <a className="btn" href="#contact" aria-label="Enquire">
              Enquire
            </a>
          </div>
        </div>
      </header>

      <main id="main" className="container">
        {/* HERO */}
        <section className="hero" aria-label="Introduction">
          <Reveal delayMs={0}>
            <div className="kicker">{PROFILE.title}</div>
          </Reveal>

          <div className="heroGrid">
            <div>
              <Reveal delayMs={60}>
                <h1 className="h1">
                  Consulting informed by regulatory enforcement, university leadership, and workplace safety research.
                </h1>
              </Reveal>

              <Reveal delayMs={110}>
                <p className="lede">{PROFILE.summary}</p>
              </Reveal>

              <Reveal delayMs={150}>
                <div className="heroActions">
                  <a className="btn" href="#contact">
                    Contact
                  </a>
                  <a className="btn secondary" href="#services">
                    View services
                  </a>
                </div>
              </Reveal>

              <Reveal delayMs={190}>
                <div className="heroFacts" aria-label="Key facts">
                  <div className="fact">
                    <div className="factLabel">Role</div>
                    <div className="factValue">{PROFILE.roleLine}</div>
                  </div>
                  <div className="fact">
                    <div className="factLabel">Experience</div>
                    <div className="factValue">Over 30 years workplace safety experience (public and private sector).</div>
                  </div>
                  <div className="fact">
                    <div className="factLabel">Work</div>
                    <div className="factValue">Fire & safety consultant; expert witness in court cases; workplace safety researcher.</div>
                  </div>
                </div>
              </Reveal>
            </div>

            {showPortrait && (
              <Reveal delayMs={120} className="portraitWrap">
                <div className="portraitCard">
                  <div className="portraitImage">
                    <Image
                      src="/victor-hrymak.jpg"
                      alt="Portrait of Dr Victor Hrymak"
                      fill
                      priority
                      sizes="(max-width: 900px) 260px, 320px"
                      style={{ objectFit: "cover" }}
                      onError={() => setShowPortrait(false)}
                    />
                  </div>
                  <div className="portraitMeta">
                    <div className="portraitName">{PROFILE.name}</div>
                    <div className="portraitNote">Environmental Health & Safety</div>
                  </div>
                </div>
              </Reveal>
            )}
          </div>

          <Reveal delayMs={220}>
            <div className="card sectionNote">
              <p className="small" style={{ margin: 0 }}>
                Areas of expertise and research interests include the conduct of workplace safety inspections, safety auditing,
                the selection and conduct of risk assessments, and the implementation and statistical evaluation of safety
                management systems.
              </p>
            </div>
          </Reveal>
        </section>

        <div className="divider" />

        {/* SERVICES */}
        <section id="services" className="section" aria-label="Services">
          <Reveal>
            <div className="sectionHead">
              <h2 className="h2">Services</h2>
              <p className="small">
                The services below reflect the expertise and activities described in the profile information you provided.
              </p>
            </div>
          </Reveal>

          <div className="grid3">
            <Reveal delayMs={60}>
              <div className="card">
                <div className="h2">Workplace inspections and auditing</div>
                <ul className="list">
                  <li>Workplace safety inspections and inspection practice</li>
                  <li>Safety auditing</li>
                  <li>Methods to improve observation of hazards during inspections</li>
                </ul>
              </div>
            </Reveal>

            <Reveal delayMs={120}>
              <div className="card">
                <div className="h2">Risk assessment and safety management systems</div>
                <ul className="list">
                  <li>Selection and conduct of risk assessments</li>
                  <li>Implementation of safety management systems</li>
                  <li>Statistical evaluation of safety management systems</li>
                </ul>
              </div>
            </Reveal>

            <Reveal delayMs={180}>
              <div className="card">
                <div className="h2">Fire safety and expert support</div>
                <ul className="list">
                  <li>Fire & safety consulting</li>
                  <li>Expert witness work for court cases</li>
                  <li>Guidance for organisations and stakeholders</li>
                </ul>
              </div>
            </Reveal>
          </div>
        </section>

        <div className="divider" />

        {/* BACKGROUND */}
        <section id="background" className="section" aria-label="Background">
          <Reveal>
            <div className="sectionHead">
              <h2 className="h2">Background</h2>
              <p className="small">A concise timeline based on the information you provided.</p>
            </div>
          </Reveal>

          <div className="timeline">
            <Reveal delayMs={60}>
              <div className="card timelineItem">
                <div className="timelineMeta">Early career</div>
                <div className="timelineBody">
                  Environmental Health Officer in the London Boroughs of Brent and Ealing, enforcing regulatory food hygiene,
                  fire safety, housing, and workplace safety standards.
                </div>
              </div>
            </Reveal>

            <Reveal delayMs={120}>
              <div className="card timelineItem">
                <div className="timelineMeta">Public events</div>
                <div className="timelineBody">
                  Involved in regulation of large public events including Wembley Stadium and Arena.
                </div>
              </div>
            </Reveal>

            <Reveal delayMs={180}>
              <div className="card timelineItem">
                <div className="timelineMeta">1994</div>
                <div className="timelineBody">Fire and Safety Officer for Trinity College Dublin.</div>
              </div>
            </Reveal>

            <Reveal delayMs={240}>
              <div className="card timelineItem">
                <div className="timelineMeta">1997</div>
                <div className="timelineBody">Lecturer in the School of Food Science and Environmental Health.</div>
              </div>
            </Reveal>

            <Reveal delayMs={300}>
              <div className="card timelineItem">
                <div className="timelineMeta">European projects</div>
                <div className="timelineBody">
                  Contributed expertise on projects and conferences for the European Agency for Safety and Health and the European
                  Commission’s Advisory Committee on Safety and Health.
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <div className="divider" />

        {/* CREDENTIALS */}
        <section id="credentials" className="section" aria-label="Credentials">
          <Reveal>
            <div className="sectionHead">
              <h2 className="h2">Credentials</h2>
              <p className="small">Academic and professional credentials as stated in the profile information provided.</p>
            </div>
          </Reveal>

          <div className="grid2">
            <Reveal delayMs={80}>
              <div className="card">
                <div className="h2">Academic qualifications</div>
                <ul className="list">
                  <li>PhD (visual inspection, risk assessment and safety auditing), Trinity College Dublin</li>
                  <li>MSc in Environmental Science, Brunel University</li>
                  <li>BSc in Environmental Health, University of the West of England</li>
                </ul>
              </div>
            </Reveal>

            <Reveal delayMs={160}>
              <div className="card">
                <div className="h2">Professional qualifications and memberships</div>
                <ul className="list">
                  <li>Chartered Member of the Institution of Occupational Safety and Health (CMIOSH)</li>
                  <li>Member of the Institution of Fire Engineers (IFE)</li>
                  <li>Member of two international professional safety-related bodies: IOSH and IFE (UK-based)</li>
                </ul>
              </div>
            </Reveal>
          </div>
        </section>

        <div className="divider" />

        {/* RESEARCH */}
        <section id="research" className="section" aria-label="Research and publications">
          <Reveal>
            <div className="sectionHead">
              <h2 className="h2">Research and publications</h2>
              <p className="small">
                Summary and selected items from the information you provided. (This page intentionally does not try to list everything.)
              </p>
            </div>
          </Reveal>

          <div className="grid2">
            <Reveal delayMs={80}>
              <div className="card">
                <div className="h2">Academic supervision and presentations</div>
                <p className="small">
                  Published in peer reviewed academic journals; supervised over 400 MSc taught dissertations and two PhD theses in workplace safety.
                  Currently supervising two PhD students (construction safety; visual inspection conduct). Presented at national and international
                  academic and professional workplace safety conferences.
                </p>
              </div>
            </Reveal>

            <Reveal delayMs={160}>
              <div className="card">
                <div className="h2">Selected items</div>
                <ul className="list">
                  <li>
                    2023: “The role of Vision Zero and related strategies in reducing EU work related fatalities, accidents and ill health.”
                    Thematic Discussion Paper for European Commission DG Employment conference (Stockholm, May 14–15, 2023).
                  </li>
                  <li>
                    2023: “Supporting compliance of Occupational Safety and Health Requirements.” Discussion Paper, European Agency for Safety and Health at Work.{" "}
                    <a
                      href="https://osha.europa.eu/en/publications/supporting-compliance-workplace-safety-requirements-european-labour-inspection-systems-sanctions-and-standardised-measures"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Read publication
                    </a>
                  </li>
                  <li>
                    2020: “The Development and Trial of Systematic Visual Search; a visual inspection method designed to improve current workplace risk assessment practice.”
                    Policy and Practice in Health and Safety.
                  </li>
                </ul>
              </div>
            </Reveal>
          </div>

          <Reveal delayMs={220}>
            <div className="card sectionNote">
              <p className="small" style={{ margin: 0 }}>
                Research interests include how to conduct visual inspections and how best to prevent accidents, injuries, fires and ill health.
              </p>
            </div>
          </Reveal>
        </section>

        <div className="divider" />

        {/* CONTACT */}
        <section id="contact" className="section" aria-label="Contact">
          <Reveal>
            <div className="sectionHead">
              <h2 className="h2">Contact</h2>
              <p className="small">Contact details below are as listed in the profile content you provided.</p>
            </div>
          </Reveal>

          <div className="grid2">
            <Reveal delayMs={80}>
              <div className="card">
                <div className="h2">Enquiries</div>
                <p className="small">
                  If you want higher conversion without inventing claims, add a short line here stating the engagement format you actually offer
                  (e.g., review, site visit, written report) once confirmed.
                </p>

                <div className="heroActions" style={{ marginTop: 14 }}>
                  <a className="btn" href={`mailto:${PROFILE.contact.email}`}>
                    {PROFILE.contact.email}
                  </a>
                  <a className="btn secondary" href={PROFILE.contact.telHref}>
                    {PROFILE.contact.telDisplay}
                  </a>
                </div>
              </div>
            </Reveal>

            <Reveal delayMs={160}>
              <div className="card">
                <div className="h2">First message</div>
                <p className="small" style={{ marginBottom: 10 }}>
                  Include: organisation, sector, location, and what you need reviewed (inspection, audit, risk assessment, or fire safety).
                </p>
                <div className="small" style={{ opacity: 0.9 }}>
                  This keeps the first call focused and avoids wasted time.
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <footer className="footer">© {new Date().getFullYear()} {PROFILE.name}. All rights reserved.</footer>

        {/* Page-local CSS: keep here for now; we’ll move it to globals.css after you confirm the layout is right */}
        <style jsx global>{`
          .skipLink {
            position: absolute;
            left: -9999px;
            top: 8px;
            padding: 10px 12px;
            border-radius: 999px;
            border: 1px solid var(--line);
            background: var(--surface);
            z-index: 9999;
          }
          .skipLink:focus {
            left: 12px;
            outline: none;
          }

          /* Premium nav behaviour on mobile: scroll row + CTA separated */
          .navCta {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            margin-left: 10px;
            flex: 0 0 auto;
          }
          .navlinks--scroll {
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
            flex: 1 1 auto;
            padding: 4px 2px;
            mask-image: linear-gradient(to right, transparent, black 18px, black calc(100% - 18px), transparent);
          }
          .navlinks--scroll::-webkit-scrollbar {
            display: none;
          }
          .pill--active {
            border-color: color-mix(in oklab, var(--fg) 30%, var(--line));
            background: color-mix(in oklab, var(--surface) 85%, transparent);
          }

          /* Hero layout */
          .heroGrid {
            display: grid;
            grid-template-columns: 1.12fr 0.88fr;
            gap: 22px;
            align-items: start;
            margin-top: 10px;
          }
          .heroActions {
            display: flex;
            gap: 10px;
            flex-wrap: wrap;
            margin-top: 12px;
          }

          .heroFacts {
            margin-top: 18px;
            display: grid;
            gap: 10px;
          }
          .fact {
            padding: 12px 14px;
            border: 1px solid var(--line);
            border-radius: 12px;
            background: color-mix(in oklab, var(--surface) 78%, transparent);
          }
          .factLabel {
            font-size: 12px;
            letter-spacing: 0.06em;
            text-transform: uppercase;
            color: var(--muted);
            font-weight: 650;
          }
          .factValue {
            margin-top: 6px;
            font-size: 14px;
            color: var(--fg);
          }

          .portraitWrap {
            display: flex;
            justify-content: flex-end;
          }
          .portraitCard {
            width: min(360px, 100%);
            border: 1px solid var(--line);
            border-radius: 18px;
            padding: 14px;
            background: color-mix(in oklab, var(--surface) 80%, transparent);
            box-shadow: var(--shadow);
          }
          .portraitImage {
            position: relative;
            width: 100%;
            aspect-ratio: 4 / 5;
            border-radius: 14px;
            overflow: hidden;
            border: 1px solid var(--line);
          }
          .portraitMeta {
            margin-top: 12px;
          }
          .portraitName {
            font-weight: 650;
            letter-spacing: -0.02em;
          }
          .portraitNote {
            margin-top: 4px;
            color: var(--muted);
            font-size: 13px;
          }

          .sectionHead {
            max-width: 74ch;
          }
          .sectionNote {
            margin-top: 14px;
          }

          .divider {
            margin: 18px 0;
            border-top: 1px solid var(--line);
            opacity: 0.8;
          }

          .grid2 {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 14px;
            margin-top: 14px;
          }

          .grid3 {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 14px;
            margin-top: 14px;
          }

          .timeline {
            display: grid;
            gap: 12px;
            margin-top: 14px;
          }
          .timelineItem {
            display: grid;
            gap: 10px;
          }
          .timelineMeta {
            font-size: 12px;
            letter-spacing: 0.06em;
            text-transform: uppercase;
            color: var(--muted);
            font-weight: 650;
          }
          .timelineBody {
            color: var(--muted);
            font-size: 14px;
          }

          /* Motion system: subtle, premium, respects reduced motion */
          [data-reveal] {
            opacity: 0;
            transform: translateY(10px);
            filter: blur(6px);
            transition:
              opacity 700ms cubic-bezier(0.2, 0.8, 0.2, 1),
              transform 700ms cubic-bezier(0.2, 0.8, 0.2, 1),
              filter 900ms cubic-bezier(0.2, 0.8, 0.2, 1);
            transition-delay: var(--d, 0ms);
            will-change: opacity, transform, filter;
          }
          [data-reveal].is-visible {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0);
          }
          @media (prefers-reduced-motion: reduce) {
            [data-reveal] {
              opacity: 1 !important;
              transform: none !important;
              filter: none !important;
              transition: none !important;
            }
          }

          /* Mobile: fix the exact problem you showed (cramped header + hero composition) */
          @media (max-width: 900px) {
            .nav {
              gap: 10px;
            }
            .navCta .btn {
              padding: 10px 12px;
            }
            .heroGrid {
              grid-template-columns: 1fr;
              gap: 14px;
            }
            .portraitWrap {
              justify-content: flex-start;
            }
            .portraitCard {
              width: min(320px, 100%);
            }
            .grid3 {
              grid-template-columns: 1fr;
            }
            .grid2 {
              grid-template-columns: 1fr;
            }
          }
        `}</style>
      </main>
    </>
  );
}
