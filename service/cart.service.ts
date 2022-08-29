import { collection, doc, getDoc, getDocs, getFirestore, query, setDoc, where } from 'firebase/firestore';
import { v4 as uuid } from 'uuid';

import { app } from '../getFirebaseApp';
import { Order } from '../types/Order';
import { OrderItem } from '../types/OrderItem';

const db = getFirestore(app);

interface Cart {
  items: OrderItem[];
  count: number;
  subtotal: number;
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

  static async createOrder(id: string, order: Order) {
    order.id = id;
    try {
      await setDoc(doc(db, 'order', id), order);
    } catch (err) {}
  }

  static async getOrdersByUserId(userId: string) {
    const ordersRef = collection(db, 'order');
    const q = query(ordersRef, where('userId', '==', userId));
    const ordersSnapshot = await getDocs(q);
    const orders: Order[] = [];
    ordersSnapshot.forEach((orderSnapshot) => {
      const order: Order = {
        id: orderSnapshot.get('id'),
        items: orderSnapshot.get('items'),
        total: orderSnapshot.get('total'),
        firstName: orderSnapshot.get('firstName'),
        lastName: orderSnapshot.get('lastName'),
        userId: orderSnapshot.get('userId'),
        date: orderSnapshot.get('date')
      };
      orders.push(order);
    });
    return orders;
  }

  static async getOrderDetails(orderId: string) {
    try {
      const orderRef = doc(db, 'order', orderId);
      const orderDoc = await getDoc(orderRef);
      if (orderDoc.exists()) {
        const order = orderDoc.data();
        return order;
      } else {
        return null;
      }
    } catch (error: any) {
      console.error('Unhandled Order Detail Error', error.message);
      return null;
    }
  }
}
