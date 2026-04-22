import { useParams, Link } from 'react-router';
import { ChevronLeft } from 'lucide-react';
import { products, categories } from '../data/products';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';

export default function CategoryPage() {
  const { id } = useParams<{ id: string }>();
  const category = categories.find(c => c.id === id);
  const filteredProducts = id === 'all' ? products : products.filter(p => p.category === id);

  return (
    <div className="min-h-screen bg-[#080c14]">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-white/50 mb-6">
          <Link to="/" className="hover:text-blue-400 transition-colors">الرئيسية</Link>
          <ChevronLeft className="w-3 h-3" />
          <span className="text-white/70">{category?.name || 'جميع المنتجات'}</span>
        </div>

        <h1 className="text-2xl font-bold text-white mb-8">
          {category?.name || 'جميع المنتجات'}
        </h1>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-white/50">لا توجد منتجات في هذا القسم</p>
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
