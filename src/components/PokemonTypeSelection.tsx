import { useRef } from 'react';

import { usePokemonTypes } from '../hooks/usePokemonTypes';
import { useElementValue } from '../hooks/useElementValue';
import { useFilteredStore } from '../store/store';

// TODO: persist type data in local storage key: 'pokemon-types'
//if no data, fetch
//make sure this works

const PokemonTypeSelection = () => {
  const typeSelectRef = useRef<HTMLSelectElement>(null);
  const selectedType = useFilteredStore((state) => state.selectedType);
  const setSelectedType = useFilteredStore((state) => state.setSelectedType);
  const { data: types, error } = usePokemonTypes();

  useElementValue<HTMLSelectElement>(typeSelectRef, selectedType);

  if (error) {
    return <p>error</p>;
  }

  return (
    <select
      className='select w-full lg:w-full lg:max-w-xs'
      onChange={(e) => setSelectedType(e.target.value)}
      ref={typeSelectRef}
    >
      {types?.map((type) => (
        <option key={type}>{type}</option>
      ))}
    </select>
  );
};

export default PokemonTypeSelection;
