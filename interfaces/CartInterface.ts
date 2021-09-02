import { OrderItem } from '../types/OrderItem';

export interface CartContextInterface {
  count: number;
  items: OrderItem[];
  subtotal: number;
  addToOrder: (p: any) => void;
  removeFromOrder: (id: any) => void;
}
