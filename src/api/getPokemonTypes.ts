import type { TypeData } from '../types';

export const getPokemonTypes = async () => {
  let pokemonTypes;

  try {
    const response = await fetch('https://pokeapi.co/api/v2/type/');

    const data = await response.json();

    pokemonTypes = data.results.map((type: TypeData) => type.name);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
    }
  }

  return pokemonTypes;
};
