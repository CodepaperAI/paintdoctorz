import Image from "next/image";
import { motion } from "framer-motion";
import Meta from "../seo/Meta";
import Button from "../components/ui/Button";
import SectionHeading from "../components/ui/SectionHeading";
import { milestones, coreValues, stats, company } from "../data/siteData";

const ArrowRight = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export default function AboutPage() {
  return (
    <>
      <Meta
        title="About"
        description={`${company.name} is a premium painting studio founded in ${company.foundedYear}. Meet the team, our values, and the method behind museum-grade finishes.`}
        path="/about"
      />

      {/* INTRO */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-20">
        <div className="container-luxe grid items-center gap-14 lg:grid-cols-2">
          <div>
            <span className="eyebrow">Our story</span>
            <h1 className="mt-5 text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl">
              A painting studio that thinks like a{" "}
              <span className="text-gradient-gold">clinic.</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-light-subtext dark:text-dark-subtext">
              {company.name} began with a simple conviction: most painting
              problems are misdiagnosed, not badly executed. Since{" "}
              {company.foundedYear} we have treated every wall as a patient —
              surveyed first, prepared meticulously, and finished to a standard
              you can inspect under raking light.
            </p>
            <div className="mt-9">
              <Button href="/book" size="lg" icon={ArrowRight}>
                Work with us
              </Button>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-[4/3] overflow-hidden rounded-4xl border border-light-border shadow-soft dark:border-dark-border dark:shadow-soft-dark"
          >
            <Image
              src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1100&q=80"
              alt="The Painting Doctorz studio team reviewing a project"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* MISSION */}
      <section className="border-y border-light-border bg-light-muted/60 py-16 dark:border-dark-border dark:bg-dark-surface/40 lg:py-20">
        <div className="container-luxe">
          <div className="mx-auto max-w-4xl text-center">
            <span className="eyebrow">Our mission</span>
            <p className="mt-6 text-2xl font-medium leading-snug tracking-tight sm:text-3xl">
              To make premium painting feel effortless — combining the
              cleanliness of a clinic, the honesty of a fixed quote, and the
              obsession of an artisan, on every single project.
            </p>
          </div>
          <div className="mt-14 grid grid-cols-2 gap-8 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-4xl font-bold tracking-tight text-light-accent dark:text-dark-accent lg:text-5xl">
                  {stat.value.toLocaleString("en-IN")}
                  {stat.suffix}
                </p>
                <p className="mt-2 text-sm text-light-subtext dark:text-dark-subtext">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="py-20 lg:py-28">
        <div className="container-luxe">
          <SectionHeading
            eyebrow="Milestones"
            title="Fifteen years of measured growth"
            description="We have never chased scale for its own sake. Each milestone marks a deliberate step toward a higher standard of craft."
          />
          <div className="mt-14">
            <ol className="relative border-l border-light-border pl-8 dark:border-dark-border">
              {milestones.map((milestone, index) => (
                <motion.li
                  key={milestone.year}
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: index * 0.06 }}
                  className="relative mb-12 last:mb-0"
                >
                  <span className="absolute -left-[41px] flex h-5 w-5 items-center justify-center rounded-full border-2 border-light-accent bg-light-bg dark:border-dark-accent dark:bg-dark-bg">
                    <span className="h-1.5 w-1.5 rounded-full bg-light-accent dark:bg-dark-accent" />
                  </span>
                  <p className="text-sm font-semibold uppercase tracking-widest text-light-accent dark:text-dark-accent">
                    {milestone.year}
                  </p>
                  <h3 className="mt-2 text-2xl font-bold tracking-tight">
                    {milestone.title}
                  </h3>
                  <p className="mt-2 max-w-2xl text-base leading-relaxed text-light-subtext dark:text-dark-subtext">
                    {milestone.detail}
                  </p>
                </motion.li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="bg-light-muted/50 py-20 dark:bg-dark-surface/40 lg:py-28">
        <div className="container-luxe">
          <SectionHeading
            eyebrow="What we stand for"
            title="Four values, held without exception"
            description="These are not slogans on a wall. They are the checks every project is measured against before we sign it off."
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            {coreValues.map((value, index) => (
              <motion.article
                key={value.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="rounded-4xl border border-light-border bg-light-surface p-8 transition-colors duration-300 hover:border-light-accent/50 dark:border-dark-border dark:bg-dark-surface dark:hover:border-dark-accent/50"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-light-muted text-lg font-bold text-light-accent dark:bg-dark-card-hover dark:text-dark-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-5 text-xl font-bold tracking-tight">
                  {value.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-light-subtext dark:text-dark-subtext">
                  {value.detail}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* CULTURE / CTA */}
      <section className="py-20 lg:py-28">
        <div className="container-luxe grid items-center gap-14 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-[4/3] overflow-hidden rounded-4xl border border-light-border shadow-soft dark:border-dark-border dark:shadow-soft-dark"
          >
            <Image
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1100&q=80"
              alt="A Painting Doctorz artisan at work"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </motion.div>
          <div>
            <span className="eyebrow">Our culture</span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              A team that treats your home like their own
            </h2>
            <p className="mt-5 text-base leading-relaxed text-light-subtext dark:text-dark-subtext">
              Our {stats[3].value} artisans are trained in-house, paid fairly,
              and stay with us for years — which is why our finish quality is so
              consistent. We invest in people first, because craft cannot be
              rushed or outsourced.
            </p>
            <p className="mt-4 text-base leading-relaxed text-light-subtext dark:text-dark-subtext">
              Every crew arrives uniformed, cleans as they go, and leaves your
              space better than a typical trade ever would.
            </p>
            <div className="mt-8">
              <Button href="/contact" variant="secondary" size="lg">
                Talk to the studio
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
