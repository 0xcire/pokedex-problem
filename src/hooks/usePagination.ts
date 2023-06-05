// from https://www.freecodecamp.org/news/build-a-custom-pagination-component-in-react/
// trying to implement other logic myself though
// due to filter options certain states do not have to be accounted for
// should be, if more generic/passed around to multiple data components with unknown lengths, more variable filter options

import { useMemo } from 'react';

const range = (start: number, end: number) => {
  const length = end - start + 1;

  return Array.from({ length }, (_, idx) => idx + start);
};

export function usePaginate(currentPage: number, totalPages: number) {
  const paginationRange = useMemo(() => {
    if (currentPage >= 4 && currentPage <= totalPages - 3) {
      return [
        1,
        'dots',
        ...range(currentPage - 1, currentPage + 1),
        'dots',
        totalPages,
      ];
    }

    if (currentPage >= totalPages - 3) {
      return [1, 'dots', ...range(totalPages - 3, totalPages)];
    }

    return [...range(1, 4), 'dots', totalPages];
  }, [currentPage, totalPages]);

  return paginationRange;
}
