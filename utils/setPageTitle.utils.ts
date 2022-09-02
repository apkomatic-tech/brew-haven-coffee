function setPageTitle(title?: string, excludeCompanyFromTitle?: boolean) {
  if (title && excludeCompanyFromTitle) return title;
  return title ? `Doge Coffee | ${title}` : 'Doge Coffee';
}

export default setPageTitle;
