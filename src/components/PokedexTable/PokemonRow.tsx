import { motion } from 'framer-motion';

import type { Pokemon } from '../../types';

type PokemonRowProps = Pokemon;

const PokemonRow = ({ id, name, types, sprite }: PokemonRowProps) => {
  return (
    <motion.tr
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
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
    </motion.tr>
  );
};

export default PokemonRow;
