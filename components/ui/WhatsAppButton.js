import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { company, whatsappMessage } from "../../data/siteData";

export default function WhatsAppButton() {
  const [visible, setVisible] = useState(true);
  const [showLabel, setShowLabel] = useState(false);


 // Nudge the label open once on load, then let it rest.
useEffect(() => {
  const open = setTimeout(() => setShowLabel(true), 1200);
  const close = setTimeout(() => setShowLabel(false), 5200);
  return () => {
    clearTimeout(open);
    clearTimeout(close);
  };
}, []);

  // wa.me needs digits only — strip +, spaces, dashes, brackets.
  const number = company.whatsappHref.replace(/\D/g, "");
  const href = `https://wa.me/${number}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with us on WhatsApp"
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          onMouseEnter={() => setShowLabel(true)}
          onMouseLeave={() => setShowLabel(false)}
          className="group fixed bottom-6 right-6 z-[80] flex items-center gap-3 rounded-full bg-[#25D366] py-4 pl-4 pr-4 shadow-[0_10px_30px_-6px_rgba(37,211,102,0.5)] transition-colors duration-300 hover:bg-[#20BD5A] focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 focus-visible:ring-offset-light-bg dark:focus-visible:ring-offset-dark-bg sm:bottom-8 sm:right-8"
        >
          {/* Pulse ring */}
          <span className="pointer-events-none absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366] opacity-20" />

          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-7 w-7 shrink-0 text-white"
            aria-hidden="true"
          >
            <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.65-2.05-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.6-.92-2.2-.24-.58-.48-.5-.67-.5h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.47 0 1.46 1.06 2.87 1.21 3.07.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35z" />
            <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.87 9.87 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm0 18.02h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.11.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.24-8.23 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.69 8.23-8.24 8.23z" />
          </svg>

          {/* Expanding label */}
          <motion.span
            initial={false}
            animate={{
              width: showLabel ? "auto" : 0,
              opacity: showLabel ? 1 : 0,
              marginRight: showLabel ? 4 : 0,
            }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden whitespace-nowrap text-sm font-semibold text-white"
          >
            Chat with us
          </motion.span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}