import Link from "next/link";
import Image from "next/image";
import {
  company,
  navLinks,
  services,
  socials,
  businessHours,
} from "../../data/siteData";

// Collapse consecutive days that share the same hours.
function groupHours(entries) {
  const groups = [];

  entries.forEach((entry) => {
    const value =
      entry.open && entry.close ? `${entry.open} – ${entry.close}` : "Closed";

    const last = groups[groups.length - 1];

    if (last && last.value === value) {
      last.end = entry.day;
    } else {
      groups.push({
        start: entry.day,
        end: entry.day,
        value,
      });
    }
  });

  return groups.map((g) => ({
    label:
      g.start === g.end
        ? g.start.slice(0, 3)
        : `${g.start.slice(0, 3)} – ${g.end.slice(0, 3)}`,
    value: g.value,
  }));
}

export default function Footer() {
  const year = new Date().getFullYear();
  const hours = groupHours(businessHours);

  return (
    <footer className="border-t border-light-border bg-light-surface dark:border-dark-border dark:bg-dark-surface">
      <div className="container-luxe py-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">

          {/* Brand */}
          <div className="lg:col-span-4">
            <Link
              href="/"
              className="flex items-center gap-2.5"
              aria-label={`${company.name} home`}
            >
              <span className="relative h-9 w-9 shrink-0">
                <Image
                  src="/logo-navy.png"
                  alt={`${company.name} logo`}
                  fill
                  sizes="36px"
                  className="object-contain dark:hidden"
                />
                <Image
                  src="/logo-gold.png"
                  alt={`${company.name} logo`}
                  fill
                  sizes="36px"
                  className="hidden object-contain dark:block"
                />
              </span>

              <span className="text-base font-bold tracking-tight">
                {company.name}
              </span>
            </Link>

            <p className="mt-4 max-w-xs text-sm leading-relaxed text-light-subtext dark:text-dark-subtext">
              Premium interior and exterior painting — clinical preparation,
              museum-grade finishes, fixed transparent pricing.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-light-border px-3.5 py-1.5 text-xs font-medium text-light-subtext transition-colors duration-300 hover:border-light-accent hover:text-light-accent dark:border-dark-border dark:text-dark-subtext dark:hover:border-dark-accent dark:hover:text-dark-accent"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-semibold uppercase tracking-luxe text-light-subtext dark:text-dark-subtext">
              Explore
            </h3>

            <ul className="mt-4 space-y-2">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-light-text transition-colors duration-300 hover:text-light-accent dark:text-dark-text dark:hover:text-dark-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}

              <li>
                <Link
                  href="/book"
                  className="text-sm text-light-text transition-colors duration-300 hover:text-light-accent dark:text-dark-text dark:hover:text-dark-accent"
                >
                  Book a Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-semibold uppercase tracking-luxe text-light-subtext dark:text-dark-subtext">
              Services
            </h3>

            <ul className="mt-4 space-y-2">
              {services.slice(0, 4).map((service) => (
                <li key={service.slug}>
                  <Link
                    href="/#services"
                    className="text-sm text-light-text transition-colors duration-300 hover:text-light-accent dark:text-dark-text dark:hover:text-dark-accent"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}

              <li>
                <Link
                  href="/interior-services"
                  className="text-sm font-medium text-light-accent transition-colors duration-300 hover:text-light-accent-hover dark:text-dark-accent dark:hover:text-dark-accent-hover"
                >
                  View all →
                </Link>
              </li>
            </ul>
          </div>

          {/* Studio */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-semibold uppercase tracking-luxe text-light-subtext dark:text-dark-subtext">
             We Serve
            </h3>

            <address className="mt-4 space-y-2 text-sm not-italic text-light-subtext dark:text-dark-subtext">
              <p>
                {company.address.street}, {company.address.city},{" "}
                {company.address.region} {company.address.postalCode}
              </p>

              <p className="flex flex-wrap gap-x-3">
                <a
                  href={`tel:${company.phoneHref}`}
                  className="font-medium text-light-text transition-colors duration-300 hover:text-light-accent dark:text-dark-text dark:hover:text-dark-accent"
                >
                  {company.phoneDisplay}
                </a>

                <a
                  href={`mailto:${company.email}`}
                  className="transition-colors duration-300 hover:text-light-accent dark:hover:text-dark-accent"
                >
                  {company.email}
                </a>
              </p>
            </address>

            <ul className="mt-4 space-y-1 text-xs text-light-subtext dark:text-dark-subtext">
              {hours.map((slot) => (
                <li
                  key={slot.label}
                  className="flex justify-between gap-4"
                >
                  <span>{slot.label}</span>

                  <span className="font-medium text-light-text dark:text-dark-text">
                    {slot.value}
                  </span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        <div className="divider-luxe mt-10" />

        <div className="flex flex-col items-center justify-between gap-2 pt-6 text-xs text-light-subtext dark:text-dark-subtext sm:flex-row">
          <p>
            © {year} {company.legalName}. All rights reserved.
          </p>

          <p>{company.tagline}</p>
        </div>
      </div>
    </footer>
  );
}