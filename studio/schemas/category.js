const categorySchema = {
  title: 'Category',
  name: 'category',
  type: 'document',
  // TODO: add icon:
  // icon: '',
  fields: [
    {
      name: 'categoryname',
      title: 'Category name',
      type: 'string'
    }
  ]
};

export default categorySchema;
