import { v1 as uuid } from 'uuid';
import Drink from '../public/drink.svg';

// sample data TODO: read data from API or Content CMS
const sampleDrinks = {
  coldbrew: [
    {
      id: uuid(),
      title: 'MegaBoost',
      image: Drink
    },
    {
      id: uuid(),
      title: 'NitroBrew',
      image: Drink
    },
    {
      id: uuid(),
      title: 'SuperEnergizer',
      image: Drink
    }
  ],
  hotcoffee: [
    {
      id: uuid(),
      title: 'Latte',
      image: Drink
    },
    {
      id: uuid(),
      title: 'Regular Coffee',
      image: Drink
    },
    {
      id: uuid(),
      title: 'Expresso',
      image: Drink
    }
  ]
};

export { sampleDrinks };
