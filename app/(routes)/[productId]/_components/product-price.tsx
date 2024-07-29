import React, { FC } from "react";

interface ProductPriceProps {
  price: number;
}

const ProductPrice: FC<ProductPriceProps> = ({ price }) => {
  return <span className="text-[#7FAA84] text-lg font-bold">{price} ₴</span>;
};

export default ProductPrice;
