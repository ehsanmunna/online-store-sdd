import { notFound } from 'next/navigation';
import { apiFetch, ApiError } from '@/lib/api';
import { Product } from '@/lib/types';
import { AddToCartButton } from '@/components/AddToCartButton';

async function getProduct(id: string): Promise<Product | null> {
  try {
    return await apiFetch<Product>(`/products/${id}`);
  } catch (err) {
    if (err instanceof ApiError && err.status === 404) return null;
    throw err;
  }
}

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) notFound();

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div className="aspect-square overflow-hidden rounded-lg bg-black/5 dark:bg-white/5">
        {product.imageUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={product.imageUrl} alt={product.name} className="h-full w-full object-cover" />
        )}
      </div>

      <div>
        <p className="text-xs uppercase tracking-wide opacity-60">{product.categoryName}</p>
        <h1 className="mt-1 text-2xl font-bold">{product.name}</h1>

        <div className="mt-3 flex items-center gap-3">
          <span className="text-xl font-semibold">${product.price.toFixed(2)}</span>
          {product.compareAtPrice && product.compareAtPrice > product.price && (
            <span className="opacity-50 line-through">${product.compareAtPrice.toFixed(2)}</span>
          )}
        </div>

        {product.description && <p className="mt-4 opacity-80">{product.description}</p>}

        <p className="mt-4 text-sm opacity-70">
          {product.stockQuantity > 0 ? `${product.stockQuantity} in stock` : 'Currently out of stock'}
        </p>

        <div className="mt-6">
          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  );
}
