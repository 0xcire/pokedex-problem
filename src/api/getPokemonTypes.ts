import type { TypeData } from '../types';

export const getPokemonTypes = async (params: string) => {
  try {
    const res = await fetch(`https://pokeapi.co/${params}`);

    if (!res.ok) {
      const info = await res.json();
      throw new Error(`Error: ${info.status}`);
    }

    const data = await res.json();
    const pokemonTypes = [
      'all',
      ...data.results.map((type: TypeData) => type.name),
    ];

    return pokemonTypes;
    //
  } catch (error) {
    if (error instanceof Error) {
      throw error.message;
    }
  }
};
