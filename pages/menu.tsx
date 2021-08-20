import type { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Drink from '../public/drink.svg';

const sampleDrinks = {
  coldbrew: [
    {
      id: 1,
      title: 'MegaBoost',
      image: <Image src={Drink} alt='' />,
      slug: 'mega-boost'
    },
    {
      id: 2,
      title: 'NitroBrew',
      image: <Image src={Drink} alt='' />,
      slug: 'nitro-brew'
    },
    {
      id: 3,
      title: 'SuperEnergizer',
      image: <Image src={Drink} alt='' />,
      slug: 'nitro-brew'
    }
  ],
  hotcoffee: [
    {
      id: 4,
      title: 'Latte',
      image: <Image src={Drink} alt='' />,
      slug: 'nitro-brew'
    },
    {
      id: 5,
      title: 'Regular Coffee',
      image: <Image src={Drink} alt='' />,
      slug: 'nitro-brew'
    },
    {
      id: 6,
      title: 'Expresso',
      image: <Image src={Drink} alt='' />,
      slug: 'nitro-brew'
    }
  ]
};

const Menu: NextPage = () => {
  return (
    <div className='page-content wrapper'>
      <h1 className='page-title'>Menu</h1>
      <h2 className='font-bold mb-4 text-xl'>Cold Brews</h2>
      <div className='grid grid-cols-2 gap-6 sm:grid-cols-3 mb-12'>
        {sampleDrinks.coldbrew.map((drink) => {
          const { id, title, image, slug } = drink;
          return (
            <Link key={id} href={`/menu/${slug}`}>
              <a className='flex flex-col items-center'>
                <div className='flex items-center justify-center p-6 mb-4 bg-gray-200 rounded-full w-36 h-36 sm:w-48 sm:h-48 md:w-64 md:h-64 hover:bg-gray-300 transition-all duration-150'>
                  {image}
                </div>
                <h3 className='text-center'>{title}</h3>
              </a>
            </Link>
          );
        })}
      </div>
      <h2 className='font-bold mb-4 text-xl'>Hot Coffee</h2>
      <div className='grid grid-cols-2 gap-6 sm:grid-cols-3'>
        {sampleDrinks.hotcoffee.map((drink) => {
          const { id, title, image, slug } = drink;
          return (
            <Link key={id} href={`/menu/${slug}`}>
              <a className='flex flex-col items-center'>
                <div className='flex items-center justify-center p-6 mb-4 bg-gray-200 rounded-full w-36 h-36 sm:w-48 sm:h-48 md:w-64 md:h-64 hover:bg-gray-300 transition-all duration-150'>
                  {image}
                </div>
                <h3 className='text-center'>{title}</h3>
              </a>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Menu;
