import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import {
  Search,
  Heart,
  User,
  ShoppingCart,
  Menu,
  Zap,
  LogOut,
  MessageCircle,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function Header() {
  const { cartCount, wishlist, user, isLoggedIn, logout, searchQuery, setSearchQuery } = useStore();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate('/search');
      setSearchOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#080c14]/90 backdrop-blur-lg border-b border-white/5">
      {/* Top banner */}
      <div className="bg-gradient-to-r from-blue-600/20 to-cyan-500/20 border-b border-blue-500/20 px-4 py-2 text-center text-xs sm:text-sm">
        <span className="text-blue-300">حمل تطبيق TECHSTORE الآن واستمتع بتجربة تسوق أسرع!</span>
      </div>

      <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight">
            <span className="text-white">TECH</span>
            <span className="text-blue-400">STORE</span>
          </span>
        </Link>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-xl mx-4">
          <div className="relative w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="ابحث عن منتج..."
              className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pr-4 pl-12 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 transition-all"
            />
            <button
              type="submit"
              className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-blue-400 transition-colors"
            >
              <Search className="w-4 h-4" />
            </button>
          </div>
        </form>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Mobile Search Toggle */}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="md:hidden p-2 text-white/70 hover:text-blue-400 transition-colors"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Wishlist */}
          <Link to="/wishlist" className="relative p-2 text-white/70 hover:text-red-400 transition-colors">
            <Heart className="w-5 h-5" />
            {wishlist.length > 0 && (
              <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-red-500 text-[10px] font-bold">
                {wishlist.length}
              </Badge>
            )}
          </Link>

          {/* Account */}
          {isLoggedIn ? (
            <Sheet>
              <SheetTrigger asChild>
                <button className="p-2 text-white/70 hover:text-blue-400 transition-colors">
                  <User className="w-5 h-5" />
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="bg-[#0a0f1c] border-white/10">
                <SheetHeader>
                  <SheetTitle className="text-white">حسابي</SheetTitle>
                </SheetHeader>
                <div className="mt-6 space-y-2">
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white font-bold text-lg">
                      {user?.name?.charAt(0) || 'U'}
                    </div>
                    <div>
                      <p className="text-white font-medium">{user?.name || 'مستخدم'}</p>
                      <p className="text-white/50 text-sm">{user?.email || ''}</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-white/70 hover:text-white hover:bg-white/5"
                    onClick={() => navigate('/account')}
                  >
                    <User className="w-4 h-4 ml-2" />
                    الملف الشخصي
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-white/70 hover:text-white hover:bg-white/5"
                    onClick={() => navigate('/chat')}
                  >
                    <MessageCircle className="w-4 h-4 ml-2" />
                    الدعم والمساعدة
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-white/70 hover:text-white hover:bg-white/5"
                    onClick={() => navigate('/wishlist')}
                  >
                    <Heart className="w-4 h-4 ml-2" />
                    المفضلة
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-white/70 hover:text-white hover:bg-white/5"
                    onClick={logout}
                  >
                    <LogOut className="w-4 h-4 ml-2" />
                    تسجيل الخروج
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          ) : (
            <button
              onClick={() => navigate('/account')}
              className="p-2 text-white/70 hover:text-blue-400 transition-colors"
            >
              <User className="w-5 h-5" />
            </button>
          )}

          {/* Cart */}
          <Link to="/cart" className="relative p-2 text-white/70 hover:text-blue-400 transition-colors">
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-blue-500 text-[10px] font-bold">
                {cartCount}
              </Badge>
            )}
          </Link>

          {/* Menu */}
          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
              <button className="p-2 text-white/70 hover:text-blue-400 transition-colors">
                <Menu className="w-5 h-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-[#0a0f1c] border-white/10 w-72">
              <SheetHeader>
                <SheetTitle className="text-white flex items-center gap-2">
                  <Zap className="w-5 h-5 text-blue-400" />
                  TECHSTORE
                </SheetTitle>
              </SheetHeader>
              <nav className="mt-8 space-y-1">
                {[
                  { name: 'الرئيسية', path: '/' },
                  { name: 'الهواتف', path: '/category/phones' },
                  { name: 'اللابتوبات', path: '/category/laptops' },
                  { name: 'السماعات', path: '/category/headphones' },
                  { name: 'الشاشات', path: '/category/screens' },
                  { name: 'الإكسسوارات', path: '/category/accessories' },
                  { name: 'المفضلة', path: '/wishlist' },
                  { name: 'السلة', path: '/cart' },
                  { name: 'حسابي', path: '/account' },
                  { name: 'الدعم', path: '/chat' },
                ].map(item => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMenuOpen(false)}
                    className="block px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 rounded-xl transition-all"
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {searchOpen && (
        <form onSubmit={handleSearch} className="md:hidden px-4 pb-3">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="ابحث عن منتج..."
              autoFocus
              className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pr-4 pl-12 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-blue-500/50"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
          </div>
        </form>
      )}
    </header>
  );
}
