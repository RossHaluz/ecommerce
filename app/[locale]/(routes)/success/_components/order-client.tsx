import React, { FC } from "react";
import User from "/public/images/user.svg";

enum OrderType {
  RETAIL = "RETAIL",
  DROPSHIP = "DROPSHIP",
}

interface OrderClientProps {
  orderDetails: {
    phone: string;
    firstName: string;
    lastName: string;
    email?: string;
    orderType: OrderType;
  };
}

const OrderClient: FC<OrderClientProps> = ({ orderDetails }) => {
  return (
    <div className="flex items-start gap-10">
      <h3 className="hidden md:inline-block text-base text-[#484848] font-medium w-[83px]">
        {orderDetails?.orderType === "RETAIL" && "Покупець"}
        {orderDetails?.orderType === "DROPSHIP" && "Дані дропшипера"}
      </h3>
      <div className="flex items-center md:items-start gap-[15px]">
        <div>
          <User />
        </div>

        <p>
          {orderDetails?.firstName} {orderDetails?.lastName}
          <br />
          {orderDetails?.phone}
          <br />
          {orderDetails?.email}
        </p>
      </div>
    </div>
  );
};

export default OrderClient;
