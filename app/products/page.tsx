'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useCart, Product } from '../cart/CartContext';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [sort, setSort] = useState<'default' | 'title' | 'price'>('default');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { addToCart } = useCart();
  const [quantities, setQuantities] = useState<Record<number, number>>({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError('');
        const res = await fetch('https://fakestoreapi.com/products');
        if (!res.ok) throw new Error('Błąd sieci');
        const data: Product[] = await res.json();
        setProducts(data);
        const initialQuantities: Record<number, number> = {};
        data.forEach((p) => {
          initialQuantities[p.id] = 1;
        });
        setQuantities(initialQuantities);
      } catch (err) {
        console.error(err);
        setError('Nie udało się pobrać produktów');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const sortedProducts = [...products].sort((a, b) => {
    if (sort === 'title') return a.title.localeCompare(b.title);
    if (sort === 'price') return a.price - b.price;
    return 0;
  });

  const handleQuantityChange = (id: number, value: number) => {
    setQuantities((prev) => ({ ...prev, [id]: Math.max(1, value) }));
  };

  if (loading) return <p className="text-white text-center mt-10">Ładowanie produktów...</p>;
  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">Produkty</h1>

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow flex flex-col"
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
              <p className="text-yellow-500 mb-2">Ocena: {product.rating.rate} ⭐</p>

              <div className="flex items-center gap-2 mb-4">
                <button
                  onClick={() =>
                    handleQuantityChange(product.id, quantities[product.id] - 1)
                  }
                  className="px-3 py-1 bg-gray-300 rounded font-bold"
                >
                  -
                </button>
                <input
                  type="number"
                  value={quantities[product.id] || 1}
                  min={1}
                  onChange={(e) =>
                    handleQuantityChange(product.id, Number(e.target.value))
                  }
                  className="w-16 text-center rounded p-1 border"
                />
                <button
                  onClick={() =>
                    handleQuantityChange(product.id, quantities[product.id] + 1)
                  }
                  className="px-3 py-1 bg-gray-300 rounded font-bold"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => addToCart(product, quantities[product.id] || 1)}
                className="mt-auto px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded font-bold"
              >
                Dodaj do koszyka
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
