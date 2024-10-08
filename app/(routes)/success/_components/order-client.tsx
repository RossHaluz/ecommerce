import React, { FC } from "react";
import User from '/public/images/user.svg';

interface OrderClientProps {
  orderDetails: {
    phoneNumber: string;
    firstName: string;
    lastName: string;
    email?: string
  };
}

const OrderClient: FC<OrderClientProps> = ({ orderDetails }) => {
  return   <div className="flex items-start gap-10">
  <h3 className="hidden md:inline-block text-base text-[#484848] font-medium w-[83px]">
  Покупець
  </h3>
  <div className="flex items-center md:items-start gap-[15px]">
    <User />
    <p>
    {orderDetails?.firstName} {orderDetails?.lastName}<br/>
    {orderDetails?.phoneNumber}
    {orderDetails?.email}
    </p>
  </div>
</div>
};

export default OrderClient;
