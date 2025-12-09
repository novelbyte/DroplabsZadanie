'use client';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { CartItem } from './CartContext';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
};

export default function CartModal({ isOpen, onClose, cart, removeFromCart, updateQuantity }: Props) {
  if (!isOpen) return null;

  return createPortal(
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />
      <div className="fixed top-1/2 left-1/2 w-3/4 max-w-3xl max-h-[80vh] overflow-y-auto bg-[#1e293b] text-white rounded shadow-lg p-6 z-50 -translate-x-1/2 -translate-y-1/2">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold text-lg">Twój koszyk</h2>
          <button onClick={onClose} className="text-xl font-bold">×</button>
        </div>

        {cart.length === 0 ? (
          <p>Twój koszyk jest pusty.</p>
        ) : (
          <div className="space-y-4">
            {cart.map(item => (
              <div key={item.id} className="flex items-center gap-2 bg-[#111827] p-2 rounded">
                <div className="relative w-16 h-16">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    style={{ objectFit: 'contain' }}
                  />
                </div>
                <div className="flex-1">
                  <p className="font-medium">{item.title}</p>
                  <p>${item.price}</p>
                  <input
                    type="number"
                    min={1}
                    value={item.quantity}
                    onChange={e => updateQuantity(item.id, Number(e.target.value))}
                    className="w-16 p-1 text-black rounded"
                  />
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 font-bold text-xl"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>,
    document.body
  );
}
