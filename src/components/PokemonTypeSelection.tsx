type PokemonTypeSelectionProps = {
  selectedType: string | undefined;
  selectType: (type: string | undefined) => void;
  types: Array<string>;
};

const PokemonTypeSelection = ({
  //   selectedType,
  selectType,
  types,
}: PokemonTypeSelectionProps) => {
  return (
    <select
      className='select-primary select w-6/12 lg:w-full lg:max-w-xs'
      onChange={(e) => selectType(e.target.value)}
    >
      <option disabled selected>
        Type?
      </option>
      {types.map((type) => (
        <option key={type}>{type}</option>
      ))}
    </select>
  );
};

export default PokemonTypeSelection;
