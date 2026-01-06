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
    <Section id="contact" title="Contact" subtitle="For consulting enquiries.">
      <div className="grid2">
        <Reveal delayMs={90}>
          <Card>
            <div className="h2">Email</div>
            <div className="contactRow">
              <a className="btn" href={`mailto:${email}`}>
                {email}
              </a>
            </div>

            <div className="contactSpacer" />

            <div className="h2">Telephone</div>
            <div className="contactRow">
              <a className="btn secondary" href={telHref}>
                {telDisplay}
              </a>
            </div>
          </Card>
        </Reveal>

        <Reveal delayMs={180}>
          <Card>
            <div className="h2">Availability</div>
            <p className="small" style={{ margin: 0 }}>
              Contact to discuss scope and requirements.
            </p>
          </Card>
        </Reveal>
      </div>
    </Section>
  );
}
