'use client';

import Link from 'next/link';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/currency';

export default function WishlistPage() {
  const { items, removeItem } = useWishlist();
  const { addItem } = useCart();

  if (items.length === 0) {
    return (
      <div>
        <h1 className="text-2xl font-bold">Your wishlist</h1>
        <p className="mt-4 opacity-70">
          Your wishlist is empty. <Link href="/" className="underline">Continue shopping</Link>.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">Your wishlist</h1>

      <div className="mt-6 divide-y divide-black/10 dark:divide-white/10">
        {items.map((product) => (
          <div key={product.id} className="flex items-center gap-4 py-4">
            <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded bg-black/5 dark:bg-white/5">
              {product.imageUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={product.imageUrl} alt={product.name} className="h-full w-full object-cover" />
              )}
            </div>

            <div className="flex-1">
              <Link href={`/products/${product.id}`} className="font-medium hover:underline">
                {product.name}
              </Link>
              <p className="text-sm opacity-70">{formatPrice(product.price)}</p>
            </div>

            <button
              onClick={() => addItem(product)}
              className="rounded-md bg-black px-4 py-2 text-sm text-white dark:bg-white dark:text-black"
            >
              Add to cart
            </button>

            <button onClick={() => removeItem(product.id)} className="text-sm text-red-600 hover:underline">
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
