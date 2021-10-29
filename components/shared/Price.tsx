import React from 'react';

type PriceProps = {
  priceValue: string | number;
  decimalPoints?: number;
};

const Price: React.FC<PriceProps> = ({ priceValue, decimalPoints = 2 }) => {
  return (
    <>
      <sup>$</sup>
      <span>{Number(priceValue).toFixed(decimalPoints)}</span>
    </>
  );
};

export default Price;
