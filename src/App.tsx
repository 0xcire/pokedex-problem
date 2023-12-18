import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import Navbar from './components/Navbar';
import PokedexTable from './components/PokedexTable';
import Pagination from './components/Pagination';

import './App.css';

function App() {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (!searchParams.has('page')) {
      searchParams.set('page', '1');
      setSearchParams(searchParams, { replace: true });
    }
    if (!searchParams.has('limit')) {
      searchParams.set('limit', '20');
      setSearchParams(searchParams, { replace: true });
    }
    if (!searchParams.has('type')) {
      searchParams.set('type', 'all');
      setSearchParams(searchParams, { replace: true });
    }

    // eslint-disable-next-line
  }, []);
  return (
    <div className='flex h-screen flex-col lg:mx-auto lg:w-7/12 xl:w-6/12 2xl:w-5/12'>
      <Navbar />
      <PokedexTable />
      <Pagination />
    </div>
  );
}

export default App;
