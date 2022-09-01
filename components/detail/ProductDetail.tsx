import { useNextSanityImage } from 'next-sanity-image';
import Image, { ImageProps } from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';

import sanityClient from '../../sanityClient';
import AuthContext from '../../state/authContext';
import CartContext from '../../state/cartContext';
import { Product } from '../../types/Product';
import Price from '../shared/Price';
import QuantitySelect from './QuantitySelect';

interface ProductDetailProps {
  product: Product;
}
const ProductDetail = ({ product }: ProductDetailProps) => {
  const router = useRouter();
  const { addToCart } = useContext(CartContext);
  const { authUser } = useContext(AuthContext);
  const imageProps = useNextSanityImage(sanityClient, product.image)! as ImageProps;
  const [quantity, setQuantity] = useState(1);

  const handleAddToOrder = (): void => {
    const orderItem = { ...product, title: product.name, quantity };
    const addToCartFn = addToCart!;
    addToCartFn(orderItem)!;
    router.push('/order/review');
  };

  return (
    <div className="grid md:grid-cols-2">
      {/* Product image */}
      <div className="mb-6 md:mb-0 md:max-w-lg md:mr-16">
        <Image objectFit="contain" className="sm:max-w-md" {...imageProps} layout="intrinsic" alt={product.name} placeholder="blur" />
      </div>
      <div>
        <h1 className="text-xl sm:text-3xl font-bold mb-6 flex justify-between">
          <span>{product.name}</span>
          <Price priceValue={product.price} />
        </h1>
        {product.description && (
          <div className="py-6 border-b border-t border-slate-200">
            <h2 className="text-lg font-bold mb-2">Description</h2>
            <p className="text-gray-600">{product.description}</p>
          </div>
        )}
        {/* only show add to order if user is logged in  */}
        {!authUser && (
          <p className="text-amber-700 text-sm font-bold bg-amber-100 border-l-[16px] border-amber-800 pl-6 py-4 pr-4 text-left rounded-sm">
            Only logged in customers can add to order at this time. Please{' '}
            <Link href="/account/login">
              <a className="underline text-black">Login</a>
            </Link>
          </p>
        )}
        {authUser && (
          <div className="flex mt-6 items-end">
            <QuantitySelect selectedQuantity={quantity} handleSelect={(qty) => setQuantity(qty)} />
            {/* Add To Order */}
            <button className="dgcf-button min-w-[200px] w-full sm:w-[50%]" type="button" onClick={handleAddToOrder}>
              Add To Order
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
