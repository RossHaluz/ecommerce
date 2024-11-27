"use client";
import { Button } from "@/components/ui/button";
import { selectOrderItems } from "@/redux/order/selector";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import ProductCount from "../../[productId]/_components/product-count";
import { removeItemFromCart } from "@/redux/order/slice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const OrderItems = () => {
  const dispatch = useDispatch();
  const orderItems = useSelector(selectOrderItems);
  let totalPrice = 0;

  const handleRemoveItem = async (id: string) => {
    try {
      dispatch(removeItemFromCart(id));
      toast.success("Success remove item");
    } catch (error) {
      toast.error("Something went wrong...");
    }
  };

  return (
    <div className="p-[30px] rounded-[5px] bg-[#F2F2F2] sticky top-1 transition-all">
      <div className="flex flex-col gap-[30px]">
        <h3 className="text-[#484848] text-2xl font-bold">Ваш кошик</h3>

        {orderItems?.length > 0 ? (
          <div className="flex flex-col gap-[30px]">
            {orderItems?.map(
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
                const imageUrl = item?.images[0].url;
                totalPrice += Number(item?.price);
                return (
                  <div className="flex items-center gap-[30px]" key={item?.id}>
                    <Button
                      variant="ghost"
                      onClick={() => handleRemoveItem(item?.orderItemId)}
                    >
                      X
                    </Button>
                    <div className="w-[118px] h-[118px] rounded-[5px] overflow-hidden relative">
                      <Image
                        src={`${process.env.BACKEND_URL}/products/${imageUrl}`}
                        alt={item?.title}
                        fill
                        className="object-cover absolute top-0 left-0"
                      />
                    </div>
                    <div className="flex flex-col gap-[15px]">
                      <Link
                        href={`/${item?.id}`}
                        className="text-base font-bold text-[#484848] underline"
                      >
                        {item?.title}
                      </Link>

                      <div className="flex items-center gap-[10px]">
                        <span className="text-[#484848] font-medium text-base">
                          {item?.quantity}
                        </span>
                        <span className="text-[#484848]">x</span>
                        <span className="text-[#c0092a] text-base font-bold">
                          {item?.priceForOne} ₴
                        </span>
                      </div>

                      <ProductCount
                        itemId={item?.orderItemId}
                        isFromOrder={true}
                        savePrice={item?.priceForOne}
                        count={item?.quantity}
                      />
                    </div>
                  </div>
                );
              }
            )}

            <div className="w-full h-[1px] bg-[#7FAA8480]" />

            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-[#484848]">
                Загальна вартість:
              </h3>
              <span className="text-[#c0092a] text-base font-bold">
                {totalPrice} ₴
              </span>
            </div>
          </div>
        ) : (
          <h3 className="text-base  text-foreground">Корзина пуста :(</h3>
        )}
      </div>
    </div>
  );
};

export default OrderItems;
