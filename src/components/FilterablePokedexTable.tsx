import { useFilteredStore, usePaginationStore } from '../store/store';
import { usePokemon } from '../hooks/usePokemon';

import RangeSelection from './RangeSelection';
import PokemonTypeSelection from './PokemonTypeSelection';
import PokemonRow from './PokemonRow';
import NotFound from './NotFound';
import Loader from './Loader';

const FilterablePokedexTable = () => {
  const selectedType = useFilteredStore((state) => state.selectedType);
  const currentPage = usePaginationStore((state) => state.currentPage);
  const resultsPerPage = usePaginationStore((state) => state.resultsPerPage);

  //TODO: handle in store
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
    return <Loader isLoading={isLoading} />;
  }

  return (
    <>
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
    </>
  );
};

export default FilterablePokedexTable;
