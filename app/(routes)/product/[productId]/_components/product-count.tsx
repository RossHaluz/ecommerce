"use client";
import { Button } from "@/components/ui/button";
import { changeProductCount } from "@/redux/order/slice";
import React, { FC } from "react";
import { useDispatch } from "react-redux";

interface ProductCountProps {
  count?: number | null;
  setCount?: React.Dispatch<React.SetStateAction<number>>;
  setCurrentPrice?: React.Dispatch<React.SetStateAction<number>>;
  savePrice: number;
  itemId?: string;
  isFromOrder?: boolean;
}

const ProductCount: FC<ProductCountProps> = ({
  count,
  setCount,
  setCurrentPrice,
  savePrice,
  itemId = "",
  isFromOrder,
}) => {
  const dispatch = useDispatch();

  const handleDecrease = () => {
    if (count === 1) {
      return;
    }
    if (isFromOrder) {
      dispatch(changeProductCount({ itemId, type: "decrease" }));
      return;
    }

    const price = savePrice;
    if (setCount) setCount((prev) => prev - 1);

    if (count && setCurrentPrice) {
      const countPrice = Number(price) * count;
      setCurrentPrice(countPrice);
    }
  };

  const handleIncrease = () => {
    const price = savePrice;

    if (isFromOrder) {
      dispatch(changeProductCount({ itemId, type: "increase" }));
      return;
    }

    if (setCount) setCount((prev) => prev + 1);
    if (count && setCurrentPrice) {
      const countPrice = Number(price) * count;
      setCurrentPrice(countPrice);
    }
  };

  return (
    <div className="grid grid-cols-3 w-20 border border-solid border-[#484848] rounded-md overflow-hidden">
      <div className="border-r border-[#484848] w-full flex items-center justify-center">
        <Button
          onClick={handleDecrease}
          variant="ghost"
          className="text-lg flex items-center p-[10px] justify-center"
        >
          -
        </Button>
      </div>
      <div className="flex items-center justify-center p-[10px]">
        <span className="text-[#484848] font-medium text-sm">{count}</span>
      </div>
      <div className="border-l border-[#484848] w-full flex items-center justify-center">
        <Button
          onClick={handleIncrease}
          variant="ghost"
          className="text-lg flex items-center p-[10px] justify-cente"
        >
          +
        </Button>
      </div>
    </div>
  );
};

export default ProductCount;
