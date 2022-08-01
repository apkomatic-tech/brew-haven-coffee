import { doc, getDoc, getFirestore, setDoc } from 'firebase/firestore';
import { number } from 'yup';

import { app } from '../../getFirebaseApp';
import { OrderItem } from '../../types/OrderItem';

const db = getFirestore(app);

interface Cart {
  items: OrderItem[];
  count: number;
  subtotal: number;
}
export class CartFirebase {
  static async setCustomerCart(userID: string, newCart: Cart) {
    const docRef = doc(db, 'cart', userID);

    try {
      await setDoc(docRef, newCart);
      return (await getDoc(docRef)).data();
    } catch (error) {}
  }
}
