import { usePokemonTypes } from '../hooks/usePokemonTypes';
import { useFilteredStore } from '../store/store';

const PokemonTypeSelection = () => {
  const setSelectedType = useFilteredStore((state) => state.setSelectedType);
  const { data: types, error } = usePokemonTypes();

  if (error) {
    return <p>error</p>;
  }

  return (
    <select
      className='select w-6/12 bg-transparent lg:w-full lg:max-w-xs'
      onChange={(e) => setSelectedType(e.target.value)}
    >
      {types?.map((type) => (
        <option key={type}>{type}</option>
      ))}
    </select>
  );
};

export default PokemonTypeSelection;
