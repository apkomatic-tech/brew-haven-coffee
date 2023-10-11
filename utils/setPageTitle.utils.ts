function setPageTitle(title?: string, excludeCompanyFromTitle?: boolean) {
  if (title && excludeCompanyFromTitle) return title;
  return title ? `Brew Haven Coffee | ${title}` : 'Brew Haven Coffee';
}

export default setPageTitle;
