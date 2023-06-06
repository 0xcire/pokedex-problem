import useSWRImmutable from 'swr';
import { getPokemonTypes } from '../api/getPokemonTypes';

export const usePokemonTypes = () => {
  const { data, error } = useSWRImmutable('api/v2/type/', getPokemonTypes);

  return {
    data,
    error,
  };
};
