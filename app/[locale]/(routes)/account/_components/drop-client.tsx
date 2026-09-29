import React, { FC } from "react";
import User from "/public/images/user.svg";

interface DropClientProps {
  dropshipDetails?: {
    clientFirstName: string;
    clientLastName: string;
    clientPhone: string;
  };
}

const DropClient: FC<DropClientProps> = (data) => {
  const { dropshipDetails } = data;

  return (
    <div className="flex items-start gap-10">
      <h3 className="hidden md:inline-block text-base text-[#484848] font-medium w-[83px]">
        Дані клієнта
      </h3>
      <div className="flex items-center md:items-start gap-[15px]">
        <div>
          <User />
        </div>

        <p>
          {dropshipDetails?.clientFirstName} {dropshipDetails?.clientLastName}
          <br />
          {dropshipDetails?.clientPhone}
        </p>
      </div>
    </div>
  );
};

export default DropClient;
