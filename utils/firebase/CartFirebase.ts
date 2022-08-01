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
  static async getCart(userID: string) {
    const docRef = doc(db, 'cart', userID);

    try {
      const cartDoc = await getDoc(docRef);
      if (cartDoc.exists()) {
        return cartDoc.data();
      } else {
        // if no cart exists for user, create new empty cart
        await setDoc(docRef, {
          items: [],
          count: 0,
          subtotal: 0
        });
        return (await getDoc(docRef)).data();
      }
    } catch (error) {}
  }
}
