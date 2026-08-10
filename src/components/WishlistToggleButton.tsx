'use client';

import { Product } from '@/lib/types';
import { useWishlist } from '@/context/WishlistContext';

export function WishlistToggleButton({ product, className = '' }: { product: Product; className?: string }) {
  const { toggleItem, isInWishlist } = useWishlist();
  const saved = isInWishlist(product.id);

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleItem(product);
      }}
      aria-label={saved ? 'Remove from wishlist' : 'Add to wishlist'}
      aria-pressed={saved}
      className={`inline-flex items-center justify-center rounded-full p-2 transition hover:bg-black/5 dark:hover:bg-white/10 ${className}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill={saved ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`h-5 w-5 ${saved ? 'text-red-600' : ''}`}
        aria-hidden="true"
      >
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z" />
      </svg>
    </button>
  );
}
