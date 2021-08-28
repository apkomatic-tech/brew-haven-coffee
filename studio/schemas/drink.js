const drinkSchema = {
  title: 'Drink',
  name: 'drink',
  type: 'document',
  // TODO: add icon:
  // icon: '',
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
    }
  ]
};

export default drinkSchema;
