import Image from "next/image";
import { motion } from "framer-motion";
import Meta from "../seo/Meta";
import Button from "../components/ui/Button";
import SectionHeading from "../components/ui/SectionHeading";
import { exteriorServices, exteriorIntro, company } from "../data/siteData";

const ArrowRight = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export default function ExteriorServicesPage() {
  return (
    <>
      <Meta
        title="Exterior Painting Services"
        description={`Exterior painting, power washing, stucco repair, siding painting, deck staining, and EPA Lead-Certified work from ${company.name}.`}
        path="/exterior-services"
      />

      {/* HERO */}
      <section className="relative overflow-hidden pt-32 pb-16 lg:pt-40 lg:pb-20">
        <div className="pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full bg-light-accent/10 blur-3xl dark:bg-dark-accent/10" />
        <div className="container-luxe grid items-center gap-14 lg:grid-cols-2">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="eyebrow"
            >
              Exterior painting services
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.06 }}
              className="mt-5 text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl"
            >
              Built to withstand.{" "}
              <span className="text-gradient-gold">Designed to impress.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.12 }}
              className="mt-6 max-w-xl text-lg leading-relaxed text-light-subtext dark:text-dark-subtext"
            >
              {exteriorIntro.lead}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.18 }}
              className="mt-9 flex flex-wrap items-center gap-4"
            >
              <Button href="/book" size="lg" icon={ArrowRight}>
                Book a free survey
              </Button>
              <Button href="/why-choose-us" variant="secondary" size="lg">
                See the transformation
              </Button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-[4/3] overflow-hidden rounded-4xl border border-light-border shadow-soft dark:border-dark-border dark:shadow-soft-dark"
          >
            <Image
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1100&q=80"
              alt="A freshly painted home exterior"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* SURFACES STATEMENT */}
      <section className="border-y border-light-border bg-light-muted/50 py-16 dark:border-dark-border dark:bg-dark-surface/40 lg:py-20">
        <div className="container-luxe">
          <p className="mx-auto max-w-4xl text-center text-xl font-medium leading-snug tracking-tight sm:text-2xl">
            {exteriorIntro.statement}
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {exteriorIntro.surfaces.map((surface) => (
              <span
                key={surface}
                className="rounded-full border border-light-border bg-light-surface px-5 py-2.5 text-sm font-medium text-light-text dark:border-dark-border dark:bg-dark-surface dark:text-dark-text"
              >
                {surface}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section className="py-20 lg:py-28">
        <div className="container-luxe">
          <SectionHeading
            eyebrow="What we do"
            title="Six exterior disciplines, one crew."
            description="Every surface prepared, repaired, and coated by our own trained team — never subcontracted."
            align="center"
          />

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {exteriorServices.map((service, index) => (
              <motion.article
                key={service.slug}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: (index % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="group overflow-hidden rounded-4xl border border-light-border bg-light-surface shadow-soft transition-colors duration-300 hover:border-light-accent/50 dark:border-dark-border dark:bg-dark-surface dark:shadow-soft-dark dark:hover:border-dark-accent/50"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-luxe group-hover:scale-105"
                  />
                  {service.badge && (
                    <span className="absolute left-5 top-5 rounded-full bg-light-surface/95 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-light-accent backdrop-blur dark:bg-dark-surface/95 dark:text-dark-accent">
                      {service.badge}
                    </span>
                  )}
                </div>
                <div className="p-7">
                  <h3 className="text-xl font-bold tracking-tight">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-light-subtext dark:text-dark-subtext">
                    {service.detail}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-24">
        <div className="container-luxe">
          <div className="rounded-4xl border border-light-border bg-light-surface px-8 py-14 text-center shadow-soft dark:border-dark-border dark:bg-dark-surface dark:shadow-soft-dark lg:px-16">
            <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
              Protect the surface everyone sees first.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-light-subtext dark:text-dark-subtext">
              Book a free 45-minute inspection and we&apos;ll prescribe the right
              coating system for your façade — with a fixed quote in 48 hours.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <Button href="/book" size="lg" icon={ArrowRight}>
                Book a free survey
              </Button>
              <Button
                href={`tel:${company.phoneHref}`}
                as="a"
                variant="secondary"
                size="lg"
              >
                {company.phoneDisplay}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}