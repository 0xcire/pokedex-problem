import { useEffect, useState } from 'react';
import PokemonTypeSelection from './components/PokemonTypeSelection';
import PokedexTable from './components/PokedexTable';
import './App.css';

// Necessary data shape
// const pokemon = {
//   id: 'id',
//   name: 'Bulbasaur',
//   types: ['grass', 'fairy'],
//   spite: 'imgURL',
// };

// 1. Create a <PokemonRow /> component that takes in ^ object and renders row
// 2. Create a <PokedexTable /> component that takes in array and renders all pokemon in array
// 3. Create a <PokemonTypeSelection /> component with following props:
// type PokemonTypeSelectionProps = {
//   selectedType: string | undefined;
//   selectType: (type: string | undefined) => void;
// }
// Create a <FilterablePokedexTable /> that renders both <PokemonTypeSelection /> and <PokedexTable /> that displays Pokemon with selected type

type Type = {
  name: string;
  url?: string;
};

type Types = {
  slot: number;
  type: Type;
};

// not holistic typing
type Sprites = Record<string, string>;

export type FetchedPokemon = {
  id: number;
  name: string;
  types: Array<Types>;
  sprites: Sprites;
};

export interface Pokemon {
  id: number;
  name: string;
  types: Array<string>;
  sprite: string;
}

type Result = {
  name: string;
  url: string;
};

function App() {
  const [pokemons, setPokemons] = useState<Array<Pokemon>>([]);
  const [types, setTypes] = useState<Array<string>>([]);
  const [selectedType, setSelectedType] = useState(undefined);

  useEffect(() => {
    const pokeData = async () => {
      const requests: Array<Promise<FetchedPokemon>> = [];
      await fetch('https://pokeapi.co/api/v2/pokemon/')
        .then((res) => res.json())
        .then((data) => {
          data.results.forEach((result: Result) => {
            requests.push(fetch(result.url).then((res) => res.json()));
          });
        })
        .catch((error) => console.log(error));

      const data = await Promise.all(requests).then((data) => {
        return data.map((pokemon) => {
          return {
            id: pokemon.id,
            name: pokemon.name,
            types: pokemon.types.map((type) => type.type.name),
            sprite: pokemon.sprites.front_default,
          };
        });
      });
      setPokemons(data);
    };

    const getTypes = async () => {
      const response = await fetch('https://pokeapi.co/api/v2/type/');
      const data = await response.json().then((data) => {
        return data.results.map((type: Type) => type.name);
      });

      setTypes(data);
    };
    pokeData();
    getTypes();
  }, []);

  // const selectType =

  return (
    <>
      <div className='navbar bg-base-100'>
        <div className='flex-1'>
          <a className='btn-ghost btn text-xl normal-case'>Pokedex</a>
        </div>
        <PokemonTypeSelection selectedType={selectedType} types={types} />
        {/* <select className='select-primary select w-full max-w-xs'>
          <option disabled selected>
            Type?
          </option>
          {types.map((type) => (
            <option key={type}>{type}</option>
          ))}
        </select> */}
      </div>
      {/* <p>{selectedType}</p> */}
      <PokedexTable pokemonList={pokemons} />
    </>
  );
}

export default App;
