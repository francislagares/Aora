import { useCallback, useEffect, useState } from 'react';
import { Alert } from 'react-native';

// Define type for the function passed to useAppwrite
type AppwriteFunction<T> = () => Promise<T>;

// Define types for the data returned by useAppwrite
interface AppwriteResponse<T> {
  data: T[];
  isLoading: boolean;
  refetch: () => void;
}

const useAppwrite = <T>(fn: AppwriteFunction<T>): AppwriteResponse<T> => {
  const [data, setData] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fn();

      setData(prevData => {
        // Ensure response is an array and append it to previous data
        return Array.isArray(response) ? [...prevData, ...response] : prevData;
      });
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert('Error', error.message);
      }
    } finally {
      setIsLoading(false);
    }
  }, [fn]);

  useEffect(() => {
    fetchData();
  }, [fn, fetchData]);

  const refetch = () => fetchData();

  return {
    data,
    isLoading,
    refetch,
  };
};

export default useAppwrite;
