import { Metadata } from "next";
import OrderDetails from "./_components/order-details";

export const metadata: Metadata = {
  title: "Дякую за замовлення!",
  robots: {
    index: false,
    follow: true,
  },
};

const SuccessPage = () => {
  return (
    <div className="mt-6 mb-6">
      <OrderDetails />
    </div>
  );
};

export default SuccessPage;
