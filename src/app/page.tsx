import { apiFetch } from '@/lib/api';
import { PagedResult, Product } from '@/lib/types';
import { ProductCard } from '@/components/ProductCard';

export const dynamic = 'force-dynamic';

async function getProducts(): Promise<Product[]> {
  try {
    const result = await apiFetch<PagedResult<Product>>('/products?page=1&pageSize=24&isActive=true');
    return result.items;
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const products = await getProducts();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Shop all products</h1>
        <p className="mt-1 opacity-70">Fresh finds, shipped straight to your door.</p>
      </div>

      {products.length === 0 ? (
        <p className="opacity-70">No products available right now. Check back soon.</p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
