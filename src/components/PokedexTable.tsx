import PokemonRow from './PokemonRow';

import { Pokemon } from '../App';

type PokedexTableProps = {
  pokemonList: Array<Pokemon>;
};

const PokedexTable = ({ pokemonList }: PokedexTableProps) => {
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
          {pokemonList.map((pokemon) => (
            <PokemonRow
              key={`${pokemon.id}-${pokemon.name}`}
              id={pokemon.id}
              name={pokemon.name}
              types={pokemon.types}
              sprite={pokemon.sprite}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PokedexTable;
