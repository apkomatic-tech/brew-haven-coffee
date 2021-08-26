import React, { useState } from 'react';
import { createContext } from 'react';

type OrderItem = {
  id: number | string;
  title: string;
  qty: number;
};

interface CartContextInterface {
  count: number;
  items: OrderItem[];
  increment: Function;
  decrement: Function;
}

const CartContext = createContext<CartContextInterface | null>(null);

const CartProvider = ({ children }: { children: any }) => {
  const [cartCount, setCartCount] = useState(0);
  const [items, setItems] = useState([]);

  function increment() {
    setCartCount((prev) => prev + 1);
  }

  function decrement() {
    setCartCount((prev) => (!prev ? 0 : prev - 1));
  }

  const sampleCartContext: CartContextInterface = {
    count: cartCount,
    items,
    increment,
    decrement
  };

  return <CartContext.Provider value={sampleCartContext}>{children}</CartContext.Provider>;
};

export default CartContext;
export { CartProvider };
