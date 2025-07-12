import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';

type Theme = 'light' | 'dark' | 'system';

type ThemeContextType = {
  theme: Theme;
  resolvedTheme: 'light' | 'dark';
  setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const storedTheme = localStorage.getItem('theme') as Theme | null;
      if (storedTheme) return storedTheme;
    }
    return 'system';
  });

  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const getSystemPreference = () =>
      window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';

    const updateThemeClass = (newResolvedTheme: 'light' | 'dark') => {
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(newResolvedTheme);
    };

    const applyTheme = () => {
      if (theme === 'system') {
        const systemTheme = getSystemPreference();
        setResolvedTheme(systemTheme);
        updateThemeClass(systemTheme);
      } else {
        setResolvedTheme(theme);
        updateThemeClass(theme);
      }

      localStorage.setItem('theme', theme);
    };

    applyTheme();

    // Listen for system theme changes
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (theme === 'system') {
        const systemTheme = getSystemPreference();
        setResolvedTheme(systemTheme);
        updateThemeClass(systemTheme);
      }
    };

    media.addEventListener('change', handleChange);
    return () => media.removeEventListener('change', handleChange);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
