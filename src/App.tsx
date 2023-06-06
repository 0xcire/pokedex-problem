import Navbar from './components/Navbar';
import FilterablePokedexTable from './components/FilterablePokedexTable';
import Pagination from './components/Pagination';

import './App.css';

function App() {
  return (
    <div className='flex h-screen flex-col lg:mx-auto lg:w-7/12 xl:w-6/12 2xl:w-5/12'>
      <Navbar />
      <FilterablePokedexTable />
      <Pagination />
    </div>
  );
}

export default App;
