
import { useState, useCallback } from 'react';

export const useImageLoading = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
    setHasError(false);
  }, []);

  const handleError = useCallback(() => {
    setIsLoaded(false);
    setHasError(true);
  }, []);

  return { isLoaded, hasError, handleLoad, handleError };
};
