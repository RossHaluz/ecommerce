import React from "react";
import Checkout from "./_components/checkout";
import OrderItems from "./_components/order-items";

const CheckoutPage = () => {
  return (
    <div className="pt-[10px] pb-[30px] lg:py-[30px] container">
      <div className="flex flex-col gap-[15px] lg:gap-[30px]">
        <h1 className="text-[#484848] text-base font-bold">
          Оформлення замовлення
        </h1>
        <div className="md:grid grid-cols-2 gap-[18px]">
          <div className="md:pr-[104px]">
            <Checkout />
          </div>
          <div className="hidden md:block">
            <OrderItems />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
