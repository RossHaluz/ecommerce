"use client";
import { selectOrderDetails } from "@/redux/order/selector";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import Address from "/public/images/address.svg";

const OrderDetails = () => {
  const orderDetails = useSelector(selectOrderDetails);
  const formatDate =
    orderDetails && format(orderDetails?.createdAt, "dd-MM-yyyy");
  const formatTime = orderDetails && format(orderDetails?.createdAt, "HH:mm");

  console.log(orderDetails);

  return (
    <div className="flex flex-col gap-[30px] pt-[10px] pb-[30px] lg:py-[30px] container">
      <h3 className="text-[#484848] text-base font-bold lg:text-2xl">
        {orderDetails?.firstName}, дякуємо за замовлення!
      </h3>

      <p className="text-[#484848] lg:font-medium lg:w-[978px]">
        Ваше замовлення № 1003 прийняте. Ми звʼяжеться із вами найближчим часом
        для підтвердження замовленняабо надішлено інформаційне повідомлення у
        Viber чи SMS.
      </p>

      <div className="border border-solid border-[#7FAA84] rounded-[5px] p-[15px]">
        <div className="flex flex-col gap-[15px] lg:gap-[30px]">
          <div className="flex flex-col gap-[10px] md:flex-row md:items-center md:justify-between">
            <h3 className="text-base lg:text-2xl font-bold text-[#484848]">
              Замовлення №1003
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

              <div className="w-full h-[1px] bg-[#7FAA84]" />
            </div>

            <div className="relative">
              {orderDetails?.orderItems?.map(
                (item: {
                  id: string;
                  quantity: number;
                  price: number;
                  orderItemId: string;
                  priceForOne: number;
                  title: string;
                  article: string;
                  images: {
                    id: string;
                    url: string;
                  }[];
                }) => {
                  return (
                    <div className="flex flex-col gap-[15px] md:gap-[10px]">
                      <div
                        className="flex items-start gap-[15px]"
                        key={item?.id}
                      >
                        <Link
                          href={`/${item?.id}`}
                          className="relative rounded-[5px] overflow-hidden w-[94px] h-[94px]"
                        >
                          <Image
                            src={item?.images[0]?.url}
                            alt="Order image"
                            fill
                            className="absolute top-0 right-0 object-cover"
                          />
                        </Link>

                        <div className="flex flex-col gap-[9px]">
                          <div className="flex flex-col gap-[15px]">
                            <Link
                              href={`/${item?.id}`}
                              className="text-[#484848] text-sm font-bold underline"
                            >
                              {item?.title}
                            </Link>
                            <span className="text-[#484848] text-xs">
                              {item?.article}
                            </span>
                          </div>

                          <span className="text-[#484848] md:text-base hidden md:inline-block absolute left-1/2 bottom-0 transform -translate-x-1/2">
                            {item?.quantity} шт.
                          </span>

                          <div className="flex items-end gap-[26px] md:gap-3 md:absolute bottom-0 right-0">
                            <span className="text-[#484848] md:text-base">
                              {item?.quantity} товар на суму
                            </span>
                            <span className="text-[#7FAA84] text-lg">
                              {item?.price} ₴
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="w-full h-[1px] bg-[#7FAA84]" />

                      <div className="flex items-start gap-10">
                        <h3 className="hidden md:inline-block text-base text-[#484848] font-medium">
                          Доставка
                        </h3>
                        <div className="flex items-center md:items-start gap-[15px]">
                          <Address />
                        </div>
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
