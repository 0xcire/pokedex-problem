import { useFilteredStore } from '../store/store';
import { usePokemon } from '../hooks/usePokemon';

import PokemonRow from './PokemonRow';
import NotFound from './NotFound';
import Pagination from './Pagination';

import { PuffLoader } from 'react-spinners';

const styleOverrides = {
  margin: '35% auto 0 auto',
};

const FilterablePokedexTable = () => {
  const { pokemon, error, loading } = usePokemon();
  const { selectedType } = useFilteredStore();

  const filteredPokemon = pokemon.filter((pokemon) => {
    return selectedType === 'all'
      ? pokemon
      : pokemon.types.includes(selectedType);
  });

  if (error) {
    return <p>error</p>;
  }

  if (loading) {
    return (
      <PuffLoader
        color={'#fff'}
        cssOverride={styleOverrides}
        loading={loading}
      />
    );
  }

  return (
    <>
      <div className='flex-grow overflow-x-auto overflow-y-scroll'>
        <table className='table w-full'>
          <thead className='sticky top-0 z-20 text-center'>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Type</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody className='text-center'>
            {filteredPokemon.length > 0 ? (
              filteredPokemon.map((pokemon) => (
                <PokemonRow
                  key={`${pokemon.id}-${pokemon.name}`}
                  id={pokemon.id}
                  name={pokemon.name}
                  types={pokemon.types}
                  sprite={pokemon.sprite}
                />
              ))
            ) : (
              <NotFound />
            )}
          </tbody>
        </table>
      </div>
      {/* not functional atm */}
      <Pagination />
    </>
  );
};

export default FilterablePokedexTable;
