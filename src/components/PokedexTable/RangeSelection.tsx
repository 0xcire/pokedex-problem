import { useCallback, useRef } from 'react';

import { useTableStore } from '../../store/store';
import { useElementValue } from '../../hooks/useElementValue';

type RangeOptions = 20 | 40 | 60 | 80 | 100;

const ranges: Array<RangeOptions> = [20, 40, 60, 80, 100];

const RangeSelection = () => {
  const resultsSelectRef = useRef<HTMLSelectElement>(null);

  const resultsPerPage = useTableStore((state) => state.resultsPerPage);
  const setResultsPerPage = useTableStore((state) => state.setResultsPerPage);
  const currentPage = useTableStore((state) => state.currentPage);
  const setCurrentPage = useTableStore((state) => state.setCurrentPage);
  const setResultsOffset = useTableStore((state) => state.setResultsOffset);
  const resultsTotal = useTableStore((state) => state.resultsTotal);

  useElementValue<HTMLSelectElement>(
    resultsSelectRef,
    resultsPerPage.toString()
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      // need resultsPerPage user changes to, not prev. state value
      const resultsPerPage = Number(e.currentTarget.value);
      setResultsPerPage(resultsPerPage);
      const totalPages = Math.ceil(resultsTotal / resultsPerPage);

      if (currentPage > totalPages) {
        setCurrentPage(totalPages);
      }

      setResultsOffset();
    },
    [
      currentPage,
      resultsTotal,
      setCurrentPage,
      setResultsOffset,
      setResultsPerPage,
    ]
  );

  return (
    <select
      className='select w-full max-w-xs'
      onChange={(e) => handleChange(e)}
      ref={resultsSelectRef}
    >
      {ranges.map((range) => (
        <option key={`${range}-option`}>{range}</option>
      ))}
    </select>
  );
};

export default RangeSelection;
