'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { apiFetch } from '@/lib/api';
import { Order } from '@/lib/types';
import { formatPrice } from '@/lib/currency';

export default function CheckoutPage() {
  const { user, loading: authLoading } = useAuth();
  const { lines, subTotal, clear } = useCart();
  const router = useRouter();

  const [form, setForm] = useState({
    shippingFullName: user ? `${user.firstName} ${user.lastName}` : '',
    shippingAddressLine1: '',
    shippingAddressLine2: '',
    shippingCity: '',
    shippingPostalCode: '',
    shippingPhone: ''
  });
  const [error, setError] = useState<string | null>(null);
  const [placing, setPlacing] = useState(false);

  function update(field: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!user) return;

    setPlacing(true);
    setError(null);

    try {
      const order = await apiFetch<Order>('/orders', {
        method: 'POST',
        token: user.accessToken,
        body: JSON.stringify({
          ...form,
          items: lines.map((line) => ({ productId: line.product.id, quantity: line.quantity }))
        })
      });
      clear();
      router.push(`/orders/${order.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to place order.');
    } finally {
      setPlacing(false);
    }
  }

  if (authLoading) return null;

  if (!user) {
    return (
      <div>
        <h1 className="text-2xl font-bold">Checkout</h1>
        <p className="mt-4 opacity-70">
          Please <Link href="/login" className="underline">log in</Link> to continue with checkout.
        </p>
      </div>
    );
  }

  if (lines.length === 0) {
    return (
      <div>
        <h1 className="text-2xl font-bold">Checkout</h1>
        <p className="mt-4 opacity-70">
          Your cart is empty. <Link href="/" className="underline">Continue shopping</Link>.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-8 md:grid-cols-3">
      <form onSubmit={onSubmit} className="flex flex-col gap-4 md:col-span-2">
        <h1 className="text-2xl font-bold">Shipping details</h1>

        <label className="flex flex-col gap-1 text-sm">
          Full name
          <input
            required
            value={form.shippingFullName}
            onChange={(e) => update('shippingFullName', e.target.value)}
            className="rounded border border-black/20 px-3 py-2 dark:border-white/20"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm">
          Address line 1
          <input
            required
            value={form.shippingAddressLine1}
            onChange={(e) => update('shippingAddressLine1', e.target.value)}
            className="rounded border border-black/20 px-3 py-2 dark:border-white/20"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm">
          Address line 2 (optional)
          <input
            value={form.shippingAddressLine2}
            onChange={(e) => update('shippingAddressLine2', e.target.value)}
            className="rounded border border-black/20 px-3 py-2 dark:border-white/20"
          />
        </label>

        <div className="grid grid-cols-2 gap-4">
          <label className="flex flex-col gap-1 text-sm">
            City
            <input
              required
              value={form.shippingCity}
              onChange={(e) => update('shippingCity', e.target.value)}
              className="rounded border border-black/20 px-3 py-2 dark:border-white/20"
            />
          </label>

          <label className="flex flex-col gap-1 text-sm">
            Postal code
            <input
              required
              value={form.shippingPostalCode}
              onChange={(e) => update('shippingPostalCode', e.target.value)}
              className="rounded border border-black/20 px-3 py-2 dark:border-white/20"
            />
          </label>
        </div>

        <label className="flex flex-col gap-1 text-sm">
          Phone
          <input
            required
            value={form.shippingPhone}
            onChange={(e) => update('shippingPhone', e.target.value)}
            className="rounded border border-black/20 px-3 py-2 dark:border-white/20"
          />
        </label>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={placing}
          className="rounded-md bg-black px-4 py-2 text-white disabled:opacity-50 dark:bg-white dark:text-black"
        >
          {placing ? 'Placing order…' : 'Place order'}
        </button>
      </form>

      <div className="rounded-lg border border-black/10 p-4 dark:border-white/10">
        <h2 className="font-semibold">Order summary</h2>
        <div className="mt-3 flex flex-col gap-2 text-sm">
          {lines.map((line) => (
            <div key={line.product.id} className="flex justify-between">
              <span>
                {line.product.name} × {line.quantity}
              </span>
              <span>{formatPrice(line.product.price * line.quantity)}</span>
            </div>
          ))}
        </div>
        <div className="mt-3 flex justify-between border-t border-black/10 pt-3 font-semibold dark:border-white/10">
          <span>Subtotal</span>
          <span>{formatPrice(subTotal)}</span>
        </div>
      </div>
    </div>
  );
}
