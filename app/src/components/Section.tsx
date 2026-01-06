// src/components/Section.tsx
import React from "react";
import Reveal from "@/components/Reveal";

type SectionProps = {
  id: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
};

export default function Section({ id, title, subtitle, children }: SectionProps) {
  return (
    <section id={id} className="section" aria-label={title}>
      <Reveal>
        <div className="sectionHead">
          <h2 className="h2">{title}</h2>
          {subtitle ? <p className="small">{subtitle}</p> : null}
        </div>
      </Reveal>
      {children}
    </section>
  );
}
