import { Metadata } from "next";
import Checkout from "./_components/checkout";
import OrderItems from "./_components/order-items";
import { getCurrentUser } from "@/actions/get-data";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Оформлення замовлення`,
    description: `Створюйте замовлення швидко та зручно в інтернет магазині Audiparts`,
  };
}

const CheckoutPage = async () => {
  const currentUser = await getCurrentUser();

  return (
    <div className="mt-6 mb-6 container">
      <div className="flex flex-col gap-[15px] lg:gap-[30px]">
        <h1 className="text-[#484848] text-base font-bold">
          Оформлення замовлення
        </h1>
        <div className="md:grid grid-cols-2 gap-[18px]">
          <div className="md:pr-[104px]">
            <Checkout currentUser={currentUser} />
          </div>
          <div className="hidden md:block">
            <OrderItems currentUser={currentUser} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
