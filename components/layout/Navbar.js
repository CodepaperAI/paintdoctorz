import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import { company, navLinks } from "../../data/siteData";
import Image from "next/image";

function SunIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  );
}
function PhoneIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8.1 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" />
    </svg>
  );
}

function MoonIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function ChevronIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

function ThemeToggle({ className = "" }) {
  const { resolvedTheme, toggleTheme, mounted } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={`group inline-flex h-10 w-10 items-center justify-center rounded-full border border-light-border bg-light-surface text-light-text transition-colors duration-300 hover:border-light-accent hover:text-light-accent dark:border-dark-border dark:bg-dark-surface dark:text-dark-text dark:hover:border-dark-accent dark:hover:text-dark-accent ${className}`}
    >
      {mounted && isDark ? (
        <SunIcon className="h-[18px] w-[18px]" />
      ) : (
        <MoonIcon className="h-[18px] w-[18px]" />
      )}
    </button>
  );
}

/* Desktop dropdown: just Interior and Exterior. */
function ServicesDropdown({ link, isActive }) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef(null);

  const openMenu = () => {
    clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const closeMenu = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  };

  useEffect(() => () => clearTimeout(closeTimer.current), []);

  return (
    <div
      className="relative"
      onMouseEnter={openMenu}
      onMouseLeave={closeMenu}
      onKeyDown={(e) => e.key === "Escape" && setOpen(false)}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((v) => !v)}
        className={`link-underline flex items-center gap-1.5 text-sm font-medium transition-colors duration-300 ${
          isActive
            ? "text-light-accent dark:text-dark-accent"
            : "text-light-text hover:text-light-accent dark:text-dark-text dark:hover:text-dark-accent"
        }`}
      >
        {link.label}
        <ChevronIcon
          className={`h-3.5 w-3.5 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-1/2 top-full z-50 mt-4 w-64 -translate-x-1/2"
          >
            <div className="glass-panel flex flex-col gap-1 rounded-3xl border p-3 shadow-soft dark:shadow-soft-dark">
              {link.children.map((group) => (
                <Link
                  key={group.heading}
                  href={group.href}
                  onClick={() => setOpen(false)}
                  className="group flex items-center justify-between rounded-2xl px-5 py-4 transition-colors duration-300 hover:bg-light-muted dark:hover:bg-dark-card-hover"
                >
                  <span className="flex flex-col">
                    <span className="text-sm font-semibold text-light-text transition-colors duration-300 group-hover:text-light-accent dark:text-dark-text dark:group-hover:text-dark-accent">
                      {group.heading}
                    </span>
                    <span className="mt-0.5 text-xs text-light-subtext dark:text-dark-subtext">
                      {group.heading === "Interior"
                        ? "Walls, cabinets, drywall & more"
                        : "Façades, siding, decks & washing"}
                    </span>
                  </span>
                  <span className="text-light-accent opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100 dark:text-dark-accent">
                    →
                  </span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Navbar() {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [mobileGroup, setMobileGroup] = useState(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setDrawerOpen(false);
  }, [router.asPath]);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  // Close the drawer on Escape.
  useEffect(() => {
    if (!drawerOpen) return undefined;
    const onKey = (e) => e.key === "Escape" && setDrawerOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [drawerOpen]);

  const isActive = (link) => {
    if (link.children) {
      return link.children.some((g) => router.pathname.startsWith(g.href));
    }
    return link.href === "/"
      ? router.pathname === "/"
      : router.pathname.startsWith(link.href);
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "glass-panel border-b shadow-soft dark:shadow-soft-dark"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <nav
          className="container-luxe flex h-20 items-center justify-between"
          aria-label="Primary"
        >
          <Link
            href="/"
            className="group flex items-center gap-3"
            aria-label={`${company.name} home`}
          >
            <span className="relative h-11 w-11 shrink-0 transition-transform duration-300 group-hover:scale-105">
              {/* Light mode: navy mark */}
              <Image
                src="/logo-navy.png"
                alt=""
                fill
                sizes="44px"
                priority
                className="object-contain dark:hidden"
              />
              {/* Dark mode: gold mark */}
              <Image
                src="/logo-gold.png"
                alt=""
                fill
                sizes="44px"
                priority
                className="hidden object-contain dark:block"
              />
            </span>
            <span className="flex flex-col leading-none">
              <span className="text-base font-bold tracking-tight">
                {company.name}
              </span>
              <span className="text-[10px] font-medium uppercase tracking-luxe text-light-subtext dark:text-dark-subtext">
                Premium Painting
              </span>
            </span>
          </Link>

          <div className="hidden items-center gap-5 lg:flex xl:gap-8">
            {navLinks.map((link) =>
              link.children ? (
                <ServicesDropdown
                  key={link.label}
                  link={link}
                  isActive={isActive(link)}
                />
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive(link) ? "page" : undefined}
                  className={`link-underline text-sm font-medium transition-colors duration-300 ${
                    isActive(link)
                      ? "text-light-accent dark:text-dark-accent"
                      : "text-light-text hover:text-light-accent dark:text-dark-text dark:hover:text-dark-accent"
                  }`}
                >
                  {link.label}
                </Link>
              ),
            )}
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <ThemeToggle />

            {/* Call now — icon-only on mobile, full pill on desktop */}

            <a
              href={`tel:${company.phoneHref}`}
              aria-label={`Call us at ${company.phoneDisplay}`}
              className="group inline-flex h-10 items-center justify-center gap-2 rounded-full border border-light-accent bg-transparent px-0 text-light-accent transition-colors duration-300 hover:bg-light-accent hover:text-light-surface dark:border-dark-accent dark:text-dark-accent dark:hover:bg-dark-accent dark:hover:text-dark-bg w-10 lg:w-auto lg:px-5"
            >
              <PhoneIcon className="h-[17px] w-[17px] shrink-0" />
              <span className="hidden text-sm font-semibold lg:inline">
                Call now
              </span>
            </a>

            <Link
              href="/book"
              className="hidden rounded-full bg-light-accent px-6 py-3 text-sm font-semibold text-light-surface transition-colors duration-300 hover:bg-light-accent-hover dark:bg-dark-accent dark:text-dark-bg dark:hover:bg-dark-accent-hover xl:inline-flex"
            >
              Book a Service
            </Link>

            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              aria-label="Open menu"
              aria-expanded={drawerOpen}
              aria-controls="mobile-drawer"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-light-border bg-light-surface text-light-text transition-colors duration-300 hover:border-light-accent dark:border-dark-border dark:bg-dark-surface dark:text-dark-text dark:hover:border-dark-accent lg:hidden"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            </button>
          </div>
        </nav>
      </header>

      {/* Drawer lives OUTSIDE <header>: the header's backdrop-blur would otherwise
          become the containing block for these fixed elements and clip them to 80px. */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setDrawerOpen(false)}
              className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm lg:hidden"
              aria-hidden="true"
            />
            <motion.aside
              key="drawer"
              id="mobile-drawer"
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                type: "tween",
                ease: [0.22, 1, 0.36, 1],
                duration: 0.4,
              }}
              className="fixed inset-y-0 right-0 z-[70] flex h-dvh w-[84%] max-w-sm flex-col overflow-y-auto border-l border-light-border bg-light-surface p-6 dark:border-dark-border dark:bg-dark-surface lg:hidden"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold uppercase tracking-luxe text-light-subtext dark:text-dark-subtext">
                  Menu
                </span>
                <button
                  type="button"
                  onClick={() => setDrawerOpen(false)}
                  aria-label="Close menu"
                  className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-light-border text-light-text transition-colors duration-300 hover:border-light-accent dark:border-dark-border dark:text-dark-text dark:hover:border-dark-accent"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    className="h-5 w-5"
                    aria-hidden="true"
                  >
                    <path d="M6 6l12 12M18 6L6 18" />
                  </svg>
                </button>
              </div>

              <nav className="mt-8 flex flex-col gap-1" aria-label="Mobile">
                {navLinks.map((link) => {
                  if (!link.children) {
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        aria-current={isActive(link) ? "page" : undefined}
                        className={`block rounded-2xl px-4 py-3.5 text-lg font-medium transition-colors duration-300 ${
                          isActive(link)
                            ? "bg-light-muted text-light-accent dark:bg-dark-card-hover dark:text-dark-accent"
                            : "text-light-text hover:bg-light-muted dark:text-dark-text dark:hover:bg-dark-card-hover"
                        }`}
                      >
                        {link.label}
                      </Link>
                    );
                  }

                  const expanded = mobileGroup === link.label;
                  return (
                    <div key={link.label}>
                      <button
                        type="button"
                        aria-expanded={expanded}
                        onClick={() =>
                          setMobileGroup(expanded ? null : link.label)
                        }
                        className={`flex w-full items-center justify-between rounded-2xl px-4 py-3.5 text-lg font-medium transition-colors duration-300 ${
                          isActive(link)
                            ? "bg-light-muted text-light-accent dark:bg-dark-card-hover dark:text-dark-accent"
                            : "text-light-text hover:bg-light-muted dark:text-dark-text dark:hover:bg-dark-card-hover"
                        }`}
                      >
                        {link.label}
                        <ChevronIcon
                          className={`h-4 w-4 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
                        />
                      </button>

                      <AnimatePresence initial={false}>
                        {expanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{
                              duration: 0.3,
                              ease: [0.22, 1, 0.36, 1],
                            }}
                            className="overflow-hidden"
                          >
                            <div className="space-y-1 py-2 pl-4">
                              {link.children.map((group) => (
                                <Link
                                  key={group.heading}
                                  href={group.href}
                                  className="block rounded-2xl px-4 py-3 text-base font-medium text-light-subtext transition-colors duration-300 hover:bg-light-muted hover:text-light-accent dark:text-dark-subtext dark:hover:bg-dark-card-hover dark:hover:text-dark-accent"
                                >
                                  {group.heading}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </nav>

              <div className="mt-auto space-y-4 pt-8">
                <div className="flex items-center justify-between rounded-2xl border border-light-border px-4 py-3 dark:border-dark-border">
                  <span className="text-sm font-medium text-light-subtext dark:text-dark-subtext">
                    Appearance
                  </span>
                  <ThemeToggle />
                </div>
                <Link
                  href="/book"
                  className="block rounded-full bg-light-accent px-6 py-4 text-center text-base font-semibold text-light-surface transition-colors duration-300 hover:bg-light-accent-hover dark:bg-dark-accent dark:text-dark-bg dark:hover:bg-dark-accent-hover"
                >
                  Book a Service
                </Link>

                <a
                  href={`tel:${company.phoneHref}`}
                  className="block text-center text-sm font-medium text-light-subtext dark:text-dark-subtext"
                >
                  {company.phoneDisplay}
                </a>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
