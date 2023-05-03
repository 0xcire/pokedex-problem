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
    <select className='select-primary select w-full max-w-xs'>
      <option disabled selected>
        Type?
      </option>
      {types.map((type) => (
        <option key={type} onClick={(e) => selectType(e.currentTarget.value)}>
          {type}
        </option>
      ))}
    </select>
  );
};

export default PokemonTypeSelection;
