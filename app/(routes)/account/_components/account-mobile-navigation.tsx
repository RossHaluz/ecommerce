"use client";
import React, { FC, useState } from "react";
import LogoutBtn from "./logout-btn";
import PersonalData from "./personal-data";
import HistoryOrders from "./history-orders";
import ChangePassword from "./change-password";

interface AccountMobileNavigationProps {
  token: string;
  user: {
    _id: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    avatar: string;
    token: string;
  };
  ordersByUser: {
    id: string;
    city: string;
    firstName: string;
    lastName: string;
    comment: string;
    phone: string;
    paymentMethod: string;
    orderType: string;
    dropshipDetails: {
      clientFirstName: string;
      clientLastName: string;
      clientPhone: string;
    };
    orderNumber: string;
    postService: string;
    separation: string;
    address: string;
    typeDelivary: string;
    createdAt: string;
    orderItems: any[];
  }[];
}

const AccountMobileNavigation: FC<AccountMobileNavigationProps> = ({
  token,
  user,
  ordersByUser,
}) => {
  const [activeNavigation, setActiveNavigation] = useState("personal-data");

  return (
    <div className="lg:hidden flex lg:hi flex-col gap-[30px]">
      <LogoutBtn token={token} />
      <PersonalData
        user={user}
        activeNavigation={activeNavigation}
        setActiveNavigation={setActiveNavigation}
      />
      <HistoryOrders
        ordersByUser={ordersByUser}
        activeNavigation={activeNavigation}
        setActiveNavigation={setActiveNavigation}
      />
      <ChangePassword
        token={token}
        activeNavigation={activeNavigation}
        setActiveNavigation={setActiveNavigation}
      />
    </div>
  );
};

export default AccountMobileNavigation;
