// src/sections/Experience.tsx
import React from "react";
import Reveal from "@/components/Reveal";
import Card from "@/components/Card";
import Section from "@/components/Section";

function AccentLabel({ children }: { children: React.ReactNode }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
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

function TimelineCard({
  meta,
  body
}: {
  meta: string;
  body: string;
}) {
  return (
    <Card className="timelineItem">
      <div
        className="timelineMeta"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 10
        }}
      >
        <span
          aria-hidden="true"
          style={{
            width: 8,
            height: 8,
            borderRadius: 999,
            background: "color-mix(in oklab, #7dd3fc 58%, var(--muted))"
          }}
        />
        <span>{meta}</span>
      </div>

      <div className="timelineBody">{body}</div>
    </Card>
  );
}

export default function Experience() {
  return (
    <Section
      id="experience"
      title="Experience"
      subtitle="Career progression in environmental health and workplace safety."
    >
      <div
        style={{
          display: "grid",
          gap: 10,
          marginTop: 12
        }}
        aria-label="Experience summary"
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 10,
            alignItems: "center"
          }}
        >
          <div
            style={{
              color: "var(--muted)",
              fontWeight: 650,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              fontSize: 12
            }}
          >
            <AccentLabel>Timeline</AccentLabel>
          </div>

          <div
            style={{
              color: "var(--muted)",
              fontSize: 13
            }}
          >
            Regulatory enforcement, public events oversight, academic leadership, and EU project contribution.
          </div>
        </div>
      </div>

      <div className="timeline">
        <Reveal delayMs={60}>
          <TimelineCard
            meta="Early career"
            body="Environmental Health Officer in the London Boroughs of Brent and Ealing, enforcing regulatory food hygiene, fire safety, housing, and workplace safety standards."
          />
        </Reveal>

        <Reveal delayMs={120}>
          <TimelineCard
            meta="Public events"
            body="Involved in regulation of large public events including Wembley Stadium and Arena."
          />
        </Reveal>

        <Reveal delayMs={180}>
          <TimelineCard meta="1994" body="Fire and Safety Officer for Trinity College Dublin." />
        </Reveal>

        <Reveal delayMs={240}>
          <TimelineCard meta="1997" body="Lecturer in the School of Food Science and Environmental Health." />
        </Reveal>

        <Reveal delayMs={300}>
          <TimelineCard
            meta="European projects"
            body="Contributed expertise on projects and conferences for the European Agency for Safety and Health and the European Commission's Advisory Committee on Safety and Health."
          />
        </Reveal>
      </div>
    </Section>
  );
}
