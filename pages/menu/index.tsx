import type { NextPage } from 'next';
import Image from 'next/image';
import MenuCard from '../../components/MenuCard';
import { sampleDrinks } from '../../data/sampledrinks';
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
