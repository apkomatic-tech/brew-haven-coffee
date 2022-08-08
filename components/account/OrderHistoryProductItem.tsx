import { useNextSanityImage } from 'next-sanity-image';
import Image, { ImageProps } from 'next/image';
import { OrderItem } from '../../types/OrderItem';
import sanityClient from '../../sanityClient';
import Link from 'next/link';

interface OrderHistoryProductItemProps {
  item: OrderItem;
}
const OrderHistoryProductItem = ({ item }: OrderHistoryProductItemProps) => {
  const productImage = useNextSanityImage(sanityClient, item.image)! as ImageProps;
  return (
    <div className="grid gap-4 sm:gap-8 grid-flow-row sm:grid-flow-col-dense mb-4 pb-4 sm:mb-6 sm:pb-6 border-b border-slate-200 last-of-type:border-0 last-of-type:pb-0 last-of-type:mb-0">
      <div className="w-20 sm:w-48 sm:col-span-1">
        <Image className="w-full max-w-[200px] block" {...productImage} alt={item.title} />
      </div>
      <div className="sm:col-span-11">
        <div className="md:text-lg font-bold flex justify-between mb-4 pb-4 border-b border-slate-200">
          <span>{item.title} </span>
          <span>${item.price.toFixed(2)}</span>
        </div>
        <p className="my-2">
          Quantity: <span className="text-black">{item.quantity}</span>
        </p>
        <div className="mt-4">
          <Link href={`/menu/${item.slug}`} passHref>
            <a className="link">View Item</a>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default OrderHistoryProductItem;
