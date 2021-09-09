import React, { useReducer, useState } from 'react';
import { useEffect } from 'react';
import { createContext } from 'react';
import { useLocalStorage } from 'react-use';

import { OrderItem } from '../types/OrderItem';

type CartProviderProps = {
  children: React.ReactNode;
};
type CartState = {
  items: OrderItem[];
  count: number;
  subtotal: number;
};
export type CartAction =
  | { type: 'ADD_ORDER'; payload: OrderItem }
  | { type: 'REMOVE_ORDER'; payload: number | string }
  | { type: 'CALCULATE_SUBTOTAL' }
  | { type: 'GET_ITEM_COUNT' };

const initialState = {
  items: [],
  count: 0,
  subtotal: 0
};

const cartReducer = (state: CartState, action: CartAction) => {
  switch (action.type) {
    case 'ADD_ORDER':
      const currentOrderItem = state.items.find((item: OrderItem) => item.id === action.payload.id);

      if (currentOrderItem) {
        const updateIndex = state.items.indexOf(currentOrderItem);
        return {
          ...state,
          items: [
            ...state.items.slice(0, updateIndex),
            {
              ...currentOrderItem,
              quantity: state.items[updateIndex].quantity + action.payload.quantity
            },
            ...state.items.slice(updateIndex + 1)
          ]
        };
      }

      return {
        ...state,
        items: [...state.items, { ...action.payload }]
      };
    case 'REMOVE_ORDER':
      const ix = state.items.findIndex((item: OrderItem) => item.id === action.payload) ?? -1;
      if (ix > -1 && typeof state.items !== 'undefined') {
        const updatedItems = [...state.items.slice(0, ix), ...state.items.slice(ix + 1)];
        return {
          ...state,
          items: updatedItems
        };
      }
      return state;
    case 'CALCULATE_SUBTOTAL':
      return {
        ...state,
        subtotal: Number(
          state.items
            .reduce((acc: number, item: OrderItem) => {
              acc += item.price * item.quantity;
              return acc;
            }, 0)
            .toFixed(2)
        )
      };
    case 'GET_ITEM_COUNT':
      return {
        ...state,
        count: state.items.reduce((acc: number, item: OrderItem) => {
          acc += item.quantity;
          return acc;
        }, 0)
      };
    default:
      return { ...state };
  }
};

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
}>({ state: initialState, dispatch: () => {} });

const CartProvider = ({ children }: CartProviderProps) => {
  const [storageState, setStorageState] = useLocalStorage<CartState>('order', initialState);
  const [state, dispatch] = useReducer(cartReducer, storageState || initialState);

  useEffect(() => {
    setStorageState(state);
  }, [state, setStorageState]);

  useEffect(() => {
    dispatch({ type: 'CALCULATE_SUBTOTAL' });
    dispatch({ type: 'GET_ITEM_COUNT' });
  }, [state.items]);

  return <CartContext.Provider value={{ state, dispatch }}>{children}</CartContext.Provider>;
};

export default CartContext;
export { CartProvider };
