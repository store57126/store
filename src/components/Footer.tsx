import { Zap, Truck, Shield, RotateCcw, Headphones } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#060914] border-t border-white/5 mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5">
            <Truck className="w-8 h-8 text-blue-400" />
            <div>
              <p className="text-white font-medium text-sm">شحن سريع</p>
              <p className="text-white/50 text-xs">خلال 24 - 48 ساعة</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5">
            <Shield className="w-8 h-8 text-blue-400" />
            <div>
              <p className="text-white font-medium text-sm">ضمان استرجاع</p>
              <p className="text-white/50 text-xs">14 يوم استرجاع مجاني</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5">
            <RotateCcw className="w-8 h-8 text-blue-400" />
            <div>
              <p className="text-white font-medium text-sm">دفع آمن</p>
              <p className="text-white/50 text-xs">100% حماية لبياناتك</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5">
            <Headphones className="w-8 h-8 text-blue-400" />
            <div>
              <p className="text-white font-medium text-sm">دعم فني</p>
              <p className="text-white/50 text-xs">24/7 دعم جميع استفساراتك</p>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold">
              <span className="text-white">TECH</span>
              <span className="text-blue-400">STORE</span>
            </span>
          </div>
          <p className="text-white/40 text-sm">جميع حقوق الملكية محفوظة لـ LOAY © 2024</p>
        </div>
      </div>
    </footer>
  );
}
