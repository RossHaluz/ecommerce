import { FC } from "react";
import Address from "/public/images/address.svg";

interface HistoryOrdersDelivaryProps {
  item: {
    city: string;
    postService: string;
    separation: string;
    address: string;
    typeDelivary: string;
  };
}

const HistoryOrdersDelivary: FC<HistoryOrdersDelivaryProps> = ({ item }) => {
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
          {item?.typeDelivary}
          {item?.postService === "novaPoshta" && " Нова-Пошта"}
          <br />
          {item?.city && `${item?.city},`}{" "}
          {item?.address ? item?.address : item?.separation}
        </p>
      </div>
    </div>
  );
};

export default HistoryOrdersDelivary;
