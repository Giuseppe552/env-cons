// src/sections/Services.tsx
import React from "react";
import Reveal from "@/components/Reveal";
import Card from "@/components/Card";
import Section from "@/components/Section";

export default function Services() {
  return (
    <Section
      id="services"
      title="Services"
      subtitle="Inspections, auditing, risk assessment, safety management systems, and fire safety support."
    >
      <div className="grid3">
        <Reveal delayMs={60}>
          <Card>
            <div className="h2">Inspections & auditing</div>
            <ul className="list">
              <li>Workplace safety inspections</li>
              <li>Safety auditing</li>
              <li>Improving observation of hazards during inspections</li>
            </ul>
          </Card>
        </Reveal>

        <Reveal delayMs={120}>
          <Card>
            <div className="h2">Risk assessment & systems</div>
            <ul className="list">
              <li>Selection and conduct of risk assessments</li>
              <li>Safety management system implementation</li>
              <li>Statistical evaluation of safety management systems</li>
            </ul>
          </Card>
        </Reveal>

        <Reveal delayMs={180}>
          <Card>
            <div className="h2">Fire safety & expert work</div>
            <ul className="list">
              <li>Fire & safety consulting</li>
              <li>Expert witness in court cases</li>
              <li>Applied advisory support for organisations</li>
            </ul>
          </Card>
        </Reveal>
      </div>
    </Section>
  );
}
