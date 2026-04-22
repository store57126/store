import { Link } from 'react-router';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Button } from '@/components/ui/button';
import type { Product } from '../data/products';

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart, toggleWishlist, isInWishlist } = useStore();

  return (
    <div className="group relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-blue-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/5">
      {/* Badge */}
      {product.badge && (
        <div className="absolute top-3 left-3 z-10 px-3 py-1 rounded-full text-xs font-medium bg-blue-500 text-white">
          {product.badge}
        </div>
      )}

      {/* Wishlist */}
      <button
        onClick={() => toggleWishlist(product.id)}
        className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/30 backdrop-blur-sm text-white/70 hover:text-red-400 transition-all"
      >
        <Heart className={`w-4 h-4 ${isInWishlist(product.id) ? 'fill-red-500 text-red-500' : ''}`} />
      </button>

      {/* Image */}
      <Link to={`/product/${product.id}`} className="block aspect-square overflow-hidden bg-gradient-to-b from-white/5 to-transparent p-4">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
        />
      </Link>

      {/* Info */}
      <div className="p-4 pt-2">
        <Link to={`/product/${product.id}`}>
          <h3 className="text-white font-medium text-sm mb-1 hover:text-blue-400 transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-white/20'}`}
              />
            ))}
          </div>
          <span className="text-white/50 text-xs">({product.rating})</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-blue-400 font-bold text-lg">{product.price.toLocaleString()} جنيه</span>
          {product.oldPrice && (
            <span className="text-white/40 text-sm line-through">{product.oldPrice.toLocaleString()}</span>
          )}
        </div>

        {/* Add to Cart */}
        <Button
          onClick={() => addToCart({ product, quantity: 1 })}
          className="w-full bg-blue-600 hover:bg-blue-500 text-white rounded-xl py-2 text-sm font-medium transition-all flex items-center justify-center gap-2"
        >
          <ShoppingCart className="w-4 h-4" />
          أضف للسلة
        </Button>
      </div>
    </div>
  );
}
