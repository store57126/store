import { useState } from 'react';
import { useNavigate } from 'react-router';
import { User, ShoppingBag, MapPin, Heart, CreditCard, Bell, MessageCircle, Settings, LogOut, Edit3, Package, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { products } from '../data/products';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Account() {
  const { user, isLoggedIn, login, logout, orders, wishlist } = useStore();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('orders');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login({
      name: formData.name || 'أحمد محمد',
      email: formData.email || 'ahmed@example.com',
      phone: formData.phone || '01234567890',
      avatar: '',
      address: formData.address || 'القاهرة، مصر',
    });
  };

  const handleSave = () => {
    login({
      ...formData,
      avatar: user?.avatar || '',
    });
    setIsEditing(false);
  };

  const statusConfig = {
    delivered: { color: 'text-green-400', bg: 'bg-green-500/10', label: 'تم التوصيل', icon: <CheckCircle className="w-4 h-4" /> },
    processing: { color: 'text-blue-400', bg: 'bg-blue-500/10', label: 'قيد التنفيذ', icon: <Clock className="w-4 h-4" /> },
    pending: { color: 'text-yellow-400', bg: 'bg-yellow-500/10', label: 'قيد الانتظار', icon: <AlertCircle className="w-4 h-4" /> },
    cancelled: { color: 'text-red-400', bg: 'bg-red-500/10', label: 'ملغي', icon: <AlertCircle className="w-4 h-4" /> },
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#080c14]">
        <Header />
        <main className="container mx-auto px-4 py-16 max-w-md">
          <div className="text-center mb-8">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center mx-auto mb-4">
              <User className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">تسجيل الدخول</h2>
            <p className="text-white/50">سجل دخولك للوصول إلى حسابك</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              placeholder="الاسم"
              className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
            />
            <Input
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
              placeholder="البريد الإلكتروني"
              type="email"
              className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
            />
            <Input
              value={formData.phone}
              onChange={e => setFormData({ ...formData, phone: e.target.value })}
              placeholder="رقم الهاتف"
              className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
            />
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white py-6 rounded-xl text-lg">
              تسجيل الدخول
            </Button>
          </form>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080c14]">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 mb-4 text-center">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center mx-auto mb-4 text-white text-3xl font-bold">
                {user?.name?.charAt(0) || 'U'}
              </div>
              <h2 className="text-xl font-bold text-white">مرحباً بك، {user?.name}</h2>
              <p className="text-white/50 text-sm">عضو منذ مايو 2024</p>
              <Button
                onClick={() => setIsEditing(!isEditing)}
                variant="outline"
                className="mt-4 border-blue-500/30 text-blue-400 hover:bg-blue-500/10"
              >
                <Edit3 className="w-4 h-4 ml-2" />
                تعديل الملف الشخصي
              </Button>
            </div>

            <nav className="space-y-1">
              {[
                { id: 'orders', name: 'طلباتي', icon: <ShoppingBag className="w-5 h-5" /> },
                { id: 'addresses', name: 'عناويني', icon: <MapPin className="w-5 h-5" /> },
                { id: 'wishlist', name: 'المفضلة', icon: <Heart className="w-5 h-5" /> },
                { id: 'payment', name: 'طرق الدفع', icon: <CreditCard className="w-5 h-5" /> },
                { id: 'notifications', name: 'الإشعارات', icon: <Bell className="w-5 h-5" /> },
                { id: 'support', name: 'الدعم والمساعدة', icon: <MessageCircle className="w-5 h-5" /> },
                { id: 'settings', name: 'الإعدادات', icon: <Settings className="w-5 h-5" /> },
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    activeTab === item.id
                      ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                      : 'text-white/60 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </button>
              ))}
              <button
                onClick={() => { logout(); navigate('/'); }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all"
              >
                <LogOut className="w-5 h-5" />
                <span>تسجيل الخروج</span>
              </button>
            </nav>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'orders' && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                  {[
                    { label: 'إجمالي الطلبات', value: '12', icon: <ShoppingBag className="w-6 h-6" />, color: 'text-blue-400' },
                    { label: 'قيد التوصيل', value: '2', icon: <Package className="w-6 h-6" />, color: 'text-yellow-400' },
                    { label: 'تم التوصيل', value: '8', icon: <CheckCircle className="w-6 h-6" />, color: 'text-green-400' },
                    { label: 'المبلغ الإجمالي', value: '12,450', icon: <CreditCard className="w-6 h-6" />, color: 'text-cyan-400' },
                  ].map((stat, i) => (
                    <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
                      <div className={`${stat.color} mb-2`}>{stat.icon}</div>
                      <p className="text-2xl font-bold text-white">{stat.value}</p>
                      <p className="text-white/50 text-sm">{stat.label}</p>
                    </div>
                  ))}
                </div>

                <h3 className="text-lg font-bold text-white mb-4">آخر الطلبات</h3>
                {orders.map(order => (
                  <div key={order.id} className="p-4 rounded-2xl bg-white/5 border border-white/10 mb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`p-2 rounded-lg ${statusConfig[order.status].bg} ${statusConfig[order.status].color}`}>
                          {statusConfig[order.status].icon}
                        </div>
                        <div>
                          <p className="text-white font-medium">{order.id}</p>
                          <p className="text-white/50 text-sm">{order.date}</p>
                        </div>
                      </div>
                      <div className="text-left">
                        <p className="text-white font-bold">{order.total.toLocaleString()} جنيه</p>
                        <span className={`text-xs px-2 py-1 rounded-full ${statusConfig[order.status].bg} ${statusConfig[order.status].color}`}>
                          {statusConfig[order.status].label}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'wishlist' && (
              <div>
                <h3 className="text-lg font-bold text-white mb-4">المفضلة</h3>
                {wishlist.length === 0 ? (
                  <div className="text-center py-12">
                    <Heart className="w-16 h-16 text-white/20 mx-auto mb-4" />
                    <p className="text-white/50">لا توجد منتجات في المفضلة</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {wishlist.map(id => {
                      const product = products.find(p => p.id === id);
                      if (!product) return null;
                      return <ProductCard key={id} product={product} />;
                    })}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                <h3 className="text-lg font-bold text-white mb-6">الإعدادات</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-white text-sm mb-2 block">الاسم</label>
                    <Input
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className="bg-white/5 border-white/10 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-white text-sm mb-2 block">البريد الإلكتروني</label>
                    <Input
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="bg-white/5 border-white/10 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-white text-sm mb-2 block">رقم الهاتف</label>
                    <Input
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      className="bg-white/5 border-white/10 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-white text-sm mb-2 block">العنوان</label>
                    <textarea
                      value={formData.address}
                      onChange={e => setFormData({ ...formData, address: e.target.value })}
                      rows={3}
                      className="w-full bg-white/5 border border-white/10 text-white rounded-xl py-3 px-4 focus:outline-none focus:border-blue-500/50 resize-none"
                    />
                  </div>
                  <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-500 text-white">
                    حفظ التغييرات
                  </Button>
                </div>
              </div>
            )}

            {activeTab === 'support' && (
              <div className="text-center py-12">
                <MessageCircle className="w-16 h-16 text-blue-400 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">الدعم والمساعدة</h3>
                <p className="text-white/50 mb-6">فريق الدعم متاح على مدار الساعة</p>
                <Button
                  onClick={() => navigate('/chat')}
                  className="bg-blue-600 hover:bg-blue-500 text-white px-8"
                >
                  فتح الدردشة
                </Button>
              </div>
            )}

            {['addresses', 'payment', 'notifications'].includes(activeTab) && (
              <div className="text-center py-12">
                <p className="text-white/50">قريباً...</p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
