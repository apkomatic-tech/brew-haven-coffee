import { OrderItem } from './OrderItem';

export interface Order {
  date: number;
  id?: string;
  total: number;
  userId?: string;
  items: OrderItem[];
  firstName: string;
  lastName: string;
}
