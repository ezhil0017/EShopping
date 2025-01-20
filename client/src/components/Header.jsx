import logo from '../assets/logo.png';
import Search from './Search';
import { Link } from 'react-router-dom';
const Header = () => {
  return (
    <header className='sticky top-0 z-40 flex flex-col justify-center h-24 gap-1 bg-white lg:h-20 lg:shadow-md'>
      <div className='container flex items-center justify-between px-2 mx-auto'>
        {/**logo */}
        <div className='h-full'>
          <Link to={'/'} className='flex items-center justify-center h-full'>
            <img
              src={logo}
              width={170}
              height={60}
              alt='logo'
              className='hidden lg:block'
            />
            <img
              src={logo}
              width={120}
              height={60}
              alt='logo'
              className='lg:hidden'
            />
          </Link>
        </div>
        {/**search */}
        <div>
          <Search />
        </div>

        {/**login and mycart */}
        <div>login and my cart</div>
      </div>
    </header>
  );
};

export default Header;
