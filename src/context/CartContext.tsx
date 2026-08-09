'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Product } from '@/lib/types';

const STORAGE_KEY = 'frozen_store_cart';

export interface CartLine {
  product: Product;
  quantity: number;
}

interface CartContextValue {
  lines: CartLine[];
  addItem: (product: Product, quantity?: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  clear: () => void;
  itemCount: number;
  subTotal: number;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        setLines(JSON.parse(raw));
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    }
  }, [lines, hydrated]);

  function addItem(product: Product, quantity = 1) {
    setLines((prev) => {
      const existing = prev.find((line) => line.product.id === product.id);
      if (existing) {
        return prev.map((line) =>
          line.product.id === product.id ? { ...line, quantity: line.quantity + quantity } : line
        );
      }
      return [...prev, { product, quantity }];
    });
  }

  function updateQuantity(productId: string, quantity: number) {
    setLines((prev) =>
      quantity <= 0
        ? prev.filter((line) => line.product.id !== productId)
        : prev.map((line) => (line.product.id === productId ? { ...line, quantity } : line))
    );
  }

  function removeItem(productId: string) {
    setLines((prev) => prev.filter((line) => line.product.id !== productId));
  }

  function clear() {
    setLines([]);
  }

  const itemCount = lines.reduce((sum, line) => sum + line.quantity, 0);
  const subTotal = lines.reduce((sum, line) => sum + line.quantity * line.product.price, 0);

  return (
    <CartContext.Provider value={{ lines, addItem, updateQuantity, removeItem, clear, itemCount, subTotal }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
