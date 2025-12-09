'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

type Product = {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [sort, setSort] = useState<'default' | 'title' | 'price'>('default');

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  }, []);

  const sortedProducts = [...products].sort((a, b) => {
    if (sort === 'title') return a.title.localeCompare(b.title);
    if (sort === 'price') return a.price - b.price;
    return 0;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">Produkty</h1>

        {/* Sortowanie */}
        <div className="mb-6 flex items-center gap-4">
          <span className="font-medium">Sortuj po:</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as 'default' | 'title' | 'price')}
            className="px-3 py-2 border rounded-md"
          >
            <option value="default">Domyślnie</option>
            <option value="title">Tytule</option>
            <option value="price">Cenie</option>
          </select>
        </div>

        {/* Lista produktów */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow"
            >
              <div className="relative h-48 w-full mb-4">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  style={{ objectFit: 'contain' }}
                />
              </div>
              <h2 className="font-semibold text-lg mb-1">{product.title}</h2>
              <p className="text-gray-700 mb-1">Kategoria: {product.category}</p>
              <p className="font-bold text-indigo-600 mb-1">Cena: ${product.price}</p>
              <p className="text-yellow-500">Ocena: {product.rating.rate} ⭐</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
