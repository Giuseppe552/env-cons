// src/sections/Experience.tsx
import React from "react";
import Reveal from "@/components/Reveal";
import Card from "@/components/Card";
import Section from "@/components/Section";

export default function Experience() {
  return (
    <Section
      id="experience"
      title="Experience"
      subtitle="Career progression in environmental health and workplace safety."
    >
      <div className="timeline">
        <Reveal delayMs={60}>
          <Card className="timelineItem">
            <div className="timelineMeta">Early career</div>
            <div className="timelineBody">
              Environmental Health Officer in the London Boroughs of Brent and Ealing, enforcing regulatory food hygiene,
              fire safety, housing, and workplace safety standards.
            </div>
          </Card>
        </Reveal>

        <Reveal delayMs={120}>
          <Card className="timelineItem">
            <div className="timelineMeta">Public events</div>
            <div className="timelineBody">
              Involved in regulation of large public events including Wembley Stadium and Arena.
            </div>
          </Card>
        </Reveal>

        <Reveal delayMs={180}>
          <Card className="timelineItem">
            <div className="timelineMeta">1994</div>
            <div className="timelineBody">Fire and Safety Officer for Trinity College Dublin.</div>
          </Card>
        </Reveal>

        <Reveal delayMs={240}>
          <Card className="timelineItem">
            <div className="timelineMeta">1997</div>
            <div className="timelineBody">Lecturer in the School of Food Science and Environmental Health.</div>
          </Card>
        </Reveal>

        <Reveal delayMs={300}>
          <Card className="timelineItem">
            <div className="timelineMeta">European projects</div>
            <div className="timelineBody">
              Contributed expertise on projects and conferences for the European Agency for Safety and Health and the European
              Commission's Advisory Committee on Safety and Health.
            </div>
          </Card>
        </Reveal>
      </div>
    </Section>
  );
}
