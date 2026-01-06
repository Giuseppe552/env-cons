// src/sections/Research.tsx
import React from "react";
import Reveal from "@/components/Reveal";
import Card from "@/components/Card";
import Section from "@/components/Section";

function AccentLabel({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 10
      }}
    >
      <span
        aria-hidden="true"
        style={{
          width: 10,
          height: 10,
          borderRadius: 999,
          background: "color-mix(in oklab, #7dd3fc 70%, transparent)",
          boxShadow: "0 0 0 3px color-mix(in oklab, #7dd3fc 12%, transparent)"
        }}
      />
      <span>{children}</span>
    </span>
  );
}

function FocusItem({ title }: { title: string }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "10px 1fr",
        gap: 12,
        alignItems: "start",
        padding: "10px 0",
        borderTop: "1px solid var(--line)"
      }}
    >
      <div
        aria-hidden="true"
        style={{
          width: 8,
          height: 8,
          borderRadius: 999,
          marginTop: 6,
          background: "color-mix(in oklab, #7dd3fc 58%, var(--muted))"
        }}
      />
      <div style={{ color: "var(--muted)", lineHeight: 1.55 }}>{title}</div>
    </div>
  );
}

type ResearchItemProps = {
  year: string;
  title: string;
  venue?: string;
  note?: string;
  href?: string;
  linkLabel?: string;
};

function ResearchItem({ year, title, venue, note, href, linkLabel }: ResearchItemProps) {
  return (
    <div
      style={{
        padding: "12px 0",
        borderTop: "1px solid var(--line)"
      }}
    >
      <div
        style={{
          display: "flex",
          gap: 10,
          alignItems: "baseline",
          flexWrap: "wrap"
        }}
      >
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            borderRadius: 999,
            padding: "6px 10px",
            border: "1px solid var(--line)",
            background: "color-mix(in oklab, #7dd3fc 10%, transparent)",
            color: "color-mix(in oklab, #7dd3fc 62%, var(--fg))",
            fontSize: 12,
            fontWeight: 650,
            letterSpacing: "0.06em",
            textTransform: "uppercase"
          }}
        >
          {year}
        </span>

        <div
          style={{
            fontWeight: 650,
            letterSpacing: "-0.02em",
            lineHeight: 1.35,
            minWidth: 0
          }}
        >
          {title}
        </div>
      </div>

      {(venue || note || href) ? (
        <div style={{ marginTop: 8, color: "var(--muted)", lineHeight: 1.55 }}>
          {venue ? <div>{venue}</div> : null}
          {note ? <div style={{ marginTop: venue ? 6 : 0 }}>{note}</div> : null}

          {href ? (
            <div style={{ marginTop: 8 }}>
              <a
                href={href}
                target="_blank"
                rel="noreferrer"
                style={{
                  color: "color-mix(in oklab, #7dd3fc 62%, var(--muted))",
                  textDecoration: "underline",
                  textUnderlineOffset: 4,
                  overflowWrap: "anywhere",
                  wordBreak: "break-word"
                }}
              >
                {linkLabel ?? "Read publication"}
              </a>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

export default function Research() {
  return (
    <Section
      id="research"
      title="Research"
      subtitle="Published in peer reviewed academic journals; presented at national and international academic and professional conferences."
    >
      <div className="grid2">
        <Reveal delayMs={90}>
          <Card>
            <div className="h2" style={{ marginBottom: 6 }}>
              <AccentLabel>Focus</AccentLabel>
            </div>
            <p className="small" style={{ margin: 0 }}>
              Practical methods for safer work environments, with an emphasis on inspection quality and prevention.
            </p>

            <div style={{ marginTop: 12 }}>
              <FocusItem title="How to conduct systematic visual inspections" />
              <FocusItem title="Preventing accidents, injuries, fires and ill health" />
              <FocusItem title="Risk assessment practice and safety auditing" />
            </div>
          </Card>
        </Reveal>

        <Reveal delayMs={180}>
          <Card>
            <div className="h2" style={{ marginBottom: 6 }}>
              <AccentLabel>Selected items</AccentLabel>
            </div>
            <p className="small" style={{ margin: 0 }}>
              A short selection of conference and publication highlights.
            </p>

            <div style={{ marginTop: 12 }}>
              <ResearchItem
                year="2023"
                title="The role of Vision Zero and related strategies in reducing EU work related fatalities, accidents and ill health."
                venue="European Commission DG Employment conference; Stockholm, May 14–15, 2023."
              />

              <ResearchItem
                year="2023"
                title="Supporting compliance of Occupational Safety and Health Requirements."
                venue="European Agency for Safety and Health at Work."
                href="https://osha.europa.eu/en/publications/supporting-compliance-workplace-safety-requirements-european-labour-inspection-systems-sanctions-and-standardised-measures"
                linkLabel="Read publication"
              />

              <ResearchItem
                year="2020"
                title="The Development and Trial of Systematic Visual Search…"
                venue="Policy and Practice in Health and Safety."
              />
            </div>
          </Card>
        </Reveal>
      </div>
    </Section>
  );
}
