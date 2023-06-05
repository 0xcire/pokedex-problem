import type { FetchedPokemon, Result } from '../types';

export const getPokemon = async (params: string) => {
  const requests: Array<Promise<FetchedPokemon>> = [];

  await fetch(`https://pokeapi.co/api/v2/${params}`)
    .then((res) => res.json())
    .then((data) => {
      data.results.forEach((result: Result) => {
        requests.push(fetch(result.url).then((res) => res.json()));
      });
    })
    .catch((error) => {
      if (error instanceof Error) {
        throw error.message;
      }
    });

  // ensures same order of pokemon when refetching for 'metadata' just how responses are structured
  const pokemon = await Promise.all(requests)
    .then((data) => {
      return data.map((pokemon) => {
        return {
          id: pokemon.id,
          name: pokemon.name,
          types: pokemon.types.map((type) => type.type.name),
          sprite: pokemon.sprites.front_default,
        };
      });
    })
    .catch((error) => {
      if (error instanceof Error) {
        throw error.message;
      }
    });

  return pokemon;
};
