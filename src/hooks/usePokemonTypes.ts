import { useState, useEffect } from 'react';

import type { TypeData } from '../types';

export const usePokemonTypes = () => {
  const [types, setTypes] = useState<Array<string> | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);

  const getPokemonTypes = async () => {
    setError(undefined);
    let pokemonTypes;
    try {
      const response = await fetch('https://pokeapi.co/api/v2/type/');

      const data = await response.json();

      pokemonTypes = data.results.map((type: TypeData) => type.name);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    }

    return pokemonTypes;
  };

  useEffect(() => {
    let ignore = false;

    getPokemonTypes().then((pokemonTypes) => {
      if (!ignore) {
        setTypes(['all', ...pokemonTypes]);
      }
    });

    return () => {
      ignore = true;
    };
  }, [types?.length]);

  return {
    types,
    error,
  };
};
