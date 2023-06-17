# Pokedex Problem

Came across [this](https://www.youtube.com/watch?v=uqII0AOW1NM&) video from [Theo](https://www.youtube.com/@t3dotgg) simulating a technical interview.

moved original README to `./ITERATIONS.md`. View to see original requirements and how the project was built at all 3 steps.

## Features

- Paginated table to view pokemon for a given table length

- Range options from 20 to 100 results per page

- Dynamic pagination component that indicates total pages and updates based off total page count and current page

- persistant table state via url parameters

- persistant cache for quick load times

- Layout shift animations when filtering pokemon by type

- toggle dark / light theme

## Built With

- Tailwind CSS / Daisy UI
- TypeScript
- React
- SWR
- Zustand

## Getting Started

`git clone https://github.com/0xcire/pokedex_problem.git pokedex` \
`cd pokedex` \
`npm install` \
`npm run dev` 

## Learning Points

- Various methods of state management, data fetching methods, and their pros / cons.
  - useEffect / useState
  - custom hooks / context api
  - SWR (hooks) / Zustand

- benefits of using library like SWR or TanStack Query

- Implementing pagination

## Successes

- Solidifying knowledge of Tailwind, TypeScript and React

- Learning a state management library in Zustand

- Implementing SWR to improve UX - caching, load times , etc

## Issues

- differentiating between `return () => controller.abort()` and `return () => ignore = true` as react docs specify

- Zustand being unopinionated, struggled figuring out best practices
  - Going forward, will be implementing flux like pattern and using reducers to limit context switching between Zustand and Redux if/when necessary.

- Deciding between SWR and React Query
  - Ultimately chose SWR for this project due to not needing some features React Query offers.

## Future Plans

- [] make OS theme as default and dark / light as options
- [] Modify Hash Storage function as provided by zustand to create a cleaner URL
  - see if something like `/?limit=100?offset=100?type='fighting'` is possible
- [] add modal / card that shows additional pokemon stats when clicked, gender, height, weight, moves ...
- [] refactor Zustand store to follow redux patterns
- [] add integration tests
