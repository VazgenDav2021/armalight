import type { Category, Product } from '@/lib/types';

const categories: Category[] = [
  { id: 'c1', slug: 'all', name: 'All' },
  { id: 'c2', slug: 'electronics', name: 'Electronics' },
  { id: 'c3', slug: 'furniture', name: 'Furniture' }
];

const products: Product[] = Array.from({ length: 60 }).map((_, i) => ({
  id: `p${i+1}`,
  code: `SKU-${1000 + i}`,
  name: `Product ${i+1}`,
  description: 'Full description of the product',
  shortDetails: 'Short details of the product',
  price: Math.round(10 + Math.random() * 500),
  image: `/common/product${(i % 6) + 1}.svg`,
  technical: { weight: `${1 + (i % 10)}kg` },
  attributes: { color: ['red','blue','green'][i % 3] },
  categoryId: categories[1 + (i % (categories.length - 1))].id
}));

export async function getProducts({ page, pageSize }: { page: number; pageSize: number }) {
  const start = (page - 1) * pageSize;
  const items = products.slice(start, start + pageSize);
  return { items, total: products.length };
}

export async function getCategoryBySlug(slug: string) {
  return categories.find(c => c.slug === slug);
}

export async function getProductsByCategory({ slug, page, pageSize }: { slug: string; page: number; pageSize: number }) {
  const category = await getCategoryBySlug(slug);
  const filtered = slug === 'all' || !category ? products : products.filter(p => p.categoryId === category.id);
  const start = (page - 1) * pageSize;
  const items = filtered.slice(start, start + pageSize);
  return { items, total: filtered.length };
}


export async function getProductById(id: string) {
  return products.find((p) => p.id === id);
}
