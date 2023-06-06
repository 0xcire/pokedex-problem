import { useRef } from 'react';

import { usePokemonTypes } from '../hooks/usePokemonTypes';
import { useElementValue } from '../hooks/useElementValue';
import { useTableStore } from '../store/store';

const PokemonTypeSelection = () => {
  const typeSelectRef = useRef<HTMLSelectElement>(null);
  const selectedType = useTableStore((state) => state.selectedType);
  const setSelectedType = useTableStore((state) => state.setSelectedType);
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
      value={selectedType}
    >
      {types?.map((type) => (
        <option key={type}>{type}</option>
      ))}
    </select>
  );
};

export default PokemonTypeSelection;
