import { useState, useEffect } from 'react';

import type { FetchedPokemon, Pokemon, Result } from '../types';

export const usePokemon = () => {
  const [pokemon, setPokemon] = useState<Array<Pokemon>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const getPokemon = async () => {
    setLoading(true);
    setError(undefined);
    const requests: Array<Promise<FetchedPokemon>> = [];

    await fetch('https://pokeapi.co/api/v2/pokemon/?limit=20&offset=0')
      .then((res) => res.json())
      .then((data) => {
        data.results.forEach((result: Result) => {
          requests.push(fetch(result.url).then((res) => res.json()));
        });
      })
      .catch((error) => {
        setError(error.message);
      });

    const formattedPokemon = await Promise.all(requests).then((data) => {
      return data.map((pokemon) => {
        return {
          id: pokemon.id,
          name: pokemon.name,
          types: pokemon.types.map((type) => type.type.name),
          sprite: pokemon.sprites.front_default,
        };
      });
    });

    return formattedPokemon;
  };

  useEffect(() => {
    let ignore = false;

    getPokemon().then((formattedPokemon) => {
      if (!ignore) {
        setPokemon(formattedPokemon);
        setLoading(false);
      }
    });

    return () => {
      ignore = true;
    };
  }, []);

  return {
    pokemon,
    loading,
    error,
  };
};
