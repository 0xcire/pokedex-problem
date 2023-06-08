// refer to https://www.freecodecamp.org/news/build-a-custom-pagination-component-in-react/
// filter params dont allow states like [1, totalPages] to exist

const range = (start: number, end: number) => {
  const length = end - start + 1;

  return Array.from({ length }, (_, idx) => idx + start);
};

export function usePaginate(currentPage: number, totalPages: number) {
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
}
