import { motion } from "framer-motion";

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const child = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  as = "h2",
  className = "",
  titleClassName = "",
}) {
  const Tag = as;
  const alignment =
    align === "center"
      ? "items-center text-center mx-auto"
      : align === "right"
      ? "items-end text-right ml-auto"
      : "items-start text-left";

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className={`flex max-w-2xl flex-col gap-4 ${alignment} ${className}`}
    >
      {eyebrow && (
        <motion.span variants={child} className="eyebrow">
          {eyebrow}
        </motion.span>
      )}
      {title && (
        <motion.div variants={child}>
          <Tag
            className={`text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-[2.75rem] ${titleClassName}`}
          >
            {title}
          </Tag>
        </motion.div>
      )}
      {description && (
        <motion.p
          variants={child}
          className="text-base leading-relaxed text-light-subtext dark:text-dark-subtext"
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  );
}
