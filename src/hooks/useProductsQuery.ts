import { useQuery } from '@tanstack/react-query';
import { Product } from '../types';
import { PRODUCTS } from '../data/products';
import { fetchProductsFromStripe } from '../services/stripeApi';

// Programmatically fetch products from backend Stripe API or local boutique catalog
export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const data = await fetchProductsFromStripe();
    if (data.products && data.products.length > 0) {
      return data.products;
    }
    return PRODUCTS;
  } catch (err) {
    return PRODUCTS;
  }
};

export const fetchProductById = async (id: string): Promise<Product | undefined> => {
  await new Promise((resolve) => setTimeout(resolve, 50));
  return PRODUCTS.find((p) => p.id === id);
};

export function useAllProducts() {
  return useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function useProductsByCategory(category: string) {
  return useQuery({
    queryKey: ['products', 'category', category],
    queryFn: async () => {
      const all = await fetchProducts();
      if (!category || category === 'Todos') return all;
      return all.filter((p) => p.category.toLowerCase() === category.toLowerCase());
    },
    staleTime: 1000 * 60 * 5,
  });
}

export function useProductDetail(productId: string) {
  return useQuery({
    queryKey: ['product', productId],
    queryFn: () => fetchProductById(productId),
    enabled: Boolean(productId),
  });
}

export function useNewArrivals() {
  return useQuery({
    queryKey: ['products', 'newArrivals'],
    queryFn: async () => {
      const all = await fetchProducts();
      return all.filter((p) => p.isNew);
    },
  });
}

export function useBestsellers() {
  return useQuery({
    queryKey: ['products', 'bestsellers'],
    queryFn: async () => {
      const all = await fetchProducts();
      return all.filter((p) => p.isBestseller);
    },
  });
}
