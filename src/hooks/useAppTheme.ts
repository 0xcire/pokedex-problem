import { useEffect } from 'react';

const useAppTheme = (theme: string) => {
  useEffect(() => {
    document.querySelector('html')?.setAttribute('data-theme', theme);
  }, [theme]);
};

export default useAppTheme;
