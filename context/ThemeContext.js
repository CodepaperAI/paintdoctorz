import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

// createContext default keeps consumers safe if used outside a provider.
const ThemeContext = createContext({
  theme: "light",
  resolvedTheme: "light",
  setTheme: () => {},
  toggleTheme: () => {},
  mounted: false,
});

const STORAGE_KEY = "painting-doctorz-theme";

function getSystemTheme() {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function applyThemeClass(theme) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  if (theme === "dark") {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }
  root.style.colorScheme = theme;
}

export function ThemeProvider({ children }) {
  // "theme" holds the user preference: "light" | "dark" | "system".
  const [theme, setThemeState] = useState("system");
  const [resolvedTheme, setResolvedTheme] = useState("light");
  const [mounted, setMounted] = useState(false);

  // Read persisted preference on first client render.
  useEffect(() => {
    let stored = null;
    try {
      stored = window.localStorage.getItem(STORAGE_KEY);
    } catch (err) {
      stored = null;
    }

    const initialPreference =
      stored === "light" || stored === "dark" || stored === "system"
        ? stored
        : "system";

    const initialResolved =
      initialPreference === "system" ? getSystemTheme() : initialPreference;

    setThemeState(initialPreference);
    setResolvedTheme(initialResolved);
    applyThemeClass(initialResolved);
    setMounted(true);
  }, []);

  // Keep in sync with the OS when the preference is "system".
  useEffect(() => {
    if (!mounted || theme !== "system") return undefined;

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (event) => {
      const next = event.matches ? "dark" : "light";
      setResolvedTheme(next);
      applyThemeClass(next);
    };

    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }, [mounted, theme]);

  const setTheme = useCallback((nextPreference) => {
    const preference =
      nextPreference === "light" ||
      nextPreference === "dark" ||
      nextPreference === "system"
        ? nextPreference
        : "system";

    const resolved =
      preference === "system" ? getSystemTheme() : preference;

    setThemeState(preference);
    setResolvedTheme(resolved);
    applyThemeClass(resolved);

    try {
      window.localStorage.setItem(STORAGE_KEY, preference);
    } catch (err) {
      // Storage may be unavailable (private mode); fail silently.
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }, [resolvedTheme, setTheme]);

  const value = useMemo(
    () => ({ theme, resolvedTheme, setTheme, toggleTheme, mounted }),
    [theme, resolvedTheme, setTheme, toggleTheme, mounted]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}

export default ThemeContext;
