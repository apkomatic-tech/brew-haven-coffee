import { GiCoffeeMug } from 'react-icons/gi';

const drinkSchema = {
  title: 'Drink',
  name: 'drink',
  type: 'document',
  icon: GiCoffeeMug,
  fields: [
    {
      name: 'name',
      title: 'Drink Name',
      type: 'string',
      validation: (Rule) => Rule.required().min(0).max(100)
    },
    {
      name: 'slug',
      title: 'Drink URL',
      type: 'slug',
      options: {
        source: 'name'
      },
      validation: (Rule) => Rule.required()
    },
    {
      name: 'price',
      title: 'Drink Price',
      description: 'Provide price in {dollar.cent} format (example 9.99). Do not include $',
      type: 'number',
      validation: (Rule) => Rule.required().min(0)
    },
    {
      name: 'image',
      title: 'Drink Image',
      type: 'image',
      options: {
        hotspot: true
      },
      validation: (Rule) => Rule.required()
    },
    {
      name: 'category',
      title: 'Category',
      type: 'reference',
      weak: false,
      to: [
        {
          type: 'category'
        }
      ],
      validation: (Rule) => Rule.required()
    }
  ],
  preview: {
    select: {
      title: 'name',
      category: 'category.categoryname'
    },
    prepare: (selection) => {
      const { title, category } = selection;
      return {
        title,
        subtitle: `Category: ${category}`
      };
    }
  }
};

export default drinkSchema;
