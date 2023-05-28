import type { Pokemon } from '../types';

type PokemonRowProps = Pokemon;

const PokemonRow = ({ id, name, types, sprite }: PokemonRowProps) => {
  return (
    <tr>
      <th>{id}</th>
      <td>{name}</td>
      <td>
        {types.map((type) => (
          <p key={type}>{type}</p>
        ))}
      </td>
      <td>
        <img
          className='mx-auto'
          src={sprite}
          alt={`${name}-img`}
        />
      </td>
    </tr>
  );
};

export default PokemonRow;
