import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  getItem,
  setItem,
} from "../utils/localStorage";

const C = createContext();

// Theme provider component
export function ThemeProvider({
  children,
}) {
  const [theme, setTheme] = useState(() =>
    getItem("theme", "dark")
  );

  useEffect(() => {
    setItem("theme", theme);

    document.documentElement.classList.toggle(
      "light",
      theme === "light"
    );
  }, [theme]);

  return (
    <C.Provider
      value={{
        theme,
        setTheme,
        toggle: () =>
          setTheme((t) =>
            t === "dark" ? "light" : "dark"
          ),
      }}
    >
      {children}
    </C.Provider>
  );
}

// Theme hook
export const useTheme = () => useContext(C);