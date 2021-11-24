const combineClasses = (...classes: any[]) => {
  return classes.filter(Boolean).join(' ');
};
export default combineClasses;
