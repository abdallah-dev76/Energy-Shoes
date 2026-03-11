import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { isArabic } from '../localization/i18next';
import ShoesData from '../data/ShoesData.json';
import ShoesDataAr from '../data/ShoesDataAr.json';

export const useGetProducts = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['products', isArabic],
    queryFn: async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/${isArabic ? 'en' : 'ar'}`,
        );
        return response.data;
      } catch (err) {
        // Fallback to local JSON data if API fails
        console.warn('API call failed, using local fallback data', err);
        const fallbackData = isArabic ? ShoesDataAr : ShoesData;
        return Object.values(fallbackData);
      }
    },
  });

  return {
    products: data,
    isLoading,
    isError,
    error,
  };
};
