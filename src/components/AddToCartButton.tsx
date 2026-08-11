'use client';

import { ReactNode, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { Product } from '@/lib/types';

export function AddToCartButton({ product, actionsEnd }: { product: Product; actionsEnd?: ReactNode }) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const router = useRouter();

  function handleAdd() {
    addItem(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  function handleBuyNow() {
    addItem(product, quantity);
    router.push('/cart');
  }

  const outOfStock = product.stockQuantity <= 0;

  return (
    <div className="flex flex-col gap-3">
      <label className="flex items-center gap-2 text-sm">
        Quantity
        <input
          type="number"
          min={1}
          max={product.stockQuantity}
          value={quantity}
          onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
          className="w-20 rounded border border-black/20 px-2 py-1 dark:border-white/20"
          disabled={outOfStock}
        />
      </label>

      <div className="flex gap-3">
        <button
          onClick={handleAdd}
          disabled={outOfStock}
          className="flex-1 rounded-md bg-black px-4 py-2 text-white disabled:opacity-40 dark:bg-white dark:text-black"
        >
          {outOfStock ? 'Out of stock' : added ? 'Added ✓' : 'Add to cart'}
        </button>
        <button
          onClick={handleBuyNow}
          disabled={outOfStock}
          className="flex-1 rounded-md border border-black/20 px-4 py-2 disabled:opacity-40 dark:border-white/20"
        >
          Buy now
        </button>
        {actionsEnd}
      </div>
    </div>
  );
}
