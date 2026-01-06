// src/sections/Credentials.tsx
import React from "react";
import Reveal from "@/components/Reveal";
import Card from "@/components/Card";
import Section from "@/components/Section";

export default function Credentials() {
  return (
    <Section
      id="credentials"
      title="Credentials"
      subtitle="Academic qualifications and professional memberships."
    >
      <div className="grid2">
        <Reveal delayMs={90}>
          <Card>
            <div className="h2">Academic</div>
            <ul className="list">
              <li>PhD (visual inspection, risk assessment and safety auditing), Trinity College Dublin</li>
              <li>MSc in Environmental Science, Brunel University</li>
              <li>BSc in Environmental Health, University of the West of England</li>
            </ul>
          </Card>
        </Reveal>

        <Reveal delayMs={180}>
          <Card>
            <div className="h2">Professional</div>
            <ul className="list">
              <li>Chartered Member of the Institution of Occupational Safety and Health (CMIOSH)</li>
              <li>Member of the Institution of Fire Engineers (IFE)</li>
              <li>Member of IOSH and IFE (UK-based professional bodies)</li>
            </ul>
          </Card>
        </Reveal>
      </div>
    </Section>
  );
}
