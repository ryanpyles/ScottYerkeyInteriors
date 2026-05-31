
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function useLoadingState() {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // Trigger loading state on route change
    setIsLoading(true);
    
    // Set loading duration to exactly 8 seconds (8000ms)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 8000);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return { isLoading, setIsLoading };
}
