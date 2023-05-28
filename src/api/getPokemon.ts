import type { FetchedPokemon, Result } from '../types';

export const getPokemon = async (signal: AbortSignal) => {
  const requests: Array<Promise<FetchedPokemon>> = [];

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
      if (error instanceof DOMException && error.name === 'AbortError') {
        console.error('getPokemonTypes aborted');
        return;
      }
      console.error(error);
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
      console.error(error);
    });

  return pokemon;
};

// const extractPokemon = () => {
//   return;
// };
