import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView, animate } from "framer-motion";
import Meta from "../seo/Meta";
import Button from "../components/ui/Button";
import SectionHeading from "../components/ui/SectionHeading";
import BeforeAfterSlider from "../components/ui/BeforeAfterSlider";
import TestimonialCard from "../components/ui/TestimonialCard";
import {
  services,
  stats,
  processSteps,
  testimonials,
  beforeAfter,
  heroHighlights,
  company,
} from "../data/siteData";

const ArrowRight = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

/* Animated numeric counter that runs once when scrolled into view. */
function Counter({ value, suffix = "", duration = 2 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return undefined;
    const controls = animate(0, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => setDisplay(Math.floor(latest)),
    });
    return () => controls.stop();
  }, [inView, value, duration]);

  return (
    <span ref={ref}>
      {display.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}

const InteriorCard = ({ item }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    className="group relative overflow-hidden rounded-4xl border border-light-border bg-light-surface shadow-soft transition-colors duration-300 hover:border-light-accent/50 dark:border-dark-border dark:bg-dark-surface dark:shadow-soft-dark dark:hover:border-dark-accent/50"
  >
    <div className="relative aspect-[4/3] overflow-hidden">
      <Image
        src={item.image}
        alt={item.title}
        fill
        sizes="(max-width: 1024px) 100vw, 50vw"
        className="object-cover transition-transform duration-700 ease-luxe group-hover:scale-105"
      />
      <span className="absolute left-5 top-5 rounded-full bg-light-surface/90 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-light-accent backdrop-blur dark:bg-dark-surface/90 dark:text-dark-accent">
        {item.tag}
      </span>
    </div>
    <div className="p-8">
      <h3 className="text-2xl font-bold tracking-tight">{item.title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-light-subtext dark:text-dark-subtext">
        {item.copy}
      </p>
      <ul className="mt-6 space-y-2.5">
        {item.points.map((point) => (
          <li key={point} className="flex items-center gap-3 text-sm">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-light-muted text-light-accent dark:bg-dark-card-hover dark:text-dark-accent">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3" aria-hidden="true">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </span>
            {point}
          </li>
        ))}
      </ul>
    </div>
  </motion.div>
);

const previews = [
  {
    title: "Interior Painting",
    tag: "Interior",
    copy: "Warm, uniform walls and hand-finished trim, delivered with dust barriers and daily resets so your home stays livable throughout.",
    image:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80",
    points: [
      "Low-VOC premium two-coat system",
      "Ceiling, trim & joinery detailing",
      "Same-day daily site reset",
    ],
  },
  {
    title: "Exterior Painting",
    tag: "Exterior",
    copy: "Weather-shield elevation systems engineered for monsoon and UV, backed by a decade-long colour and performance guarantee.",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
    points: [
      "Crack & seepage remediation",
      "Elastomeric weather-shield topcoat",
      "10-year performance guarantee",
    ],
  },
];

export default function HomePage() {
  return (
    <>
      <Meta
        title="Premium Interior & Exterior Painting"
        description={`${company.name} delivers clinical, museum-grade interior and exterior painting across ${company.address.city}. Fixed pricing, low-VOC finishes, 10-year exterior guarantee.`}
        path="/"
      />

      {/* HERO */}
      <section className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="pointer-events-none absolute -right-40 -top-40 h-96 w-96 rounded-full bg-light-accent/10 blur-3xl dark:bg-dark-accent/10" />
        <div className="container-luxe grid items-center gap-14 lg:grid-cols-2">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="eyebrow"
            >
              Est. {company.foundedYear} · {company.address.city}
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05 }}
              className="mt-5 text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl"
            >
              Precision painting,
              <br />
              <span className="text-gradient-gold">prescribed with care.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.12 }}
              className="mt-6 max-w-xl text-lg leading-relaxed text-light-subtext dark:text-dark-subtext"
            >
              A premium painting studio for homes and commercial spaces —
              clinical preparation, museum-grade finishes, and a white-glove
              experience from survey to signed walkthrough.
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
                View our work
              </Button>
            </motion.div>

            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.28 }}
              className="mt-10 flex flex-wrap gap-x-8 gap-y-3"
            >
              {heroHighlights.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 text-sm font-medium text-light-subtext dark:text-dark-subtext"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-light-accent dark:bg-dark-accent" />
                  {item}
                </li>
              ))}
            </motion.ul>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-4xl border border-light-border shadow-soft dark:border-dark-border dark:shadow-soft-dark">
              <Image
                src="https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=1000&q=80"
                alt="Artisan applying a flawless interior finish"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="glass-panel absolute -bottom-6 -left-6 hidden rounded-3xl px-6 py-5 shadow-soft dark:shadow-soft-dark sm:block"
            >
              <p className="text-3xl font-bold text-light-accent dark:text-dark-accent">
                {company.ratingValue}
                <span className="text-base text-light-subtext dark:text-dark-subtext">
                  /5
                </span>
              </p>
              <p className="mt-1 text-xs text-light-subtext dark:text-dark-subtext">
                From {company.reviewCount}+ verified clients
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* STATS */}
      <section className="border-y border-light-border bg-light-muted/60 dark:border-dark-border dark:bg-dark-surface/40">
        <div className="container-luxe grid grid-cols-2 gap-8 py-14 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center lg:text-left">
              <p className="text-4xl font-bold tracking-tight text-light-text dark:text-dark-text lg:text-5xl">
                <Counter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-2 text-sm text-light-subtext dark:text-dark-subtext">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* PREVIEWS */}
      <section className="py-20 lg:py-28">
        <div className="container-luxe">
          <SectionHeading
            eyebrow="Two disciplines, one standard"
            title="Interior warmth. Exterior armour."
            description="Whether it is the walls you live inside or the façade the world sees, every project runs on the same clinical process."
          />
          <div className="mt-14 grid gap-8 lg:grid-cols-2">
            {previews.map((item) => (
              <InteriorCard key={item.title} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="bg-light-muted/50 py-20 dark:bg-dark-surface/40 lg:py-28">
        <div className="container-luxe">
          <SectionHeading
            eyebrow="Our services"
            title="A complete craft, under one roof"
            description="From a single accent wall to a turnkey commercial repaint, every service is delivered by our own trained artisans."
          />
          <div className="mt-14 grid gap-px overflow-hidden rounded-4xl border border-light-border bg-light-border dark:border-dark-border dark:bg-dark-border sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <motion.article
                key={service.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
                className="group bg-light-surface p-8 transition-colors duration-300 hover:bg-light-muted dark:bg-dark-surface dark:hover:bg-dark-card-hover"
              >
                <div className="flex items-start justify-between">
                  <h3 className="text-xl font-bold tracking-tight">
                    {service.title}
                  </h3>
                  <span className="text-xs font-medium text-light-subtext dark:text-dark-subtext">
                    {service.startingPrice}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-light-subtext dark:text-dark-subtext">
                  {service.summary}
                </p>
                <ul className="mt-6 space-y-2">
                  {service.deliverables.slice(0, 3).map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2.5 text-xs text-light-text dark:text-dark-text"
                    >
                      <span className="h-1 w-1 rounded-full bg-light-accent dark:bg-dark-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-20 lg:py-28">
        <div className="container-luxe">
          <SectionHeading
            eyebrow="The Doctorz method"
            title="Five steps, zero surprises"
            description="Our process reads like a diagnosis: understand the surface first, then prescribe the perfect finish."
          />
          <ol className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-5">
            {processSteps.map((step, index) => (
              <motion.li
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="rounded-4xl border border-light-border bg-light-surface p-6 transition-colors duration-300 hover:border-light-accent/50 dark:border-dark-border dark:bg-dark-surface dark:hover:border-dark-accent/50"
              >
                <span className="text-3xl font-bold text-light-accent/40 dark:text-dark-accent/40">
                  {step.step}
                </span>
                <h3 className="mt-3 text-lg font-bold tracking-tight">
                  {step.title}
                </h3>
                <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-light-accent dark:text-dark-accent">
                  {step.metric}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-light-subtext dark:text-dark-subtext">
                  {step.detail}
                </p>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      {/* BEFORE / AFTER */}
      <section className="bg-light-muted/50 py-20 dark:bg-dark-surface/40 lg:py-28">
        <div className="container-luxe grid items-center gap-14 lg:grid-cols-2">
          <SectionHeading
            eyebrow="See the difference"
            title="Drag to reveal the transformation"
            description="Every project is documented before and after. Slide across to see the standard we hold ourselves to under raking light."
          />
          <BeforeAfterSlider
            before={beforeAfter.before}
            after={beforeAfter.after}
            beforeLabel={beforeAfter.beforeLabel}
            afterLabel={beforeAfter.afterLabel}
            caption={beforeAfter.caption}
          />
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 lg:py-28">
        <div className="container-luxe">
          <SectionHeading
            eyebrow="Client statements"
            title="Trusted by homeowners and architects"
            description="We are specified on luxury projects and recommended by the people who live with our work every day."
          />
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={testimonial.name}
                testimonial={testimonial}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-24">
        <div className="container-luxe">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden rounded-4xl border border-light-border bg-light-surface px-8 py-16 text-center shadow-soft dark:border-dark-border dark:bg-dark-surface dark:shadow-soft-dark lg:px-16 lg:py-20"
          >
            <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-light-accent/10 blur-3xl dark:bg-dark-accent/10" />
            <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-light-accent/10 blur-3xl dark:bg-dark-accent/10" />
            <div className="relative mx-auto max-w-2xl">
              <span className="eyebrow">Ready when you are</span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                Let&apos;s prescribe the perfect finish for your space.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-light-subtext dark:text-dark-subtext">
                Book a free 45-minute survey and receive a fixed, transparent
                quote within 48 hours.
              </p>
              <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
                <Button href="/book" size="lg" icon={ArrowRight}>
                  Book a free survey
                </Button>
                <Button
                  href={`tel:${company.phoneHref}`}
                  as="a"
                  variant="ghost"
                  size="lg"
                >
                  {company.phoneDisplay}
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
