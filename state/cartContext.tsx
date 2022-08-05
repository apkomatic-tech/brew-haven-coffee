import React, { useContext, useState } from 'react';
import { useEffect } from 'react';
import { createContext } from 'react';
import { useLocalStorage } from 'react-use';
import { doc, getFirestore, onSnapshot } from 'firebase/firestore';

import { OrderItem } from '../types/OrderItem';
import { CartService } from '../service/cart.service';
import AuthContext from './authContext';
import { app } from '../getFirebaseApp';
import { calculateSubtotalFromItems, getNumberOfItemsInCart } from '../utils/cart.utils';
import { User } from '@firebase/auth-types';

const db = getFirestore(app);

type CartProviderProps = {
  children: React.ReactNode;
};
type CartState = {
  items: OrderItem[];
  count: number;
  subtotal: number;
};

const initialCartState = {
  items: [],
  count: 0,
  subtotal: 0
};

const CartContext = createContext<{
  cart: CartState;
  isCartLoading: boolean;
  addToCart?: (orderItem: OrderItem) => Promise<void>;
  removeFromCart?: (orderItem: OrderItem) => Promise<void>;
  clearCart?: () => void;
}>({ cart: initialCartState, isCartLoading: true });

const CartProvider = ({ children }: CartProviderProps) => {
  const [cartFromLocalStorage, setCartFromLocalStorage] = useLocalStorage<CartState>('order', initialCartState);
  const { authUser } = useContext(AuthContext);
  const [cart, setCart] = useState<CartState>(() => {
    if (!authUser) return initialCartState;
    return cartFromLocalStorage ?? initialCartState;
  });
  const [isCartLoading, setIsCartLoading] = useState(true);

  useEffect(() => {
    let cartSubscribe = () => {};
    setIsCartLoading(true);
    if (authUser) {
      // get initial cart on load for logged in

      CartService.getCart(authUser.uid)
        .then((cartData) => {
          setIsCartLoading(false);
          if (cartData) {
            const cartState = cartData as CartState;
            setCart(cartState);
          } else {
            setCart(initialCartState);
          }
        })
        .catch((err) => {
          setIsCartLoading(false);
          console.error('Unhandled cart error', err.message);
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

  // persist anonymous cart in localStorage
  useEffect(() => {
    if (!authUser) {
      setCartFromLocalStorage(cart);
      window.setTimeout(() => {
        setIsCartLoading(false);
      }, 500);
    }
  }, [authUser, cart, setCartFromLocalStorage]);

  const runUpdateCart = async (orderItems: OrderItem[], user?: User) => {
    const updatedCart = {
      items: orderItems,
      subtotal: calculateSubtotalFromItems(orderItems),
      count: getNumberOfItemsInCart(orderItems)
    };
    // if signed in, store cart in db
    if (user) {
      CartService.updateCart(user.uid, updatedCart).then((cart) => {
        console.log('update cart operation completed. New Cart', cart);
      });
    } else {
      // otherwise, store directly in client state
      setCart(updatedCart);
    }
  };

  const addToCart = async (orderItem: OrderItem) => {
    const currentOrderItem = cart.items.find((item: OrderItem) => item.id === orderItem.id);
    let productItems: OrderItem[] = [];
    if (currentOrderItem) {
      const updateIndex = cart.items.indexOf(currentOrderItem);
      productItems = [
        ...cart.items.slice(0, updateIndex),
        {
          ...currentOrderItem,
          quantity: cart.items[updateIndex].quantity + (orderItem.quantity || 1)
        },
        ...cart.items.slice(updateIndex + 1)
      ];
    } else {
      productItems.push(orderItem);
    }

    // if signed in, store cart in db
    if (authUser) {
      runUpdateCart(productItems, authUser);
    } else {
      runUpdateCart(productItems);
    }
  };

  const removeFromCart = async (orderItem: OrderItem) => {
    const itemRemoveIndex = cart.items.findIndex((item: OrderItem) => item.id === orderItem.id) ?? -1;
    if (itemRemoveIndex > -1 && typeof cart.items !== 'undefined') {
      const productItems = [...cart.items.slice(0, itemRemoveIndex), ...cart.items.slice(itemRemoveIndex + 1)];
      if (authUser) {
        runUpdateCart(productItems, authUser);
      } else {
        runUpdateCart(productItems);
      }
      // if signed in, store cart in db
    }
  };

  const clearCart = async () => {
    if (authUser) {
      runUpdateCart([], authUser);
    } else {
      runUpdateCart([]);
    }
  };

  return <CartContext.Provider value={{ cart, isCartLoading, addToCart, removeFromCart, clearCart }}>{children}</CartContext.Provider>;
};

export default CartContext;
export { CartProvider };
