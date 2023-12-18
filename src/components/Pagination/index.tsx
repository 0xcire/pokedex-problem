import { useSearchParams } from 'react-router-dom';
import { usePaginate } from '../../hooks/usePagination';

import { useTableStore } from '../../store/store';

import PageBtn from './PageBtn';

function Pagination() {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = searchParams.get('page') ?? '1';
  const resultsPerPage = searchParams.get('limit') ?? '20';
  const resultsTotal = useTableStore((state) => state.resultsTotal);

  const totalPages = Math.ceil(resultsTotal / +resultsPerPage);

  const paginationRange = usePaginate(+currentPage, totalPages);

  const start =
    +currentPage * +resultsPerPage - +resultsPerPage + 1 > resultsTotal
      ? resultsTotal
      : +currentPage * +resultsPerPage - +resultsPerPage + 1;

  const end =
    +currentPage * +resultsPerPage > resultsTotal
      ? resultsTotal
      : +currentPage * +resultsPerPage;

  const onFirstPage = +currentPage === 1;
  const onLastPage = +currentPage === totalPages;

  return (
    <div className='mx-auto flex flex-col items-start justify-between px-2 py-2 md:flex-row md:items-center'>
      <div className='flex flex-col'>
        <p className='mr-4 text-sm'>
          # {start} - {end}
        </p>
      </div>

      <div className='join mx-0 mt-2 md:mt-0'>
        <PageBtn
          value={'<'}
          isDisabled={onFirstPage}
          onClick={() => {
            searchParams.set('page', (+currentPage - 1).toString());
            setSearchParams(searchParams);
          }}
        />
        {paginationRange.map((pageIndex, index) => {
          if (pageIndex === 'dots') {
            return (
              <PageBtn
                key={`${pageIndex}${index}-btn`}
                value={pageIndex}
                isDots={true}
              />
            );
          }

          return (
            <PageBtn
              key={`${pageIndex}-btn`}
              value={pageIndex}
              isActive={pageIndex === currentPage}
              onClick={(e) => {
                searchParams.set('page', e.currentTarget.innerText);
                setSearchParams(searchParams);
              }}
            />
          );
        })}
        <PageBtn
          value={'>'}
          isDisabled={onLastPage}
          onClick={() => {
            searchParams.set('page', (+currentPage + 1).toString());
            setSearchParams(searchParams);
          }}
        />
      </div>
    </div>
  );
}

export default Pagination;
