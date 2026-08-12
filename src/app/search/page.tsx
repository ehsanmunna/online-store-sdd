import { apiFetch } from '@/lib/api';
import { PagedResult, Product } from '@/lib/types';
import { ProductCard } from '@/components/ProductCard';

export const dynamic = 'force-dynamic';

async function getProducts(query: string): Promise<Product[]> {
  try {
    const result = await apiFetch<PagedResult<Product>>(
      `/products?search=${encodeURIComponent(query)}&isActive=true`
    );
    return result.items;
  } catch {
    return [];
  }
}

export default async function SearchPage({
  searchParams
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = q?.trim() ?? '';
  const products = query ? await getProducts(query) : [];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold">
          {query ? `Search results for "${query}"` : 'Search products'}
        </h1>
        {query && <p className="mt-1 opacity-70">{products.length} product(s) found.</p>}
      </div>

      {!query ? (
        <p className="opacity-70">Enter a search term above to find products.</p>
      ) : products.length === 0 ? (
        <p className="opacity-70">No products found for &quot;{query}&quot;.</p>
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
