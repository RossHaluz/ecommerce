import React, { FC } from "react";

type ProductAttention = {
  price: number;
};

const ProductAttention: FC<ProductAttention> = ({ price }) => {
  return (
    <>
      {price === 0 && (
        <p className="text-[#484848] lg:inline-block hidden">
          Ціну до даного товара уточняйте у менеджера.
        </p>
      )}
    </>
  );
};

export default ProductAttention;
