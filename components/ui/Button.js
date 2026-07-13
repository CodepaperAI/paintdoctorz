import Link from "next/link";
import { motion } from "framer-motion";

const BASE =
  "inline-flex items-center justify-center gap-2 rounded-full text-sm font-semibold transition-colors duration-300 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-60";

const SIZES = {
  sm: "px-5 py-2.5 text-xs",
  md: "px-7 py-3.5 text-sm",
  lg: "px-9 py-4 text-base",
};

const VARIANTS = {
  primary:
    "bg-light-accent text-light-surface hover:bg-light-accent-hover dark:bg-dark-accent dark:text-dark-bg dark:hover:bg-dark-accent-hover",
  secondary:
    "border border-light-border bg-light-surface text-light-text hover:border-light-accent hover:text-light-accent dark:border-dark-border dark:bg-dark-surface dark:text-dark-text dark:hover:border-dark-accent dark:hover:text-dark-accent",
  ghost:
    "text-light-text hover:text-light-accent dark:text-dark-text dark:hover:text-dark-accent",
};

// A motion-wrapped button that renders as a Next Link, an anchor, or a native button.
export default function Button({
  children,
  href,
  as,
  variant = "primary",
  size = "md",
  className = "",
  icon = null,
  iconPosition = "right",
  type = "button",
  disabled = false,
  ...rest
}) {
  const classes = `${BASE} ${SIZES[size] || SIZES.md} ${
    VARIANTS[variant] || VARIANTS.primary
  } ${className}`;

  const motionProps = {
    whileHover: disabled ? undefined : { scale: 1.02 },
    whileTap: disabled ? undefined : { scale: 0.97 },
    transition: { type: "spring", stiffness: 400, damping: 24 },
  };

  const content = (
    <>
      {icon && iconPosition === "left" && (
        <span className="shrink-0" aria-hidden="true">
          {icon}
        </span>
      )}
      <span>{children}</span>
      {icon && iconPosition === "right" && (
        <span className="shrink-0" aria-hidden="true">
          {icon}
        </span>
      )}
    </>
  );

  // Internal navigation via Next Link.
  if (href && !as) {
    return (
      <motion.span {...motionProps} className="inline-flex">
        <Link href={href} className={classes} {...rest}>
          {content}
        </Link>
      </motion.span>
    );
  }

  // External / raw anchor.
  if (as === "a") {
    return (
      <motion.a href={href} className={classes} {...motionProps} {...rest}>
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      disabled={disabled}
      className={classes}
      {...motionProps}
      {...rest}
    >
      {content}
    </motion.button>
  );
}
