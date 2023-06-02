import ThemeToggle from './ThemeToggle';
// import PokemonTypeSelection from './PokemonTypeSelection';

const Navbar = () => {
  return (
    <div className='navbar bg-base-100'>
      <div className='flex-1'>
        <a className='btn-ghost btn text-xl normal-case'>Pokedex</a>
      </div>
      <ThemeToggle />
    </div>
  );
};

export default Navbar;
