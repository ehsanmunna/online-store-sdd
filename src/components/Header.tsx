'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';

export function Header() {
  const { user, logout } = useAuth();
  const { itemCount } = useCart();

  return (
    <header className="border-b border-black/10 dark:border-white/10">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-lg font-bold">
          Frozen Store
        </Link>

        <nav className="flex items-center gap-6 text-sm">
          <Link href="/">Shop</Link>
          {user && <Link href="/orders">My orders</Link>}
          <Link href="/cart" className="relative">
            Cart
            {itemCount > 0 && (
              <span className="ml-1 rounded-full bg-black px-2 py-0.5 text-xs text-white dark:bg-white dark:text-black">
                {itemCount}
              </span>
            )}
          </Link>

          {user ? (
            <button onClick={logout} className="text-sm opacity-80 hover:opacity-100">
              Log out ({user.firstName})
            </button>
          ) : (
            <Link href="/login">Log in</Link>
          )}
        </nav>
      </div>
    </header>
  );
}
