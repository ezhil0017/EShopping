import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import toast, { Toaster } from 'react-hot-toast';

function App() {
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
