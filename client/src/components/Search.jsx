import { useEffect, useState } from 'react';
import { IoIosSearch } from 'react-icons/io';
import { useLocation, useNavigate } from 'react-router-dom';
import { TypeAnimation } from 'react-type-animation';
import { FaArrowLeft } from 'react-icons/fa';
import useMobile from '../hooks/useMobile';
import { Link } from 'react-router-dom';

const Search = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobile] = useMobile();
  const [isSearchPage, setIsSearchPage] = useState(false);

  useEffect(() => {
    const isSearch = location.pathname === '/search';
    setIsSearchPage(isSearch);
  }, [location]);

  const redirectToSearchPage = () => {
    navigate('/search');
  };

  //console.log('search', isSearchPage);
  //console.log('mobileuser', isMobile);
  return (
    <div className='w-full  min-w-[300px] lg:min-w-[420px] h-11 lg:h-12 rounded-lg border overflow-hidden flex items-center text-neutral-500 bg-slate-50 group focus-within:border-primary-200 '>
      <div>
        <div>
          {isMobile && isSearchPage ? (
            <Link
              to={'/'}
              className='flex items-center justify-center h-full p-2 m-1 bg-white rounded-full shadow-md group-focus-within:text-primary-200'
            >
              <FaArrowLeft size={20} />
            </Link>
          ) : (
            <button className='flex items-center justify-center h-full p-3 group-focus-within:text-primary-200'>
              <IoIosSearch size={22} />
            </button>
          )}
        </div>
      </div>
      <div className='w-full h-full'>
        {!isSearchPage ? (
          //not in search page
          <div
            onClick={redirectToSearchPage}
            className='flex items-center w-full h-full'
          >
            <TypeAnimation
              sequence={[
                // Same substring at the start will only be typed out once, initially
                'Search "milk"',
                1000, // wait 1s before replacing "Mice" with "Hamsters"
                'Search "bread"',
                1000,
                'Search "sugar"',
                1000,
                'Search "panner"',
                1000,
                'Search "chocolate"',
                1000,
                'Search "curd"',
                1000,
                'Search "rice"',
                1000,
                'Search "egg"',
                1000,
                'Search "chips"',
              ]}
              wrapper='span'
              speed={50}
              repeat={Infinity}
            />
          </div>
        ) : (
          //when i was search page
          <div className='w-full h-full'>
            <input
              type='text'
              placeholder='Search for atta dal and more.'
              autoFocus
              className='w-full h-full bg-transparent outline-none'
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
