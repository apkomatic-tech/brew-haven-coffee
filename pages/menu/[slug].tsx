import type { NextPage, GetServerSideProps } from 'next';
import Image from 'next/image';
import groq from 'groq';
import { useNextSanityImage } from 'next-sanity-image';
import Link from 'next/link';
import { HiOutlineHome as HomeIcon } from 'react-icons/hi';

import sanityClient from '../../sanityClient';

const MenuDetail: NextPage = (props: any) => {
  const detail = props.data;
  const imageProps = useNextSanityImage(sanityClient, detail.image, {
    enableBlurUp: true
  });

  return (
    <div className='page-content container px-4 mx-auto max-w-full lg:max-w-5xl'>
      {/* Breacrumbs */}
      <div className='flex items-center mb-6'>
        <Link href='/'>
          <a className='text-2xl mr-2'>
            <HomeIcon />
          </a>
        </Link>
        <span className='mr-2'>/</span>
        <Link href='/menu'>
          <a className='mr-2 font-bold hover:underline focus:underline'>Menu</a>
        </Link>
        <span className='mr-2'>/</span>
        <span className='text-gray-600'>{detail.name}</span>
      </div>
      <div className='grid md:grid-cols-2'>
        {/* Product image */}
        <div className='mb-6 md:mb-0 md:max-w-lg md:mr-16'>
          <Image objectFit='contain' width={400} height={400} className='sm:max-w-md' {...imageProps} layout='intrinsic' alt={detail.name} />
        </div>
        <div>
          <h1 className='text-3xl font-bold mb-12'>
            {detail.name} - <span>$</span>
            {detail.price}
          </h1>
          {detail.description && (
            <>
              <h3 className='text-xl font-bold mb-6'>Description</h3>
              <p>{detail.description}</p>
            </>
          )}
          <div className='flex mt-8 items-end'>
            {/* Quantity */}
            <div className='flex flex-col mr-2'>
              <label className='cursor-pointer mb-1' htmlFor='qty'>
                Quantity
              </label>
              <div className='inline-block relative w-18'>
                <select id='qty' className='block appearance-none w-full bg-white border border-gray-800 hover:border-gray-900 px-4 py-2 pr-8 leading-tight focus:outline-none'>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </select>
                <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
                  <svg className='fill-current h-4 w-4' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'>
                    <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
                  </svg>
                </div>
              </div>
            </div>
            {/* Add To Cart */}
            <button className='bg-primarydark text-white px-4 py-2 font-bold w-64' type='button'>
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const data = await sanityClient.fetch(groq`
    *[_type=='drink' && slug.current == '${context.query.slug}'] {
      name, price, image, description,
      "category": category->categoryname
    }[0]
  `);

  if (!data) {
    return {
      redirect: {
        destination: '/menu',
        permanent: false
      }
    };
  }

  return {
    props: {
      data
    }
  };
};

export default MenuDetail;
