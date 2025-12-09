// CartContext.tsx
'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Product = {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
  rating: { rate: number; count: number };
};

// Typ produktu w koszyku
export type CartItem = Product & { quantity: number };

type CartContextType = {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (id: number) => void;
  totalItems: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('cart');
    return stored ? JSON.parse(stored) : [];
  }
  return [];
});


  // Zapis koszyka do localStorage przy zmianach
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product, quantity: number = 1) => {
    setCart(prev => {
      const exist = prev.find(p => p.id === product.id);
      if (exist) {
        // jeśli produkt jest, sumujemy quantity
        return prev.map(p =>
          p.id === product.id ? { ...p, quantity: p.quantity + quantity } : p
        );
      }
      // jeśli nie ma produktu, dodajemy nowy z quantity
      return [...prev, { ...product, quantity }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(p => p.id !== id));
  };

  const totalItems = cart.reduce((sum, p) => sum + p.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, totalItems }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};
