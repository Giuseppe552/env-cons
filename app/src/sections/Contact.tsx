// src/sections/Contact.tsx
import React from "react";
import Reveal from "@/components/Reveal";
import Card from "@/components/Card";
import Section from "@/components/Section";

export default function Contact({
  email,
  telDisplay,
  telHref
}: {
  email: string;
  telDisplay: string;
  telHref: string;
}) {
  return (
    <Section
      id="contact"
      title="Enquiries"
      subtitle="Send a quick message with whatever you have. If it’s easier, start with one sentence — we can clarify the rest together."
    >
      <div className="contactStage">
        {/* Soft, non-demanding reassurance + simple options */}
        <div style={{ paddingBottom: 16 }}>
          <div
            style={{
              maxWidth: 980,
              marginLeft: "auto",
              marginRight: "auto",
              textAlign: "center",
              display: "grid",
              gap: 10
            }}
          >
            <div style={{ color: "var(--muted)", fontSize: 14, lineHeight: 1.55 }}>
              Email is easiest for context and attachments. Telephone is fine for quick questions.
            </div>

            <div
              className="contactChips"
              aria-label="Helpful prompts"
              style={{
                gap: 10,
                justifyContent: "center",
                marginTop: 2
              }}
            >
              <div className="contactChip">“Can you help with this?”</div>
              <div className="contactChip">“I’m not sure what I need yet.”</div>
              <div className="contactChip">Attach photos / documents if useful</div>
            </div>
          </div>
        </div>

        <div className="contactGrid">
          <Reveal delayMs={90}>
            <Card className="contactCard contactCard--cta">
              <div className="contactCardHead">
                <div className="contactCardTitle">Get in touch</div>
                <div className="contactCardNote">No forms. No structure required. Just reach out.</div>
              </div>

              <div className="contactFields" aria-label="Contact details">
                <a className="contactField contactField--link" href={`mailto:${email}`}>
                  <div className="contactFieldLabel">Email</div>
                  <div className="contactFieldValue">{email}</div>
                </a>

                <a className="contactField contactField--link" href={telHref}>
                  <div className="contactFieldLabel">Telephone</div>
                  <div className="contactFieldValue">{telDisplay}</div>
                </a>
              </div>

              <div className="contactActions" aria-label="Contact actions">
                <a className="btn" href={`mailto:${email}`}>
                  Email
                </a>
                <a className="btn secondary" href={telHref}>
                  Call
                </a>
              </div>

              <div className="contactFine">
                If you’re unsure what to include, just describe the situation in plain language. If you have documents,
                attach them — but it’s optional.
              </div>
            </Card>
          </Reveal>

          <Reveal delayMs={170}>
            <Card className="contactCard contactCard--soft">
              <div className="contactCardHead">
                <div className="contactCardTitle">Optional prompts</div>
                <div className="contactCardNote">Only if helpful — you can ignore all of this.</div>
              </div>

              <div
                style={{
                  display: "grid",
                  gap: 10,
                  marginTop: 6
                }}
                aria-label="Optional prompts"
              >
                <div
                  style={{
                    border: "1px solid var(--line)",
                    borderRadius: 14,
                    padding: 12,
                    background: "color-mix(in oklab, var(--surface) 90%, transparent)"
                  }}
                >
                  <div style={{ fontWeight: 650, letterSpacing: "-0.02em" }}>A simple starting message</div>
                  <div style={{ marginTop: 6, color: "var(--muted)", fontSize: 14, lineHeight: 1.55 }}>
                    “Hi Dr Hrymak — I’m looking for advice on workplace safety / risk assessment. We’re based in [location].
                    Could we discuss options?”
                  </div>
                </div>

                <div
                  style={{
                    color: "var(--muted)",
                    fontSize: 14,
                    lineHeight: 1.55
                  }}
                >
                  If you want to add a little more, the most useful details tend to be: where it is, what the issue is,
                  and any timing constraints. But don’t worry if you don’t have that yet.
                </div>
              </div>
            </Card>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
