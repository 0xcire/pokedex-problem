import { useSearchParams } from 'react-router-dom';

import { usePokemon } from '../../hooks/usePokemon';

import RangeSelection from './RangeSelection';
import PokemonTypeSelection from './TypeSelection';
import PokemonRow from './PokemonRow';
import NotFound from './NotFound';
import Loader from '../Loader';

function PokedexTable() {
  const [searchParams] = useSearchParams();

  const selectedType = searchParams.get('type') ?? 'all';

  const { data: pokemon, error, isLoading } = usePokemon();

  const filteredPokemon = pokemon?.filter((pokemon) => {
    return selectedType === 'all'
      ? pokemon
      : pokemon.types.includes(selectedType);
  });

  if (error) {
    return <p className='flex-grow'>{error}</p>;
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <div className='flex-1 overflow-x-auto overflow-y-scroll'>
        <table className='table-pin-rows table-xs table sm:table-sm md:table-md lg:table-lg'>
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
}

export default PokedexTable;
