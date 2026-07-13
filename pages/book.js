import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Meta from "../seo/Meta";
import Button from "../components/ui/Button";
import {
  projectTypes,
  timelineOptions,
  budgetOptions,
  company,
} from "../data/siteData";

const STEPS = [
  { id: 1, label: "Project" },
  { id: 2, label: "Site" },
  { id: 3, label: "Details" },
  { id: 4, label: "Review" },
];

const propertyTypes = ["Apartment", "Independent house", "Villa", "Commercial"];

const initialForm = {
  projectType: "",
  propertyType: "",
  area: "",
  timeline: "",
  budget: "",
  name: "",
  email: "",
  phone: "",
  address: "",
  notes: "",
};

const fieldBase =
  "w-full rounded-2xl border border-light-border bg-light-surface px-4 py-3.5 text-sm text-light-text transition-colors duration-300 placeholder:text-light-subtext/70 focus:border-light-accent focus-visible:ring-2 focus-visible:ring-light-accent focus-visible:ring-offset-0 dark:border-dark-border dark:bg-dark-surface dark:text-dark-text dark:placeholder:text-dark-subtext/60 dark:focus:border-dark-accent dark:focus-visible:ring-dark-accent";

const labelBase =
  "mb-2 block text-sm font-medium text-light-text dark:text-dark-text";

function ChoiceGrid({ options, value, onSelect, columns = 2, name }) {
  return (
    <div
      className={`grid gap-3 ${columns === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2"}`}
      role="radiogroup"
      aria-label={name}
    >
      {options.map((option) => {
        const selected = value === option;
        return (
          <button
            key={option}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onSelect(option)}
            className={`rounded-2xl border px-5 py-4 text-left text-sm font-medium transition-colors duration-300 ${
              selected
                ? "border-light-accent bg-light-muted text-light-accent dark:border-dark-accent dark:bg-dark-card-hover dark:text-dark-accent"
                : "border-light-border bg-light-surface text-light-text hover:border-light-accent/60 dark:border-dark-border dark:bg-dark-surface dark:text-dark-text dark:hover:border-dark-accent/60"
            }`}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}

export default function BookPage() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const update = (key, val) => {
    setForm((prev) => ({ ...prev, [key]: val }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const validateStep = () => {
    const next = {};
    if (step === 1 && !form.projectType) {
      next.projectType = "Please choose a project type.";
    }
    if (step === 2) {
      if (!form.propertyType) next.propertyType = "Select a property type.";
      if (!form.area.trim()) next.area = "Approximate area helps us quote.";
      if (!form.timeline) next.timeline = "When would you like to start?";
    }
    if (step === 3) {
      if (!form.name.trim()) next.name = "Please tell us your name.";
      if (!/^\S+@\S+\.\S+$/.test(form.email)) {
        next.email = "Enter a valid email address.";
      }
      if (!/^[0-9+\-\s]{7,15}$/.test(form.phone)) {
        next.phone = "Enter a valid phone number.";
      }
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const goNext = () => {
    if (!validateStep()) return;
    setStep((s) => Math.min(4, s + 1));
  };

  const goBack = () => setStep((s) => Math.max(1, s - 1));

  const handleSubmit = () => {
    // Front-end only: in production this would POST to an API route.
    setSubmitted(true);
  };

  const resetForm = () => {
    setForm(initialForm);
    setErrors({});
    setStep(1);
    setSubmitted(false);
  };

  const progress = (step / STEPS.length) * 100;

  if (submitted) {
    return (
      <>
        <Meta title="Booking received" path="/book" noindex />
        <section className="flex min-h-[80vh] items-center justify-center px-6 pt-28 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-lg rounded-4xl border border-light-border bg-light-surface p-10 text-center shadow-soft dark:border-dark-border dark:bg-dark-surface dark:shadow-soft-dark"
          >
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 240, damping: 16, delay: 0.15 }}
              className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-light-accent/15 text-light-accent dark:bg-dark-accent/15 dark:text-dark-accent"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-9 w-9" aria-hidden="true">
                <motion.path
                  d="M20 6L9 17l-5-5"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.6, delay: 0.4, ease: "easeInOut" }}
                />
              </svg>
            </motion.span>
            <h1 className="mt-7 text-3xl font-bold tracking-tight">
              Your survey is booked
            </h1>
            <p className="mt-4 text-base leading-relaxed text-light-subtext dark:text-dark-subtext">
              Thank you, {form.name.split(" ")[0] || "there"}. Our studio will
              call you on {form.phone} within one business day to confirm your
              free 45-minute survey and prepare a fixed quote.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Button href="/portfolio" variant="secondary">
                Browse our work
              </Button>
              <Button onClick={resetForm} variant="ghost">
                Book another project
              </Button>
            </div>
          </motion.div>
        </section>
      </>
    );
  }

  return (
    <>
      <Meta
        title="Book a Service"
        description={`Book a free painting survey with ${company.name}. Tell us about your project and receive a fixed, transparent quote within 48 hours.`}
        path="/book"
      />

      <section className="pt-32 pb-24 lg:pt-40">
        <div className="container-luxe max-w-3xl">
          <div className="text-center">
            <span className="eyebrow">Book a service</span>
            <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
              Let&apos;s scope your project
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-light-subtext dark:text-dark-subtext">
              A few quick questions so we can prepare an accurate quote before we
              even arrive. It takes under two minutes.
            </p>
          </div>

          {/* Progress */}
          <div className="mt-12">
            <div className="flex items-center justify-between">
              {STEPS.map((s) => (
                <div key={s.id} className="flex flex-1 flex-col items-center">
                  <span
                    className={`flex h-9 w-9 items-center justify-center rounded-full border text-sm font-semibold transition-colors duration-300 ${
                      step >= s.id
                        ? "border-light-accent bg-light-accent text-light-surface dark:border-dark-accent dark:bg-dark-accent dark:text-dark-bg"
                        : "border-light-border bg-light-surface text-light-subtext dark:border-dark-border dark:bg-dark-surface dark:text-dark-subtext"
                    }`}
                  >
                    {s.id}
                  </span>
                  <span className="mt-2 hidden text-xs font-medium text-light-subtext dark:text-dark-subtext sm:block">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-light-border dark:bg-dark-border">
              <motion.div
                className="h-full rounded-full bg-light-accent dark:bg-dark-accent"
                initial={false}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </div>

          {/* Steps */}
          <div className="mt-10 rounded-4xl border border-light-border bg-light-surface p-6 shadow-soft dark:border-dark-border dark:bg-dark-surface dark:shadow-soft-dark sm:p-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                {step === 1 && (
                  <fieldset>
                    <legend className="text-xl font-bold tracking-tight">
                      What do you need painted?
                    </legend>
                    <p className="mt-2 text-sm text-light-subtext dark:text-dark-subtext">
                      Choose the option that best describes your project.
                    </p>
                    <div className="mt-6">
                      <ChoiceGrid
                        name="Project type"
                        options={projectTypes}
                        value={form.projectType}
                        onSelect={(v) => update("projectType", v)}
                      />
                      {errors.projectType && (
                        <p className="mt-3 text-sm text-red-500">
                          {errors.projectType}
                        </p>
                      )}
                    </div>
                  </fieldset>
                )}

                {step === 2 && (
                  <fieldset className="space-y-7">
                    <legend className="text-xl font-bold tracking-tight">
                      Tell us about the site
                    </legend>

                    <div>
                      <span className={labelBase}>Property type</span>
                      <ChoiceGrid
                        name="Property type"
                        options={propertyTypes}
                        value={form.propertyType}
                        onSelect={(v) => update("propertyType", v)}
                        columns={2}
                      />
                      {errors.propertyType && (
                        <p className="mt-2 text-sm text-red-500">
                          {errors.propertyType}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="area" className={labelBase}>
                        Approximate area (sq. ft or BHK)
                      </label>
                      <input
                        id="area"
                        type="text"
                        inputMode="text"
                        placeholder="e.g. 1,450 sq.ft or 3 BHK"
                        value={form.area}
                        onChange={(e) => update("area", e.target.value)}
                        className={fieldBase}
                      />
                      {errors.area && (
                        <p className="mt-2 text-sm text-red-500">{errors.area}</p>
                      )}
                    </div>

                    <div>
                      <span className={labelBase}>Preferred timeline</span>
                      <ChoiceGrid
                        name="Timeline"
                        options={timelineOptions}
                        value={form.timeline}
                        onSelect={(v) => update("timeline", v)}
                      />
                      {errors.timeline && (
                        <p className="mt-2 text-sm text-red-500">
                          {errors.timeline}
                        </p>
                      )}
                    </div>

                    <div>
                      <span className={labelBase}>
                        Indicative budget{" "}
                        <span className="font-normal text-light-subtext dark:text-dark-subtext">
                          (optional)
                        </span>
                      </span>
                      <ChoiceGrid
                        name="Budget"
                        options={budgetOptions}
                        value={form.budget}
                        onSelect={(v) => update("budget", v)}
                        columns={3}
                      />
                    </div>
                  </fieldset>
                )}

                {step === 3 && (
                  <fieldset className="space-y-6">
                    <legend className="text-xl font-bold tracking-tight">
                      How can we reach you?
                    </legend>

                    <div>
                      <label htmlFor="name" className={labelBase}>
                        Full name
                      </label>
                      <input
                        id="name"
                        type="text"
                        autoComplete="name"
                        placeholder="Your name"
                        value={form.name}
                        onChange={(e) => update("name", e.target.value)}
                        className={fieldBase}
                      />
                      {errors.name && (
                        <p className="mt-2 text-sm text-red-500">{errors.name}</p>
                      )}
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2">
                      <div>
                        <label htmlFor="email" className={labelBase}>
                          Email
                        </label>
                        <input
                          id="email"
                          type="email"
                          autoComplete="email"
                          placeholder="you@example.com"
                          value={form.email}
                          onChange={(e) => update("email", e.target.value)}
                          className={fieldBase}
                        />
                        {errors.email && (
                          <p className="mt-2 text-sm text-red-500">
                            {errors.email}
                          </p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="phone" className={labelBase}>
                          Phone
                        </label>
                        <input
                          id="phone"
                          type="tel"
                          autoComplete="tel"
                          placeholder="+91 90000 12345"
                          value={form.phone}
                          onChange={(e) => update("phone", e.target.value)}
                          className={fieldBase}
                        />
                        {errors.phone && (
                          <p className="mt-2 text-sm text-red-500">
                            {errors.phone}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="address" className={labelBase}>
                        Site address{" "}
                        <span className="font-normal text-light-subtext dark:text-dark-subtext">
                          (optional)
                        </span>
                      </label>
                      <input
                        id="address"
                        type="text"
                        autoComplete="street-address"
                        placeholder="Area, city"
                        value={form.address}
                        onChange={(e) => update("address", e.target.value)}
                        className={fieldBase}
                      />
                    </div>

                    <div>
                      <label htmlFor="notes" className={labelBase}>
                        Anything else we should know?{" "}
                        <span className="font-normal text-light-subtext dark:text-dark-subtext">
                          (optional)
                        </span>
                      </label>
                      <textarea
                        id="notes"
                        rows={4}
                        placeholder="Colours in mind, access notes, deadlines…"
                        value={form.notes}
                        onChange={(e) => update("notes", e.target.value)}
                        className={`${fieldBase} resize-none`}
                      />
                    </div>
                  </fieldset>
                )}

                {step === 4 && (
                  <div>
                    <h2 className="text-xl font-bold tracking-tight">
                      Review your request
                    </h2>
                    <p className="mt-2 text-sm text-light-subtext dark:text-dark-subtext">
                      Confirm the details below and we&apos;ll be in touch within
                      one business day.
                    </p>
                    <dl className="mt-6 divide-y divide-light-border rounded-2xl border border-light-border dark:divide-dark-border dark:border-dark-border">
                      {[
                        ["Project", form.projectType],
                        ["Property", form.propertyType],
                        ["Area", form.area],
                        ["Timeline", form.timeline],
                        ["Budget", form.budget || "Not specified"],
                        ["Name", form.name],
                        ["Email", form.email],
                        ["Phone", form.phone],
                        ["Address", form.address || "Not specified"],
                        ["Notes", form.notes || "—"],
                      ].map(([label, value]) => (
                        <div
                          key={label}
                          className="flex justify-between gap-6 px-5 py-3.5 text-sm"
                        >
                          <dt className="font-medium text-light-subtext dark:text-dark-subtext">
                            {label}
                          </dt>
                          <dd className="text-right font-medium text-light-text dark:text-dark-text">
                            {value}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Nav buttons */}
            <div className="mt-10 flex items-center justify-between gap-4">
              <Button
                onClick={goBack}
                variant="ghost"
                disabled={step === 1}
                className={step === 1 ? "invisible" : ""}
              >
                Back
              </Button>

              {step < 4 ? (
                <Button onClick={goNext}>Continue</Button>
              ) : (
                <Button onClick={handleSubmit}>Confirm booking</Button>
              )}
            </div>
          </div>

          <p className="mt-6 text-center text-xs text-light-subtext dark:text-dark-subtext">
            Prefer to talk? Call{" "}
            <a
              href={`tel:${company.phoneHref}`}
              className="font-medium text-light-accent dark:text-dark-accent"
            >
              {company.phoneDisplay}
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
