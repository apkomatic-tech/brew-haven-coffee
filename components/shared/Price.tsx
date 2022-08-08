import React from 'react';

type PriceProps = {
  priceValue: string | number;
  decimalPoints?: number;
};

const Price: React.FC<PriceProps> = ({ priceValue, decimalPoints = 2 }) => {
  return (
    <div className="inline-flex items-center">
      <sup className="text-sm">$</sup>
      <span>{Number(priceValue).toFixed(decimalPoints)}</span>
    </div>
  );
};

export default Price;
