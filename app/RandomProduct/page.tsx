'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useCart, Product } from '../cart/CartContext';

export default function RandomProduct() {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchRandomProduct = async () => {
      try {
        setLoading(true);
        setError('');
        const res = await fetch('https://fakestoreapi.com/products');
        if (!res.ok) throw new Error('Błąd sieci');
        const data: Product[] = await res.json();
        const random = data[Math.floor(Math.random() * data.length)];
        setProduct(random);
      } catch (err) {
        console.error(err);
        setError('Nie udało się pobrać produktu');
      } finally {
        setLoading(false);
      }
    };

    fetchRandomProduct();
  }, []);

  if (loading) return <p className="text-white text-center mt-10">Ładowanie produktu...</p>;
  if (error || !product) return <p className="text-red-500 text-center mt-10">{error}</p>;

  return (
    <div className="bg-[#1e293b] p-6 rounded-lg shadow-lg max-w-md mx-auto mt-6 text-white flex flex-col items-center">
      <div className="relative h-64 w-full mb-4">
        <Image
          src={product.image}
          alt={product.title}
          fill
          style={{ objectFit: 'contain' }}
        />
      </div>
      <h2 className="text-xl font-bold mb-2">{product.title}</h2>
      <p className="text-white/70 mb-1">Kategoria: {product.category}</p>
      <p className="font-bold text-indigo-400 mb-1">Cena: ${product.price}</p>
      <p className="text-yellow-400 mb-4">Ocena: {product.rating.rate} ⭐</p>

      <div className="flex items-center gap-2 mb-4">
        <button
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
          className="px-3 py-1 bg-gray-700 rounded font-bold"
        >
          -
        </button>
        <input
          type="number"
          value={quantity}
          min={1}
          onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
          className="w-16 text-black text-center rounded p-1"
        />
        <button
          onClick={() => setQuantity(quantity + 1)}
          className="px-3 py-1 bg-gray-700 rounded font-bold"
        >
          +
        </button>
      </div>

      <button
        onClick={() => addToCart(product, quantity)}
        className="px-6 py-2 bg-blue-600 hover:bg-blue-500 rounded font-bold"
      >
        Dodaj do koszyka
      </button>
    </div>
  );
}
