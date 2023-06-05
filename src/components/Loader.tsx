import { PuffLoader } from 'react-spinners';

import { useThemeStore } from '../store/store';

const styleOverrides = {
  margin: '35% auto 0 auto',
  flex: '1',
};

type LoaderProps = {
  isLoading: boolean;
};

const Loader = ({ isLoading }: LoaderProps) => {
  const theme = useThemeStore((state) => state.theme);

  return (
    <PuffLoader
      color={theme === 'business' ? '#d2d2d2' : '#131522'}
      cssOverride={styleOverrides}
      loading={isLoading}
    />
  );
};

export default Loader;
