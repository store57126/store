import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Eye, EyeOff, Zap, Lock, ArrowLeft } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { adminLogin } = useStore();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (adminLogin(username, password)) {
      navigate('/admin/dashboard');
    } else {
      setError('اسم المستخدم أو كلمة المرور غير صحيحة');
    }
  };

  return (
    <div className="min-h-screen bg-[#080c14] flex items-center justify-center relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md px-4 relative z-10">
        <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-lg">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center mx-auto mb-4">
              <Zap className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold">
              <span className="text-white">TECH</span>
              <span className="text-blue-400">STORE</span>
            </h1>
            <p className="text-white/50 mt-2">لوحة التحكم - تسجيل الدخول</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <UserIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
              <Input
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="اسم المستخدم"
                className="pr-12 bg-white/5 border-white/10 text-white placeholder:text-white/30 py-6"
              />
            </div>
            <div className="relative">
              <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
              <Input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="كلمة المرور"
                className="pr-12 pl-12 bg-white/5 border-white/10 text-white placeholder:text-white/30 py-6"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/50"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            {error && (
              <p className="text-red-400 text-sm text-center">{error}</p>
            )}

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 text-white py-6 rounded-xl text-lg font-medium"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              تسجيل الدخول
            </Button>
          </form>

          <div className="mt-6 flex items-center justify-center gap-2 text-white/40 text-sm">
            <Lock className="w-4 h-4" />
            <span>لوحة تحكم آمنة ومشفرة</span>
          </div>
        </div>

        <button
          onClick={() => navigate('/')}
          className="mt-6 text-white/40 hover:text-white/60 text-sm flex items-center justify-center gap-2 mx-auto transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          العودة للموقع
        </button>
      </div>
    </div>
  );
}

function UserIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  );
}
