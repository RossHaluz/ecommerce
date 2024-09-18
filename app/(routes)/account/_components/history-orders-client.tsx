import React, { FC } from "react";
import User from '/public/images/user.svg';

interface HistoryOrdersClientProps {
  item: {
    firstName: string;
    lastName: string;
    phone: string;
  };
}

const HistoryOrdersClient: FC<HistoryOrdersClientProps> = ({item}) => {
  return <div className="flex items-start gap-10">
  <h3 className="hidden md:inline-block text-base text-[#484848] font-medium w-[83px]">
  Покупець
  </h3>
  <div className="flex items-center md:items-start gap-[15px]">
    <div>
    <User />
    </div>
    <p>
    {item?.firstName} {item?.lastName}<br/>
    {item?.phone}
    </p>
  </div>
</div>
};

export default HistoryOrdersClient;
