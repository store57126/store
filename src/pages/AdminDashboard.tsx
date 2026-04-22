import { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  ShoppingBag,
  Package,
  Users,
  BarChart3,
  Settings,
  LogOut,
  TrendingUp,
  DollarSign,
  ChevronLeft,
  Home,
  Bell,
  MessageSquare,
  Zap,
  UserPlus,
  Trash2,
  Search,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { products } from '../data/products';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function AdminDashboard() {
  const { isAdmin, adminLogout, orders, admins, addAdmin, removeAdmin } = useStore();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [newAdminName, setNewAdminName] = useState('');
  const [newAdminUsername, setNewAdminUsername] = useState('');
  const [newAdminPassword, setNewAdminPassword] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  if (!isAdmin) {
    navigate('/admin');
    return null;
  }

  const stats = {
    products: products.length,
    customers: 1250,
    orders: orders.length,
    revenue: orders.reduce((sum, o) => sum + o.total, 0),
  };

  const salesData = [
    { day: '25 مايو', value: 25000 },
    { day: '1 يونيو', value: 32000 },
    { day: '8 يونيو', value: 28000 },
    { day: '15 يونيو', value: 45000 },
    { day: '22 يونيو', value: 38000 },
    { day: '29 يونيو', value: 52000 },
    { day: '6 يوليو', value: 48000 },
  ];

  const categoryData = [
    { name: 'هواتف', percent: 40, color: 'bg-blue-500' },
    { name: 'لابتوبات', percent: 25, color: 'bg-cyan-400' },
    { name: 'سماعات', percent: 15, color: 'bg-blue-400' },
    { name: 'ساعات', percent: 10, color: 'bg-blue-300' },
    { name: 'إكسسوارات', percent: 10, color: 'bg-slate-400' },
  ];

  const topProducts = [
    { name: 'iPhone 15 Pro Max', sales: 1250, image: '/iphone15.jpg' },
    { name: 'AirPods Pro 2', sales: 980, image: '/airpods.jpg' },
    { name: 'Samsung S24 Ultra', sales: 870, image: '/samsung24.jpg' },
    { name: 'Apple Watch Ultra', sales: 670, image: '/watch-ultra.jpg' },
  ];

  const lowStock = [
    { name: 'AirPods Pro 2', stock: 5, image: '/airpods.jpg' },
    { name: 'Sony WH-1000XM5', stock: 3, image: '/sony-headphones.jpg' },
    { name: 'iPhone 14 Pro', stock: 4, image: '/iphone15.jpg' },
    { name: 'Galaxy Watch 6', stock: 2, image: '/watch-ultra.jpg' },
  ];

  const handleAddAdmin = () => {
    if (newAdminName && newAdminUsername && newAdminPassword) {
      addAdmin({
        id: Date.now(),
        name: newAdminName,
        username: newAdminUsername,
        role: 'مسؤول',
      });
      setNewAdminName('');
      setNewAdminUsername('');
      setNewAdminPassword('');
    }
  };

  return (
    <div className="min-h-screen bg-[#080c14]">
      {/* Top Header */}
      <header className="sticky top-0 z-50 bg-[#080c14]/90 backdrop-blur-lg border-b border-white/5">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-white font-bold text-sm">loay</p>
              <p className="text-white/50 text-xs">مدير النظام</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Bell className="w-5 h-5 text-white/50" />
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center">8</span>
            </div>
            <div className="relative">
              <MessageSquare className="w-5 h-5 text-white/50" />
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-blue-500 text-white text-[10px] flex items-center justify-center">12</span>
            </div>
            <div className="flex items-center gap-2 bg-white/5 rounded-lg px-3 py-2">
              <Search className="w-4 h-4 text-white/40" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="ابحث عن طلب، منتج، عميل..."
                className="bg-transparent text-white text-sm placeholder:text-white/30 focus:outline-none w-48"
              />
            </div>
            <span className="text-xl font-bold text-white">
              TECH <span className="text-blue-400">STORE</span>
            </span>
            <button className="p-2 text-white/50 hover:text-white">
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 shrink-0 p-4 border-l border-white/5 min-h-screen">
          <div className="mb-6 p-4 rounded-2xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20">
            <p className="text-white/50 text-sm">لوحة التحكم</p>
            <p className="text-white font-bold">مرحباً بك يا loay</p>
          </div>
          <nav className="space-y-1">
            {[
              { id: 'dashboard', name: 'الرئيسية', icon: <Home className="w-5 h-5" /> },
              { id: 'orders', name: 'الطلبات', icon: <ShoppingBag className="w-5 h-5" /> },
              { id: 'products', name: 'المنتجات', icon: <Package className="w-5 h-5" /> },
              { id: 'customers', name: 'العملاء', icon: <Users className="w-5 h-5" /> },
              { id: 'reports', name: 'التقارير', icon: <BarChart3 className="w-5 h-5" /> },
              { id: 'settings', name: 'الإعدادات', icon: <Settings className="w-5 h-5" /> },
            ].map(item => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  activeTab === item.id
                    ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                    : 'text-white/50 hover:bg-white/5 hover:text-white'
                }`}
              >
                {item.icon}
                <span>{item.name}</span>
              </button>
            ))}
            <button
              onClick={() => { adminLogout(); navigate('/'); }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all mt-4"
            >
              <LogOut className="w-5 h-5" />
              <span>تسجيل خروج</span>
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {[
                  { label: 'المنتجات', value: stats.products, change: '+8 منتج جديد', icon: <Package className="w-6 h-6" />, color: 'text-blue-400', bg: 'bg-blue-500/10' },
                  { label: 'العملاء', value: stats.customers.toLocaleString(), change: '+18 عميل جديد', icon: <Users className="w-6 h-6" />, color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
                  { label: 'الطلبات', value: stats.orders, change: '+22 طلب جديد', icon: <ShoppingBag className="w-6 h-6" />, color: 'text-green-400', bg: 'bg-green-500/10' },
                  { label: 'الأرباح', value: '69,998', change: '+12% عن الشهر الماضي', icon: <DollarSign className="w-6 h-6" />, color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
                  { label: 'المبيعات', value: '69,998', change: '+13% عن الشهر الماضي', icon: <TrendingUp className="w-6 h-6" />, color: 'text-purple-400', bg: 'bg-purple-500/10' },
                ].map((stat, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/10">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-white/50 text-sm">{stat.label}</span>
                      <div className={`p-2 rounded-lg ${stat.bg} ${stat.color}`}>{stat.icon}</div>
                    </div>
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                    <p className="text-green-400 text-xs mt-1">{stat.change}</p>
                  </div>
                ))}
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Category Chart */}
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                  <h3 className="text-white font-bold mb-6">توزيع المبيعات</h3>
                  <div className="flex items-center gap-8">
                    <div className="relative w-40 h-40">
                      <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                        {categoryData.reduce((acc, cat, i) => {
                          const prev = categoryData.slice(0, i).reduce((s, c) => s + c.percent, 0);
                          const dashArray = `${cat.percent} ${100 - cat.percent}`;
                          const dashOffset = -prev;
                          acc.push(
                            <circle
                              key={i}
                              cx="18"
                              cy="18"
                              r="15.9"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="3"
                              strokeDasharray={dashArray}
                              strokeDashoffset={dashOffset}
                              className={cat.color.replace('bg-', 'text-')}
                            />
                          );
                          return acc;
                        }, [] as React.ReactNode[])}
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center flex-col">
                        <p className="text-2xl font-bold text-white">69,998</p>
                        <p className="text-white/50 text-xs">إجمالي المبيعات</p>
                      </div>
                    </div>
                    <div className="space-y-3 flex-1">
                      {categoryData.map((cat, i) => (
                        <div key={i} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className={`w-3 h-3 rounded-full ${cat.color}`} />
                            <span className="text-white/70 text-sm">{cat.name}</span>
                          </div>
                          <span className="text-white font-medium">{cat.percent}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Sales Chart */}
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                  <h3 className="text-white font-bold mb-6">المبيعات خلال آخر 30 يوم</h3>
                  <div className="h-48 flex items-end gap-2">
                    {salesData.map((d, i) => {
                      const max = Math.max(...salesData.map(s => s.value));
                      const height = (d.value / max) * 100;
                      return (
                        <div key={i} className="flex-1 flex flex-col items-center gap-2">
                          <div
                            className="w-full bg-gradient-to-t from-blue-600/40 to-blue-400/20 rounded-t-lg relative group"
                            style={{ height: `${height}%` }}
                          >
                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                              {d.value.toLocaleString()}
                            </div>
                          </div>
                          <span className="text-white/40 text-xs">{d.day}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Tables */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Top Products */}
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                  <h3 className="text-white font-bold mb-4">المنتجات الأكثر مبيعاً</h3>
                  <div className="space-y-3">
                    {topProducts.map((p, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <img src={p.image} alt={p.name} className="w-10 h-10 object-contain rounded-lg bg-white/5" />
                        <div className="flex-1">
                          <p className="text-white text-sm">{p.name}</p>
                          <p className="text-white/50 text-xs">قطعة {p.sales}</p>
                        </div>
                        <span className="text-white/50 text-sm">#{i + 1}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Orders */}
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                  <h3 className="text-white font-bold mb-4">آخر الطلبات</h3>
                  <div className="space-y-3">
                    {orders.slice(0, 5).map((order, i) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                        <div>
                          <p className="text-white text-sm font-medium">{order.id}</p>
                          <p className="text-white/50 text-xs">{order.date}</p>
                        </div>
                        <span className={`px-2 py-1 rounded-lg text-xs ${
                          order.status === 'delivered' ? 'bg-green-500/20 text-green-400' :
                          order.status === 'processing' ? 'bg-blue-500/20 text-blue-400' :
                          'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {order.status === 'delivered' ? 'تم التوصيل' : order.status === 'processing' ? 'قيد التنفيذ' : 'جديد'}
                        </span>
                        <p className="text-white text-sm">{order.total.toLocaleString()} جنيه</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Low Stock */}
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                  <h3 className="text-white font-bold mb-4">تنبيهات المخزون</h3>
                  <div className="space-y-3">
                    {lowStock.map((item, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
                        <img src={item.image} alt={item.name} className="w-10 h-10 object-contain rounded-lg bg-white/5" />
                        <div className="flex-1">
                          <p className="text-white text-sm">{item.name}</p>
                          <p className="text-white/50 text-xs">المتبقي: {item.stock} قطع</p>
                        </div>
                        <span className="w-6 h-6 rounded-full bg-red-500/20 text-red-400 text-xs flex items-center justify-center">!</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Admin Management */}
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                <h3 className="text-white font-bold mb-4">إدارة المسؤولين</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <Input
                    value={newAdminName}
                    onChange={e => setNewAdminName(e.target.value)}
                    placeholder="الاسم"
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
                  />
                  <Input
                    value={newAdminUsername}
                    onChange={e => setNewAdminUsername(e.target.value)}
                    placeholder="اسم المستخدم"
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
                  />
                  <Input
                    value={newAdminPassword}
                    onChange={e => setNewAdminPassword(e.target.value)}
                    placeholder="كلمة المرور"
                    type="password"
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
                  />
                  <Button onClick={handleAddAdmin} className="bg-blue-600 hover:bg-blue-500 text-white">
                    <UserPlus className="w-4 h-4 ml-2" />
                    إضافة مسؤول
                  </Button>
                </div>
                <div className="space-y-2">
                  {admins.map(admin => (
                    <div key={admin.id} className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold">
                          {admin.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="text-white text-sm">{admin.name}</p>
                          <p className="text-white/50 text-xs">{admin.role}</p>
                        </div>
                      </div>
                      {admin.id !== 1 && (
                        <button
                          onClick={() => removeAdmin(admin.id)}
                          className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                {[
                  { label: 'نسخة النظام', value: 'v1.0.0', icon: <CodeIcon /> },
                  { label: 'الحماية', value: 'مشفرة 100%', icon: <ShieldIcon /> },
                  { label: 'الدعم الفني', value: 'متاح 24/7', icon: <HeadphonesIcon /> },
                  { label: 'آخر دخول', value: 'منذ 5 دقائق', icon: <ClockIcon /> },
                ].map((item, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
                    <div className="text-blue-400">{item.icon}</div>
                    <div>
                      <p className="text-white/50 text-xs">{item.label}</p>
                      <p className="text-white font-medium text-sm">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <h3 className="text-white font-bold mb-4">جميع الطلبات</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-right text-white/50 text-sm py-3 px-4">الطلب</th>
                      <th className="text-right text-white/50 text-sm py-3 px-4">العميل</th>
                      <th className="text-right text-white/50 text-sm py-3 px-4">الحالة</th>
                      <th className="text-right text-white/50 text-sm py-3 px-4">الإجمالي</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order, i) => (
                      <tr key={i} className="border-b border-white/5">
                        <td className="py-3 px-4 text-white text-sm">{order.id}</td>
                        <td className="py-3 px-4 text-white/70 text-sm">عميل {i + 1}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-lg text-xs ${
                            order.status === 'delivered' ? 'bg-green-500/20 text-green-400' :
                            order.status === 'processing' ? 'bg-blue-500/20 text-blue-400' :
                            'bg-yellow-500/20 text-yellow-400'
                          }`}>
                            {order.status === 'delivered' ? 'تم التوصيل' : order.status === 'processing' ? 'قيد التنفيذ' : 'جديد'}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-white text-sm">{order.total.toLocaleString()} جنيه</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {['products', 'customers', 'reports', 'settings'].includes(activeTab) && (
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center py-20">
              <p className="text-white/50">قريباً...</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

function CodeIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  );
}

function HeadphonesIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}
