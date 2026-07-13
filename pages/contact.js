import { useState } from "react";
import { motion } from "framer-motion";
import Meta from "../seo/Meta";
import Button from "../components/ui/Button";
import SectionHeading from "../components/ui/SectionHeading";
import { company, businessHours, socials } from "../data/siteData";

// Area codes assigned to Canada under the NANP.
const CANADIAN_AREA_CODES = new Set([
  "204", "226", "236", "249", "250", "263", "289",
  "306", "343", "354", "365", "367", "368", "382", "387",
  "403", "416", "418", "428", "431", "437", "438", "450", "460", "468", "474",
  "506", "514", "519", "548", "579", "581", "584", "587",
  "604", "613", "639", "647", "672", "683",
  "705", "709", "742", "753", "778", "780", "782",
  "807", "819", "825", "867", "873", "879",
  "902", "905",
]);

// Returns an error string, or null when the number is a valid Canadian one.
function validateCanadianPhone(input) {
  const digits = input.replace(/\D/g, "");

  // Accept an optional leading country code "1".
  const national = digits.length === 11 && digits.startsWith("1")
    ? digits.slice(1)
    : digits;

  if (national.length !== 10) {
    return "Enter a 10-digit Canadian number, e.g. (647) 850-6881.";
  }

  const area = national.slice(0, 3);
  const exchange = national.slice(3, 6);

  // NANP: area code and exchange must both start 2–9.
  if (!/^[2-9]/.test(area) || !/^[2-9]/.test(exchange)) {
    return "That doesn't look like a valid phone number.";
  }

  if (!CANADIAN_AREA_CODES.has(area)) {
    return `${area} isn't a Canadian area code. We only serve Canada.`;
  }

  return null;
}

// Formats as the user types: (647) 850-6881
function formatPhone(input) {
  const d = input.replace(/\D/g, "").slice(0, 10);
  if (d.length <= 3) return d;
  if (d.length <= 6) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
}


const fieldBase =
  "w-full rounded-2xl border border-light-border bg-light-surface px-4 py-3.5 text-sm text-light-text transition-colors duration-300 placeholder:text-light-subtext/70 focus:border-light-accent focus-visible:ring-2 focus-visible:ring-light-accent dark:border-dark-border dark:bg-dark-surface dark:text-dark-text dark:placeholder:text-dark-subtext/60 dark:focus:border-dark-accent dark:focus-visible:ring-dark-accent";

const labelBase =
  "mb-2 block text-sm font-medium text-light-text dark:text-dark-text";

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8.1 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function formatHours(entry) {
  if (!entry.open || !entry.close) return "Closed";
  return `${entry.open} – ${entry.close}`;
}

export default function ContactPage() {
 const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const update = (key, val) => {
    setForm((prev) => ({ ...prev, [key]: val }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const handleSubmit = (event) => {
  event.preventDefault();
  const next = {};
  if (!form.name.trim()) next.name = "Please enter your name.";
  if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = "Enter a valid email.";

  const phoneError = validateCanadianPhone(form.phone);
  if (phoneError) next.phone = phoneError;

  if (!form.message.trim()) next.message = "Let us know how we can help.";
  setErrors(next);
  if (Object.keys(next).length === 0) {
    setSent(true);
    setForm({ name: "", email: "", phone: "", message: "" });
  }
};

  const contactPoints = [
    {
      icon: <PhoneIcon />,
      label: "Call the studio",
      value: company.phoneDisplay,
      href: `tel:${company.phoneHref}`,
    },
    {
      icon: <MailIcon />,
      label: "Email us",
      value: company.email,
      href: `mailto:${company.email}`,
    },
    {
      icon: <PinIcon />,
      label: "Visit the atelier",
      value: `${company.address.street}, ${company.address.city}`,
      href: `https://maps.google.com/?q=${company.geo.latitude},${company.geo.longitude}`,
    },
  ];

  return (
    <>
      <Meta
        title="Contact"
        description={`Contact ${company.name} in ${company.address.city}. Call, email, or send a message and we'll respond within one business day.`}
        path="/contact"
      />

      <section className="pt-32 pb-12 lg:pt-40 lg:pb-16">
        <div className="container-luxe">
          <SectionHeading
            eyebrow="Contact"
            title="Let's start a conversation"
            description="Reach us however suits you. For a detailed quote, the fastest route is to book a free survey — but we're always happy to talk first."
          />
        </div>
      </section>

      <section className="pb-24">
        <div className="container-luxe grid gap-10 lg:grid-cols-2">
          {/* Left: contact points + hours */}
          <div className="space-y-6">
            <div className="grid gap-4">
              {contactPoints.map((point) => (
                <motion.a
                  key={point.label}
                  href={point.href}
                  target={point.href.startsWith("http") ? "_blank" : undefined}
                  rel={point.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -4 }}
                  className="flex items-center gap-4 rounded-4xl border border-light-border bg-light-surface p-6 transition-colors duration-300 hover:border-light-accent/50 dark:border-dark-border dark:bg-dark-surface dark:hover:border-dark-accent/50"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-light-muted text-light-accent dark:bg-dark-card-hover dark:text-dark-accent">
                    {point.icon}
                  </span>
                  <span className="flex flex-col">
                    <span className="text-xs font-medium uppercase tracking-widest text-light-subtext dark:text-dark-subtext">
                      {point.label}
                    </span>
                    <span className="mt-1 text-base font-semibold text-light-text dark:text-dark-text">
                      {point.value}
                    </span>
                  </span>
                </motion.a>
              ))}
            </div>

            <div className="rounded-4xl border border-light-border bg-light-surface p-6 dark:border-dark-border dark:bg-dark-surface">
              <h3 className="text-sm font-semibold uppercase tracking-luxe text-light-subtext dark:text-dark-subtext">
                Office hours
              </h3>
              <ul className="mt-5 space-y-2.5">
                {businessHours.map((entry) => {
                  const closed = !entry.open || !entry.close;
                  return (
                    <li
                      key={entry.day}
                      className="flex items-center justify-between text-sm"
                    >
                      <span className="text-light-text dark:text-dark-text">
                        {entry.day}
                      </span>
                      <span
                        className={
                          closed
                            ? "text-light-subtext dark:text-dark-subtext"
                            : "font-medium text-light-accent dark:text-dark-accent"
                        }
                      >
                        {formatHours(entry)}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="flex flex-wrap gap-2">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-light-border px-4 py-2 text-xs font-medium text-light-subtext transition-colors duration-300 hover:border-light-accent hover:text-light-accent dark:border-dark-border dark:text-dark-subtext dark:hover:border-dark-accent dark:hover:text-dark-accent"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>

          {/* Right: form */}
          <div className="rounded-4xl border border-light-border bg-light-surface p-6 shadow-soft dark:border-dark-border dark:bg-dark-surface dark:shadow-soft-dark sm:p-10">
            {sent ? (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex h-full flex-col items-center justify-center py-10 text-center"
              >
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-light-accent/15 text-light-accent dark:bg-dark-accent/15 dark:text-dark-accent">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8" aria-hidden="true">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </span>
                <h3 className="mt-6 text-2xl font-bold tracking-tight">
                  Message sent
                </h3>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-light-subtext dark:text-dark-subtext">
                  Thank you for reaching out. Our studio will respond within one
                  business day.
                </p>
                <Button
                  onClick={() => setSent(false)}
                  variant="secondary"
                  className="mt-8"
                >
                  Send another message
                </Button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <h3 className="text-xl font-bold tracking-tight">
                  Send a message
                </h3>
                <p className="mt-2 text-sm text-light-subtext dark:text-dark-subtext">
                  Fill in the form and we&apos;ll get back to you shortly.
                </p>

                <div className="mt-6 space-y-5">
                  <div>
                    <label htmlFor="c-name" className={labelBase}>
                      Name
                    </label>
                    <input
                      id="c-name"
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
<div>
  <label htmlFor="c-phone" className={labelBase}>
    Phone
  </label>
  <div className="relative">
    <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm font-medium text-light-subtext dark:text-dark-subtext">
      +1
    </span>
    <input
      id="c-phone"
      type="tel"
      inputMode="tel"
      autoComplete="tel"
      placeholder="(647) 850-6881"
      value={form.phone}
      onChange={(e) => update("phone", formatPhone(e.target.value))}
      aria-invalid={errors.phone ? "true" : "false"}
      aria-describedby={errors.phone ? "c-phone-error" : undefined}
      className={`${fieldBase} pl-11`}
    />
  </div>
  {errors.phone ? (
    <p id="c-phone-error" className="mt-2 text-sm text-red-500">
      {errors.phone}
    </p>
  ) : (
    <p className="mt-2 text-xs text-light-subtext dark:text-dark-subtext">
      Canadian numbers only.
    </p>
  )}
</div>
                  <div>
                    <label htmlFor="c-email" className={labelBase}>
                      Email
                    </label>
                    <input
                      id="c-email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                      className={fieldBase}
                    />
                    {errors.email && (
                      <p className="mt-2 text-sm text-red-500">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="c-message" className={labelBase}>
                      Message
                    </label>
                    <textarea
                      id="c-message"
                      rows={5}
                      placeholder="Tell us about your space and what you're planning…"
                      value={form.message}
                      onChange={(e) => update("message", e.target.value)}
                      className={`${fieldBase} resize-none`}
                    />
                    {errors.message && (
                      <p className="mt-2 text-sm text-red-500">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <Button type="submit" size="lg" className="w-full">
                    Send message
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
