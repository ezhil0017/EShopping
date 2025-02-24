import React from 'react';
import UserMenu from '../components/UserMenu';
import { IoClose } from 'react-icons/io5';

const UserMenuMobile = () => {
  return (
    <section className='w-full h-full py-4 bg-white'>
      <button
        className='block ml-auto text-neutral-800 w-fit'
        onClick={() => window.history.back()}
      >
        <IoClose size={25} />
      </button>
      <div className='container px-3 py-5 mx-auto'>
        <UserMenu />
      </div>
    </section>
  );
};

export default UserMenuMobile;
