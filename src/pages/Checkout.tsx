import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Check, Truck, CreditCard, MapPin, ChevronLeft, Shield } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Checkout() {
  const { cart, cartTotal, clearCart, addOrder } = useStore();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    building: '',
    floor: '',
    apartment: '',
    phone: '',
    city: '',
    notes: '',
  });

  const shipping = cartTotal > 500 ? 0 : 50;
  const total = cartTotal + shipping;

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (step === 1) setStep(2);
    else if (step === 2) setStep(3);
    else if (step === 3) setStep(4);
    else {
      const order = {
        id: `#${Math.floor(Math.random() * 9000) + 1000}`,
        date: new Date().toISOString().split('T')[0],
        status: 'pending' as const,
        total,
        items: [...cart],
      };
      addOrder(order);
      clearCart();
      navigate('/account');
    }
  };

  const steps = [
    { id: 1, name: 'السلة', icon: <ShoppingBagIcon /> },
    { id: 2, name: 'بيانات التوصيل', icon: <MapPin className="w-4 h-4" /> },
    { id: 3, name: 'الدفع', icon: <CreditCard className="w-4 h-4" /> },
    { id: 4, name: 'تأكيد الطلب', icon: <Check className="w-4 h-4" /> },
  ];

  if (cart.length === 0 && step === 1) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="min-h-screen bg-[#080c14]">
      <Header />
      <main className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Steps */}
        <div className="flex items-center justify-center mb-10">
          {steps.map((s, i) => (
            <div key={s.id} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                    step >= s.id
                      ? 'bg-blue-500 text-white'
                      : 'bg-white/10 text-white/40'
                  }`}
                >
                  {step > s.id ? <Check className="w-5 h-5" /> : s.id}
                </div>
                <span className={`text-xs mt-2 ${step >= s.id ? 'text-white' : 'text-white/40'}`}>
                  {s.name}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div className={`w-16 sm:w-24 h-0.5 mx-2 ${step > s.id ? 'bg-blue-500' : 'bg-white/10'}`} />
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {step === 1 && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-white mb-4">السلة</h2>
                {cart.map((item, index) => (
                  <div key={index} className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                    <img src={item.product.image} alt={item.product.name} className="w-20 h-20 object-contain rounded-xl bg-white/5" />
                    <div>
                      <h3 className="text-white font-medium">{item.product.name}</h3>
                      <p className="text-blue-400">{item.product.price.toLocaleString()} جنيه × {item.quantity}</p>
                      {item.color && <p className="text-white/50 text-sm">{item.color}</p>}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {step === 2 && (
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                <h2 className="text-xl font-bold text-white mb-1">بيانات التوصيل</h2>
                <p className="text-white/50 text-sm mb-6">يرجى إدخال بياناتك بشكل صحيح</p>
                <div className="space-y-4">
                  <div>
                    <label className="text-white text-sm mb-2 block">الاسم بالكامل *</label>
                    <div className="relative">
                      <Input
                        value={formData.fullName}
                        onChange={e => handleInputChange('fullName', e.target.value)}
                        placeholder="أدخل اسمك بالكامل"
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/30 pr-10"
                      />
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                    </div>
                  </div>
                  <div>
                    <label className="text-white text-sm mb-2 block">العنوان *</label>
                    <div className="relative">
                      <Input
                        value={formData.address}
                        onChange={e => handleInputChange('address', e.target.value)}
                        placeholder="اكتب عنوان الشارع والمكان بالتفصيل"
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/30 pr-10"
                      />
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-white text-sm mb-2 block">رقم الشقة / الوحدة *</label>
                      <Input
                        value={formData.apartment}
                        onChange={e => handleInputChange('apartment', e.target.value)}
                        placeholder="أدخل رقم الشقة"
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
                      />
                    </div>
                    <div>
                      <label className="text-white text-sm mb-2 block">علامة مميزة</label>
                      <Input
                        value={formData.building}
                        onChange={e => handleInputChange('building', e.target.value)}
                        placeholder="مثال: بجانب مسجد النور"
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="text-white text-sm mb-2 block">الدور *</label>
                      <Input
                        value={formData.floor}
                        onChange={e => handleInputChange('floor', e.target.value)}
                        placeholder="مثال: 3"
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
                      />
                    </div>
                    <div>
                      <label className="text-white text-sm mb-2 block">رقم المنزل *</label>
                      <Input
                        value={formData.building}
                        onChange={e => handleInputChange('building', e.target.value)}
                        placeholder="أدخل رقم المنزل"
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
                      />
                    </div>
                    <div>
                      <label className="text-white text-sm mb-2 block">العمارة / المبنى</label>
                      <Input
                        value={formData.building}
                        onChange={e => handleInputChange('building', e.target.value)}
                        placeholder="أدخل اسم أو رقم العمارة"
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-white text-sm mb-2 block">المنطقة / الحي *</label>
                    <div className="relative">
                      <Input
                        value={formData.city}
                        onChange={e => handleInputChange('city', e.target.value)}
                        placeholder="أدخل اسم الحي أو المنطقة"
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/30 pr-10"
                      />
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                    </div>
                  </div>
                  <div>
                    <label className="text-white text-sm mb-2 block">المحافظة *</label>
                    <select className="w-full bg-white/5 border border-white/10 text-white rounded-xl py-3 px-4 focus:outline-none focus:border-blue-500/50">
                      <option>اختر المحافظة</option>
                      <option>القاهرة</option>
                      <option>الجيزة</option>
                      <option>الإسكندرية</option>
                      <option>المنصورة</option>
                      <option>طنطا</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-white text-sm mb-2 block">رقم الهاتف *</label>
                    <div className="relative">
                      <Input
                        value={formData.phone}
                        onChange={e => handleInputChange('phone', e.target.value)}
                        placeholder="أدخل رقم هاتفك للتواصل"
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/30 pr-10"
                      />
                      <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                    </div>
                  </div>
                  <div>
                    <label className="text-white text-sm mb-2 block">ملاحظات إضافية</label>
                    <textarea
                      value={formData.notes}
                      onChange={e => handleInputChange('notes', e.target.value)}
                      placeholder="أي معلومات إضافية توضح مكان التوصيل ..."
                      rows={3}
                      className="w-full bg-white/5 border border-white/10 text-white placeholder:text-white/30 rounded-xl py-3 px-4 focus:outline-none focus:border-blue-500/50 resize-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                <h2 className="text-xl font-bold text-white mb-6">اختر طريقة الدفع</h2>
                <div className="space-y-3">
                  {[
                    { id: 'cod', name: 'الدفع عند الاستلام', desc: 'ادفع نقداً عند استلام طلبك' },
                    { id: 'card', name: 'بطاقة ائتمانية', desc: 'Visa / MasterCard' },
                    { id: 'wallet', name: 'محفظة إلكترونية', desc: 'Fawry / Vodafone Cash' },
                  ].map((method) => (
                    <label
                      key={method.id}
                      className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-blue-500/30 cursor-pointer transition-all"
                    >
                      <input type="radio" name="payment" className="w-4 h-4 text-blue-500" defaultChecked={method.id === 'cod'} />
                      <div>
                        <p className="text-white font-medium">{method.name}</p>
                        <p className="text-white/50 text-sm">{method.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center">
                <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                  <Check className="w-10 h-10 text-green-400" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">تم تأكيد طلبك!</h2>
                <p className="text-white/50 mb-6">رقم الطلب: #{Math.floor(Math.random() * 9000) + 1000}</p>
                <p className="text-white/50">سيتم توصيل طلبك خلال 3-5 أيام عمل</p>
              </div>
            )}

            <div className="flex items-center gap-4 mt-6">
              {step > 1 && (
                <Button
                  onClick={() => setStep(step - 1)}
                  variant="outline"
                  className="border-white/10 text-white hover:bg-white/5"
                >
                  <ChevronLeft className="w-4 h-4 ml-2" />
                  رجوع
                </Button>
              )}
              <Button
                onClick={handleNext}
                className="flex-1 bg-blue-600 hover:bg-blue-500 text-white py-6 rounded-xl text-lg font-medium"
              >
                {step === 4 ? 'تم' : step === 3 ? 'تأكيد الطلب' : 'متابعة إلى ' + steps[step]?.name}
                <ChevronLeft className="w-5 h-5 mr-2" />
              </Button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-2">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 sticky top-24">
              <h3 className="text-lg font-bold text-white mb-4">ملخص الطلب</h3>
              <div className="space-y-3 mb-4">
                {cart.map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <img src={item.product.image} alt={item.product.name} className="w-12 h-12 object-contain rounded-lg bg-white/5" />
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm truncate">{item.product.name}</p>
                      <p className="text-white/50 text-xs">{item.color && item.color + ' - '}{item.storage}</p>
                    </div>
                    <p className="text-white text-sm">{(item.product.price * item.quantity).toLocaleString()} جنيه</p>
                  </div>
                ))}
              </div>
              <div className="border-t border-white/10 pt-4 space-y-2">
                <div className="flex justify-between text-white/70 text-sm">
                  <span>المجموع الفرعي</span>
                  <span>{cartTotal.toLocaleString()} جنيه</span>
                </div>
                <div className="flex justify-between text-white/70 text-sm">
                  <span>الشحن</span>
                  <span className={shipping === 0 ? 'text-green-400' : ''}>
                    {shipping === 0 ? 'مجاني' : `${shipping} جنيه`}
                  </span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="text-white font-bold">الإجمالي</span>
                  <span className="text-blue-400 font-bold text-xl">{total.toLocaleString()} جنيه</span>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3 text-white/50 text-sm">
                  <Truck className="w-4 h-4 text-blue-400" />
                  <span>توصيل سريع وآمن</span>
                </div>
                <div className="flex items-center gap-3 text-white/50 text-sm">
                  <Shield className="w-4 h-4 text-blue-400" />
                  <span>دفع آمن 100%</span>
                </div>
                <div className="flex items-center gap-3 text-white/50 text-sm">
                  <Check className="w-4 h-4 text-blue-400" />
                  <span>ضمان استرجاع خلال 14 يوم</span>
                </div>
                <div className="flex items-center gap-3 text-white/50 text-sm">
                  <HeadphonesIcon />
                  <span>دعم عملاء 24/7</span>
                </div>
              </div>

              <div className="mt-6 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-center">
                <p className="text-blue-400 text-sm mb-2">تحتاج مساعدة؟</p>
                <Button
                  variant="outline"
                  onClick={() => navigate('/chat')}
                  className="border-blue-500/30 text-blue-400 hover:bg-blue-500/10"
                >
                  تواصل معنا
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function ShoppingBagIcon() {
  return <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>;
}

function HeadphonesIcon() {
  return <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>;
}
