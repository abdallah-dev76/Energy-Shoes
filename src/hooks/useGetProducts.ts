import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { isArabic } from '../localization/i18next';
import ShoesDataEn from '../data/ShoesDataEn.json';
import ShoesDataAr from '../data/ShoesDataAr.json';

export const useGetProducts = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['products', isArabic],
    queryFn: async () => {
      const delay = new Promise(resolve => setTimeout(resolve, 500));

      try {
        const request = axios.get(
          `http://localhost:3001/${isArabic ? 'en' : 'ar'}`,
        );

        const [response] = await Promise.all([request, delay]);

        return response.data;
      } catch (err) {
        console.warn('API call failed, using local fallback data', err);

        await delay; // still wait 2 seconds before returning fallback

        const fallbackData = isArabic ? ShoesDataAr : ShoesDataEn;
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
