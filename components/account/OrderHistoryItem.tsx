import { Order } from '../../types/Order';
import OrderHistoryProductItem from './OrderHistoryProductItem';

interface OrderHistoryItemProps {
  order: Order;
}
const OrderHistoryItem = ({ order }: OrderHistoryItemProps) => {
  return (
    <div className="mt-12">
      <header className="bg-slate-50 px-6 py-8 grid grid-flow-row sm:grid-flow-col gap-4 mt-6 mb-6 sm:mt-12 sm:mb-12">
        <div>
          <div className="font-bold">Order Number</div>
          <div className="text-gray-700">{order.id}</div>
        </div>
        <div>
          <div className="font-bold">Date Placed</div>
          <div className="text-gray-700">{new Date(order.date).toLocaleDateString()}</div>
        </div>
        <div>
          <div className="font-bold">Order Amount</div>
          <div className="text-black">${order.total.toFixed(2)}</div>
        </div>
      </header>
      <section>
        {order.items.map((item) => {
          return <OrderHistoryProductItem key={item.id} item={item} />;
        })}
      </section>
    </div>
  );
};

export default OrderHistoryItem;
