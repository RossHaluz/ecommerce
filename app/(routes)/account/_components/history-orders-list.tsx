"use client";
import { Button } from "@/components/ui/button";
import React, { FC, useState } from "react";
import ArrowDown from "/public/images/arrow-down.svg";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import HistoryOrdersDelivary from "./history-orders-delivary";
import HistoryOrdersPayment from "./history-orders-payment";
import HistoryOrdersClient from "./history-orders-client";
import PdfGenerator from "./pdf-generator";
import NotFoundItems from "@/components/not-found-items";
import DropClient from "./drop-client";

interface OrderItem {
  id: string;
  product: {
    price: string;
    product_name: string;
    id: string;
    title: string;
    article: string;

    catalog_number: string;
    images: {
      url: string;
    }[];
  };
  name: string;
  quantity: number;
  price: number;
}

interface HistoryOrdersListProps {
  ordersByUser: {
    id: string;
    city: string;
    firstName: string;
    lastName: string;
    phone: string;
    paymentMethod: string;
    orderNumber: string;
    postService: string;
    dropshipDetails: {
      clientFirstName: string;
      clientLastName: string;
      clientPhone: string;
    };
    separation: string;
    orderType: string;
    address: string;
    typeDelivary: string;
    createdAt: string;
    orderItems: OrderItem[];
  }[];
}

const HistoryOrdersList: FC<HistoryOrdersListProps> = ({ ordersByUser }) => {
  const [isShowItems, setShowItems] = useState<string | null>(null);

  const capitalizeFirstLetter = (str: string) => {
    if (!str) return;
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const USDollar = new Intl.NumberFormat("en-US", {
    currency: "USD",
    style: "currency",
  });

  return (
    <div className="w-full">
      {ordersByUser?.length > 0 ? (
        <ul className="flex flex-col gap-4">
          {ordersByUser?.map((item) => {
            const createdAt = format(new Date(item?.createdAt), "dd.MM.yyyy");
            return (
              <li
                key={item?.id}
                className="flex flex-col gap-[15px] p-[15px] bg-[#FFFDFD] rounded-[5px]"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-[#484848] text-base font-bold">
                    Замовлення № {item?.orderNumber}
                  </h3>

                  <div className="flex items-center gap-4">
                    <PdfGenerator item={item} />
                    <Button
                      variant="ghost"
                      className="p-0"
                      onClick={() =>
                        setShowItems((prev) =>
                          prev === item?.id ? null : item?.id
                        )
                      }
                    >
                      <ArrowDown
                        className={`stroke-[#c0092a] transform transition-all duration-150 ${
                          isShowItems === item?.id && "rotate-180"
                        }`}
                      />
                    </Button>
                  </div>
                </div>

                {/* <span className="text-[#484848]">ТТН: 20450545678902</span> */}
                <span className="text-[#484848]">{createdAt}</span>
                <span className="text-[#c0092a]">Замовлення виконано</span>

                {isShowItems === item?.id && (
                  <div className="flex flex-col gap-[15px]">
                    <div className="w-full h-[1px] bg-[#c0092a]" />
                    <div className="flex flex-col gap-4">
                      {item?.orderItems.map((item) => {
                        const totalPrice = item?.quantity * Number(item?.price);

                        return (
                          <div
                            className="flex items-start gap-[15px]"
                            key={item?.product?.id}
                          >
                            <div className="relative rounded-[5px] overflow-hidden w-20 h-20">
                              <Image
                                src={item?.product?.images[0]?.url}
                                alt={item?.product?.title}
                                fill
                                objectFit="cover"
                                unoptimized={true}
                              />
                            </div>

                            <div className="flex flex-col gap-[15px] w-full">
                              <div className="w-[175px] flex flex-col gap-[10px]">
                                <Link
                                  href={`/product/${item?.product?.product_name}`}
                                  className="underline text-[#484848] font-bold"
                                >
                                  {capitalizeFirstLetter(item?.product?.title)}
                                </Link>
                                <span className="text-[#484848] text-xs">
                                  Артикул: {item?.product?.article}
                                </span>
                              </div>

                              <div className="flex items-center justify-between">
                                <span className="text-[#484848]">
                                  {item?.quantity} товар на суму
                                </span>
                                <span className="text-[#c0092a] text-[18px] leading-[21.94px] font-bold">
                                  {USDollar.format(Number(totalPrice))}
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="w-full h-[1px] bg-[#c0092a]" />
                    <HistoryOrdersDelivary item={item} />
                    <div className="w-full h-[1px] bg-[#c0092a]" />
                    <HistoryOrdersPayment item={item} />
                    <div className="w-full h-[1px] bg-[#c0092a]" />
                    <HistoryOrdersClient item={item} />
                    {item?.orderType === "DROPSHIP" && (
                      <>
                        <div className="w-full h-[1px] bg-[#c0092a]" />
                        <DropClient dropshipDetails={item.dropshipDetails} />
                      </>
                    )}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      ) : (
        <NotFoundItems text={"Ви ще не робили замовлення."} />
      )}
    </div>
  );
};

export default HistoryOrdersList;
