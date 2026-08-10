import Link from 'next/link';
import { Product } from '@/lib/types';
import { formatPrice } from '@/lib/currency';
import { WishlistToggleButton } from '@/components/WishlistToggleButton';

export function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group relative overflow-hidden rounded-lg border border-black/10 dark:border-white/10">
      <WishlistToggleButton
        product={product}
        className="absolute right-2 top-2 z-10 bg-white/80 dark:bg-black/50"
      />
      <Link href={`/products/${product.id}`} className="block">
        <div className="aspect-square bg-black/5 dark:bg-white/5">
          {product.imageUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={product.imageUrl}
              alt={product.name}
              className="h-full w-full object-cover transition group-hover:scale-105"
            />
          )}
        </div>
        <div className="p-3">
          <p className="text-xs uppercase tracking-wide opacity-60">{product.categoryName}</p>
          <h3 className="mt-1 font-medium">{product.name}</h3>
          <div className="mt-2 flex items-center gap-2">
            <span className="font-semibold">{formatPrice(product.price)}</span>
            {product.compareAtPrice && product.compareAtPrice > product.price && (
              <span className="text-sm opacity-50 line-through">{formatPrice(product.compareAtPrice)}</span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}
