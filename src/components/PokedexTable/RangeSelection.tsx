import { useCallback, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useElementValue } from '../../hooks/useElementValue';

import { useTableStore } from '../../store/store';

type RangeOptions = 20 | 40 | 60 | 80 | 100;

const ranges: Array<RangeOptions> = [20, 40, 60, 80, 100];

function RangeSelection() {
  const [searchParams, setSearchParams] = useSearchParams();
  const resultsSelectRef = useRef<HTMLSelectElement>(null);

  const resultsPerPage = searchParams.get('limit') ?? '20';
  const currentPage = searchParams.get('page') ?? '1';
  const resultsTotal = useTableStore((state) => state.resultsTotal);

  useElementValue<HTMLSelectElement>(
    resultsSelectRef,
    resultsPerPage.toString()
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const resultsPerPage = +e.currentTarget.value;
      const totalPages = Math.ceil(resultsTotal / resultsPerPage);

      searchParams.set('limit', resultsPerPage.toString());
      setSearchParams(searchParams);

      if (+currentPage > totalPages) {
        searchParams.set('page', totalPages.toString());
        setSearchParams(searchParams);
      }
    },
    [currentPage, resultsTotal, searchParams, setSearchParams]
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
}

export default RangeSelection;
