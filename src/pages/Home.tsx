import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { ChevronLeft, ChevronRight, ShoppingCart, Zap, Smartphone, Laptop, Headphones, Monitor, Watch, LayoutGrid, Truck, Shield } from 'lucide-react';
import { categories, banners } from '../data/products';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { Button } from '@/components/ui/button';

const iconMap: Record<string, React.ReactNode> = {
  LayoutGrid: <LayoutGrid className="w-6 h-6" />,
  Smartphone: <Smartphone className="w-6 h-6" />,
  Laptop: <Laptop className="w-6 h-6" />,
  Headphones: <Headphones className="w-6 h-6" />,
  Monitor: <Monitor className="w-6 h-6" />,
  Watch: <Watch className="w-6 h-6" />,
};

export default function Home() {
  const [currentBanner, setCurrentBanner] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner(prev => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const featuredProducts = [
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
      id: 1,
      name: 'iPhone 15 Pro Max',
      price: 67999,
      oldPrice: 79999,
      rating: 4.8,
      image: '/iphone15.jpg',
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
  ];

  return (
    <div className="min-h-screen bg-[#080c14]">
      <Header />

      <main className="container mx-auto px-4 py-6">
        {/* Banner */}
        <section className="relative rounded-3xl overflow-hidden mb-8 h-[300px] sm:h-[400px]">
          <img
            src={banners[currentBanner].image}
            alt={banners[currentBanner].title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#080c14]/90 via-[#080c14]/60 to-transparent" />
          <div className="absolute inset-0 flex items-center p-8 sm:p-12">
            <div className="max-w-lg">
              <h2 className="text-3xl sm:text-5xl font-bold text-white mb-2">{banners[currentBanner].title}</h2>
              <p className="text-white/70 text-lg mb-2">{banners[currentBanner].subtitle}</p>
              <p className="text-5xl sm:text-6xl font-bold text-blue-400 mb-6">{banners[currentBanner].discount}</p>
              <Button
                onClick={() => window.location.href = '/category/all'}
                className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-xl text-lg font-medium"
              >
                <ShoppingCart className="w-5 h-5 ml-2" />
                {banners[currentBanner].cta}
              </Button>
            </div>
          </div>
          {/* Navigation Arrows */}
          <button
            onClick={() => setCurrentBanner(prev => (prev - 1 + banners.length) % banners.length)}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/40 backdrop-blur-sm text-white hover:bg-black/60 transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => setCurrentBanner(prev => (prev + 1) % banners.length)}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/40 backdrop-blur-sm text-white hover:bg-black/60 transition-all"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          {/* Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {banners.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentBanner(i)}
                className={`w-2 h-2 rounded-full transition-all ${i === currentBanner ? 'bg-blue-400 w-6' : 'bg-white/40'}`}
              />
            ))}
          </div>
        </section>

        {/* Categories */}
        <section className="mb-10">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-1 h-6 bg-blue-500 rounded-full" />
            <h2 className="text-xl font-bold text-white">الأقسام</h2>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            {categories.filter(c => c.id !== 'all').map(cat => (
              <Link
                key={cat.id}
                to={`/category/${cat.id}`}
                className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-500/30 hover:bg-white/10 transition-all group"
              >
                <div className="text-blue-400 group-hover:scale-110 transition-transform">
                  {iconMap[cat.icon]}
                </div>
                <span className="text-white/70 text-sm group-hover:text-white transition-colors">{cat.name}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Products */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="w-1 h-6 bg-blue-500 rounded-full" />
              <h2 className="text-xl font-bold text-white">أحدث المنتجات</h2>
            </div>
            <Link
              to="/category/all"
              className="text-blue-400 text-sm hover:text-blue-300 transition-colors flex items-center gap-1"
            >
              عرض المزيد
              <ChevronLeft className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {[
            { icon: <Truck className="w-6 h-6" />, title: 'شحن سريع', desc: 'توصيل سريع لجميع الطلبات' },
            { icon: <Shield className="w-6 h-6" />, title: 'ضمان استرجاع', desc: '14 يوم استرجاع مجاني' },
            { icon: <Zap className="w-6 h-6" />, title: 'دفع آمن', desc: '100% حماية لبياناتك' },
            { icon: <Headphones className="w-6 h-6" />, title: 'دعم فني', desc: '24/7 دعم جميع استفساراتك' },
          ].map((feature, i) => (
            <div key={i} className="flex items-center gap-4 p-5 rounded-2xl bg-white/5 border border-white/10">
              <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400">{feature.icon}</div>
              <div>
                <p className="text-white font-medium text-sm">{feature.title}</p>
                <p className="text-white/50 text-xs">{feature.desc}</p>
              </div>
            </div>
          ))}
        </section>
      </main>

      <Footer />
    </div>
  );
}
