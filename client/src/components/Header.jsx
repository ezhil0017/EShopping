import logo from '../assets/logo.png';
import Search from './Search';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaRegUserCircle } from 'react-icons/fa';
import useMobile from '../hooks/useMobile';
import { BsCart4 } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { GoTriangleDown, GoTriangleUp } from 'react-icons/go';
import { useState } from 'react';
import UserMenu from './UserMenu';

const Header = () => {
  const [isMobile] = useMobile();
  const location = useLocation(); // Corrected typo here
  const navigate = useNavigate();
  const isSearchPage = location.pathname === '/search';
  const user = useSelector((state) => state?.user);
  const [showUserMenu, setShowUserMenu] = useState(false);

  console.log('from user store', user);
  const redirectToLoginPage = () => {
    navigate('/login');
  };
  const handleCloseUserMenu = () => {
    setShowUserMenu(false);
  };
  const handleMobileUser = () => {
    if (!user._id) {
      navigate('/login');
      return;
    }
    navigate('user');
  };
  return (
    <header className='sticky top-0 z-40 flex flex-col justify-center h-24 gap-1 bg-white lg:h-20 lg:shadow-md'>
      {!(isSearchPage && isMobile) && (
        <div className='container flex items-center justify-between px-2 mx-auto'>
          {/* Logo */}
          <div className='h-full'>
            <Link to='/' className='flex items-center justify-center h-full'>
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

          {/* Search */}
          <div className='hidden lg:block'>
            <Search />
          </div>

          {/* Login and My Cart */}
          <div className=''>
            {/* User icon display only in mobile version */}
            <button
              className='text-neutral-600 lg:hidden'
              onClick={handleMobileUser}
            >
              <FaRegUserCircle size={26} />
            </button>

            {/** Desktop */}
            <div className='items-center hidden gap-10 lg:flex '>
              {user?._id ? (
                <div className='relative'>
                  <div
                    onClick={() => setShowUserMenu((prev) => !prev)}
                    className='flex items-center gap-2 cursor-pointer select-none'
                  >
                    <p>Account</p>
                    {showUserMenu ? (
                      <GoTriangleUp size={25} />
                    ) : (
                      <GoTriangleDown size={25} />
                    )}
                  </div>
                  {showUserMenu && (
                    <div className='absolute right-0 top-12'>
                      <div className='p-4 bg-white rounded min-w-52 lg:shadow-lg'>
                        <UserMenu close={handleCloseUserMenu} />
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  className='text-lg cursor-pointer'
                  onClick={redirectToLoginPage}
                >
                  Login
                </button>
              )}
              <button className='flex items-center gap-2 px-3 py-2 text-white bg-green-700 rounded-sm hover:bg-green-800'>
                {/**add to cart icons */}
                <div className='animate-bounce'>
                  <BsCart4 size={28} />
                </div>
                <div className='font-semibold'>
                  <p>My cart</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Search */}

      <div className='container px-2 mx-auto lg:hidden'>
        <Search />
      </div>
    </header>
  );
};

export default Header;
