'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';

function WishlistIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  );
}

export function Header() {
  const { itemCount } = useCart();
  const { itemCount: wishlistCount } = useWishlist();

  return (
    <header className="border-b border-black/10 dark:border-white/10">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
        <Link href="/" className="text-lg font-bold">
          Frozen Store
        </Link>

        <div className="flex flex-1 justify-center px-4">
          <input
            type="search"
            placeholder="Search products…"
            aria-label="Search products"
            className="w-full max-w-md rounded-full border border-black/10 bg-transparent px-4 py-1.5 text-sm outline-none focus:border-black/30 dark:border-white/10 dark:focus:border-white/30"
          />
        </div>

        <nav className="flex items-center gap-6 text-sm">
          <Link href="/wishlist" aria-label="Wishlist" className="relative flex items-center">
            <WishlistIcon />
            {wishlistCount > 0 && (
              <span className="ml-1 rounded-full bg-black px-2 py-0.5 text-xs text-white dark:bg-white dark:text-black">
                {wishlistCount}
              </span>
            )}
          </Link>
          <Link href="/cart" aria-label="Cart" className="relative flex items-center">
            <CartIcon />
            {itemCount > 0 && (
              <span className="ml-1 rounded-full bg-black px-2 py-0.5 text-xs text-white dark:bg-white dark:text-black">
                {itemCount}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}
