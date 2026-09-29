"use client";
import { selectOrderDetails } from "@/redux/order/selector";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import OrderProducts from "./order-products";
import OrderDelivary from "./order-delivary";
import OrderPayment from "./order-payment";
import OrderClient from "./order-client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import OrderDropClient from "./order-drop-client";

const OrderDetails = () => {
  const orderDetails = useSelector(selectOrderDetails);
  const formatDate =
    orderDetails && format(orderDetails?.createdAt, "dd-MM-yyyy");
  const formatTime = orderDetails && format(orderDetails?.createdAt, "HH:mm");
  const router = useRouter();

  useEffect(() => {
    if (!orderDetails) {
      router.push("/");
    }
  }, [orderDetails, router]);

  return (
    <>
      {orderDetails && (
        <div className="flex flex-col gap-[30px] container">
          <h3 className="text-[#484848] text-base font-bold lg:text-2xl">
            {orderDetails?.firstName}, дякуємо за замовлення!
          </h3>

          <p className="text-[#484848] lg:font-medium lg:w-[978px]">
            Ваше замовлення № {orderDetails?.orderNumber} прийняте. Ми
            звʼяжеться із вами найближчим часом для підтвердження замовлення або
            надішлено інформаційне повідомлення у Viber чи SMS.
          </p>

          <div className="border border-solid border-[#c0092a] rounded-[5px] p-[15px]">
            <div className="flex flex-col gap-[15px] lg:gap-[30px]">
              <div className="flex flex-col gap-[10px] md:flex-row md:items-center md:justify-between">
                <h3 className="text-base lg:text-2xl font-bold text-[#484848]">
                  Замовлення №{orderDetails?.orderNumber}
                </h3>
                <div className="flex items-center gap-10 md:gap-[15px]">
                  <span className="text-[#484848] text-xs lg:text-base lg:font-medium">
                    {formatDate}
                  </span>
                  <span className="text-[#484848] text-xs lg:text-base lg:font-medium">
                    {formatTime}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-[15px] lg:gap-[30px]">
                <div className="flex flex-col gap-[15px] md:gap-[10px]">
                  <div className="flex items-center justify-between">
                    <span className="text-[#484848]">Назва і ціна товару</span>
                    <span className="text-[#484848] hidden md:inline-block">
                      Кількість
                    </span>
                    <span className="text-[#484848] hidden md:inline-block">
                      Ціна
                    </span>
                  </div>

                  <div className="w-full h-[1px] bg-[#c0092a]" />
                </div>

                {orderDetails?.orderItems?.map(
                  (item: {
                    id: string;
                    quantity: number;
                    price: number;
                    orderItemId: string;
                    priceForOne: number;
                    title: string;
                    article: string;
                    product_name: string;
                    images: {
                      id: string;
                      url: string;
                    }[];
                  }) => {
                    return <OrderProducts key={item?.id} item={item} />;
                  }
                )}
                <div className="w-full h-[1px] bg-[#c0092a]" />

                <OrderDelivary orderDetails={orderDetails} />

                <div className="w-full h-[1px] bg-[#c0092a]" />

                <OrderPayment orderDetails={orderDetails} />

                <div className="w-full h-[1px] bg-[#c0092a]" />

                <OrderClient orderDetails={orderDetails} />
                {orderDetails?.orderType === "DROPSHIP" && (
                  <>
                    <div className="w-full h-[1px] bg-[#c0092a]" />
                    <OrderDropClient
                      dropshipDetails={orderDetails?.dropshipDetails}
                    />
                  </>
                )}
              </div>
            </div>
          </div>

          <Button className="max-w-max mx-auto p-0">
            <Link href="/" className="py-3 px-[34px] lg:py-[10px] lg:px-7">
              На головну
            </Link>
          </Button>
        </div>
      )}
    </>
  );
};

export default OrderDetails;
