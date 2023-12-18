import { useRef } from 'react';
import { useSearchParams } from 'react-router-dom';

import { usePokemonTypes } from '../../hooks/usePokemonTypes';
import { useElementValue } from '../../hooks/useElementValue';

function PokemonTypeSelection() {
  const [searchParams, setSearchParams] = useSearchParams();

  const typeSelectRef = useRef<HTMLSelectElement>(null);
  const selectedType = searchParams.get('type') ?? 'all';
  const { data: types, error } = usePokemonTypes();

  useElementValue<HTMLSelectElement>(typeSelectRef, selectedType);

  if (error) {
    return <p>error</p>;
  }

  return (
    <select
      className='select w-full lg:w-full lg:max-w-xs'
      onChange={(e) => {
        searchParams.set('type', e.target.value);
        setSearchParams(searchParams);
      }}
      ref={typeSelectRef}
      value={selectedType}
    >
      {types?.map((type) => (
        <option key={type}>{type}</option>
      ))}
    </select>
  );
}

export default PokemonTypeSelection;
