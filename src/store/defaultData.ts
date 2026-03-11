import { ProductDto } from '../constants/types';
import { isArabic } from '../localization/i18next';

// English Default Products Data
const EN_DEFAULT_PRODUCTS = [
  // Product 0 - Nike React Infinity Run Flyknit
  {
    id: 1,
    name: 'Nike React Infinity Run Flyknit',
    brand: 'Nike',
    gender: 'Men',
    category: 'Running',
    price: 160,
    items_left: 3,
    imageURL:
      'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/i1-665455a5-45de-40fb-945f-c1852b82400d/react-infinity-run-flyknit-mens-running-shoe-zX42Nc.jpg',
    average_rating: 4.5,
    average_counts: 120,
    available_sizes: [36, 37, 38, 39, 40, 41, 42],
    description:
      'The Nike React Infinity Run Flyknit is designed to help reduce injury and keep you on the run. More foam and improved upper details provide a secure and cushioned feel.',
  },
  // Product 1 - Nike Air Zoom Pegasus 37
  {
    id: 2,
    name: 'Nike Air Zoom Pegasus 37',
    brand: 'Nike',
    gender: 'Women',
    category: 'Running',
    price: 120,
    items_left: 3,
    imageURL:
      'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/i1-33b0a0a5-c171-46cc-ad20-04a768703e47/air-zoom-pegasus-37-womens-running-shoe-Jl0bDf.jpg',
    average_rating: 4.7,
    average_counts: 150,
    available_sizes: [35, 36, 37, 38, 39, 40],
    description:
      'The Nike Air Zoom Pegasus 37 delivers a responsive ride with a lightweight feel. Zoom Air units provide responsive cushioning for a fast, smooth run.',
  },
  // Product 2 - Nike React Miler
  {
    id: 3,
    name: 'Nike React Miler',
    brand: 'Nike',
    gender: 'Men',
    category: 'Running',
    price: 130,
    items_left: 3,
    imageURL:
      'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/i1-5cc7de3b-2afc-49c2-a1e4-0508997d09e6/react-miler-mens-running-shoe-DgF6nr.jpg',
    average_rating: 4.3,
    average_counts: 95,
    available_sizes: [36, 38, 39, 40, 41, 42, 43, 44],
    description:
      'The Nike React Miler gives you a smooth ride for those high-mileage days. A supportive fit and durable design help you stay focused on your goals.',
  },
  // Product 3 - Nike Joyride Run Flyknit
  {
    id: 4,
    name: 'Nike Joyride Run Flyknit',
    brand: 'Nike',
    gender: 'Women',
    category: 'Running',
    price: 180,
    items_left: 3,
    imageURL:
      'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/99a7d3cb-e40c-4474-91c2-0f2e6d231fd2/joyride-run-flyknit-womens-running-shoe-HcfnJd.jpg',
    average_rating: 4.2,
    average_counts: 80,
    available_sizes: [36, 37, 38, 39, 40, 41, 42],
    description:
      'Nike Joyride technology features tiny foam beads underfoot that conform to your foot for cushioning that stands up to your mileage.',
  },
  // Product 4 - Nike Mercurial Vapor 13 Elite FG
  {
    id: 5,
    name: 'Nike Mercurial Vapor 13 Elite FG',
    brand: 'Nike',
    gender: 'Women',
    category: 'Football',
    price: 250,
    items_left: 3,
    imageURL:
      'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/9dda6202-e2ff-4711-9a09-0fcb7d90c164/mercurial-vapor-13-elite-fg-firm-ground-soccer-cleat-14MsF2.jpg',
    average_rating: 4.8,
    average_counts: 200,
    available_sizes: [36, 37, 38, 39, 40, 41, 42, 43],
    description:
      'The Nike Mercurial Vapor 13 Elite FG features a revolutionary design for explosive speed and quick cuts on firm ground surfaces.',
  },
];

// Arabic Default Products Data
const AR_DEFAULT_PRODUCTS = [
  // Product 0 - Nike React Infinity Run Flyknit (Arabic)
  {
    id: 1,
    name: 'Nike رياكت إنفينيتي ران فليكنيت',
    brand: 'Nike',
    gender: 'رجال',
    category: 'جري',
    price: 160,
    items_left: 3,
    imageURL:
      'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/i1-665455a5-45de-40fb-945f-c1852b82400d/react-infinity-run-flyknit-mens-running-shoe-zX42Nc.jpg',
    average_rating: 4.5,
    average_counts: 120,
    available_sizes: [36, 37, 38, 39, 40, 41, 42],
    description:
      'تم تصميم Nike رياكت إنفينيتي ران فليكنيت للمساعدة في تقليل الإصابات وإبقائك في الجري. توفر الرغوة الإضافية وتفاصيل الجزء العلوي المحسّنة إحساسًا مريحًا وآمنًا.',
  },
  // Product 1 - Nike Air Zoom Pegasus 37 (Arabic)
  {
    id: 2,
    name: 'Nike إير زوم بيغاسوس 37',
    brand: 'Nike',
    gender: 'نساء',
    category: 'جري',
    price: 120,
    items_left: 3,
    imageURL:
      'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/i1-33b0a0a5-c171-46cc-ad20-04a768703e47/air-zoom-pegasus-37-womens-running-shoe-Jl0bDf.jpg',
    average_rating: 4.7,
    average_counts: 150,
    available_sizes: [35, 36, 37, 38, 39, 40],
    description:
      'يوفر Nike إير زوم بيغاسوس 37 تجربة ركوب مستجيبة مع إحساس خفيف الوزن. توفر وحدات زوم إير وسادة مستجيبة لجرية سريعة وسلسة.',
  },
  // Product 2 - Nike React Miler (Arabic)
  {
    id: 3,
    name: 'Nike رياكت مايلر',
    brand: 'Nike',
    gender: 'رجال',
    category: 'جري',
    price: 130,
    items_left: 3,
    imageURL:
      'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/i1-5cc7de3b-2afc-49c2-a1e4-0508997d09e6/react-miler-mens-running-shoe-DgF6nr.jpg',
    average_rating: 4.3,
    average_counts: 95,
    available_sizes: [36, 38, 39, 40, 41, 42, 43, 44],
    description:
      'يمنحك Nike رياكت مايلر تجربة ركوب سلسة لأيام الأميال الطويلة. يساعدك التصميم الداعم والمتين على البقاء مركزًا على أهدافك.',
  },
  // Product 3 - Nike Joyride Run Flyknit (Arabic)
  {
    id: 4,
    name: 'Nike جوي رايد ران فليكنيت',
    brand: 'Nike',
    gender: 'نساء',
    category: 'جري',
    price: 180,
    items_left: 3,
    imageURL:
      'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/99a7d3cb-e40c-4474-91c2-0f2e6d231fd2/joyride-run-flyknit-womens-running-shoe-HcfnJd.jpg',
    average_rating: 4.2,
    average_counts: 80,
    available_sizes: [36, 37, 38, 39, 40, 41, 42],
    description:
      'تتميز تقنية Nike جوي رايد بحبيبات رغوية صغيرة تحت القدم تتكيف مع قدمك لتوفير وسادة تتحمل أميالك.',
  },
  // Product 4 - Nike Mercurial Vapor 13 Elite FG (Arabic)
  {
    id: 5,
    name: 'Nike ميركوريال فابور 13 إيليت أف جي',
    brand: 'Nike',
    gender: 'نساء',
    category: 'كرة قدم',
    price: 250,
    items_left: 3,
    imageURL:
      'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/9dda6202-e2ff-4711-9a09-0fcb7d90c164/mercurial-vapor-13-elite-fg-firm-ground-soccer-cleat-14MsF2.jpg',
    average_rating: 4.8,
    average_counts: 200,
    available_sizes: [36, 37, 38, 39, 40, 41, 42, 43],
    description:
      'يتميز Nike ميركوريال فابور 13 إيليت أف جي بتصميم ثوري للسرعة الانفجارية والقطع السريع على الأسطح الصلبة.',
  },
];

// Select products based on language
const DEFAULT_PRODUCTS = isArabic ? AR_DEFAULT_PRODUCTS : EN_DEFAULT_PRODUCTS;

// Get first 2 products as default for cart and favourite
export const getDefaultCartProducts = (): ProductDto[] => {
  return [
    {
      ...DEFAULT_PRODUCTS[0],
      selected_size: String(DEFAULT_PRODUCTS[0].available_sizes[0]),
      quantity: 1,
    },
    {
      ...DEFAULT_PRODUCTS[1],
      selected_size: String(DEFAULT_PRODUCTS[1].available_sizes[0]),
      quantity: 1,
    },
  ];
};

export const getDefaultFavouriteProducts = (): ProductDto[] => {
  return [
    {
      ...DEFAULT_PRODUCTS[2],
      selected_size: String(DEFAULT_PRODUCTS[2].available_sizes[0]),
    },
    {
      ...DEFAULT_PRODUCTS[3],
      selected_size: String(DEFAULT_PRODUCTS[3].available_sizes[0]),
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
          ...DEFAULT_PRODUCTS[4],
          selected_size: String(DEFAULT_PRODUCTS[4].available_sizes[0]),
          quantity: 1,
        },
      ],
      subtotal: DEFAULT_PRODUCTS[4].price,
      shippingCost: 10,
      total: DEFAULT_PRODUCTS[4].price + 10,
      date: new Date().toISOString(),
      contactInfo: { email: 'aa@gmail.com', phone: '01273084476' },
      deliveryAddress: {
        firstName: isArabic ? 'حسام' : 'hossam',
        lastName: isArabic ? 'متولي' : 'metwally',
        address: isArabic ? '23 عمر بن الخطاب' : '23 Omar Ben Kattab',
        city: isArabic ? 'القاهرة' : 'Cairo',
        country: isArabic ? 'مصر' : 'Egypt',
      },
      paymentMethod: 'cod',
      status: 'completed',
    },
  ];
};
