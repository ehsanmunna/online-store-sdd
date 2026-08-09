'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/currency';

export default function CartPage() {
  const { lines, updateQuantity, removeItem, subTotal } = useCart();

  if (lines.length === 0) {
    return (
      <div>
        <h1 className="text-2xl font-bold">Your cart</h1>
        <p className="mt-4 opacity-70">
          Your cart is empty. <Link href="/" className="underline">Continue shopping</Link>.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">Your cart</h1>

      <div className="mt-6 divide-y divide-black/10 dark:divide-white/10">
        {lines.map((line) => (
          <div key={line.product.id} className="flex items-center gap-4 py-4">
            <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded bg-black/5 dark:bg-white/5">
              {line.product.imageUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={line.product.imageUrl} alt={line.product.name} className="h-full w-full object-cover" />
              )}
            </div>

            <div className="flex-1">
              <Link href={`/products/${line.product.id}`} className="font-medium hover:underline">
                {line.product.name}
              </Link>
              <p className="text-sm opacity-70">{formatPrice(line.product.price)} each</p>
            </div>

            <input
              type="number"
              min={1}
              max={line.product.stockQuantity}
              value={line.quantity}
              onChange={(e) => updateQuantity(line.product.id, Number(e.target.value))}
              className="w-16 rounded border border-black/20 px-2 py-1 dark:border-white/20"
            />

            <span className="w-20 text-right font-medium">
              {formatPrice(line.product.price * line.quantity)}
            </span>

            <button onClick={() => removeItem(line.product.id)} className="text-sm text-red-600 hover:underline">
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-black/10 pt-4 dark:border-white/10">
        <span className="text-lg font-semibold">Subtotal: {formatPrice(subTotal)}</span>
        <Link
          href="/checkout"
          className="rounded-md bg-black px-6 py-2 text-white dark:bg-white dark:text-black"
        >
          Checkout
        </Link>
      </div>
    </div>
  );
}
