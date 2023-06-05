import clsx from 'clsx';

import { usePaginationStore } from '../store/store';

import { usePaginate } from '../hooks/usePagination';

const Pagination = () => {
  const currentPage = usePaginationStore((state) => state.currentPage);
  const setCurrentPage = usePaginationStore((state) => state.setCurrentPage);
  const resultsPerPage = usePaginationStore((state) => state.resultsPerPage);
  const resultsTotal = usePaginationStore((state) => state.resultsTotal);

  const totalPages = Math.ceil(resultsTotal / resultsPerPage);

  const paginationRange = usePaginate(currentPage, totalPages);

  // const start = currentPage * resultsPerPage - resultsPerPage + 1;
  // const end = currentPage * resultsPerPage;

  const onFirstPage = currentPage === 1 ? true : false;
  const onLastPage = currentPage === totalPages ? true : false;

  return (
    <div className='flex items-center justify-between py-2'>
      {/* <div className='flex flex-col'>
        <p className='mr-4 text-sm'>
          # {start} - {end}
        </p>
      </div> */}

      <div className='join mx-auto'>
        <button
          className={clsx(
            'join-item btn-sm btn md-phone:btn-md',
            onFirstPage && 'btn-disabled'
          )}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          {'<'}
        </button>
        {paginationRange.map((pageIndex, index) => {
          if (pageIndex === 'dots') {
            return (
              <button
                key={`dots-${index}`}
                className='join-item btn-disabled btn-sm btn md-phone:btn-md'
              >
                ...
              </button>
            );
          }

          return (
            <button
              key={`paginate-${pageIndex}`}
              className={clsx(
                'join-item btn-sm btn md-phone:btn-md',
                pageIndex === currentPage && 'btn-active'
              )}
              onClick={(e) => setCurrentPage(Number(e.currentTarget.innerText))}
            >
              {pageIndex}
            </button>
          );
        })}
        <button
          className={clsx(
            'btn-sm btn md-phone:btn-md',
            onLastPage && 'btn-disabled'
          )}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          {'>'}
        </button>
      </div>
    </div>
  );
};

export default Pagination;
