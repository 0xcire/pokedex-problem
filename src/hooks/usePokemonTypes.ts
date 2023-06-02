import useSWR from 'swr';
import { getPokemonTypes } from '../api/getPokemonTypes';

export const usePokemonTypes = () => {
  const { error, data } = useSWR('pokemon-types', getPokemonTypes);

  return {
    data,
    error,
  };
};
