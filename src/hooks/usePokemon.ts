import useSWR from 'swr';
import { getPokemon } from '../api/getPokemon';

export const usePokemon = (limit: number, offset: number) => {
  const { data, isLoading, error } = useSWR(
    `api/v2/pokemon/?limit=${limit}&offset=${offset}`,
    getPokemon,
    { revalidateOnFocus: false }
  );

  return {
    data,
    isLoading,
    error,
  };
};
