'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Product } from '@/lib/types';

const STORAGE_KEY = 'frozen_store_wishlist';

interface WishlistContextValue {
  items: Product[];
  itemCount: number;
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  toggleItem: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
}

const WishlistContext = createContext<WishlistContextValue | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Product[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        setItems(JSON.parse(raw));
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }
  }, [items, hydrated]);

  function addItem(product: Product) {
    setItems((prev) =>
      prev.some((item) => item.id === product.id) ? prev : [...prev, product]
    );
  }

  function removeItem(productId: string) {
    setItems((prev) => prev.filter((item) => item.id !== productId));
  }

  function toggleItem(product: Product) {
    setItems((prev) =>
      prev.some((item) => item.id === product.id)
        ? prev.filter((item) => item.id !== product.id)
        : [...prev, product]
    );
  }

  function isInWishlist(productId: string) {
    return items.some((item) => item.id === productId);
  }

  return (
    <WishlistContext.Provider
      value={{ items, itemCount: items.length, addItem, removeItem, toggleItem, isInWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider');
  return ctx;
}
