import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";
import { ThemeProvider } from "../context/ThemeContext";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import "../styles/globals.css";
import WhatsAppButton from "../components/ui/WhatsAppButton";

const pageVariants = {
  initial: { opacity: 0, y: 12 },
  enter: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
};

export default function App({ Component, pageProps }) {
  const router = useRouter();

  return (
    <ThemeProvider>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-light-accent focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-light-surface dark:focus:bg-dark-accent dark:focus:text-dark-bg"
      >
        Skip to content
      </a>

      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main id="main-content" className="flex-1">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={router.asPath}
              variants={pageVariants}
              initial="initial"
              animate="enter"
              exit="exit"
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <Component {...pageProps} />
            </motion.div>
          </AnimatePresence>
        </main>
        <WhatsAppButton />
        <Footer />
      </div>
    </ThemeProvider>
  );
}
