import Image from "next/image";
import { motion } from "framer-motion";
import Meta from "../seo/Meta";
import Button from "../components/ui/Button";
import SectionHeading from "../components/ui/SectionHeading";
import { interiorServices, interiorOffers, company } from "../data/siteData";

const ArrowRight = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5" aria-hidden="true">
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

export default function InteriorServicesPage() {
  return (
    <>
      <Meta
        title="Interior Services"
        description={`Interior painting, cabinet painting, colour consultation, epoxy finishes, carpentry and drywall repair, and wallpaper removal from ${company.name}.`}
        path="/interior-services"
      />

      {/* HERO */}
      <section className="relative overflow-hidden pt-32 pb-16 lg:pt-40 lg:pb-20">
        <div className="pointer-events-none absolute -right-40 -top-40 h-96 w-96 rounded-full bg-light-accent/10 blur-3xl dark:bg-dark-accent/10" />
        <div className="container-luxe grid items-center gap-14 lg:grid-cols-2">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="eyebrow"
            >
              Interior services
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.06 }}
              className="mt-5 text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl"
            >
              Everything inside your walls,{" "}
              <span className="text-gradient-gold">finished flawlessly.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.12 }}
              className="mt-6 max-w-xl text-lg leading-relaxed text-light-subtext dark:text-dark-subtext"
            >
              From a full repaint to a single cabinet refinish, our interior team
              handles the prep, the repair, and the finish — so you deal with one
              studio, not five trades.
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
              <Button href="/portfolio" variant="secondary" size="lg">
                See interior work
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
              src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1100&q=80"
              alt="A freshly finished interior living space"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section className="border-y border-light-border bg-light-muted/50 py-20 dark:border-dark-border dark:bg-dark-surface/40 lg:py-28">
        <div className="container-luxe">
          <SectionHeading
            eyebrow="What we do"
            title="Seven interior disciplines, one team."
            description="Each is delivered by our own trained artisans — never subcontracted out."
            align="center"
          />

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {interiorServices.map((service, index) => (
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

      {/* WHAT WE OFFER */}
      <section className="py-20 lg:py-28">
        <div className="container-luxe grid items-center gap-16 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="What we offer"
              title="Prep, repair, and finish — under one scope."
              description="The unglamorous work is what makes the finish last. We include it as standard, never as an upsell."
            />

            <ul className="mt-10 space-y-3">
              {interiorOffers.map((offer, index) => (
                <motion.li
                  key={offer}
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="flex items-center gap-4 rounded-2xl border border-light-border bg-light-surface px-6 py-5 transition-colors duration-300 hover:border-light-accent/50 dark:border-dark-border dark:bg-dark-surface dark:hover:border-dark-accent/50 dark:hover:bg-dark-card-hover"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-light-accent text-light-surface dark:bg-dark-accent dark:text-dark-bg">
                    <CheckIcon />
                  </span>
                  <span className="text-base font-medium text-light-text dark:text-dark-text">
                    {offer}
                  </span>
                </motion.li>
              ))}
            </ul>

            <div className="mt-10">
              <Button href="/book" size="lg" icon={ArrowRight}>
                Get a fixed quote
              </Button>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-4xl border border-light-border shadow-soft dark:border-dark-border dark:shadow-soft-dark">
              <Image
                src="https://images.unsplash.com/photo-1556909212-d5b604d0c90d?auto=format&fit=crop&w=1000&q=80"
                alt="An artisan preparing an interior surface before painting"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="glass-panel absolute -bottom-6 -left-6 hidden rounded-3xl px-6 py-5 shadow-soft dark:shadow-soft-dark sm:block">
              <p className="text-3xl font-bold text-light-accent dark:text-dark-accent">
                Low-VOC
              </p>
              <p className="mt-1 text-xs text-light-subtext dark:text-dark-subtext">
                Safe for kids, pets, and same-day reoccupancy
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-24">
        <div className="container-luxe">
          <div className="rounded-4xl border border-light-border bg-light-muted/60 px-8 py-14 text-center dark:border-dark-border dark:bg-dark-surface/50 lg:px-16">
            <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
              Tell us what you&apos;d like refinished.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-light-subtext dark:text-dark-subtext">
              Book a free 45-minute inspection and we&apos;ll return a fixed,
              itemised quote within 48 hours.
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