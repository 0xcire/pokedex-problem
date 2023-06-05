import type { TypeData } from '../types';

export const getPokemonTypes = async (params: string) => {
  let pokemonTypes;

  try {
    const res = await fetch(`https://pokeapi.co${params}`);

    // if (!res.ok) {
    //   const error = new Error('an error occurred while fetching pokemon types');
    //   error.info = await res.json();
    //   error.status = res.status;
    //   throw error;
    // }

    const data = await res.json();

    pokemonTypes = ['all', ...data.results.map((type: TypeData) => type.name)];
  } catch (error) {
    if (error instanceof Error) {
      throw error.message;
    }
  }

  return pokemonTypes;
};
