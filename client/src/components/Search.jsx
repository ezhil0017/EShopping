import { useEffect, useState } from 'react';
import { IoIosSearch } from 'react-icons/io';
import { useLocation, useNavigate } from 'react-router-dom';
import { TypeAnimation } from 'react-type-animation';

const Search = () => {
  const navigate = useNavigate();
  const locaiton = useLocation();

  const [isSearchPage, setIsSearchPage] = useState(false);

  useEffect(() => {
    const isSearch = location.pathname === '/search';
    setIsSearchPage(isSearch);
  }, [locaiton]);

  const redirectToSearchPage = () => {
    navigate('/search');
  };
  console.log('search', isSearchPage);
  return (
    <div className='w-full  min-w-[300px] lg:min-w-[420px] h-12 rounded-lg border overflow-hidden flex items-center text-neutral-500 bg-slate-50'>
      <button className='flex items-center justify-center h-full p-3 text-neutral-600'>
        <IoIosSearch size={22} />
      </button>
      <div onClick={redirectToSearchPage}>
        <TypeAnimation
          sequence={[
            // Same substring at the start will only be typed out once, initially
            'Search "milk"',
            1000, // wait 1s before replacing "Mice" with "Hamsters"
            'Search "sugar"',
            1000,
            'Search "mobile"',
            1000,
            'Search "choclate"',
            1000,
          ]}
          wrapper='span'
          speed={50}
          repeat={Infinity}
        />
      </div>
    </div>
  );
};

export default Search;
