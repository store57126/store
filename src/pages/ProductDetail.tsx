import { useState } from 'react';
import { Link, useParams } from 'react-router';
import { Heart, ShoppingCart, Star, ChevronLeft, Truck, Shield, RotateCcw, Check } from 'lucide-react';
import { products } from '../data/products';
import { useStore } from '../context/StoreContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { Button } from '@/components/ui/button';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const product = products.find(p => p.id === Number(id));
  const { addToCart, toggleWishlist, isInWishlist } = useStore();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0]?.name || '');
  const [selectedStorage, setSelectedStorage] = useState(product?.storage?.[0] || '');
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#080c14] flex items-center justify-center">
        <div className="text-center">
          <p className="text-white text-xl mb-4">المنتج غير موجود</p>
          <Link to="/" className="text-blue-400 hover:underline">العودة للرئيسية</Link>
        </div>
      </div>
    );
  }

  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 5);

  const handleAddToCart = () => {
    addToCart({ product, quantity, color: selectedColor, storage: selectedStorage });
  };

  return (
    <div className="min-h-screen bg-[#080c14]">
      <Header />
      <main className="container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-white/50 mb-6">
          <Link to="/" className="hover:text-blue-400 transition-colors">الرئيسية</Link>
          <ChevronLeft className="w-3 h-3" />
          <Link to={`/category/${product.category}`} className="hover:text-blue-400 transition-colors">
            {product.category === 'phones' ? 'الهواتف' : product.category === 'laptops' ? 'اللابتوبات' : product.category === 'headphones' ? 'السماعات' : product.category === 'screens' ? 'الشاشات' : 'الإكسسوارات'}
          </Link>
          <ChevronLeft className="w-3 h-3" />
          <span className="text-white/70">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Images */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-3xl bg-white/5 border border-white/10 overflow-hidden">
              <img
                src={product.images?.[selectedImage] || product.image}
                alt={product.name}
                className="w-full h-full object-contain p-6"
              />
              {product.badge && (
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium bg-blue-500 text-white">
                  {product.badge}
                </div>
              )}
            </div>
            {product.images && product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`w-20 h-20 rounded-xl border-2 overflow-hidden shrink-0 transition-all ${
                      i === selectedImage ? 'border-blue-500' : 'border-white/10'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-start justify-between mb-2">
                <h1 className="text-2xl sm:text-3xl font-bold text-white">{product.name}</h1>
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className="p-3 rounded-full bg-white/5 text-white/70 hover:text-red-400 transition-all"
                >
                  <Heart className={`w-5 h-5 ${isInWishlist(product.id) ? 'fill-red-500 text-red-500' : ''}`} />
                </button>
              </div>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-white/20'}`}
                    />
                  ))}
                </div>
                <span className="text-white/70">({product.rating})</span>
                <span className="text-blue-400 text-sm">تقييم</span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold text-blue-400">{product.price.toLocaleString()} جنيه</span>
              {product.oldPrice && (
                <>
                  <span className="text-xl text-white/40 line-through">{product.oldPrice.toLocaleString()} جنيه</span>
                  <span className="px-2 py-1 rounded-lg bg-green-500/20 text-green-400 text-sm">
                    وفر {((product.oldPrice - product.price)).toLocaleString()} جنيه ({Math.round((1 - product.price / product.oldPrice) * 100)}%)
                  </span>
                </>
              )}
            </div>

            {/* Description */}
            <p className="text-white/60 leading-relaxed">{product.description}</p>

            {/* Colors */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <p className="text-white font-medium mb-3">اختر اللون</p>
                <div className="flex gap-3">
                  {product.colors.map(color => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all ${
                        selectedColor === color.name
                          ? 'border-blue-500 bg-blue-500/10 text-white'
                          : 'border-white/10 text-white/60 hover:border-white/20'
                      }`}
                    >
                      <span
                        className="w-4 h-4 rounded-full border border-white/20"
                        style={{ backgroundColor: color.color }}
                      />
                      {color.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Storage */}
            {product.storage && product.storage.length > 0 && (
              <div>
                <p className="text-white font-medium mb-3">اختر السعة</p>
                <div className="flex gap-3">
                  {product.storage.map(storage => (
                    <button
                      key={storage}
                      onClick={() => setSelectedStorage(storage)}
                      className={`px-5 py-2 rounded-xl border transition-all ${
                        selectedStorage === storage
                          ? 'border-blue-500 bg-blue-500/10 text-white'
                          : 'border-white/10 text-white/60 hover:border-white/20'
                      }`}
                    >
                      {storage}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity & Add to Cart */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 bg-white/5 rounded-xl border border-white/10 p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-lg bg-white/5 text-white hover:bg-white/10 transition-all flex items-center justify-center text-lg"
                >
                  -
                </button>
                <span className="w-8 text-center text-white font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-lg bg-white/5 text-white hover:bg-white/10 transition-all flex items-center justify-center text-lg"
                >
                  +
                </button>
              </div>
              <Button
                onClick={handleAddToCart}
                className="flex-1 bg-blue-600 hover:bg-blue-500 text-white py-6 rounded-xl text-lg font-medium flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                أضف إلى السلة
              </Button>
            </div>

            {/* Shipping Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { icon: <Truck className="w-5 h-5" />, title: 'توصيل مجاني', desc: 'للطلبات فوق 500 جنيه' },
                { icon: <Shield className="w-5 h-5" />, title: 'ضمان سنة كاملة', desc: 'ضمان ضد عيوب التصنيع' },
                { icon: <RotateCcw className="w-5 h-5" />, title: 'إرجاع خلال 14 يوم', desc: 'إرجاع سهل بدون أي أسئلة' },
                { icon: <Check className="w-5 h-5" />, title: 'الدفع عند الاستلام', desc: 'ادفع عند استلام المنتج' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
                  <div className="text-blue-400">{item.icon}</div>
                  <div>
                    <p className="text-white text-sm font-medium">{item.title}</p>
                    <p className="text-white/50 text-xs">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Reviews */}
        {product.reviews && product.reviews.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-1 h-6 bg-blue-500 rounded-full" />
              <h2 className="text-xl font-bold text-white">تقييمات العملاء</h2>
              <span className="text-white/50">({product.reviews.length})</span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1 p-6 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-center mb-4">
                  <p className="text-5xl font-bold text-white mb-2">{product.rating}</p>
                  <div className="flex justify-center mb-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-white/20'}`}
                      />
                    ))}
                  </div>
                  <p className="text-white/50">ممتاز</p>
                </div>
                {[5, 4, 3, 2, 1].map((star) => {
                  const count = product.reviews?.filter(r => r.rating === star).length || 0;
                  return (
                    <div key={star} className="flex items-center gap-2 mb-2">
                      <span className="text-white/60 text-sm w-4">{star}</span>
                      <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                      <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-500 rounded-full"
                          style={{ width: `${(count / (product.reviews?.length || 1)) * 100}%` }}
                        />
                      </div>
                      <span className="text-white/50 text-xs w-6">({count})</span>
                    </div>
                  );
                })}
              </div>
              <div className="lg:col-span-2 space-y-4">
                {product.reviews.map(review => (
                  <div key={review.id} className="p-4 rounded-2xl bg-white/5 border border-white/10">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white font-bold">
                        {review.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-white font-medium">{review.name}</p>
                        <p className="text-white/50 text-sm">{review.date}</p>
                      </div>
                      <div className="mr-auto flex">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-white/20'}`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-white/70">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Related Products */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <div className="w-1 h-6 bg-blue-500 rounded-full" />
            <h2 className="text-xl font-bold text-white">منتجات مشابهة</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {relatedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
