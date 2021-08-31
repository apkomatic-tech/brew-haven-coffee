import React, { useState } from 'react';
import { useEffect } from 'react';
import { createContext } from 'react';
import { useLocalStorage } from 'react-use';

import { CartContextInterface } from '../interfaces/CartInterface';
import { OrderItem } from '../types/OrderItem';

const CartContext = createContext<CartContextInterface | null>(null);

const CartProvider = ({ children }: { children: any }) => {
  const [items, setItems] = useLocalStorage<OrderItem[]>('order', []);

  function addToOrder(product: any) {
    const orderItems = items ?? [];
    const indexOfExistingOrder = orderItems.findIndex((x: any) => x.id === product.id);
    if (indexOfExistingOrder > -1) {
      orderItems[indexOfExistingOrder].quantity += 1;
      return setItems(orderItems);
    }

    orderItems.push(product);
    return setItems(orderItems);
  }

  function removeFromOrder(id: any) {
    const ix = items?.findIndex((item) => item.id === id) ?? -1;
    if (ix > -1) {
      setItems([...items.slice(0, ix), ...items.slice(ix + 1)]);
    }
  }

  const sampleCartContext: CartContextInterface = {
    count: items?.length ?? 0,
    items: items || [],
    addToOrder,
    removeFromOrder
  };

  return <CartContext.Provider value={sampleCartContext}>{children}</CartContext.Provider>;
};

export default CartContext;
export { CartProvider };
