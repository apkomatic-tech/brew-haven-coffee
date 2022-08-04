import React, { useContext, useMemo, useReducer, useState } from 'react';
import { useEffect } from 'react';
import { createContext } from 'react';
import { useLocalStorage } from 'react-use';
import { doc, getFirestore, onSnapshot } from 'firebase/firestore';

import { OrderItem } from '../types/OrderItem';
import { CartService } from '../service/cart.service';
import AuthContext from './authContext';
import { app } from '../getFirebaseApp';

const db = getFirestore(app);

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
  | { type: 'GET_ITEM_COUNT' }
  | { type: 'CLEAR_CART' }
  | { type: 'SET_CART'; payload: CartState };

function calculateSubtotalFromItems(items: OrderItem[]) {
  return Number(
    items
      .reduce((acc: number, item: OrderItem) => {
        acc += item.price * item.quantity;
        return acc;
      }, 0)
      .toFixed(2)
  );
}

function getNumberOfItemsInCart(items: OrderItem[]) {
  return items.reduce((acc: number, item: OrderItem) => {
    acc += item.quantity;
    return acc;
  }, 0);
}

// initialize reducer with actions
// const cartReducer = (state: CartState, action: CartAction) => {
//   switch (action.type) {
//     case 'ADD_ORDER':
//       const currentOrderItem = state.items.find((item: OrderItem) => item.id === action.payload.id);

//       if (currentOrderItem) {
//         const updateIndex = state.items.indexOf(currentOrderItem);
//         return {
//           ...state,
//           items: [
//             ...state.items.slice(0, updateIndex),
//             {
//               ...currentOrderItem,
//               quantity: state.items[updateIndex].quantity + action.payload.quantity
//             },
//             ...state.items.slice(updateIndex + 1)
//           ]
//         };
//       }

//       return {
//         ...state,
//         items: [...state.items, { ...action.payload }]
//       };
//     case 'REMOVE_ORDER':
//       const ix = state.items.findIndex((item: OrderItem) => item.id === action.payload) ?? -1;
//       if (ix > -1 && typeof state.items !== 'undefined') {
//         const updatedItems = [...state.items.slice(0, ix), ...state.items.slice(ix + 1)];
//         return {
//           ...state,
//           items: updatedItems
//         };
//       }
//       return state;
//     case 'CALCULATE_SUBTOTAL':
//       return {
//         ...state,
//         subtotal: Number(
//           state.items
//             .reduce((acc: number, item: OrderItem) => {
//               acc += item.price * item.quantity;
//               return acc;
//             }, 0)
//             .toFixed(2)
//         )
//       };
//     case 'GET_ITEM_COUNT':
//       return {
//         ...state,
//         count: state.items.reduce((acc: number, item: OrderItem) => {
//           acc += item.quantity;
//           return acc;
//         }, 0)
//       };
//     case 'CLEAR_CART':
//       return {
//         ...state,
//         subtotal: 0,
//         items: [],
//         count: 0
//       };
//     default:
//       return { ...state };
//   }
// };

const initialCartState = {
  items: [],
  count: 0,
  subtotal: 0
};

const CartContext = createContext<{
  cart: CartState;
  addToCart?: (orderItem: OrderItem) => Promise<void>;
  removeFromCart?: (orderItem: OrderItem) => Promise<void>;
}>({ cart: initialCartState });

const CartProvider = ({ children }: CartProviderProps) => {
  // const [storageState, setStorageState] = useLocalStorage<CartState>('order', initialState);
  const { authUser } = useContext(AuthContext);
  // const [state, dispatch] = useReducer(cartReducer, initialState);
  const [cart, setCart] = useState<CartState>(initialCartState);

  useEffect(() => {
    let cartSubscribe = () => {};
    if (authUser) {
      // get initial cart on load for logged in
      CartService.getCart(authUser.uid).then((cartData) => {
        if (cartData) {
          const cartState = cartData as CartState;
          setCart(cartState);
        } else {
          setCart(initialCartState);
        }
      });

      // update client cart whenever there are changes in db
      cartSubscribe = onSnapshot(doc(db, 'cart', authUser.uid), (cartDoc) => {
        const cartState = cartDoc.data() as CartState;
        setCart(cartState);
      });
    } else {
      // if user is not signed in we can reset their cart
      setCart(initialCartState);
    }
    return () => cartSubscribe();
  }, [authUser]);

  const addToCart = async (orderItem: OrderItem) => {
    const currentOrderItem = cart.items.find((item: OrderItem) => item.id === orderItem.id);
    let updatedCart = { ...cart };
    if (currentOrderItem) {
      const updateIndex = cart.items.indexOf(currentOrderItem);
      const updatedItems = [
        ...cart.items.slice(0, updateIndex),
        {
          ...currentOrderItem,
          quantity: cart.items[updateIndex].quantity + (orderItem.quantity || 1)
        },
        ...cart.items.slice(updateIndex + 1)
      ];
      updatedCart.items = updatedItems;
    } else {
      updatedCart.items.push(orderItem);
    }

    if (authUser) {
      CartService.updateCart(authUser.uid, {
        ...updatedCart,
        subtotal: calculateSubtotalFromItems(updatedCart.items),
        count: getNumberOfItemsInCart(updatedCart.items)
      }).then((cart) => {
        console.log('update cart operation completed. New Cart', cart);
      });
    }
  };

  // useEffect(() => {
  //   if (authUser) {
  //     CartFirebase.setCustomerCart(authUser.uid, state);
  //   }
  // }, [state, authUser]);

  // useEffect(() => {
  //   if (authUser) {
  //     CartFirebase.updateCustomerCart(authUser.uid, state);
  //   }
  // }, [authUser, state]);

  // useEffect(() => {
  //   if (!authUser) dispatch({ type: 'CLEAR_CART' });
  // }, [authUser]);

  // useEffect(() => {
  //   dispatch({ type: 'CALCULATE_SUBTOTAL' });
  //   dispatch({ type: 'GET_ITEM_COUNT' });
  // }, [state.items]);

  return <CartContext.Provider value={{ cart, addToCart }}>{children}</CartContext.Provider>;
};

export default CartContext;
export { CartProvider };
