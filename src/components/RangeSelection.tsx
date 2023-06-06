import { useRef } from 'react';
import { useTableStore } from '../store/store';
import { useElementValue } from '../hooks/useElementValue';

type RangeOptions = 20 | 40 | 60 | 80 | 100;

const ranges: Array<RangeOptions> = [20, 40, 60, 80, 100];

const RangeSelection = () => {
  const resultsSelectRef = useRef<HTMLSelectElement>(null);
  const resultsPerPage = useTableStore((state) => state.resultsPerPage);
  const setResultsPerPage = useTableStore((state) => state.setResultsPerPage);

  useElementValue<HTMLSelectElement>(
    resultsSelectRef,
    resultsPerPage.toString()
  );

  return (
    <select
      className='select w-full max-w-xs'
      onChange={(e) => setResultsPerPage(Number(e.currentTarget.value))}
      ref={resultsSelectRef}
    >
      {ranges.map((range) => (
        <option key={`${range}-option`}>{range}</option>
      ))}
    </select>
  );
};

export default RangeSelection;
