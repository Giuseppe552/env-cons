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
      subtitle="Please share a brief outline of your requirements. If convenient, a single sentence is sufficient to begin."
    >
      <div className="contactStage">
        {/* Clear, professional guidance + simple options */}
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
              Email is recommended for context and attachments. Telephone is suitable for brief initial queries.
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
              <div className="contactChip">“Request for advice on risk assessment”</div>
              <div className="contactChip">“Workplace inspection / audit enquiry”</div>
              <div className="contactChip">Attach documents or photographs if relevant</div>
            </div>
          </div>
        </div>

        <div className="contactGrid">
          <Reveal delayMs={90}>
            <Card className="contactCard contactCard--cta">
              <div className="contactCardHead">
                <div className="contactCardTitle">Contact details</div>
                <div className="contactCardNote">Direct contact. No forms.</div>
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
                For efficient triage, please include your location, the nature of the issue, and any relevant time
                constraints. Supporting documents may be attached where appropriate.
              </div>
            </Card>
          </Reveal>

          <Reveal delayMs={170}>
            <Card className="contactCard contactCard--soft">
              <div className="contactCardHead">
                <div className="contactCardTitle">Optional guidance</div>
                <div className="contactCardNote">Use as needed.</div>
              </div>

              <div
                style={{
                  display: "grid",
                  gap: 10,
                  marginTop: 6
                }}
                aria-label="Optional guidance"
              >
                <div
                  style={{
                    border: "1px solid var(--line)",
                    borderRadius: 14,
                    padding: 12,
                    background: "color-mix(in oklab, var(--surface) 90%, transparent)"
                  }}
                >
                  <div style={{ fontWeight: 650, letterSpacing: "-0.02em" }}>Suggested email opener</div>
                  <div style={{ marginTop: 6, color: "var(--muted)", fontSize: 14, lineHeight: 1.55 }}>
                    “Dear Dr Hrymak — I am seeking advice regarding workplace safety and risk assessment. We are based in
                    [location]. Please advise on available options and next steps.”
                  </div>
                </div>

                <div
                  style={{
                    color: "var(--muted)",
                    fontSize: 14,
                    lineHeight: 1.55
                  }}
                >
                  Where possible, please include: (1) site type and location, (2) a short description of the matter, and
                  (3) any deadlines or operational constraints.
                </div>
              </div>
            </Card>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
