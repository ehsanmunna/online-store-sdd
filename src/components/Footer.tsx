'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export function Footer() {
  const { user } = useAuth();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-black/10 dark:border-white/10">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="text-lg font-bold">
              Frozen Store
            </Link>
            <p className="mt-2 text-sm opacity-70">Fresh finds, shipped straight to your door.</p>
            <div className="mt-4 flex max-w-xs gap-2">
              <input
                type="email"
                placeholder="Your email"
                aria-label="Email address"
                className="w-full rounded-md border border-black/10 bg-transparent px-3 py-1.5 text-sm dark:border-white/10"
              />
              <button
                type="button"
                className="shrink-0 rounded-md bg-black px-3 py-1.5 text-sm text-white dark:bg-white dark:text-black"
              >
                Subscribe
              </button>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold">Shop</h3>
            <ul className="mt-3 space-y-2 text-sm opacity-70">
              <li><Link href="/">Shop all</Link></li>
              <li><Link href="/cart">Cart</Link></li>
              {user ? (
                <li><Link href="/orders">My orders</Link></li>
              ) : (
                <li><Link href="/login">Log in</Link></li>
              )}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold">Company</h3>
            <ul className="mt-3 space-y-2 text-sm opacity-70">
              <li><a href="#">About Us</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold">Support</h3>
            <ul className="mt-3 space-y-2 text-sm opacity-70">
              <li><a href="#">FAQ</a></li>
              <li><a href="#">Shipping &amp; Returns</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-black/10 pt-6 text-xs opacity-70 sm:flex-row dark:border-white/10">
          <p>© {year} Frozen Store. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#">Twitter</a>
            <a href="#">Instagram</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
