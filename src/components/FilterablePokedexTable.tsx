// import { Suspense } from 'react';
import {
  useFilteredStore,
  usePaginationStore,
  useThemeStore,
} from '../store/store';
import { usePokemon } from '../hooks/usePokemon';

import { PuffLoader } from 'react-spinners';

import PokemonTypeSelection from './PokemonTypeSelection';
import RangeSelection from './RangeSelection';
import PokemonRow from './PokemonRow';
import NotFound from './NotFound';
import Pagination from './Pagination';

const styleOverrides = {
  margin: '35% auto 0 auto',
};

const FilterablePokedexTable = () => {
  const theme = useThemeStore((state) => state.theme);
  const selectedType = useFilteredStore((state) => state.selectedType);
  const currentPage = usePaginationStore((state) => state.currentPage);
  const resultsPerPage = usePaginationStore((state) => state.resultsPerPage);
  const offset = currentPage * resultsPerPage - resultsPerPage;

  const {
    data: pokemon,
    error,
    isLoading,
  } = usePokemon(resultsPerPage, offset);

  const filteredPokemon = pokemon?.filter((pokemon) => {
    return selectedType === 'all'
      ? pokemon
      : pokemon.types.includes(selectedType);
  });

  if (error) {
    return <p>{error}</p>;
  }

  if (isLoading) {
    return (
      <PuffLoader
        color={theme === 'business' ? '#d2d2d2' : '#131522'}
        cssOverride={styleOverrides}
        loading={isLoading}
      />
    );
  }

  return (
    <>
      {/* <Suspense
        fallback={
          <PuffLoader
            color={theme === 'business' ? '#d2d2d2' : '#131522'}
            cssOverride={styleOverrides}
          />
        }
      > */}
      <div className='flex-grow overflow-x-auto overflow-y-scroll'>
        <table className='table w-full'>
          <thead className='sticky top-0 z-20 text-center'>
            <tr>
              <th>
                <RangeSelection />
              </th>
              <th>Name</th>
              <th>
                <PokemonTypeSelection />
              </th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody className='text-center'>
            {filteredPokemon?.length ?? 0 > 0 ? (
              filteredPokemon?.map(({ id, name, types, sprite }) => (
                <PokemonRow
                  key={`${id}-${name}`}
                  id={id}
                  name={name}
                  types={types}
                  sprite={sprite}
                />
              ))
            ) : (
              <NotFound />
            )}
          </tbody>
        </table>
      </div>
      <Pagination />
      {/* </Suspense> */}
    </>
  );
};

export default FilterablePokedexTable;
