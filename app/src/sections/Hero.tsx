// src/sections/Hero.tsx
"use client";

import Image from "next/image";
import React, { useState } from "react";
import Reveal from "@/components/Reveal";

function ProofItem({
  title,
  detail
}: {
  title: string;
  detail: string;
}) {
  return (
    <div className="proofItem">
      <div className="proofTitle">{title}</div>
      <div className="proofDetail">{detail}</div>
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
            <h1 className="h1 h1--premium">Environmental health & safety consulting.</h1>
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
            <div className="proof" aria-label="Selected proof">
              <ProofItem
                title="Programme leadership"
                detail="Programme Chair for the TU Dublin MSc in Environmental Health & Safety (over 20 years)."
              />
              <ProofItem
                title="Professional experience"
                detail="Over 30 years of workplace safety experience across public and private sector organisations, including regulatory enforcement roles in London and Dublin."
              />
              <ProofItem
                title="Academic supervision and research"
                detail="Published in peer reviewed academic journals; supervised over 400 MSc taught dissertations and two PhD theses; currently supervising two PhD students."
              />
            </div>
          </Reveal>
        </div>

        {showPortrait ? (
          <Reveal delayMs={140} className="heroAside">
            <figure className="portraitFigure" aria-label={`Portrait of ${name}`}>
              <div className="portraitFrame">
                <Image
                  src="/victor-hrymak.jpg"
                  alt={`Portrait of ${name}`}
                  fill
                  priority
                  sizes="(max-width: 900px) 240px, 360px"
                  style={{ objectFit: "cover" }}
                  onError={() => setShowPortrait(false)}
                />
              </div>

              <figcaption className="portraitCaption">
                <div className="portraitNameLine">{name}</div>
                <a className="portraitEmail" href={`mailto:${email}`}>
                  {email}
                </a>
              </figcaption>
            </figure>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
