export interface Product {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  rating: number;
  image: string;
  images?: string[];
  category: string;
  badge?: string;
  description?: string;
  colors?: { name: string; color: string }[];
  storage?: string[];
  reviews?: {
    id: number;
    name: string;
    avatar: string;
    date: string;
    rating: number;
    comment: string;
  }[];
}

export const products: Product[] = [
  {
    id: 1,
    name: 'iPhone 15 Pro Max',
    price: 67999,
    oldPrice: 79999,
    rating: 4.8,
    image: '/iphone15.jpg',
    images: ['/iphone15.jpg', '/iphone15-front.jpg', '/iphone15-side.jpg', '/iphone15-camera.jpg'],
    category: 'phones',
    badge: 'خصم 15%',
    description: 'iPhone 15 Pro Max يجمع بين الأداء الخرافي والتصميم الفاخر، مع شريحة A17 Pro وكاميرا احترافية لتجربة لا مثيل لها.',
    colors: [
      { name: 'أزرق تيتانيوم', color: '#4A5568' },
      { name: 'طبيعي تيتانيوم', color: '#718096' },
      { name: 'أبيض تيتانيوم', color: '#E2E8F0' },
      { name: 'أسود تيتانيوم', color: '#1A202C' },
    ],
    storage: ['256GB', '512GB', '1TB'],
    reviews: [
      { id: 1, name: 'أحمد محمد', avatar: '', date: '2024-05-20', rating: 5, comment: 'هاتف رائع بكل المقاييس، الكاميرا والأداء خيالي' },
      { id: 2, name: 'سارة علي', avatar: '', date: '2024-05-18', rating: 5, comment: 'أفضل هاتف استخدمته، البطارية ممتازة والشاشة مذهلة' },
      { id: 3, name: 'محمد خالد', avatar: '', date: '2024-05-15', rating: 4, comment: 'منتج ممتاز لكن السعر مرتفع قليلاً' },
    ],
  },
  {
    id: 2,
    name: 'AirPods Pro 2',
    price: 1999,
    oldPrice: 2499,
    rating: 4.9,
    image: '/airpods.jpg',
    category: 'headphones',
    badge: 'جديد',
    description: 'سماعات AirPods Pro 2 بتقنية إلغاء الضجيج المتقدمة وجودة صوت استثنائية.',
    colors: [{ name: 'أبيض', color: '#F7FAFC' }],
  },
  {
    id: 3,
    name: 'Apple Watch Ultra 2',
    price: 24999,
    oldPrice: 29999,
    rating: 4.7,
    image: '/watch-ultra.jpg',
    category: 'accessories',
    badge: 'جديد',
    description: 'ساعة ذكية متطورة لعشاق المغامرة والرياضة مع شاشة ساطعة ومقاومة عالية.',
    colors: [
      { name: 'برتقالي', color: '#ED8936' },
      { name: 'أخضر', color: '#38A169' },
      { name: 'أسود', color: '#1A202C' },
    ],
  },
  {
    id: 4,
    name: 'Dell XPS 15',
    price: 54999,
    oldPrice: 62999,
    rating: 4.7,
    image: '/dell-xps.jpg',
    category: 'laptops',
    badge: 'جديد',
    description: 'لابتوب Dell XPS 15 بمعالج Intel Core i9 وشاشة 4K مذهلة للإنتاجية العالية.',
    colors: [{ name: 'فضي', color: '#A0AEC0' }],
    storage: ['512GB', '1TB', '2TB'],
  },
  {
    id: 5,
    name: 'Samsung Galaxy S24 Ultra',
    price: 54999,
    oldPrice: 64999,
    rating: 4.8,
    image: '/samsung24.jpg',
    category: 'phones',
    badge: 'الأكثر مبيعاً',
    description: 'Samsung S24 Ultra مع قلم S Pen وكاميرا 200MP لتجربة احترافية متكاملة.',
    colors: [
      { name: 'تيتانيوم', color: '#718096' },
      { name: 'أسود', color: '#1A202C' },
      { name: 'أصفر', color: '#D69E2E' },
    ],
    storage: ['256GB', '512GB', '1TB'],
  },
  {
    id: 6,
    name: 'MacBook Air M2',
    price: 44999,
    oldPrice: 49999,
    rating: 4.8,
    image: '/macbook-air.jpg',
    category: 'laptops',
    badge: 'الأكثر مبيعاً',
    description: 'MacBook Air M2 خفيف الوزن وقوي الأداء مع بطارية تدوم طوال اليوم.',
    colors: [
      { name: 'منتصف الليل', color: '#2D3748' },
      { name: 'فضي', color: '#A0AEC0' },
      { name: 'ذهبي فاتح', color: '#D4A574' },
    ],
    storage: ['256GB', '512GB', '1TB'],
  },
  {
    id: 7,
    name: 'Sony WH-1000XM5',
    price: 6999,
    oldPrice: 8999,
    rating: 4.6,
    image: '/sony-headphones.jpg',
    category: 'headphones',
    badge: 'خصم 20%',
    description: 'سماعات Sony WH-1000XM5 بأفضل تقنية إلغاء الضجيج في العالم وجودة صوت عالية الدقة.',
    colors: [
      { name: 'أسود', color: '#1A202C' },
      { name: 'فضي', color: '#A0AEC0' },
    ],
  },
  {
    id: 8,
    name: 'Samsung Gaming Monitor 32"',
    price: 8999,
    oldPrice: 10999,
    rating: 4.5,
    image: '/monitor.jpg',
    category: 'screens',
    badge: 'خصم',
    description: 'شاشة ألعاب منحنية 32 بوصة بدقة QHD ومعدل تحديث 165Hz لتجربة لعب سلسة.',
    colors: [{ name: 'أسود', color: '#1A202C' }],
  },
];

export const categories = [
  { id: 'all', name: 'الكل', icon: 'LayoutGrid' },
  { id: 'phones', name: 'هواتف', icon: 'Smartphone' },
  { id: 'laptops', name: 'لابتوبات', icon: 'Laptop' },
  { id: 'headphones', name: 'سماعات', icon: 'Headphones' },
  { id: 'screens', name: 'شاشات', icon: 'Monitor' },
  { id: 'accessories', name: 'إكسسوارات', icon: 'Watch' },
];

export const banners = [
  {
    id: 1,
    title: 'عروض الصيف الكبرى',
    subtitle: 'خصومات تصل حتي',
    discount: '50%',
    cta: 'تسوق الآن',
    image: '/banner1.jpg',
  },
  {
    id: 2,
    title: 'جديد iPhone 15',
    subtitle: 'احصل على',
    discount: '15%',
    cta: 'اكتشف المزيد',
    image: '/banner1.jpg',
  },
];
