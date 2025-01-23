import { useTheme } from 'vuetify';

import { TTheme } from '@/types/settings';

export function useThemeSwitch() {
  const theme = useTheme();

  const setTheme = (newTheme: TTheme) => {
    theme.global.name.value = newTheme;
  };

  return {
    currentTheme: theme.global.name,
    setTheme,
  };
}
