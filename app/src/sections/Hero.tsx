// src/sections/Hero.tsx
"use client";

import React, { useEffect, useMemo, useState } from "react";
import Reveal from "@/components/Reveal";

function ProofItem({
  title,
  detail,
  accent
}: {
  title: string;
  detail: string;
  accent?: boolean;
}) {
  const titleStyle = accent
    ? ({
        color: "color-mix(in oklab, #7dd3fc 62%, var(--muted))"
      } as const)
    : undefined;

  return (
    <div className="proofItem">
      <div className="proofTitle" style={titleStyle}>
        {title}
      </div>
      <div className="proofDetail">{detail}</div>
    </div>
  );
}

function InitialsFallback({ initials, size }: { initials: string; size: number }) {
  return (
    <div
      aria-hidden="true"
      style={{
        width: size,
        height: size,
        borderRadius: 999,
        display: "grid",
        placeItems: "center",
        border: "1px solid var(--line)",
        background:
          "radial-gradient(120px 120px at 30% 20%, color-mix(in oklab, #7dd3fc 16%, transparent), transparent 65%), color-mix(in oklab, var(--surface) 92%, transparent)",
        color: "color-mix(in oklab, var(--fg) 78%, transparent)",
        fontWeight: 700,
        letterSpacing: "-0.02em",
        fontSize: Math.max(14, Math.round(size * 0.26))
      }}
    >
      {initials}
    </div>
  );
}

function AvatarImg({
  src,
  alt,
  size,
  onError
}: {
  src: string;
  alt: string;
  size: number;
  onError: () => void;
}) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: 999,
        overflow: "hidden",
        border: "1px solid var(--line)",
        background: "color-mix(in oklab, var(--surface) 92%, transparent)",
        flex: "0 0 auto"
      }}
    >
      <img
        src={src}
        alt={alt}
        width={size}
        height={size}
        loading="eager"
        decoding="async"
        onError={onError}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block"
        }}
      />
    </div>
  );
}

function CompactIdentity({ name, email }: { name: string; email: string }) {
  const [imgOk, setImgOk] = useState(true);
  const [avatarSize, setAvatarSize] = useState(84);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 560px)");
    const apply = () => setAvatarSize(mq.matches ? 104 : 84); // slightly larger on mobile
    apply();
    mq.addEventListener?.("change", apply);
    return () => mq.removeEventListener?.("change", apply);
  }, []);

  const initials = useMemo(() => {
    const parts = name.trim().split(/\s+/);
    const first = parts[0]?.[0] ?? "V";
    const last = parts[parts.length - 1]?.[0] ?? "H";
    return `${first}${last}`.toUpperCase();
  }, [name]);

  return (
    <div
      style={{
        marginTop: 14,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 14,
        padding: 14,
        borderRadius: "var(--r-lg)",
        border: "1px solid var(--line)",
        background:
          "linear-gradient(180deg, color-mix(in oklab, #7dd3fc 10%, transparent), transparent 48%), color-mix(in oklab, var(--surface) 86%, transparent)",
        boxShadow: "var(--shadow-sm)",
        maxWidth: 680,
        marginLeft: "auto",
        marginRight: "auto"
      }}
      aria-label="Identity"
    >
      {imgOk ? (
        <AvatarImg
          src="/victor-hrymak.jpg"
          alt={`Portrait of ${name}`}
          size={avatarSize}
          onError={() => setImgOk(false)}
        />
      ) : (
        <InitialsFallback initials={initials} size={avatarSize} />
      )}

      <div style={{ minWidth: 0, textAlign: "left" }}>
        <div style={{ fontWeight: 650, letterSpacing: "-0.02em", fontSize: 16 }}>{name}</div>
        <a
          href={`mailto:${email}`}
          style={{
            display: "block",
            marginTop: 4,
            color: "var(--muted)",
            fontSize: "var(--text-sm)",
            overflowWrap: "anywhere",
            wordBreak: "break-word"
          }}
        >
          {email}
        </a>
      </div>
    </div>
  );
}

function PortraitAside({
  name,
  email,
  onFail
}: {
  name: string;
  email: string;
  onFail: () => void;
}) {
  return (
    <figure className="portraitFigure" aria-label={`Portrait of ${name}`} style={{ minWidth: 0 }}>
      <div
        className="portraitFrame"
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "4 / 5",
          borderRadius: "var(--r-lg)",
          overflow: "hidden",
          border: "1px solid var(--line)",
          background:
            "radial-gradient(520px 420px at 30% 10%, color-mix(in oklab, #7dd3fc 12%, transparent), transparent 60%), color-mix(in oklab, var(--surface) 92%, transparent)",
          boxShadow: "var(--shadow-sm)"
        }}
      >
        <img
          src="/victor-hrymak.jpg"
          alt={`Portrait of ${name}`}
          loading="eager"
          decoding="async"
          onError={onFail}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block"
          }}
        />
      </div>

      <figcaption className="portraitCaption" style={{ marginTop: 10 }}>
        <div className="portraitNameLine" style={{ fontWeight: 650, letterSpacing: "-0.02em" }}>
          {name}
        </div>
        <a
          className="portraitEmail"
          href={`mailto:${email}`}
          style={{
            display: "block",
            marginTop: 4,
            color: "var(--muted)",
            fontSize: 13,
            overflowWrap: "anywhere",
            wordBreak: "break-word"
          }}
        >
          {email}
        </a>
      </figcaption>
    </figure>
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
  const [isMobile, setIsMobile] = useState(false);
  const [isNarrow, setIsNarrow] = useState(false);

  useEffect(() => {
    const mqMobile = window.matchMedia("(max-width: 900px)");
    const mqNarrow = window.matchMedia("(max-width: 520px)");

    const apply = () => {
      setIsMobile(mqMobile.matches);
      setIsNarrow(mqNarrow.matches);
    };

    apply();
    mqMobile.addEventListener?.("change", apply);
    mqNarrow.addEventListener?.("change", apply);

    return () => {
      mqMobile.removeEventListener?.("change", apply);
      mqNarrow.removeEventListener?.("change", apply);
    };
  }, []);

  const sublineItems = useMemo(
    () => [role, org, "Fire & safety consultant", "Expert witness in court cases"],
    [role, org]
  );

  const centerStyle = isMobile ? ({ textAlign: "center" } as const) : undefined;

  const kickerStyle = {
    ...(centerStyle ?? {}),
    color: "color-mix(in oklab, #7dd3fc 55%, var(--muted))"
  } as const;

  const accentWordStyle = {
    color: "color-mix(in oklab, #7dd3fc 68%, var(--fg))"
  } as const;

  return (
    <section className="hero hero--tight" aria-label="Introduction">
      <Reveal>
        <div className="kicker" style={kickerStyle}>
          {kicker}
        </div>
      </Reveal>

      <div className="heroGrid heroGrid--premium">
        <div style={{ minWidth: 0 }}>
          <Reveal delayMs={70}>
            <h1 className="h1 h1--premium" style={centerStyle}>
              Environmental health &amp; safety{" "}
              <span style={accentWordStyle}>consulting</span>.
            </h1>
          </Reveal>

          <Reveal delayMs={120}>
            <p className="lede lede--tight" style={centerStyle}>
              Programme leadership, regulatory enforcement experience, and workplace safety research—applied to practical
              advisory work.
            </p>
          </Reveal>

          {isMobile && showPortrait ? (
            <Reveal delayMs={145}>
              <CompactIdentity name={name} email={email} />
            </Reveal>
          ) : null}

          <Reveal delayMs={160}>
            {isNarrow ? (
              <div
                aria-label="Summary"
                style={{
                  display: "grid",
                  gap: 6,
                  marginTop: 12,
                  color: "var(--muted)",
                  fontSize: 13,
                  lineHeight: 1.35,
                  maxWidth: 560,
                  marginLeft: "auto",
                  marginRight: "auto",
                  textAlign: isMobile ? "center" : "left"
                }}
              >
                {sublineItems.map((t) => (
                  <div
                    key={t}
                    style={{
                      minWidth: 0,
                      overflowWrap: "anywhere",
                      wordBreak: "break-word"
                    }}
                  >
                    {t}
                  </div>
                ))}
              </div>
            ) : (
              <div
                className="heroSubline"
                aria-label="Summary"
                style={{
                  justifyContent: isMobile ? "center" : "flex-start",
                  maxWidth: isMobile ? 720 : undefined,
                  marginLeft: isMobile ? "auto" : undefined,
                  marginRight: isMobile ? "auto" : undefined
                }}
              >
                <span style={{ whiteSpace: "normal", overflowWrap: "anywhere", wordBreak: "break-word" }}>{role}</span>
                <span className="sep" aria-hidden="true">
                  •
                </span>
                <span style={{ whiteSpace: "normal", overflowWrap: "anywhere", wordBreak: "break-word" }}>{org}</span>
                <span className="sep" aria-hidden="true">
                  •
                </span>
                <span>Fire &amp; safety consultant</span>
                <span className="sep" aria-hidden="true">
                  •
                </span>
                <span>Expert witness in court cases</span>
              </div>
            )}
          </Reveal>

          <Reveal delayMs={200}>
            <div className="heroActions" style={{ justifyContent: isMobile ? "center" : "flex-start" }}>
              <a className="btn" href="#contact">
                Contact
              </a>
              <a className="btn secondary" href="#services">
                Services
              </a>
            </div>
          </Reveal>

          <Reveal delayMs={240}>
            <div
              className="proof"
              aria-label="Selected proof"
              style={{
                marginLeft: isMobile ? "auto" : undefined,
                marginRight: isMobile ? "auto" : undefined,
                maxWidth: isMobile ? 760 : undefined
              }}
            >
              <ProofItem
                accent
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

        {!isMobile && showPortrait ? (
          <Reveal delayMs={140} className="heroAside">
            <div style={{ width: "min(380px, 100%)", marginLeft: "auto" }}>
              <PortraitAside name={name} email={email} onFail={() => setShowPortrait(false)} />
            </div>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
