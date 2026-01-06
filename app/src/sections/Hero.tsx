// src/sections/Hero.tsx
"use client";

import Image from "next/image";
import React, { useState } from "react";
import Reveal from "@/components/Reveal";
import Card from "@/components/Card";

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div className="metric">
      <div className="metricValue">{value}</div>
      <div className="metricLabel">{label}</div>
    </div>
  );
}

export default function Hero({
  name,
  kicker,
  org,
  role,
  email
}: {
  name: string;
  kicker: string;
  org: string;
  role: string;
  email: string;
}) {
  const [showPortrait, setShowPortrait] = useState(true);

  return (
    <section className="hero hero--tight" aria-label="Introduction">
      <Reveal>
        <div className="kicker">{kicker}</div>
      </Reveal>

      <div className="heroGrid heroGrid--premium">
        <div>
          <Reveal delayMs={70}>
            <h1 className="h1 h1--premium">Environmental health and safety consulting.</h1>
          </Reveal>

          <Reveal delayMs={120}>
            <p className="lede lede--tight">
              Programme leadership, regulatory enforcement experience, and workplace safety research—applied to practical advisory work.
            </p>
          </Reveal>

          <Reveal delayMs={150}>
            <div className="heroSubline">
              <span className="dot">{role}</span>
              <span className="sep">•</span>
              <span className="dot">{org}</span>
              <span className="sep">•</span>
              <span className="dot">Fire & safety consultant</span>
              <span className="sep">•</span>
              <span className="dot">Expert witness in court cases</span>
            </div>
          </Reveal>

          <Reveal delayMs={190}>
            <div className="heroActions">
              <a className="btn" href="#contact">
                Contact
              </a>
              <a className="btn secondary" href="#services">
                Services
              </a>
            </div>
          </Reveal>

          <Reveal delayMs={230}>
            <div className="metrics" aria-label="Key facts">
              <Metric value="30+ years" label="Workplace safety experience" />
              <Metric value="20+ years" label="MSc Programme Chair (TU Dublin)" />
              <Metric value="400+ MSc" label="Taught dissertations supervised" />
              <Metric value="2 PhD" label="Theses supervised (completed)" />
              <Metric value="2 PhD" label="Students currently supervised" />
            </div>
          </Reveal>

          <Reveal delayMs={260}>
            <Card className="noteCard">
              <p className="small" style={{ margin: 0 }}>
                Expertise and research interests include workplace safety inspections, safety auditing, risk assessment, and the implementation and statistical evaluation of safety management systems.
              </p>
            </Card>
          </Reveal>
        </div>

        {showPortrait ? (
          <Reveal delayMs={140} className="portraitWrap">
            <div className="portraitCard portraitCard--clean">
              <div className="portraitImage portraitImage--premium">
                <Image
                  src="/victor-hrymak.jpg"
                  alt={`Portrait of ${name}`}
                  fill
                  priority
                  sizes="(max-width: 900px) 240px, 320px"
                  style={{ objectFit: "cover" }}
                  onError={() => setShowPortrait(false)}
                />
              </div>
              <div className="portraitMeta">
                <div className="portraitName">{name}</div>
                <div className="portraitNote">
                  <a href={`mailto:${email}`}>{email}</a>
                </div>
              </div>
            </div>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
