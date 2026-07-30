import Meta from "../../seo/Meta";
import Button from "../../components/ui/Button";
import SectionHeading from "../../components/ui/SectionHeading";
import { serviceAreas, getArea, getAreaSlugs } from "../../data/locations";
import { services, company } from "../../data/siteData";

export async function getStaticPaths() {
  return {
    paths: getAreaSlugs().map((city) => ({ params: { city } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const area = getArea(params.city);
  if (!area) return { notFound: true };
  return { props: { area } };
}

const ArrowRight = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export default function CityPage({ area }) {
  const faqs = [
    {
      q: `How much does painting cost in ${area.city}?`,
      a: `Most ${area.city} interior projects fall between $1,000 and $8,000 depending on room count, ceiling height, and prep. We give a fixed written quote after a free on-site survey — no hourly surprises.`,
    },
    {
      q: `Do you serve all of ${area.city}?`,
      a: `Yes — including ${area.neighbourhoods.join(", ")}. If you're just outside these areas, call us and we'll confirm coverage.`,
    },
    {
      q: `Are your painters insured and certified?`,
      a: `Every crew is fully insured, and our exterior teams are EPA Lead-Certified for safe work on older ${area.city} homes.`,
    },
    {
      q: `How soon can you start a ${area.city} project?`,
      a: `Most surveys are booked within a few days, and we can typically start work within one to two weeks depending on the season and scope.`,
    },
  ];

  // FAQ schema for this specific city — eligible for rich results & AI Overviews.
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <Meta
        title={`House Painters in ${area.city}`}
        description={`Professional interior & exterior painters in ${area.city}, ${area.region}. Low-VOC finishes, fixed pricing, and a 10-year exterior guarantee from ${company.name}.`}
        path={`/painters/${area.slug}`}
        service={{
          title: `Painting Services in ${area.city}`,
          description: area.intro,
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* HERO */}
      <section className="pt-32 pb-14 lg:pt-40">
        <div className="container-luxe">
          <nav className="mb-6 text-xs text-light-subtext dark:text-dark-subtext" aria-label="Breadcrumb">
            <a href="/" className="hover:text-light-accent dark:hover:text-dark-accent">Home</a>
            <span className="mx-2">/</span>
            <a href="/painters" className="hover:text-light-accent dark:hover:text-dark-accent">Service Areas</a>
            <span className="mx-2">/</span>
            <span className="text-light-text dark:text-dark-text">{area.city}</span>
          </nav>

          <span className="eyebrow">{area.city}, {area.region}</span>
          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            House Painters in <span className="text-gradient-gold">{area.city}</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-light-subtext dark:text-dark-subtext">
            {area.intro}
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Button href="/book" size="lg" icon={ArrowRight}>
              Get a free {area.city} quote
            </Button>
            <Button href={`tel:${company.phoneHref}`} as="a" variant="secondary" size="lg">
              {company.phoneDisplay}
            </Button>
          </div>
        </div>
      </section>

      {/* LOCAL NOTE + PROJECT */}
      <section className="border-y border-light-border bg-light-muted/50 py-14 dark:border-dark-border dark:bg-dark-surface/40">
        <div className="container-luxe">
          <h2 className="text-2xl font-bold tracking-tight">
            Painting the way {area.city} needs it
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-light-subtext dark:text-dark-subtext">
            {area.localNote}
          </p>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-light-subtext dark:text-dark-subtext">
            <strong className="text-light-text dark:text-dark-text">Recent project:</strong>{" "}
            {area.projectExample}
          </p>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-16 lg:py-20">
        <div className="container-luxe">
          <SectionHeading eyebrow="Services" title={`What we offer in ${area.city}`} />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <div
                key={s.slug}
                className="rounded-4xl border border-light-border bg-light-surface p-6 transition-colors duration-300 hover:border-light-accent/50 dark:border-dark-border dark:bg-dark-surface dark:hover:border-dark-accent/50"
              >
                <h3 className="text-lg font-bold tracking-tight">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-light-subtext dark:text-dark-subtext">
                  {s.summary}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEIGHBOURHOODS */}
      <section className="border-t border-light-border py-14 dark:border-dark-border">
        <div className="container-luxe">
          <h2 className="text-2xl font-bold tracking-tight">
            Areas we cover in {area.city}
          </h2>
          <div className="mt-6 flex flex-wrap gap-3">
            {area.neighbourhoods.map((n) => (
              <span
                key={n}
                className="rounded-full border border-light-border bg-light-surface px-5 py-2.5 text-sm font-medium text-light-text dark:border-dark-border dark:bg-dark-surface dark:text-dark-text"
              >
                {n}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-light-border py-16 dark:border-dark-border lg:py-20">
        <div className="container-luxe max-w-3xl">
          <SectionHeading eyebrow="FAQ" title={`Painting in ${area.city} — common questions`} />
          <dl className="mt-8 space-y-6">
            {faqs.map((f) => (
              <div key={f.q}>
                <dt className="text-lg font-semibold text-light-text dark:text-dark-text">
                  {f.q}
                </dt>
                <dd className="mt-2 text-base leading-relaxed text-light-subtext dark:text-dark-subtext">
                  {f.a}
                </dd>
              </div>
            ))}
          </dl>
          <div className="mt-10">
            <Button href="/book" size="lg" icon={ArrowRight}>
              Book your {area.city} survey
            </Button>
          </div>
        </div>
      </section>

      {/* OTHER AREAS — internal linking */}
      <section className="border-t border-light-border py-14 dark:border-dark-border">
        <div className="container-luxe">
          <h2 className="text-xl font-bold tracking-tight">We also serve</h2>
          <div className="mt-5 flex flex-wrap gap-3">
            {serviceAreas
              .filter((a) => a.slug !== area.slug)
              .map((a) => (
             <a   
                  key={a.slug}
                  href={`/painters/${a.slug}`}
                  className="rounded-full border border-light-border px-5 py-2.5 text-sm font-medium text-light-text transition-colors duration-300 hover:border-light-accent hover:text-light-accent dark:border-dark-border dark:text-dark-text dark:hover:border-dark-accent dark:hover:text-dark-accent"
                >
                  Painters in {a.city}
                </a>
              ))}
          </div>
        </div>
      </section>
    </>
  );
}