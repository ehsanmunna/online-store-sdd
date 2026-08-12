'use client';

import { use, useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { apiFetch } from '@/lib/api';
import { Order } from '@/lib/types';
import { formatPrice } from '@/lib/currency';

export default function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { user, loading: authLoading } = useAuth();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }
    apiFetch<Order>(`/orders/${id}`, { token: user.accessToken })
      .then(setOrder)
      .finally(() => setLoading(false));
  }, [user, id]);

  if (authLoading || loading) return null;

  if (!user) {
    return (
      <div>
        <p className="opacity-70">
          Please <Link href="/login" className="underline">log in</Link> to view this order.
        </p>
      </div>
    );
  }

  if (!order) {
    return <p className="opacity-70">Order not found.</p>;
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{order.orderNumber}</h1>
          <p className="text-sm opacity-70">Placed {new Date(order.createdAt).toLocaleString()}</p>
        </div>
        <span className="rounded-full bg-black/10 px-3 py-1 text-sm dark:bg-white/10">{order.status}</span>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <div className="rounded-lg border border-black/10 p-4 dark:border-white/10">
          <h2 className="font-semibold">Shipping address</h2>
          <p className="mt-2 text-sm">{order.shippingFullName}</p>
          <p className="text-sm">{order.shippingAddressLine1}</p>
          {order.shippingAddressLine2 && <p className="text-sm">{order.shippingAddressLine2}</p>}
          <p className="text-sm">
            {order.shippingCity} {order.shippingPostalCode}
          </p>
          <p className="text-sm">{order.shippingPhone}</p>
        </div>

        <div className="rounded-lg border border-black/10 p-4 dark:border-white/10">
          <h2 className="font-semibold">Order totals</h2>
          <div className="mt-2 flex justify-between text-sm">
            <span>Subtotal</span>
            <span>{formatPrice(order.subTotal)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Shipping</span>
            <span>{formatPrice(order.shippingCost)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Tax</span>
            <span>{formatPrice(order.tax)}</span>
          </div>
          <div className="mt-2 flex justify-between border-t border-black/10 pt-2 font-semibold dark:border-white/10">
            <span>Total</span>
            <span>{formatPrice(order.totalAmount)}</span>
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-lg border border-black/10 p-4 dark:border-white/10">
        <h2 className="font-semibold">Items</h2>
        <div className="mt-3 divide-y divide-black/10 dark:divide-white/10">
          {order.items.map((item) => (
            <div key={item.productId} className="flex justify-between py-2 text-sm">
              <span>
                {item.productName} × {item.quantity}
              </span>
              <span>{formatPrice(item.lineTotal)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
