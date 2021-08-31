import { OrderItem } from '../types/OrderItem';

export interface CartContextInterface {
  count: number;
  items: OrderItem[];
  addToOrder: (p: any) => void;
  removeFromOrder: (id: any) => void;
}
