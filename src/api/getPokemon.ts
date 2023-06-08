import type { PokemonTypes, Result } from '../types';

export const getPokemon = async (params: string) => {
  try {
    const initalResponse = await fetch(`https://pokeapi.co/${params}`);
    if (!initalResponse.ok) {
      throw new Error('error completing initial request');
    }
    const initialData = await initalResponse.json();

    const requests = initialData.results.map((result: Result) =>
      fetch(result.url).then((res) => {
        if (!res.ok) {
          throw new Error('error fetching additional pokemon data');
        }
        return res.json();
      })
    );

    // ensures same order of pokemon when refetching for 'metadata'
    const completeData = await Promise.all(requests);

    const pokemon = completeData.map((pokemon) => ({
      id: pokemon.id,
      name: pokemon.name,
      types: pokemon.types.map((type: PokemonTypes) => type.type.name),
      sprite: pokemon.sprites.front_default,
    }));

    return pokemon;
    //
  } catch (error) {
    if (error instanceof Error) {
      throw error.message;
    }
  }
};
