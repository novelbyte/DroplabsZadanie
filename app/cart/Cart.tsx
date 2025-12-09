'use client';
import { useState } from 'react';
import { useCart } from './CartContext';
import { FaShoppingCart } from 'react-icons/fa';
import CartModal from './CartModal';

export default function Cart() {
  const { cart, totalItems, removeFromCart, updateQuantity } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="fixed top-[100px] right-4 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="relative text-3xl text-white/80 bg-[#0f172a] p-3 rounded shadow-lg hover:bg-[#1e293b] transition"
        >
          <FaShoppingCart />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-2 text-xs">
              {totalItems}
            </span>
          )}
        </button>
      </div>

      <CartModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        cart={cart}
        removeFromCart={removeFromCart}
        updateQuantity={updateQuantity}
      />
    </>
  );
}
