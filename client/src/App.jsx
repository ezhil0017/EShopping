import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import toast, { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import fetchUserDetails from './utils/fetchUserDetails';
import { useDispatch } from 'react-redux';
import { setUserDetails } from '../store/userSlice';

function App() {
  const dispatch = useDispatch();
  //! to know the user is logged in or not by using the refresh Token
  const fetchUser = async () => {
    const userData = await fetchUserDetails();
    dispatch(setUserDetails(userData?.data));
  };

  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <>
      <Header />
      <div className='min-h-[68vh]'>
        <Outlet />
      </div>
      <Footer />
      <Toaster />
    </>
  );
}

export default App;
