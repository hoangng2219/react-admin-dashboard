import React from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void
}

const ThemeContext = React.createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: () => {}
});

export const ThemeProvider = ({ children }: React.PropsWithChildren) => {
  const [theme, setTheme] = React.useState<Theme>('light');

  // TODO: get theme by localstorage



  function toggleTheme() {
    setTheme(prevState => {
      const newTheme = prevState === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      return newTheme
    });
  }

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => React.useContext(ThemeContext);