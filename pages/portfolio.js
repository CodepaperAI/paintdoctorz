import { useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import Meta from "../seo/Meta";
import Button from "../components/ui/Button";
import SectionHeading from "../components/ui/SectionHeading";
import {
  portfolioCategories,
  portfolioItems,
  company,
} from "../data/siteData";

const ArrowRight = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export default function PortfolioPage() {
  const [active, setActive] = useState("all");

  const filtered = useMemo(() => {
    if (active === "all") return portfolioItems;
    return portfolioItems.filter((item) => item.category === active);
  }, [active]);

  return (
    <>
      <Meta
        title="Recent Work"
        description={`Explore recent interior, exterior, texture, and commercial painting projects completed by ${company.name} across ${company.address.city}.`}
        path="/portfolio"
      />

      {/* HEADER */}
      <section className="pt-32 pb-12 lg:pt-40 lg:pb-16">
        <div className="container-luxe">
          <SectionHeading
            eyebrow="Recent work"
            title="A portfolio finished under raking light"
            description="A selection of homes, façades, and commercial spaces we have transformed. Filter by discipline to see the range of our craft."
          />
        </div>
      </section>

      {/* FILTERS */}
      <section className="pb-6">
        <div className="container-luxe">
          <div
            className="flex flex-wrap gap-3"
            role="tablist"
            aria-label="Filter projects by category"
          >
            {portfolioCategories.map((category) => {
              const isActive = active === category.id;
              return (
                <button
                  key={category.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActive(category.id)}
                  className={`rounded-full border px-6 py-2.5 text-sm font-medium transition-colors duration-300 ${
                    isActive
                      ? "border-light-accent bg-light-accent text-light-surface dark:border-dark-accent dark:bg-dark-accent dark:text-dark-bg"
                      : "border-light-border bg-light-surface text-light-text hover:border-light-accent hover:text-light-accent dark:border-dark-border dark:bg-dark-surface dark:text-dark-text dark:hover:border-dark-accent dark:hover:text-dark-accent"
                  }`}
                >
                  {category.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* GRID */}
      <section className="pb-24 pt-6">
        <div className="container-luxe">
          <motion.div
            layout
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((item) => (
                <motion.article
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="group overflow-hidden rounded-4xl border border-light-border bg-light-surface shadow-soft transition-colors duration-300 hover:border-light-accent/50 dark:border-dark-border dark:bg-dark-surface dark:shadow-soft-dark dark:hover:border-dark-accent/50"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={item.image}
                      alt={`${item.title} — ${item.finish}`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-luxe group-hover:scale-105"
                    />
                    <span className="absolute left-4 top-4 rounded-full bg-light-surface/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-light-accent backdrop-blur dark:bg-dark-surface/90 dark:text-dark-accent">
                      {item.category}
                    </span>
                  </div>
                  <div className="p-6">
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className="text-lg font-bold tracking-tight">
                        {item.title}
                      </h3>
                      <span className="text-xs font-medium text-light-subtext dark:text-dark-subtext">
                        {item.year}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-light-subtext dark:text-dark-subtext">
                      {item.location}
                    </p>
                    <p className="mt-3 text-xs font-medium uppercase tracking-widest text-light-accent dark:text-dark-accent">
                      {item.finish}
                    </p>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <p className="py-20 text-center text-light-subtext dark:text-dark-subtext">
              No projects in this category yet. Check back soon.
            </p>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="pb-24">
        <div className="container-luxe">
          <div className="rounded-4xl border border-light-border bg-light-muted/60 px-8 py-14 text-center dark:border-dark-border dark:bg-dark-surface/50 lg:px-16">
            <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
              Your space could be next in this gallery.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-light-subtext dark:text-dark-subtext">
              Book a free survey and we will show you exactly what our finish
              looks like in your home.
            </p>
            <div className="mt-8 flex justify-center">
              <Button href="/book" size="lg" icon={ArrowRight}>
                Book a free survey
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
