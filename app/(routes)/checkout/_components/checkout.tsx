"use client";
import { useSelector } from "react-redux";
import CheckoutContactForm from "./checkout-contact-form";
import OrderForm from "./order-form";
import { FC } from "react";
import { selectUserContactDetails } from "@/redux/auth/selectors";

interface CheckoutProps {
  currentUser?: {
    _id: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    type: string;
    email: string;
    avatar: string;
  } | null;
}

const Checkout: FC<CheckoutProps> = ({ currentUser }) => {
  const userContactDetails = useSelector(selectUserContactDetails);
  const hasContactDetails = userContactDetails || currentUser;

  return (
    <div className="flex flex-col gap-4 lg:gap-[30px]">
      {!userContactDetails && !currentUser && <CheckoutContactForm />}
      {hasContactDetails && <OrderForm currentUser={currentUser} />}
    </div>
  );
};

export default Checkout;
