import { motion } from "framer-motion";

function StarRating({ rating }) {
  const stars = [1, 2, 3, 4, 5];
  return (
    <div
      className="flex items-center gap-1"
      role="img"
      aria-label={`${rating} out of 5 stars`}
    >
      {stars.map((star) => (
        <svg
          key={star}
          viewBox="0 0 24 24"
          className={`h-4 w-4 ${
            star <= rating
              ? "text-light-accent dark:text-dark-accent"
              : "text-light-border dark:text-dark-border"
          }`}
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M12 2.5l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.8 6.2 20.9l1.1-6.5L2.6 9.8l6.5-.9L12 2.5z" />
        </svg>
      ))}
    </div>
  );
}

export default function TestimonialCard({ testimonial, index = 0 }) {
  const { name, role, rating, quote } = testimonial;
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <motion.figure
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8 }}
      className="flex h-full flex-col justify-between rounded-4xl border border-light-border bg-light-surface p-8 shadow-soft transition-colors duration-300 hover:border-light-accent/50 dark:border-dark-border dark:bg-dark-surface dark:shadow-soft-dark dark:hover:border-dark-accent/50 dark:hover:bg-dark-card-hover"
    >
      <div>
        <svg
          viewBox="0 0 24 24"
          className="h-8 w-8 text-light-accent/40 dark:text-dark-accent/40"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M7.5 6C5 6 3 8 3 10.5c0 2.2 1.6 4 3.8 4 .2 0 .5 0 .7-.1-.4 1.6-1.8 2.9-3.5 3.3-.3.1-.5.4-.5.7 0 .4.4.8.8.7 3.3-.6 5.7-3.4 5.7-6.9V10.5C10 8 8.5 6 7.5 6zm10 0C15 6 13 8 13 10.5c0 2.2 1.6 4 3.8 4 .2 0 .5 0 .7-.1-.4 1.6-1.8 2.9-3.5 3.3-.3.1-.5.4-.5.7 0 .4.4.8.8.7 3.3-.6 5.7-3.4 5.7-6.9V10.5C20 8 18.5 6 17.5 6z" />
        </svg>
        <blockquote className="mt-5 text-lg leading-relaxed text-light-text dark:text-dark-text">
          {quote}
        </blockquote>
      </div>

      <figcaption className="mt-8 flex items-center gap-4">
        <span className="flex h-12 w-12 items-center justify-center rounded-full border border-light-accent/40 bg-light-muted text-sm font-semibold text-light-accent dark:border-dark-accent/40 dark:bg-dark-card-hover dark:text-dark-accent">
          {initials}
        </span>
        <div className="flex-1">
          <p className="text-sm font-semibold text-light-text dark:text-dark-text">
            {name}
          </p>
          <p className="text-xs text-light-subtext dark:text-dark-subtext">
            {role}
          </p>
        </div>
        <StarRating rating={rating} />
      </figcaption>
    </motion.figure>
  );
}
