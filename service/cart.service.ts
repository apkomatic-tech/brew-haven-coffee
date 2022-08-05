import { doc, getDoc, getFirestore, setDoc } from 'firebase/firestore';
import { v4 as uuid } from 'uuid';
('uuid');

import { app } from '../getFirebaseApp';
import { OrderItem } from '../types/OrderItem';

const db = getFirestore(app);

interface Cart {
  items: OrderItem[];
  count: number;
  subtotal: number;
}

interface Order {
  total: number;
  userId?: string;
  items: OrderItem[];
  firstName: string;
  lastName: string;
}

export class CartService {
  static async getCart(userID: string) {
    const docRef = doc(db, 'cart', userID);
    try {
      const cart = await getDoc(docRef);
      // if there is cart, return it
      // otherwise, we create an empty cart and return it client
      if (cart.exists()) return cart.data();
      const emptyCart: Cart = {
        items: [],
        count: 0,
        subtotal: 0
      };
      await setDoc(docRef, emptyCart);
      return emptyCart;
    } catch (err) {}
  }

  static async updateCart(userID: string | undefined, cart: Cart) {
    if (!userID) {
      console.error('Update Cart operation failed. No user id provided.');
      return;
    }
    const docRef = doc(db, 'cart', userID);
    try {
      await setDoc(docRef, cart);
      return (await getDoc(docRef)).data();
    } catch (err) {}
  }

  static async storeOrder(order: Order) {
    const orderId = uuid();
    try {
      await setDoc(doc(db, 'order', orderId), order);
    } catch (err) {}
  }
}
