import Head from "next/head";
import { company, businessHours, socials } from "../data/siteData";

const SITE_URL = "https://www.paintingdoctorz.com";
const DEFAULT_OG =
  "https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=1200&q=80";

// Maps our data-file day names to schema.org day URIs.
const DAY_SCHEMA = {
  Monday: "https://schema.org/Monday",
  Tuesday: "https://schema.org/Tuesday",
  Wednesday: "https://schema.org/Wednesday",
  Thursday: "https://schema.org/Thursday",
  Friday: "https://schema.org/Friday",
  Saturday: "https://schema.org/Saturday",
  Sunday: "https://schema.org/Sunday",
};

function buildOpeningHours() {
  return businessHours
    .filter((entry) => entry.open && entry.close)
    .map((entry) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: DAY_SCHEMA[entry.day],
      opens: entry.open,
      closes: entry.close,
    }));
}

function buildLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": `${SITE_URL}/#business`,
    name: company.name,
    legalName: company.legalName,
    description: company.description,
    url: SITE_URL,
    telephone: `+${company.phoneHref.replace(/[^0-9]/g, "")}`,
    email: company.email,
    image: DEFAULT_OG,
    priceRange: company.priceRange,
    foundingDate: String(company.foundedYear),
    address: {
      "@type": "PostalAddress",
      streetAddress: company.address.street,
      addressLocality: company.address.city,
      addressRegion: company.address.region,
      postalCode: company.address.postalCode,
      addressCountry: company.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: company.geo.latitude,
      longitude: company.geo.longitude,
    },
    openingHoursSpecification: buildOpeningHours(),
    sameAs: socials.map((social) => social.href),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: company.ratingValue,
      reviewCount: company.reviewCount,
    },
  };
}

function buildServiceSchema(service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: service.title,
    description: service.description || service.summary,
    provider: {
      "@type": "HomeAndConstructionBusiness",
      name: company.name,
      "@id": `${SITE_URL}/#business`,
    },
    areaServed: {
      "@type": "City",
      name: company.address.city,
    },
  };
}

export default function Meta({
  title,
  description = company.description,
  path = "/",
  image = DEFAULT_OG,
  type = "website",
  service = null,
  includeLocalBusiness = true,
  noindex = false,
}) {
  const fullTitle = title
    ? `${title} — ${company.name}`
    : `${company.name} — ${company.tagline}`;
  const canonical = `${SITE_URL}${path === "/" ? "" : path}`;

  const schemas = [];
  if (includeLocalBusiness) schemas.push(buildLocalBusinessSchema());
  if (service) schemas.push(buildServiceSchema(service));

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="canonical" href={canonical} />
      {noindex ? (
        <meta name="robots" content="noindex,nofollow" />
      ) : (
        <meta name="robots" content="index,follow" />
      )}
      <meta name="theme-color" content="#FAF8F5" media="(prefers-color-scheme: light)" />
      <meta name="theme-color" content="#111111" media="(prefers-color-scheme: dark)" />

      {/* Open Graph */}
      <meta property="og:site_name" content={company.name} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* JSON-LD structured data */}
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </Head>
  );
}
