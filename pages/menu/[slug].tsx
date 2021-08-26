import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import Image from 'next/image';
import MenuCard from '../../components/MenuCard';
import { v1 as uuid } from 'uuid';
import Drink from '../../public/drink.svg';
import { sampleDrinks } from '../../data/sampledrinks';

const MenuDetail: NextPage = () => {
  const { query } = useRouter();
  const { slug } = query;
  return (
    <div className='page-content wrapper'>
      <h1 className='page-title'>Menu Item - {slug}</h1>
      <button type='button'>Add To Order</button>
    </div>
  );
};

export default MenuDetail;
