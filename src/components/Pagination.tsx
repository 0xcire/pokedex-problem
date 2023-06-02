import clsx from 'clsx';

import { usePaginationStore } from '../store/store';

const Pagination = () => {
  const currentPage = usePaginationStore((state) => state.currentPage);
  const setCurrentPage = usePaginationStore((state) => state.setCurrentPage);
  const resultsPerPage = usePaginationStore((state) => state.resultsPerPage);
  const resultsTotal = usePaginationStore((state) => state.resultsTotal);

  const totalPages = Math.ceil(resultsTotal / resultsPerPage);

  const start = currentPage * resultsPerPage - resultsPerPage + 1;
  const end = currentPage * resultsPerPage;

  const onFirstPage = currentPage === 1 ? true : false;
  const onLastPage = currentPage === totalPages ? true : false;

  return (
    <div className='flex items-center justify-center'>
      <p className='mr-4'>
        {start} - {end}
      </p>
      <p>
        {currentPage} of {totalPages}
      </p>
      <div className='btn-groups ml-4'>
        <button
          className={clsx('btn', onFirstPage && 'btn-disabled')}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          {'<'}
        </button>
        <button className='btn'>1</button>
        <button className='btn-disabled btn hidden'>...</button>
        <button className='btn-active btn'>2</button>
        <button className='btn'>3</button>
        <button className='btn'>4</button>
        <button className='btn-disabled btn'>...</button>
        <button className='btn'>{totalPages}</button>
        <button
          className={clsx('btn', onLastPage && 'btn-disabled')}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          {'>'}
        </button>
      </div>
    </div>
  );
};

export default Pagination;
