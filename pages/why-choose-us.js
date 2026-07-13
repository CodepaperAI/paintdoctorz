import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import Meta from "../seo/Meta";
import Button from "../components/ui/Button";
import SectionHeading from "../components/ui/SectionHeading";
import BeforeAfterSlider from "../components/ui/BeforeAfterSlider";
import {
  ourProcess,
  whyChooseUs,
  transformations,
  company,
} from "../data/siteData";

const ArrowRight = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

/* Icon set for the Why Choose Us reasons. */
const ICONS = {
  shield: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6" aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  ),
  clock: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  ),
  team: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6" aria-hidden="true">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  sparkle: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6" aria-hidden="true">
      <path d="M12 3l2.1 5.4L19.5 10.5l-5.4 2.1L12 18l-2.1-5.4L4.5 10.5l5.4-2.1L12 3z" />
      <path d="M19 17l.8 2.2L22 20l-2.2.8L19 23l-.8-2.2L16 20l2.2-.8L19 17z" />
    </svg>
  ),
};

/* Transformation gallery: pick a project, then drag the slider to compare. */
function TransformationGallery({ items }) {
  const [index, setIndex] = useState(0);
  const active = items[index];

  const goTo = (next) => {
    const total = items.length;
    setIndex((next + total) % total);
  };

  return (
    <div>
      {/* Project tabs */}
      <div
        className="flex flex-wrap justify-center gap-3"
        role="tablist"
        aria-label="Choose a transformation to compare"
      >
        {items.map((item, i) => {
          const selected = i === index;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls="transformation-panel"
              onClick={() => setIndex(i)}
              className={`rounded-full border px-5 py-2.5 text-sm font-medium transition-colors duration-300 ${
                selected
                  ? "border-light-accent bg-light-accent text-light-surface dark:border-dark-accent dark:bg-dark-accent dark:text-dark-bg"
                  : "border-light-border bg-light-surface text-light-text hover:border-light-accent hover:text-light-accent dark:border-dark-border dark:bg-dark-surface dark:text-dark-text dark:hover:border-dark-accent dark:hover:text-dark-accent"
              }`}
            >
              <span className="mr-2 text-[10px] font-semibold uppercase tracking-widest opacity-70">
                {item.label}
              </span>
              {item.title}
            </button>
          );
        })}
      </div>

      {/* Slider panel */}
      <div
        id="transformation-panel"
        role="tabpanel"
        aria-live="polite"
        className="mt-10"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <BeforeAfterSlider
              before={active.before}
              after={active.after}
              beforeLabel="Before"
              afterLabel="After"
              caption={active.caption}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Prev / next controls */}
      <div className="mt-8 flex items-center justify-center gap-6">
        <button
          type="button"
          onClick={() => goTo(index - 1)}
          aria-label="Previous transformation"
          className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-light-border bg-light-surface text-light-text transition-colors duration-300 hover:border-light-accent hover:text-light-accent dark:border-dark-border dark:bg-dark-surface dark:text-dark-text dark:hover:border-dark-accent dark:hover:text-dark-accent"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        <div className="flex items-center gap-2" aria-hidden="true">
          {items.map((item, i) => (
            <span
              key={item.id}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === index
                  ? "w-8 bg-light-accent dark:bg-dark-accent"
                  : "w-1.5 bg-light-border dark:bg-dark-border"
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => goTo(index + 1)}
          aria-label="Next transformation"
          className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-light-border bg-light-surface text-light-text transition-colors duration-300 hover:border-light-accent hover:text-light-accent dark:border-dark-border dark:bg-dark-surface dark:text-dark-text dark:hover:border-dark-accent dark:hover:text-dark-accent"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
            <path d="M9 6l6 6-6 6" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default function WhyChooseUsPage() {
  return (
    <>
      <Meta
        title="Why Choose Us"
        description={`Our four-step painting process, the reasons clients choose ${company.name}, and real before-and-after transformations you can slide through.`}
        path="/why-choose-us"
      />

      {/* PAGE INTRO */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-20">
        <div className="container-luxe">
          <div className="mx-auto max-w-3xl text-center">
            <motion.span
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="eyebrow"
            >
              Why choose us
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.06 }}
              className="mt-5 text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl"
            >
              Luxury painting{" "}
              <span className="text-gradient-gold">without the stress.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.12 }}
              className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-light-subtext dark:text-dark-subtext"
            >
              A disciplined process, premium materials, and a team that treats
              your property like a finished product — not a worksite.
            </motion.p>
          </div>
        </div>
      </section>

      {/* OUR PROCESS */}
      <section className="border-y border-light-border bg-light-muted/50 py-20 dark:border-dark-border dark:bg-dark-surface/40 lg:py-28">
        <div className="container-luxe">
          <SectionHeading
            eyebrow="Our process"
            title="We make every detail count."
            description="Four stages, followed on every single project. No shortcuts, no improvisation."
            align="center"
          />

          <ol className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {ourProcess.map((stage, index) => (
              <motion.li
                key={stage.step}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="group relative overflow-hidden rounded-4xl border border-light-border bg-light-surface shadow-soft transition-colors duration-300 hover:border-light-accent/50 dark:border-dark-border dark:bg-dark-surface dark:shadow-soft-dark dark:hover:border-dark-accent/50"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={stage.image}
                    alt={stage.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 ease-luxe group-hover:scale-105"
                  />
                  <span className="absolute left-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-light-surface/95 text-base font-bold text-light-accent backdrop-blur dark:bg-dark-surface/95 dark:text-dark-accent">
                    {stage.step}
                  </span>
                </div>
                <div className="p-7">
                  <h3 className="text-lg font-bold leading-snug tracking-tight">
                    {stage.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-light-subtext dark:text-dark-subtext">
                    {stage.detail}
                  </p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-20 lg:py-28">
        <div className="container-luxe grid items-center gap-16 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-4xl border border-light-border shadow-soft dark:border-dark-border dark:shadow-soft-dark">
              <Image
                src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1000&q=80"
                alt="A completed interior with a flawless luxury finish"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="glass-panel absolute -bottom-6 -right-6 hidden rounded-3xl px-6 py-5 shadow-soft dark:shadow-soft-dark sm:block">
              <p className="text-3xl font-bold text-light-accent dark:text-dark-accent">
                10<span className="text-base">yr</span>
              </p>
              <p className="mt-1 text-xs text-light-subtext dark:text-dark-subtext">
                Exterior performance guarantee
              </p>
            </div>
          </motion.div>

          <div>
            <SectionHeading
              eyebrow="Why choose us"
              title="Luxury painting without the stress."
              description="Four commitments we hold on every project, from a single accent wall to a full elevation."
            />

            <ul className="mt-10 space-y-4">
              {whyChooseUs.map((reason, index) => (
                <motion.li
                  key={reason.title}
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="flex gap-5 rounded-4xl border border-light-border bg-light-surface p-6 transition-colors duration-300 hover:border-light-accent/50 dark:border-dark-border dark:bg-dark-surface dark:hover:border-dark-accent/50 dark:hover:bg-dark-card-hover"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-light-muted text-light-accent dark:bg-dark-card-hover dark:text-dark-accent">
                    {ICONS[reason.icon]}
                  </span>
                  <span className="flex flex-col">
                    <span className="text-base font-semibold tracking-tight text-light-text dark:text-dark-text">
                      {reason.title}
                    </span>
                    <span className="mt-1.5 text-sm leading-relaxed text-light-subtext dark:text-dark-subtext">
                      {reason.detail}
                    </span>
                  </span>
                </motion.li>
              ))}
            </ul>

            <div className="mt-10">
              <Button href="/book" size="lg" icon={ArrowRight}>
                Book a free survey
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* SEE THE TRANSFORMATION */}
      <section className="border-t border-light-border bg-light-muted/50 py-20 dark:border-dark-border dark:bg-dark-surface/40 lg:py-28">
        <div className="container-luxe">
          <SectionHeading
            eyebrow="See the transformation"
            title="Elegance you can see. Excellence you can feel."
            description="Drag the handle across each image to reveal the before and after. Switch between interior rooms and exterior elevations below."
            align="center"
          />

          <div className="mx-auto mt-14 max-w-4xl">
            <TransformationGallery items={transformations} />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-24">
        <div className="container-luxe">
          <div className="rounded-4xl border border-light-border bg-light-surface px-8 py-14 text-center shadow-soft dark:border-dark-border dark:bg-dark-surface dark:shadow-soft-dark lg:px-16">
            <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to see this finish in your own space?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-light-subtext dark:text-dark-subtext">
              Book a free 45-minute inspection and we&apos;ll prescribe the right
              coating system — with a fixed quote inside 48 hours.
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