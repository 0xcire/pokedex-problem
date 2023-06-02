import Navbar from './components/Navbar';
import FilterablePokedexTable from './components/FilterablePokedexTable';

import './App.css';
// max pokemon = 1280

function App() {
  return (
    <div className='flex h-screen flex-col xl:mx-auto xl:w-7/12'>
      <Navbar />
      <FilterablePokedexTable />
    </div>
  );
}

export default App;
