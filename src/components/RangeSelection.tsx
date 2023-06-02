import { useEffect, useRef } from 'react';
import { usePaginationStore } from '../store/store';

const RangeSelection = () => {
  const selectRef = useRef<HTMLSelectElement>(null);
  const resultsPerPage = usePaginationStore((state) => state.resultsPerPage);
  const setResultsPerPage = usePaginationStore(
    (state) => state.setResultsPerPage
  );

  useEffect(() => {
    if (selectRef.current) {
      selectRef.current.value = resultsPerPage.toString();
    }
  });

  return (
    <select
      className='select w-8/12 max-w-xs bg-transparent'
      onChange={(e) => setResultsPerPage(Number(e.currentTarget.value))}
      ref={selectRef}
    >
      <option>20</option>
      <option>40</option>
      <option>60</option>
      <option>80</option>
      <option>100</option>
    </select>
  );
};

export default RangeSelection;
