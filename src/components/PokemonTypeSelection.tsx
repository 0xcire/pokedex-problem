import { usePokemonTypes } from '../hooks/usePokemonTypes';
import { useFilteredStore } from '../store/store';

const PokemonTypeSelection = () => {
  const { types, error } = usePokemonTypes();
  const setSelectedType = useFilteredStore((state) => state.setSelectedType);

  if (error) {
    return <p>error</p>;
  }

  return (
    <select
      className='select-primary select w-6/12 lg:w-full lg:max-w-xs'
      onChange={(e) => setSelectedType(e.target.value)}
    >
      {types?.map((type) => (
        <option key={type}>{type}</option>
      ))}
    </select>
  );
};

export default PokemonTypeSelection;
