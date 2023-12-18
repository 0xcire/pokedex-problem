import Navbar from './components/Navbar';
import PokedexTable from './components/PokedexTable';
import Pagination from './components/Pagination';

import './App.css';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className='flex h-screen flex-col lg:mx-auto lg:w-7/12 xl:w-6/12 2xl:w-5/12'>
        <Navbar />
        <PokedexTable />
        <Pagination />
      </div>
    </BrowserRouter>
  );
}

export default App;
