import type { FetchedPokemon, Result } from '../types';

export const getPokemon = async (params: string) => {
  const requests: Array<Promise<FetchedPokemon>> = [];

  await fetch(`https://pokeapi.co/${params}`)
    .then((res) => {
      if (!res.ok) {
        throw new Error('error completing initial request');
      }
      return res.json();
    })
    .then((data) => {
      data.results.forEach((result: Result) => {
        requests.push(
          fetch(result.url).then((res) => {
            if (!res.ok) {
              throw new Error('error fetching additional pokemon data');
            }
            return res.json();
          })
        );
      });
    })

    .catch((error) => {
      if (error instanceof Error) {
        throw error.message;
      }
    });

  // ensures same order of pokemon when refetching for 'metadata'
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
