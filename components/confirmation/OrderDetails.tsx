import { useEffect, useState } from 'react';
import { CartService } from '../../service/cart.service';
import { Order } from '../../types/Order';

interface OrderDetailsProps {
  orderId: string;
}

const OrderDetails = (props: OrderDetailsProps) => {
  const [orderDetail, setOrderDetail] = useState<Order | null>(null);

  useEffect(() => {
    async function getOrderDetail(orderId: string) {
      const order = (await CartService.getOrderDetails(orderId)) as Order;
      setOrderDetail(order);
    }

    if (props.orderId) {
      getOrderDetail(props.orderId);
    }
  }, [props.orderId]);

  return (
    <div className="bg-gray-50 p-4 mb-4">
      <h2 className="mb-4 font-bold text-2xl">Order Details</h2>
      <p>
        <strong>Id:</strong> {props.orderId}
      </p>
      <p>
        <strong>Name:</strong> {orderDetail?.firstName} {orderDetail?.lastName}
      </p>
      <p>
        <strong>Date:</strong> {orderDetail?.date && new Date(orderDetail.date).toLocaleDateString()}
      </p>
      <p>
        <strong>Total</strong> {orderDetail?.total && <span>${orderDetail.total}</span>}
      </p>
    </div>
  );
};

export default OrderDetails;
