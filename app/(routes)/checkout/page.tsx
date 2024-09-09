import axios from "axios";
import Checkout from "./_components/checkout";
import OrderItems from "./_components/order-items";
import { cookies } from "next/headers";

const CheckoutPage = async () => {
  let currentUser = null;
  const cookiesState = cookies();
  const token = cookiesState.get("token")?.value;

  if (token) {
    const { data } = await axios.get(
      `${process.env.SERVER_URL}api/auth/current`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    currentUser = data?.user;
  }

  const data = {
    apiKey: "49b5685ec580dccca061cdbb4b4b80de",
    modelName: "AddressGeneral",
    calledMethod: "getSettlements",
    methodProperties: {
      FindByString: "Київ",
    },
  };

  

  return (
    <div className="pt-[10px] pb-[30px] lg:py-[30px] container">
      <div className="flex flex-col gap-[15px] lg:gap-[30px]">
        <h1 className="text-[#484848] text-base font-bold">
          Оформлення замовлення
        </h1>
        <div className="md:grid grid-cols-2 gap-[18px]">
          <div className="md:pr-[104px]">
            <Checkout currentUser={currentUser} />
          </div>
          <div className="hidden md:block">
            <OrderItems />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
