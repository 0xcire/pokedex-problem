import useSWR from 'swr';
import { getPokemon } from '../api/getPokemon';

export const usePokemon = (limit: number, offset: number) => {
  const { data, isLoading, error } = useSWR(
    `pokemon/?limit=${limit}&offset=${offset}`,
    getPokemon
  );

  return {
    data,
    isLoading,
    error,
  };
};
