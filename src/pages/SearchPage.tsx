import { useMemo } from 'react';
import { Link } from 'react-router';
import { ChevronLeft, Search } from 'lucide-react';
import { products } from '../data/products';
import { useStore } from '../context/StoreContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';

export default function SearchPage() {
  const { searchQuery } = useStore();

  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();
    return products.filter(
      p =>
        p.name.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query) ||
        p.description?.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-[#080c14]">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-white/50 mb-6">
          <Link to="/" className="hover:text-blue-400 transition-colors">الرئيسية</Link>
          <ChevronLeft className="w-3 h-3" />
          <span className="text-white/70">نتائج البحث</span>
        </div>

        <div className="flex items-center gap-3 mb-8">
          <Search className="w-6 h-6 text-blue-400" />
          <h1 className="text-2xl font-bold text-white">
            نتائج البحث عن: <span className="text-blue-400">{searchQuery}</span>
          </h1>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <Search className="w-20 h-20 text-white/20 mx-auto mb-6" />
            <h2 className="text-xl font-bold text-white mb-2">لا توجد نتائج</h2>
            <p className="text-white/50">جرب البحث بكلمات مختلفة</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
