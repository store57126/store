import { Heart } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { products } from '../data/products';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';

export default function Wishlist() {
  const { wishlist } = useStore();

  const wishlistProducts = wishlist.map(id => products.find(p => p.id === id)).filter(Boolean);

  return (
    <div className="min-h-screen bg-[#080c14]">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-white mb-8">المفضلة</h1>
        {wishlistProducts.length === 0 ? (
          <div className="text-center py-20">
            <Heart className="w-20 h-20 text-white/20 mx-auto mb-6" />
            <h2 className="text-xl font-bold text-white mb-2">قائمة المفضلة فارغة</h2>
            <p className="text-white/50">لم تقم بإضافة أي منتجات للمفضلة بعد</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {wishlistProducts.map(product => product && <ProductCard key={product.id} product={product} />)}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
