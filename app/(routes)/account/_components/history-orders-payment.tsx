import React, { FC } from "react";
import Card from "/public/images/card.svg";

interface HistoryOrdersPaymentProps {
  item: {
    paymentMethod: string;
  };
}

const HistoryOrdersPayment: FC<HistoryOrdersPaymentProps> = ({ item }) => {
  return (
    <div className="flex items-start gap-10">
      <h3 className="hidden md:inline-block text-base text-[#484848] font-medium w-[83px]">
        Оплата
      </h3>
      <div className="flex items-center md:items-start gap-[15px]">
        <div>
          <Card />
        </div>
        <p>
          {item?.paymentMethod === "cashOnDelivary" && "Оплата при отримані"}
        </p>
      </div>
    </div>
  );
};

export default HistoryOrdersPayment;
