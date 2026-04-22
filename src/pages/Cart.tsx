import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Trash2, Plus, Minus, ShoppingBag, Tag } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Cart() {
  const { cart, updateQuantity, removeFromCart, cartTotal } = useStore();
  const navigate = useNavigate();
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);

  const handleApplyCoupon = () => {
    if (couponCode.toLowerCase() === 'tech50') {
      setDiscount(cartTotal * 0.5);
      setCouponApplied(true);
    } else if (couponCode.toLowerCase() === 'tech20') {
      setDiscount(cartTotal * 0.2);
      setCouponApplied(true);
    } else {
      setDiscount(0);
      setCouponApplied(false);
    }
  };

  const shipping = cartTotal > 500 ? 0 : 50;
  const finalTotal = cartTotal - discount + shipping;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#080c14]">
        <Header />
        <main className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto text-center">
            <ShoppingBag className="w-20 h-20 text-white/20 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-white mb-2">السلة فارغة</h2>
            <p className="text-white/50 mb-8">لم تقم بإضافة أي منتجات إلى السلة بعد</p>
            <Button
              onClick={() => navigate('/category/all')}
              className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-xl"
            >
              تسوق الآن
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080c14]">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-white mb-8">سلة التسوق</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item, index) => (
              <div
                key={`${item.product.id}-${index}`}
                className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/10"
              >
                <Link to={`/product/${item.product.id}`} className="w-24 h-24 shrink-0 rounded-xl overflow-hidden bg-white/5">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-full h-full object-contain p-2"
                  />
                </Link>
                <div className="flex-1 min-w-0">
                  <Link to={`/product/${item.product.id}`}>
                    <h3 className="text-white font-medium truncate hover:text-blue-400 transition-colors">
                      {item.product.name}
                    </h3>
                  </Link>
                  <p className="text-blue-400 font-bold mt-1">{item.product.price.toLocaleString()} جنيه</p>
                  {item.color && <p className="text-white/50 text-sm">اللون: {item.color}</p>}
                  {item.storage && <p className="text-white/50 text-sm">السعة: {item.storage}</p>}
                </div>
                <div className="flex flex-col items-end justify-between">
                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="p-2 text-white/40 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <div className="flex items-center gap-2 bg-white/5 rounded-lg p-1">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="w-8 h-8 rounded-md bg-white/10 text-white hover:bg-white/20 transition-all flex items-center justify-center"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-8 text-center text-white text-sm">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="w-8 h-8 rounded-md bg-white/10 text-white hover:bg-white/20 transition-all flex items-center justify-center"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="space-y-4">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <h3 className="text-lg font-bold text-white mb-4">ملخص الطلب</h3>
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-white/70">
                  <span>المجموع الفرعي</span>
                  <span>{cartTotal.toLocaleString()} جنيه</span>
                </div>
                <div className="flex justify-between text-white/70">
                  <span>الشحن</span>
                  <span className={shipping === 0 ? 'text-green-400' : ''}>
                    {shipping === 0 ? 'مجاني' : `${shipping} جنيه`}
                  </span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-400">
                    <span>خصم</span>
                    <span>- {discount.toLocaleString()} جنيه</span>
                  </div>
                )}
                <div className="border-t border-white/10 pt-3 flex justify-between">
                  <span className="text-white font-bold text-lg">الإجمالي</span>
                  <span className="text-blue-400 font-bold text-xl">{finalTotal.toLocaleString()} جنيه</span>
                </div>
              </div>

              {/* Coupon */}
              <div className="flex gap-2 mb-4">
                <div className="relative flex-1">
                  <Tag className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                  <Input
                    value={couponCode}
                    onChange={e => setCouponCode(e.target.value)}
                    placeholder="أدخل كود الخصم"
                    className="pr-10 bg-white/5 border-white/10 text-white placeholder:text-white/30"
                  />
                </div>
                <Button
                  onClick={handleApplyCoupon}
                  variant="outline"
                  className="border-blue-500/50 text-blue-400 hover:bg-blue-500/10"
                >
                  تطبيق
                </Button>
              </div>
              {couponApplied && <p className="text-green-400 text-sm mb-2">تم تطبيق الكود بنجاح!</p>}
              {!couponApplied && couponCode && <p className="text-red-400 text-sm mb-2">كود خصم غير صالح</p>}

              <Button
                onClick={() => navigate('/checkout')}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white py-6 rounded-xl text-lg font-medium"
              >
                إتمام الطلب
              </Button>
            </div>

            {/* Trust badges */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3">
              {[
                { icon: <Tag className="w-5 h-5" />, title: 'تسوق بثقة وأمان', desc: 'توصيل سريع وآمن' },
                { icon: <Tag className="w-5 h-5" />, title: 'دفع آمن 100%', desc: 'جميع طرق الدفع محمية' },
                { icon: <Tag className="w-5 h-5" />, title: 'ضمان استرجاع', desc: 'إرجاع سهل خلال 14 يوم' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="text-blue-400">{item.icon}</div>
                  <div>
                    <p className="text-white text-sm">{item.title}</p>
                    <p className="text-white/50 text-xs">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link
              to="/chat"
              className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-500/30 transition-all"
            >
              <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                <Tag className="w-5 h-5" />
              </div>
              <div>
                <p className="text-white text-sm">تحتاج مساعدة؟</p>
                <p className="text-white/50 text-xs">فريق الدعم متاح على مدار الساعة</p>
              </div>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
