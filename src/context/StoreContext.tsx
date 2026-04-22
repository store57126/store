import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

export interface Product {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  rating: number;
  image: string;
  images?: string[];
  category: string;
  badge?: string;
  description?: string;
  colors?: { name: string; color: string }[];
  storage?: string[];
  reviews?: Review[];
  features?: string[];
}

export interface Review {
  id: number;
  name: string;
  avatar: string;
  date: string;
  rating: number;
  comment: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  color?: string;
  storage?: string;
}

export interface Order {
  id: string;
  date: string;
  status: 'delivered' | 'processing' | 'pending' | 'cancelled';
  total: number;
  items: CartItem[];
}

export interface User {
  name: string;
  email: string;
  phone: string;
  avatar: string;
  address?: string;
}

export interface ChatMessage {
  id: number;
  text: string;
  sender: 'user' | 'ai' | 'agent';
  timestamp: string;
}

export interface AdminUser {
  id: number;
  name: string;
  username: string;
  role: string;
}

interface StoreContextType {
  // Cart
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;

  // Wishlist
  wishlist: number[];
  toggleWishlist: (productId: number) => void;
  isInWishlist: (productId: number) => boolean;

  // Auth
  user: User | null;
  isLoggedIn: boolean;
  login: (user: User) => void;
  logout: () => void;

  // Orders
  orders: Order[];
  addOrder: (order: Order) => void;

  // Search
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Chat
  chatMessages: ChatMessage[];
  addChatMessage: (msg: ChatMessage) => void;
  chatMode: 'ai' | 'agent';
  setChatMode: (mode: 'ai' | 'agent') => void;

  // Admin
  isAdmin: boolean;
  adminLogin: (username: string, password: string) => boolean;
  adminLogout: () => void;
  admins: AdminUser[];
  addAdmin: (admin: AdminUser) => void;
  removeAdmin: (id: number) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([
    {
      id: '#1258',
      date: '2024-05-20',
      status: 'delivered',
      total: 2999,
      items: [],
    },
    {
      id: '#1257',
      date: '2024-05-22',
      status: 'processing',
      total: 1299,
      items: [],
    },
    {
      id: '#1256',
      date: '2024-05-23',
      status: 'pending',
      total: 5499,
      items: [],
    },
    {
      id: '#1255',
      date: '2024-05-18',
      status: 'delivered',
      total: 2199,
      items: [],
    },
  ]);
  const [searchQuery, setSearchQuery] = useState('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      text: 'مرحباً بك في TECHSTORE! أنا المساعد الذكي، كيف يمكنني مساعدتك؟',
      sender: 'ai',
      timestamp: '2:30',
    },
  ]);
  const [chatMode, setChatMode] = useState<'ai' | 'agent'>('ai');
  const [isAdmin, setIsAdmin] = useState(false);
  const [admins, setAdmins] = useState<AdminUser[]>([
    { id: 1, name: 'loay', username: 'loay', role: 'مدير' },
  ]);

  const addToCart = useCallback((item: CartItem) => {
    setCart(prev => {
      const existing = prev.find(
        p => p.product.id === item.product.id && p.color === item.color && p.storage === item.storage
      );
      if (existing) {
        return prev.map(p =>
          p.product.id === item.product.id && p.color === item.color && p.storage === item.storage
            ? { ...p, quantity: p.quantity + item.quantity }
            : p
        );
      }
      return [...prev, item];
    });
  }, []);

  const removeFromCart = useCallback((productId: number) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: number, quantity: number) => {
    if (quantity <= 0) {
      setCart(prev => prev.filter(item => item.product.id !== productId));
    } else {
      setCart(prev =>
        prev.map(item => (item.product.id === productId ? { ...item, quantity } : item))
      );
    }
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const toggleWishlist = useCallback((productId: number) => {
    setWishlist(prev =>
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  }, []);

  const isInWishlist = useCallback(
    (productId: number) => wishlist.includes(productId),
    [wishlist]
  );

  const login = useCallback((userData: User) => {
    setUser(userData);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const addOrder = useCallback((order: Order) => {
    setOrders(prev => [order, ...prev]);
  }, []);

  const addChatMessage = useCallback((msg: ChatMessage) => {
    setChatMessages(prev => [...prev, msg]);
  }, []);

  const adminLogin = useCallback((username: string, password: string) => {
    if (username === 'loay' && password === '11211') {
      setIsAdmin(true);
      return true;
    }
    return false;
  }, []);

  const adminLogout = useCallback(() => {
    setIsAdmin(false);
  }, []);

  const addAdmin = useCallback((admin: AdminUser) => {
    setAdmins(prev => [...prev, admin]);
  }, []);

  const removeAdmin = useCallback((id: number) => {
    setAdmins(prev => prev.filter(a => a.id !== id));
  }, []);

  return (
    <StoreContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartCount,
        wishlist,
        toggleWishlist,
        isInWishlist,
        user,
        isLoggedIn: !!user,
        login,
        logout,
        orders,
        addOrder,
        searchQuery,
        setSearchQuery,
        chatMessages,
        addChatMessage,
        chatMode,
        setChatMode,
        isAdmin,
        adminLogin,
        adminLogout,
        admins,
        addAdmin,
        removeAdmin,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) throw new Error('useStore must be used within StoreProvider');
  return context;
}
