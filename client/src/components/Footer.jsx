import { FaFacebook } from 'react-icons/fa';
import { FaInstagramSquare } from 'react-icons/fa';
import { FaTwitterSquare } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className='border-t'>
      <div className='container flex flex-col justify-between gap-2 p-4 mx-auto text-center lg:flex-row'>
        <p>© All Rights Reserved 2025</p>

        <div className='flex items-center justify-center gap-4 text-2xl'>
          <a href='' className='hover:text-primary-100'>
            <FaFacebook />
          </a>
          <a href='' className='hover:text-primary-100'>
            <FaInstagramSquare />
          </a>
          <a href='' className='hover:text-primary-100'>
            <FaTwitterSquare />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
