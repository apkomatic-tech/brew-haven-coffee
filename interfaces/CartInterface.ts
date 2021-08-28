import { OrderItem } from '../types/OrderItem';

export interface CartContextInterface {
  count: number;
  items: OrderItem[];
}
