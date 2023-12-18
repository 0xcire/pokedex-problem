import { useSearchParams } from 'react-router-dom';
import useSWR from 'swr';
import { getPokemon } from '../api/getPokemon';

export const usePokemon = () => {
  const [searchParams] = useSearchParams();

  const currentPage = searchParams.get('page') ?? '1';
  const limit = searchParams.get('limit') ?? '20';
  const offset = (+currentPage - 1) * +limit;

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
