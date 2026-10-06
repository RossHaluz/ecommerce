"use client";
import OrderForm from "./order-form";
import { FC } from "react";
import { TrackBeginCheckout } from "./track-begin-checkout";

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
  return (
    <div className="flex flex-col gap-4 lg:gap-[30px]">
      <TrackBeginCheckout />
      <OrderForm currentUser={currentUser} />
    </div>
  );
};

export default Checkout;
