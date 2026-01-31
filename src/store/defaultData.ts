// Utility to get default products for cart, favourite, and history from ShoesData.json
import ShoesData from '../data/ShoesData.json';
import { ProductDto } from '../constants/types';

// Get first 2 products as default for cart and favourite
export const getDefaultCartProducts = (): ProductDto[] => {
  return [
    {
      ...ShoesData['0'],
      selected_size: String(ShoesData['0'].available_sizes[0]),
      quantity: 1,
    },
    {
      ...ShoesData['1'],
      selected_size: String(ShoesData['1'].available_sizes[0]),
      quantity: 1,
    },
  ];
};

export const getDefaultFavouriteProducts = (): ProductDto[] => {
  return [
    {
      ...ShoesData['2'],
      selected_size: String(ShoesData['2'].available_sizes[0]),
    },
    {
      ...ShoesData['3'],
      selected_size: String(ShoesData['3'].available_sizes[0]),
    },
  ];
};

// For history, you may want to create a fake order using existing products
export const getDefaultHistoryOrders = () => {
  return [
    {
      id: '242553',
      items: [
        {
          ...ShoesData['4'],
          selected_size: String(ShoesData['4'].available_sizes[0]),
          quantity: 1,
        },
      ],
      subtotal: ShoesData['4'].price,
      shippingCost: 10,
      total: ShoesData['4'].price + 10,
      date: new Date().toISOString(),
      contactInfo: { email: 'aa@gmail.com', phone: '01273084476' },
      deliveryAddress: {
        firstName: 'hossam',
        lastName: 'metwally',
        address: '23 Omar Ben Kattab',
        city: 'Cairo',
        country: 'Egypt',
      },
      paymentMethod: 'cod',
      status: 'completed',
    },
  ];
};
