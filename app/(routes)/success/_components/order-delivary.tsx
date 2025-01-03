import React, { FC } from "react";
import Address from "/public/images/address.svg";

interface OrderDelivaryProps {
  orderDetails: {
    typeDelivary: string;
    postService: string;
    city: string;
    address: string;
    separation: string;
  };
}

const OrderDelivary: FC<OrderDelivaryProps> = ({ orderDetails }) => {
  return (
    <div className="flex items-start gap-10">
      <h3 className="hidden md:inline-block text-base text-[#484848] font-medium w-[83px]">
        Доставка
      </h3>
      <div className="flex items-center md:items-start gap-[15px]">
        <div>
          <Address />
        </div>
        <p>
          {orderDetails?.typeDelivary}
          {orderDetails?.postService === "nova-poshta" && "Нова-Пошта"}
          <br />
          {orderDetails?.city},{" "}
          {orderDetails?.address
            ? orderDetails?.address
            : orderDetails?.separation}
        </p>
      </div>
    </div>
  );
};

export default OrderDelivary;
