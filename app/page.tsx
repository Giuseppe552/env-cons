import fs from "node:fs";
import path from "node:path";

type SiteConfig = {
  niche: string;
  slug: string;
  brand?: string;
  heroHeadline?: string;
  heroSubheadline?: string;
};

function readSiteConfig(): SiteConfig {
  const p = path.join(process.cwd(), "site.json");
  const raw = fs.readFileSync(p, "utf8");
  return JSON.parse(raw) as SiteConfig;
}

export default function Home() {
  const site = readSiteConfig();

  const brand = site.brand ?? site.niche;
  const h1 = site.heroHeadline ?? `Professional ${site.niche} Services`;
  const sub =
    site.heroSubheadline ??
    `Evidence-based consulting and expert guidance for your needs.`;

  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: "56px 20px" }}>
      <p style={{ fontSize: 12, opacity: 0.6, marginBottom: 16 }}>
        Generated site: <strong>{site.slug}</strong>
      </p>

      <h1 style={{ fontSize: 44, lineHeight: 1.1, margin: 0 }}>{h1}</h1>
      <p style={{ fontSize: 18, opacity: 0.8, marginTop: 16 }}>{sub}</p>

      <div style={{ marginTop: 28, display: "flex", gap: 12, flexWrap: "wrap" }}>
        <a
          href="#contact"
          style={{
            display: "inline-block",
            padding: "12px 16px",
            borderRadius: 10,
            border: "1px solid rgba(0,0,0,0.2)",
            textDecoration: "none",
          }}
        >
          Get in touch
        </a>
        <a
          href="#services"
          style={{
            display: "inline-block",
            padding: "12px 16px",
            borderRadius: 10,
            border: "1px solid rgba(0,0,0,0.2)",
            textDecoration: "none",
          }}
        >
          View services
        </a>
      </div>

      <section id="services" style={{ marginTop: 48 }}>
        <h2 style={{ fontSize: 26, marginBottom: 10 }}>Services</h2>
        <ul style={{ margin: 0, paddingLeft: 18, opacity: 0.85 }}>
          <li>[Service 1 - to be filled in]</li>
          <li>[Service 2 - to be filled in]</li>
          <li>[Service 3 - to be filled in]</li>
          <li>[Service 4 - to be filled in]</li>
        </ul>
      </section>

      <section id="about" style={{ marginTop: 48 }}>
        <h2 style={{ fontSize: 26, marginBottom: 10 }}>About</h2>
        <p style={{ marginTop: 0, opacity: 0.85 }}>
          [About section - to be filled in with consultant background, credentials, and expertise]
        </p>
      </section>

      <section id="contact" style={{ marginTop: 48 }}>
        <h2 style={{ fontSize: 26, marginBottom: 10 }}>Contact</h2>
        <p style={{ marginTop: 0, opacity: 0.85 }}>
          [Contact information - to be filled in]
        </p>
      </section>
    </main>
  );
}
