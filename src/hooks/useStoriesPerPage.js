import { useState, useEffect } from 'react';

const TABLET_BREAKPOINT = 768;

export const useStoriesPerPage = () => {
  const getPerPage = () => {
    if (typeof window === 'undefined') {
      return 8; 
    }
    return window.innerWidth < TABLET_BREAKPOINT ? 8 : 9;
  };

  const [storiesPerPage, setStoriesPerPage] = useState(getPerPage());

  useEffect(() => {
    const handleResize = () => {
      setStoriesPerPage(getPerPage());
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return storiesPerPage;
};