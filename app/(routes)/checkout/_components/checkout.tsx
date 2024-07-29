"use client";
import { useSelector } from "react-redux";
import CheckoutContactForm from "./checkout-contact-form";
import OrderForm from "./order-form";
import { selectUserContactDetails } from "@/redux/auth/selectors";

const Checkout = () => {
  const userContactDetails = useSelector(selectUserContactDetails);

  return (
    <div className="flex flex-col gap-4 lg:gap-[30px]">
      <CheckoutContactForm />
      {userContactDetails && <OrderForm />}
    </div>
  );
};

export default Checkout;
