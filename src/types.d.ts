export type TypeData = {
  name: string;
  url: string;
};

export type PokemonTypes = {
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

export type Result = {
  name: string;
  url: string;
};
