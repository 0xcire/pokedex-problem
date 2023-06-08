import Navbar from './components/Navbar';
import PokedexTable from './components/PokedexTable';
import Pagination from './components/Pagination';

import './App.css';

function App() {
  return (
    <div className='flex h-screen flex-col lg:mx-auto lg:w-7/12 xl:w-6/12 2xl:w-5/12'>
      <Navbar />
      <PokedexTable />
      <Pagination />
    </div>
  );
}

export default App;
