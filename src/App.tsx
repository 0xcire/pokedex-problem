import Navbar from './components/Navbar';
import FilterablePokedexTable from './components/FilterablePokedexTable';
import Pagination from './components/Pagination';

import './App.css';

function App() {
  return (
    <div className='flex h-screen flex-col xl:mx-auto xl:w-7/12'>
      <Navbar />
      <FilterablePokedexTable />
      <Pagination />
    </div>
  );
}

export default App;
