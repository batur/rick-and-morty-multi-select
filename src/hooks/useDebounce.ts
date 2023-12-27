import { useEffect, useState } from 'react';

const useDebounce = <T>(value: T, delay: number = 250): { debouncedValue: T; isLoading: boolean } => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    const handler = setTimeout(() => {
      setDebouncedValue(value);
      setIsLoading(false);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return { debouncedValue, isLoading };
};

export default useDebounce;
