// Manages light and dark themes, saves user preferences, and synchronizes theme changes across the app.

import { useEffect, useState } from "react";

export const THEME_KEY = "fitsight-theme";

export function applyTheme(theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");

  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch {
    /* ignore */
  }

  window.dispatchEvent(
    new CustomEvent("fitsight-theme", { detail: theme })
  );
}

export function useTheme() {
  const [theme, setTheme] = useState(() => {
    try {
      return (
        localStorage.getItem(THEME_KEY) ||
        (document.documentElement.classList.contains("dark")
          ? "dark"
          : "light")
      );
    } catch {
      return "light";
    }
  });

  useEffect(() => {
    const onChange = (e) => setTheme(e.detail);

    window.addEventListener("fitsight-theme", onChange);

    return () => {
      window.removeEventListener("fitsight-theme", onChange);
    };
  }, []);

  return [theme, applyTheme];
}
