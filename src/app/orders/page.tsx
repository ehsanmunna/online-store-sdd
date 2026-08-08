'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { apiFetch } from '@/lib/api';
import { Order, PagedResult } from '@/lib/types';

export default function OrdersPage() {
  const { user, loading: authLoading } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }
    apiFetch<PagedResult<Order>>('/orders?page=1&pageSize=50', { token: user.accessToken })
      .then((result) => setOrders(result.items))
      .finally(() => setLoading(false));
  }, [user]);

  if (authLoading || loading) return null;

  if (!user) {
    return (
      <div>
        <h1 className="text-2xl font-bold">My orders</h1>
        <p className="mt-4 opacity-70">
          Please <Link href="/login" className="underline">log in</Link> to view your orders.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">My orders</h1>

      {orders.length === 0 ? (
        <p className="mt-4 opacity-70">You haven&apos;t placed any orders yet.</p>
      ) : (
        <div className="mt-6 divide-y divide-black/10 dark:divide-white/10">
          {orders.map((order) => (
            <Link
              key={order.id}
              href={`/orders/${order.id}`}
              className="flex items-center justify-between py-4 hover:opacity-70"
            >
              <div>
                <p className="font-medium">{order.orderNumber}</p>
                <p className="text-sm opacity-70">{new Date(order.createdAt).toLocaleDateString()}</p>
              </div>
              <div className="text-right">
                <p className="font-medium">${order.totalAmount.toFixed(2)}</p>
                <p className="text-sm opacity-70">{order.status}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
