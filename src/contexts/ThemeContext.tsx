import { createContext, useEffect, useState, type ReactNode } from "react";

export type PreferredTheme = "light" | "dark" | "system";
export type ResolvedTheme = "light" | "dark";

interface ThemeContextValue {
  theme: PreferredTheme;
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: PreferredTheme) => void;
}

export const ThemeContext = createContext<ThemeContextValue>({
  theme: "system",
  resolvedTheme: "light",
  setTheme: () => {},
});

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeProvider: React.FC<ThemeProviderProps> = (
  props: ThemeProviderProps
) => {
  const [theme, setTheme] = useState<PreferredTheme>(() => {
    const storedTheme = localStorage.getItem("theme") as PreferredTheme | null;
    return storedTheme ?? "system";
  });

  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>("light");

  useEffect(() => {
    const mediaQuery: MediaQueryList = window.matchMedia("(prefers-color-scheme: dark)");
    const systemTheme: ResolvedTheme = mediaQuery.matches ? "dark" : "light";

    const currentTheme: ResolvedTheme = theme === "system" ? systemTheme : theme;
    setResolvedTheme(currentTheme);
    document.documentElement.setAttribute("data-theme", currentTheme);
    localStorage.setItem("theme", theme);

    const handleChange = () => {
      if (theme === "system") {
        const newTheme: ResolvedTheme = mediaQuery.matches ? "dark" : "light";
        setResolvedTheme(newTheme);
        document.documentElement.setAttribute("data-theme", newTheme);
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{
        theme: theme,
        resolvedTheme: resolvedTheme,
        setTheme: setTheme,
      }}
    >
      {props.children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
