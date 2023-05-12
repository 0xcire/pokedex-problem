import { useEffect, useState } from 'react';

import { PuffLoader } from 'react-spinners';

import PokemonTypeSelection from './components/PokemonTypeSelection';
import FilterablePokedexTable from './components/FilterablePokedexTable';

import './App.css';

type TypeData = {
  name: string;
  url?: string;
};

type PokemonTypes = {
  slot: number;
  type: TypeData;
};

// not exactly holistic typing
type Sprites = Record<string, string>;

export type FetchedPokemon = {
  id: number;
  name: string;
  types: Array<PokemonTypes>;
  sprites: Sprites;
};

export type Pokemon = {
  id: number;
  name: string;
  types: Array<string>;
  sprite: string;
};

type Result = {
  name: string;
  url: string;
};

const styleOverrides = {
  margin: '50% auto 0 auto',
};

function App() {
  const [loading, setLoading] = useState<boolean>(false);
  const [pokemons, setPokemons] = useState<Array<Pokemon>>([]);
  const [types, setTypes] = useState<Array<string>>(['all']);
  const [selectedType, setSelectedType] = useState<string | undefined>('all');

  const selectType = (value: string | undefined) => {
    setSelectedType(value);
  };

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const fetchPokemonData = async () => {
      setLoading(true);
      const requests: Array<Promise<FetchedPokemon>> = [];

      //1280 total pokemon: for pagination later
      await fetch('https://pokeapi.co/api/v2/pokemon/?limit=20&offset=0', {
        signal,
      })
        .then((res) => res.json())
        .then((data) => {
          data.results.forEach((result: Result) => {
            requests.push(fetch(result.url).then((res) => res.json()));
          });
        })
        .catch((error) => {
          if (error.name === 'AbortError') {
            console.error('initial fetchPokemonData request cancelled');
          } else {
            console.error(error);
          }
        });

      // ensures same order of pokemon when refetching for 'metadata' just how responses are structured
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

      setLoading(false);
      setPokemons(data);
    };

    fetchPokemonData();

    return () => controller.abort();
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    if (types.length === 1) {
      const fetchPokemonTypes = async () => {
        try {
          const response = await fetch('https://pokeapi.co/api/v2/type/', {
            signal,
          });
          const data = await response.json();
          const pokemonTypes = data.results.map((type: TypeData) => type.name);

          setTypes((prevTypes) => [...prevTypes, ...pokemonTypes]);
        } catch (error) {
          if (error instanceof DOMException) {
            console.error('fetchPokemonTypes cancelled');
          } else {
            console.error(error);
          }
        }
      };

      fetchPokemonTypes();
    }

    return () => controller.abort();
  }, [types.length]);

  return (
    <>
      <div className='navbar bg-base-100'>
        <div className='flex-1'>
          <a className='btn-ghost btn text-xl normal-case'>Pokedex</a>
        </div>
        <PokemonTypeSelection
          selectedType={selectedType}
          selectType={selectType}
          types={types}
        />
      </div>

      {!loading ? (
        <FilterablePokedexTable
          selectedType={selectedType}
          pokemonList={pokemons}
          loading={loading}
        />
      ) : (
        <PuffLoader
          color={'#fff'}
          cssOverride={styleOverrides}
          loading={loading}
        />
      )}
    </>
  );
}

export default App;
