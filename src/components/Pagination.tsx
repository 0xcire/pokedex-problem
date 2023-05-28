// type PaginationProps = {
//   currentPage: number;
//   itemsPerPage: number;
// };

const Pagination = () => {
  return (
    <div className='btn-group mx-auto'>
      <button className='btn'>1</button>
      <button className='btn-disabled btn hidden'>...</button>
      <button className='btn-active btn'>2</button>
      <button className='btn'>3</button>
      <button className='btn'>4</button>
      <button className='btn-disabled btn'>...</button>
      <button className='btn'>{Math.ceil(1280 / 20)}</button>
    </div>
  );
};

export default Pagination;
