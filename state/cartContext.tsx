import React, { useState } from 'react';
import { createContext } from 'react';
import { CartContextInterface } from '../interfaces/CartInterface';

const CartContext = createContext<CartContextInterface | null>(null);

const CartProvider = ({ children }: { children: any }) => {
  const [items, setItems] = useState([]);

  const sampleCartContext: CartContextInterface = {
    count: items.length,
    items
  };

  return <CartContext.Provider value={sampleCartContext}>{children}</CartContext.Provider>;
};

export default CartContext;
export { CartProvider };
