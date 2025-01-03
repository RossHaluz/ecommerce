import React, { FC } from "react";

interface ProductPriceProps {
  price: number;
}

const ProductPrice: FC<ProductPriceProps> = ({ price }) => {
  const USDollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  
  return (
    <span className="text-[#c0092a] text-lg font-bold">{USDollar.format(price)}</span>
  );
};

export default ProductPrice;
