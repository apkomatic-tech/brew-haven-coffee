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

    // if signed in, store cart in db
    if (authUser) {
      CartService.updateCart(authUser.uid, {
        ...updatedCart,
        subtotal: calculateSubtotalFromItems(updatedCart.items),
        count: getNumberOfItemsInCart(updatedCart.items)
      }).then((cart) => {
        console.log('update cart operation completed. New Cart', cart);
      });
    } else {
      // otherwise, store directly in client state
      setCart({
        ...updatedCart,
        subtotal: calculateSubtotalFromItems(updatedCart.items),
        count: getNumberOfItemsInCart(updatedCart.items)
      });
    }
  };

  return <CartContext.Provider value={{ cart, isCartLoading, addToCart }}>{children}</CartContext.Provider>;
};

export default CartContext;
export { CartProvider };
