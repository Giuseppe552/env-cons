// src/sections/Research.tsx
import React from "react";
import Reveal from "@/components/Reveal";
import Card from "@/components/Card";
import Section from "@/components/Section";

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
            <div className="h2">Focus</div>
            <ul className="list">
              <li>How to conduct visual inspections</li>
              <li>Preventing accidents, injuries, fires and ill health</li>
              <li>Risk assessment practice and safety auditing</li>
            </ul>
          </Card>
        </Reveal>

        <Reveal delayMs={180}>
          <Card>
            <div className="h2">Selected items</div>
            <ul className="list">
              <li>
                2023: “The role of Vision Zero and related strategies in reducing EU work related fatalities, accidents and ill health.”
                (European Commission DG Employment conference; Stockholm, May 14–15, 2023).
              </li>
              <li>
                2023: “Supporting compliance of Occupational Safety and Health Requirements.” European Agency for Safety and Health at Work.{" "}
                <a
                  href="https://osha.europa.eu/en/publications/supporting-compliance-workplace-safety-requirements-european-labour-inspection-systems-sanctions-and-standardised-measures"
                  target="_blank"
                  rel="noreferrer"
                >
                  Read publication
                </a>
              </li>
              <li>
                2020: “The Development and Trial of Systematic Visual Search…” Policy and Practice in Health and Safety.
              </li>
            </ul>
          </Card>
        </Reveal>
      </div>
    </Section>
  );
}
