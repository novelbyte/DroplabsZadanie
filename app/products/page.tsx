'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useCart } from '../cart/CartContext';

type Product = {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
  rating: { rate: number; count: number };
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [sort, setSort] = useState<'default' | 'title' | 'price'>('default');
  const { addToCart } = useCart();
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('https://fakestoreapi.com/products');
        if (!res.ok) throw new Error('Błąd sieci');
        const data: Product[] = await res.json();
        setProducts(data);

        const initialQuantities: { [key: number]: number } = {};
        data.forEach((p) => (initialQuantities[p.id] = 1));
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

  const handleAddToCart = (product: Product) => {
    addToCart({ ...product, quantity: quantities[product.id] || 1 });
  };

  const handleQuantityChange = (productId: number, value: number) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: Math.max(1, value),
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4 text-white">Produkty</h1>

        {/* Sortowanie */}
        <div className="mb-6 flex items-center gap-4 text-white">
          <span className="font-medium">Sortuj po:</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as 'default' | 'title' | 'price')}
            className="px-3 py-2 rounded-md bg-gray-700 text-white"
          >
            <option value="default">Domyślnie</option>
            <option value="title">Tytule</option>
            <option value="price">Cenie</option>
          </select>
        </div>

        {/* Loading */}
        {loading && <p className="text-white text-center text-lg">Ładowanie produktów...</p>}

        {/* Error */}
        {error && <p className="text-red-500 text-center text-lg">{error}</p>}

        {/* Lista produktów */}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedProducts.map((product) => (
              <div
                key={product.id}
                className="bg-[#1e293b] p-4 rounded-lg shadow hover:shadow-lg transition flex flex-col"
              >
                <div className="relative h-48 w-full mb-4">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    style={{ objectFit: 'contain' }}
                  />
                </div>
                <h2 className="font-semibold text-lg mb-1 text-white">{product.title}</h2>
                <p className="text-white/70 mb-1">Kategoria: {product.category}</p>
                <p className="font-bold text-indigo-400 mb-1">Cena: ${product.price}</p>
                <p className="text-yellow-400 mb-2">Ocena: {product.rating.rate} ⭐</p>

                {/* Wybór ilości */}
                <div className="flex items-center gap-2 mb-2">
                  <button
                    onClick={() =>
                      handleQuantityChange(product.id, (quantities[product.id] || 1) - 1)
                    }
                    className="px-2 py-1 bg-gray-700 rounded text-white font-bold"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min={1}
                    value={quantities[product.id] || 1}
                    onChange={(e) =>
                      handleQuantityChange(product.id, Number(e.target.value))
                    }
                    className="w-12 p-1 text-black text-center rounded"
                  />
                  <button
                    onClick={() =>
                      handleQuantityChange(product.id, (quantities[product.id] || 1) + 1)
                    }
                    className="px-2 py-1 bg-gray-700 rounded text-white font-bold"
                  >
                    +
                  </button>
                </div>

                {/* Dodaj do koszyka */}
                <button
                  onClick={() => handleAddToCart(product)}
                  className="mt-auto px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded text-white font-bold"
                >
                  Dodaj do koszyka
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
