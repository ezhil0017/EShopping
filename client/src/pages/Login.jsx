import { FaEye } from 'react-icons/fa';
import { FaEyeSlash } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { SummaryApi } from '../../common/summaryApi.js';
import Axios from '../utils/Axios.js';
import AxiosToastError from '../utils/AxiosToastError.js';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import fetchUserDetails from '../utils/fetchUserDetails.js';
import { useDispatch } from 'react-redux';
import { setUserDetails } from '../store/userSlice.js';
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const validateValues = Object.values(data).every((val) => val);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await Axios({
        ...SummaryApi.login,
        data: data,
      });
      if (response.data.error) {
        toast.error(response.data.message);
      }
      if (response.data.success) {
        toast.success(response.data.message);
        localStorage.setItem('accessToken', response.data.data.accessToken);
        localStorage.setItem('refreshToken', response.data.data.refreshToken);

        //! setting user to store after logged in
        const userDtls = await fetchUserDetails();
        dispatch(setUserDetails(userDtls.data));
        navigate('/');
        setData({
          name: '',
          email: '',
        });
      }
      // navigate('/');
    } catch (error) {
      AxiosToastError(error);
    }
  };
  return (
    <section className='container w-full px-2 mx-auto'>
      <div className='w-full max-w-lg p-4 mx-auto my-4 bg-white rounded'>
        <form className='grid gap-4 my-6' onSubmit={handleSubmit}>
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
            <Link
              to={'/forgot-password'}
              className='block ml-auto hover:text-primary-200'
            >
              Forgot password ?
            </Link>
          </div>

          <button
            disabled={!validateValues}
            className={`${
              validateValues ? 'bg-green-800 hover:bg-green-700' : 'bg-gray-500'
            } py-2 my-3 font-semibold tracking-wide text-white rounded p-6`}
          >
            Login
          </button>
        </form>
        <p>
          Don`t have an account ?
          <Link
            to={'/register'}
            className='font-semibold text-green-700 hover:text-green-800'
          >
            Register
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
