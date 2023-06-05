import useSWR from 'swr';
import { getPokemonTypes } from '../api/getPokemonTypes';

export const usePokemonTypes = () => {
  const { error, data } = useSWR('/api/v2/type/', getPokemonTypes);

  return {
    data,
    error,
  };
};
