import { OrderItem } from '../types/OrderItem';

export const calculateSubtotalFromItems = (items: OrderItem[]) => {
  if (!items.length) return 0;

  return Number(
    items
      .reduce((acc: number, item: OrderItem) => {
        acc += item.price * item.quantity;
        return acc;
      }, 0)
      .toFixed(2)
  );
};

export const getNumberOfItemsInCart = (items: OrderItem[]) => {
  if (!items.length) return 0;
  return items.reduce((acc: number, item: OrderItem) => {
    acc += item.quantity;
    return acc;
  }, 0);
};
