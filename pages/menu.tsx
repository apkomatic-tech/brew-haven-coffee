import type { NextPage } from 'next';
import Image from 'next/image';
import MenuCard from '../components/MenuCard';
import { v1 as uuid } from 'uuid';
import Drink from '../public/drink.svg';

// sample data TODO: read data from API or Content CMS
const sampleDrinks = {
  coldbrew: [
    {
      id: uuid(),
      title: 'MegaBoost',
      image: <Image src={Drink} alt='' />,
      slug: 'mega-boost'
    },
    {
      id: uuid(),
      title: 'NitroBrew',
      image: <Image src={Drink} alt='' />,
      slug: 'nitro-brew'
    },
    {
      id: uuid(),
      title: 'SuperEnergizer',
      image: <Image src={Drink} alt='' />,
      slug: 'nitro-brew'
    }
  ],
  hotcoffee: [
    {
      id: uuid(),
      title: 'Latte',
      image: <Image src={Drink} alt='' />,
      slug: 'nitro-brew'
    },
    {
      id: uuid(),
      title: 'Regular Coffee',
      image: <Image src={Drink} alt='' />,
      slug: 'nitro-brew'
    },
    {
      id: uuid(),
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
          return <MenuCard key={drink.id} {...drink} />;
        })}
      </div>
      <h2 className='font-bold mb-4 text-xl'>Hot Coffee</h2>
      <div className='grid grid-cols-2 gap-6 sm:grid-cols-3'>
        {sampleDrinks.hotcoffee.map((drink) => {
          return <MenuCard key={drink.id} {...drink} />;
        })}
      </div>
    </div>
  );
};

export default Menu;
