import { useEffect, useState } from 'react';

const useMobile = (breakpoint = 768) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < breakpoint);

  const handleResize = () => {
    const checkPoint = window.innerWidth < breakpoint;
    setIsMobile(checkPoint);
  };

  useEffect(() => {
    handleResize(); // Call to handle initial window size
    window.addEventListener('resize', handleResize); // Adding event listener

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener('resize', handleResize); // Corrected the removeEventListener
    };
  }, [breakpoint]); // Optional: You can add breakpoint as a dependency if it may change.

  return [isMobile];
};

export default useMobile;
