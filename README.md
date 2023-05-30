# Pokedex Problem

Came across [this](https://www.youtube.com/watch?v=uqII0AOW1NM&) video from [Theo](https://www.youtube.com/@t3dotgg) simulating a technical interview.

From the provided interview [guide](https://t3-tools.notion.site/Technical-Interview-Dan-Abramov-9aa6d8e9292e4bd1ae67b44aeeaabf88), there is [this](https://t3-tools.notion.site/Pokedex-Problem-90f9dcfff10d4418a6fad44581b1ecff) problem targeted for junior to midlevel frontend developers.

Having gained familiarity with TypeScript / React, and building Rest APIs in Express, using this to demonstrate ability to fetch data client side, render, and manage state in a react context.

Using Daisy UI for quick prototyping, although, not best for accessibility (from what I remember)

## Requirements

```const pokemon = {
  id: 'id',
  name: 'Bulbasaur',
  types: ['grass', 'fairy'],
  spite: 'imgURL',
};
```

1. Create a `<PokemonRow />` component that takes in ^ object and renders row
2. Create a `<PokedexTable />` component that takes in array and renders all pokemon in array
3. Create a `<PokemonTypeSelection />` component with following props:

```
   type PokemonTypeSelectionProps = {
   selectedType: string | undefined;
   selectType: (type: string | undefined) => void;
   }
```

4. Create a `<FilterablePokedexTable />` that renders both `<PokemonTypeSelection />` and `<PokedexTable />` that displays Pokemon with selected type

## plan

each 'iteration' can be found in commit history via 'X ITERATION'

- [x] 1st iteration - useEffect, useState, prop drilling ( probably solution I'd use in constraints of an actual interview)

- [x] 2nd iteration - custom hooks / Zustand

- Was going to use Context here but Zustand makes more sense, especially going into final iteration
- Liked idea of Suspense but since future of api is fragile will just implement next with a data fetching library that supports it

[] 3rd iteration - SWR

Just learned about SWR as another option alongside RTK Query, and React Query and want to learn.

- [x] Theme Switch
- Pagination
- Animations
- Error Handling / Loader Skeletons

## note

Using this as a client side only project

App ideas make more sense in a full-stack context so just using this for practice for pure frontend reading from api, displaying data, state management and etc!
