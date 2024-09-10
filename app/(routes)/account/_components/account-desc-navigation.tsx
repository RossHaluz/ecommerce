"use client";
import { FC, useState } from "react";
import AccountSidebar from "./account-sidebar";
import PersonalData from "./personal-data";
import HistoryOrders from "./history-orders";
import PersonalDataForm from "./personal-data-form";
import HistoryOrdersList from "./history-orders-list";
import ChangePasswordForm from "./change-password-form";

interface AccountDescNavigation {
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
    phone: string;
    paymentMethod: string;
    postService: string;
    separation: string;
    address: string;
    typeDelivary: string;
    createdAt: string;
    orderItems: any[];
  }[];
}

const AccountDescNavigation: FC<AccountDescNavigation> = ({
  token,
  user,
  ordersByUser,
}) => {
  const [activeNavigation, setActiveNavigation] = useState("personal-data");

  return (
    <div className="hidden lg:flex items-start gap-24">
      <AccountSidebar token={token} activeNavigation={activeNavigation} setActiveNavigation={setActiveNavigation}/>
      {activeNavigation === "personal-data" && <PersonalDataForm user={user} />}
      {activeNavigation === "history" && (
        <HistoryOrdersList ordersByUser={ordersByUser} />
      )}
      {activeNavigation === 'change-password' && <ChangePasswordForm token={token}/>}
    </div>
  );
};

export default AccountDescNavigation;