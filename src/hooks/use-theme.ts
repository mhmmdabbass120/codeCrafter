import { useState, useEffect, useCallback } from 'react';

type Theme = 'light' | 'dark' | 'system';

const THEME_STORAGE_KEY = 'python-learning-theme';

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>('system');
  const [actualTheme, setActualTheme] = useState<'light' | 'dark'>('dark');

  // Function to get system preference
  const getSystemTheme = useCallback((): 'light' | 'dark' => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'dark';
  }, []);

  // Function to apply theme to document
  const applyTheme = useCallback((themeToApply: 'light' | 'dark') => {
    const root = window.document.documentElement;
    
    if (themeToApply === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    
    setActualTheme(themeToApply);
  }, []);

  // Function to resolve theme (system -> actual theme)
  const resolveTheme = useCallback((currentTheme: Theme): 'light' | 'dark' => {
    if (currentTheme === 'system') {
      return getSystemTheme();
    }
    return currentTheme;
  }, [getSystemTheme]);

  // Initialize theme on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(THEME_STORAGE_KEY) as Theme;
      const initialTheme = stored || 'system';
      setTheme(initialTheme);
      
      const resolvedTheme = resolveTheme(initialTheme);
      applyTheme(resolvedTheme);
    } catch (error) {
      console.error('Error loading theme:', error);
      const systemTheme = getSystemTheme();
      applyTheme(systemTheme);
    }
  }, [applyTheme, resolveTheme, getSystemTheme]);

  // Listen for system theme changes
  useEffect(() => {
    if (theme !== 'system') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = () => {
      if (theme === 'system') {
        const newSystemTheme = getSystemTheme();
        applyTheme(newSystemTheme);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme, applyTheme, getSystemTheme]);

  // Function to change theme
  const changeTheme = useCallback((newTheme: Theme) => {
    setTheme(newTheme);
    
    try {
      localStorage.setItem(THEME_STORAGE_KEY, newTheme);
    } catch (error) {
      console.error('Error saving theme:', error);
    }
    
    const resolvedTheme = resolveTheme(newTheme);
    applyTheme(resolvedTheme);
  }, [applyTheme, resolveTheme]);

  // Convenience functions
  const toggleTheme = useCallback(() => {
    if (theme === 'light') {
      changeTheme('dark');
    } else if (theme === 'dark') {
      changeTheme('system');
    } else {
      changeTheme('light');
    }
  }, [theme, changeTheme]);

  const setLightMode = useCallback(() => changeTheme('light'), [changeTheme]);
  const setDarkMode = useCallback(() => changeTheme('dark'), [changeTheme]);
  const setSystemMode = useCallback(() => changeTheme('system'), [changeTheme]);

  return {
    theme,
    actualTheme,
    changeTheme,
    toggleTheme,
    setLightMode,
    setDarkMode,
    setSystemMode,
    isLight: actualTheme === 'light',
    isDark: actualTheme === 'dark',
    isSystem: theme === 'system',
  };
};
