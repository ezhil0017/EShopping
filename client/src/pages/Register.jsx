import React, { useState } from 'react';
import { FaEye } from 'react-icons/fa';
import { FaEyeSlash } from 'react-icons/fa';

const Register = () => {
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateValues = Object.values(data).every((val) => val);
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(e.target.name);
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  return (
    <section className='container w-full px-2 mx-auto'>
      <div className='w-full max-w-lg p-4 mx-auto my-4 bg-white rounded'>
        <p>Welcome to Blinkeyit</p>
        <form className='grid gap-4 mt-6'>
          <div className='grid gap-1'>
            <label htmlFor='name'>Name :</label>
            <input
              type='text'
              id='name'
              autoFocus
              name='name'
              className='p-2 border rounded outline-none bg-blue-50 focus-within:border-primary-200'
              value={data.name}
              onChange={handleChange}
            />
          </div>
          <div className='grid gap-1'>
            <label htmlFor='name'>Email :</label>
            <input
              type='text'
              id='email'
              autoFocus
              name='email'
              className='p-2 border rounded outline-none bg-blue-50 focus-within:border-primary-200'
              value={data.email}
              onChange={handleChange}
            />
          </div>
          <div className='grid gap-1'>
            <label htmlFor='name'>Password :</label>
            <div className='flex items-center p-2 border rounded bg-blue-50 focus-within:border-primary-200'>
              <input
                type={showPassword ? 'text' : 'password'}
                id='password'
                autoFocus
                name='password'
                className='w-full outline-none'
                value={data.password}
                onChange={handleChange}
              />
              <div
                className='px-2 cursor-pointer'
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </div>
            </div>
          </div>
          <div className='grid gap-1'>
            <label htmlFor='name'>Confirm Password :</label>
            <div className='flex items-center p-2 border rounded bg-blue-50 focus-within:border-primary-200'>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id='confirmPassword'
                autoFocus
                name='confirmPassword'
                className='w-full outline-none'
                value={data.confirmPassword}
                onChange={handleChange}
              />
              <div
                className='px-2 cursor-pointer'
                onClick={() => setShowConfirmPassword((prev) => !prev)}
              >
                {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
              </div>
            </div>
          </div>
          <button
            className={`${
              validateValues ? 'bg-green-800' : 'bg-gray-500'
            } py-2 my-3 font-semibold tracking-wide text-white rounded `}
          >
            Register
          </button>
        </form>
      </div>
    </section>
  );
};

export default Register;
