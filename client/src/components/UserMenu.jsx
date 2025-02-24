import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Divider from './Divider';
import Axios from '../utils/Axios';
import { SummaryApi } from '../../common/summaryApi';
import toast from 'react-hot-toast';
import AxiosToastError from '../utils/AxiosToastError';
import { logout } from '../store/userSlice';

const UserMenu = ({ close }) => {
  const user = useSelector((state) => state?.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.logout,
      });
      console.log('logout', response);
      if (response.data.success) {
        if (close) {
          close();
        }
        dispatch(logout());
        localStorage.clear();
        toast.success(response.data.message);
        window.history.back();
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };
  return (
    <div>
      <div className='font-semibold'>My Account</div>
      <div className='text-sm'>{user?.name || user?.mobile}</div>
      <Divider />
      <div className='grid gap-1 text-sm'>
        <Link to={''} className='px-2 py-1 hover:bg-orange-200'>
          My Orders
        </Link>
        <Link to={''} className='px-2 py-1 hover:bg-orange-200'>
          Save Address
        </Link>
        <button
          className='px-2 py-1 text-left hover:bg-orange-200'
          onClick={handleLogout}
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default UserMenu;
