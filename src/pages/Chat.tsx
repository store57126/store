import { useState, useRef, useEffect } from 'react';
import { Send, Bot, UserCircle, Paperclip, Smile, Headphones } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';

const aiResponses: Record<string, string> = {
  'default': 'شكراً لتواصلك معنا! كيف يمكنني مساعدتك اليوم؟',
  'مرحبا': 'مرحباً بك في TECHSTORE! أنا المساعد الذكي، كيف يمكنني مساعدتك؟',
  'السلام عليكم': 'وعليكم السلام! أهلاً بك في TECHSTORE، كيف يمكنني مساعدتك؟',
  'عروض': 'لدينا عروض رائعة! خصومات تصل إلى 50% على منتجات مختارة. تفضل بزيارة صفحة العروض.',
  'خصم': 'يمكنك استخدام كود خصم TECH20 للحصول على خصم 20% أو TECH50 للحصول على خصم 50%!',
  'شحن': 'نقدم شحن مجاني للطلبات التي تزيد عن 500 جنيه. مدة التوصيل 3-5 أيام عمل.',
  'توصيل': 'مدة التوصيل 3-5 أيام عمل. يمكنك تتبع طلبك من صفحة حسابك.',
  'منتج': 'لدينا تشكيلة واسعة من المنتجات: هواتف، لابتوبات، سماعات، شاشات، وإكسسوارات.',
  'سلة': 'يمكنك مشاهدة محتويات السلة بالضغط على أيقونة السلة في أعلى الصفحة.',
  'حساب': 'يمكنك إدارة حسابك من صفحة "حسابي" حيث يمكنك رؤية طلباتك والمفضلة والإعدادات.',
  'طلب': 'يمكنك متابعة طلباتك من صفحة حسابي > طلباتي. ستجد حالة كل طلب مُحدثة.',
  'دفع': 'نحن ندعم الدفع عند الاستلام، البطاقات الائتمانية، والمحافظ الإلكترونية.',
  'إرجاع': 'يمكنك إرجاع أي منتج خلال 14 يوم من تاريخ الاستلام.',
  'ضمان': 'جميع منتجاتنا أصلية 100% ومضمونة ضد عيوب التصنيع لمدة سنة كاملة.',
  'موظف': 'جاري تحويلك إلى أحد موظفي الدعم...',
  'مساعد': 'أنا هنا للمساعدة! يمكنك سؤالي عن أي شيء يخص منتجاتنا وخدماتنا.',
  'ايفون': 'iPhone 15 Pro Max متوفر لدينا بألوان متعددة وسعات مختلفة. السعر يبدأ من 67,999 جنيه.',
  'سامسونج': 'Samsung Galaxy S24 Ultra متوفر بسعر 54,999 جنيه مع قلم S Pen مدمج.',
  'ماك': 'MacBook Air M2 متوفر بألوان متعددة وسعر يبدأ من 44,999 جنيه.',
  'سماعات': 'لدينا AirPods Pro 2 بسعر 1,999 جنيه و Sony WH-1000XM5 بسعر 6,999 جنيه.',
  'شكرا': 'العفو! سعيد بخدمتك. إذا كنت بحاجة لأي مساعدة أخرى، أنا هنا!',
  'مع السلامة': 'مع السلامة! نتمنى لك يوماً سعيداً. لا تتردد في التواصل معنا متى شئت.',
};

function getAIResponse(input: string): string {
  const lowerInput = input.toLowerCase();
  for (const [key, response] of Object.entries(aiResponses)) {
    if (lowerInput.includes(key)) return response;
  }
  return 'شكراً لسؤالك! يمكنك التواصل مع أحد موظفينا للحصول على مزيد من المعلومات حول هذا الموضوع.';
}

export default function Chat() {
  const { chatMessages, addChatMessage, chatMode, setChatMode } = useStore();
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg = {
      id: Date.now(),
      text: input,
      sender: 'user' as const,
      timestamp: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
    };
    addChatMessage(userMsg);
    setInput('');

    if (chatMode === 'ai') {
      setIsTyping(true);
      setTimeout(() => {
        const response = getAIResponse(input);
        const aiMsg = {
          id: Date.now() + 1,
          text: response,
          sender: 'ai' as const,
          timestamp: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
        };
        addChatMessage(aiMsg);
        setIsTyping(false);
      }, 1500);
    } else {
      setTimeout(() => {
        const agentMsg = {
          id: Date.now() + 1,
          text: 'مرحباً، أنا أحمد من فريق الدعم. كيف يمكنني مساعدتك اليوم؟',
          sender: 'agent' as const,
          timestamp: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
        };
        addChatMessage(agentMsg);
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#080c14] flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-6 max-w-4xl">
        <div className="h-[calc(100vh-200px)] flex flex-col">
          {/* Chat Header */}
          <div className="p-4 rounded-t-2xl bg-white/5 border border-white/10 border-b-0 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  chatMode === 'ai' ? 'bg-blue-500/20' : 'bg-green-500/20'
                }`}>
                  {chatMode === 'ai' ? (
                    <Bot className="w-6 h-6 text-blue-400" />
                  ) : (
                    <UserCircle className="w-6 h-6 text-green-400" />
                  )}
                </div>
                <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-[#080c14] ${
                  chatMode === 'ai' ? 'bg-blue-400' : 'bg-green-400'
                }`} />
              </div>
              <div>
                <h2 className="text-white font-bold">
                  {chatMode === 'ai' ? 'TECH AI' : 'موظف دعم - أحمد'}
                </h2>
                <p className="text-white/50 text-sm">
                  {chatMode === 'ai' ? 'مساعد ذكي AI' : 'متصل الآن'}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setChatMode('ai')}
                className={`px-4 py-2 rounded-xl text-sm transition-all ${
                  chatMode === 'ai'
                    ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                    : 'bg-white/5 text-white/50 hover:bg-white/10'
                }`}
              >
                <Bot className="w-4 h-4 inline ml-1" />
                AI
              </button>
              <button
                onClick={() => setChatMode('agent')}
                className={`px-4 py-2 rounded-xl text-sm transition-all ${
                  chatMode === 'agent'
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                    : 'bg-white/5 text-white/50 hover:bg-white/10'
                }`}
              >
                <Headphones className="w-4 h-4 inline ml-1" />
                موظف
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white/5 border-x border-white/10">
            {chatMessages.map(msg => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'user' ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-[80%] p-4 rounded-2xl ${
                    msg.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-tr-none'
                      : msg.sender === 'ai'
                      ? 'bg-white/10 text-white rounded-tl-none border border-white/10'
                      : 'bg-green-500/10 text-white rounded-tl-none border border-green-500/20'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{msg.text}</p>
                  <p className={`text-xs mt-2 ${msg.sender === 'user' ? 'text-blue-200' : 'text-white/40'}`}>
                    {msg.timestamp}
                  </p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-end">
                <div className="bg-white/10 border border-white/10 p-4 rounded-2xl rounded-tl-none">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 rounded-b-2xl bg-white/5 border border-white/10 border-t-0">
            <form
              onSubmit={e => { e.preventDefault(); handleSend(); }}
              className="flex items-center gap-3"
            >
              <button type="button" className="p-2 text-white/40 hover:text-white/60 transition-colors">
                <Paperclip className="w-5 h-5" />
              </button>
              <button type="button" className="p-2 text-white/40 hover:text-white/60 transition-colors">
                <Smile className="w-5 h-5" />
              </button>
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="اكتب رسالتك هنا..."
                className="flex-1 bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white placeholder:text-white/30 focus:outline-none focus:border-blue-500/50"
              />
              <Button
                type="submit"
                className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl"
              >
                <Send className="w-5 h-5" />
              </Button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
