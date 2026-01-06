// src/app/page.tsx
import Nav from "@/components/Nav";
import Hero from "@/sections/Hero";
import Services from "@/sections/Services";
import Experience from "@/sections/Experience";
import Credentials from "@/sections/Credentials";
import Research from "@/sections/Research";
import Contact from "@/sections/Contact";

const NAV = [
  { href: "#services", label: "Services" },
  { href: "#experience", label: "Experience" },
  { href: "#credentials", label: "Credentials" },
  { href: "#research", label: "Research" },
  { href: "#contact", label: "Contact" }
] as const;

const PROFILE = {
  name: "Dr Victor Hrymak",
  kicker: "Food Science & Environmental Health",
  org: "Technological University Dublin (TU Dublin)",
  role: "Programme Chair for the TU Dublin MSc in Environmental Health & Safety (over 20 years).",
  contact: {
    email: "victor.hrymak@TUDublin.ie",
    telDisplay: "(01) 220 5660",
    telHref: "tel:012205660"
  }
} as const;

export default function Page() {
  return (
    <>
      <Nav brand={PROFILE.name} items={[...NAV]} />

      <main id="main" className="container">
        <Hero
          name={PROFILE.name}
          kicker={PROFILE.kicker}
          org={PROFILE.org}
          role={PROFILE.role}
          email={PROFILE.contact.email}
        />

        <div className="divider" />

        <Services />

        <div className="divider" />

        <Experience />

        <div className="divider" />

        <Credentials />

        <div className="divider" />

        <Research />

        <div className="divider" />

        <Contact
          email={PROFILE.contact.email}
          telDisplay={PROFILE.contact.telDisplay}
          telHref={PROFILE.contact.telHref}
        />

        <footer className="footer">
          © {new Date().getFullYear()} {PROFILE.name}. All rights reserved.
        </footer>
      </main>
    </>
  );
}
