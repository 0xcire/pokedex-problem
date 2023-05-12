import PokemonRow from './PokemonRow';
import NotFound from './NotFound';

import { Pokemon } from '../App';

type PokedexTableProps = {
  pokemonList: Array<Pokemon>;
  selectedType: string | undefined;
  loading?: boolean;
};

const FilterablePokedexTable = ({
  pokemonList,
  selectedType,
}: PokedexTableProps) => {
  const filteredPokemon = pokemonList.filter((pokemon) => {
    if (selectedType === undefined) return;
    if (selectedType === 'all') return pokemonList;

    return pokemon.types.includes(selectedType);
  });

  return (
    <div className='overflow-x-auto'>
      <table className='table w-full'>
        <thead className='text-center'>
          <tr>
            <th></th>
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
  );
};

export default FilterablePokedexTable;
