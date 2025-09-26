"use client";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

import { FC, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

import ImageNotFound from "/public/images/image-not-found.jpg";
import Modal from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { nanoid } from "nanoid";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { selectOrderItems } from "@/redux/order/selector";
import { toast } from "react-toastify";
import { addItemToCart, removeItemFromCart } from "@/redux/order/slice";
import { Trash } from "lucide-react";
import Arrow from "/public/images/arrow.svg";

interface SimilarProductsSliderProps {
  similarProducts: {
    id: string;
    title: string;
    quantity: number;
    product_name: string;
    price: string;
    catalog_number: string;
    article: string;
    images: {
      id: string;
      url: string;
    }[];
  }[];
}

const SimilarProductsSlider: FC<SimilarProductsSliderProps> = ({
  similarProducts,
}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const orderItems = useSelector(selectOrderItems);
  const swiperRef = useRef<any>(null);
  const prevRef = useRef<HTMLDivElement | null>(null);
  const nextRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (swiperRef.current && prevRef.current && nextRef.current) {
      const navigation = swiperRef.current.params.navigation;
      if (typeof navigation === "object") {
        navigation.prevEl = prevRef.current;
        navigation.nextEl = nextRef.current;
        swiperRef.current.navigation.init();
        swiperRef.current.navigation.update();
      }
    }
  }, []);

  const handleAddItemToCart = (data: {
    id: string;
    title: string;
    price: string;
    article: string;
    priceForOne?: string | "";
    quantity?: number;
    images: {
      id: string;
      url: string;
    }[];
  }) => {
    try {
      const itemToCart = {
        ...data,
        quantity: 1,
        price: Number(data.price),
        priceForOne: data.priceForOne
          ? Number(data.priceForOne)
          : Number(data.price),
        selectOptions: [],
        orderItemId: nanoid(),
      };
      dispatch(addItemToCart(itemToCart));
      toast.success("Item successfully added to cart");
    } catch (error) {
      toast.error("Something went wrong...");
    }
  };

  const handleDeleteItem = async (id: string) => {
    try {
      dispatch(removeItemFromCart(id));
      router.refresh();
      toast.success("Item successfully deleted");
    } catch (error) {
      toast.error("Something went wrong...");
    }
  };

  const capitalizeFirstLetter = (str: string) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const USDollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <div className="relative">
      <Swiper
        ref={swiperRef}
        modules={[Navigation]}
        spaceBetween={20}
        slidesPerView={2}
        breakpoints={{
          768: {
            slidesPerView: 3,
          },
          1280: {
            slidesPerView: 5,
          },
        }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
      >
        <div
          ref={prevRef}
          className="absolute top-1/2 left-0 transform -translate-y-1/2 ml-3 z-20"
        >
          <div className="bg-[#f5f5f5] hover:bg-[#e9e9e9] transform transition-all duration-300 rounded-full flex items-center justify-center p-2 cursor-pointer">
            <Arrow className="fill-[#161515]" />
          </div>
        </div>
        <div
          ref={nextRef}
          className="absolute top-1/2 right-0 transform -translate-y-1/2 mr-3 z-20"
        >
          <div className="bg-[#f5f5f5] hover:bg-[#e9e9e9] transform transition-all duration-300 rounded-full flex items-center justify-center p-2 cursor-pointer">
            <Arrow className="fill-[#161515] rotate-180" />
          </div>
        </div>

        {similarProducts?.map((item) => (
          <SwiperSlide
            key={item?.id}
            className="border border-solid border-[#4848484D] rounded-md overflow-hidden"
          >
            <div className="flex flex-col gap-2 bg-[#FFFDFD] rounded">
              <Link
                href={`/product/${item?.product_name}`}
                className="w-full"
              >
                <div className="relative overflow-hidden aspect-video w-full">
                  {item?.images?.length > 0 ? (
                    <Image
                      src={`${process.env.BACKEND_URL}/products/${item?.images[0]?.url}`}
                      alt={item?.title}
                      fill
                      objectFit="contain"
                      objectPosition="center center"
                      priority
                    />
                  ) : (
                    <Image
                      src={ImageNotFound}
                      alt="Image not found"
                      fill
                      objectFit="cover"
                    />
                  )}
                </div>
              </Link>

              <div className="flex flex-col gap-2 h-full md:justify-between p-3">
                <div className="flex flex-col gap-2 md:gap-4">
                  <Link href={`/product/${item?.product_name}`}>
                    <h2 className="text-sm font-medium text-[#111111] uppercase line-clamp-1 text-left">
                      {item?.title}
                    </h2>
                  </Link>

                  <div className="flex items-center gap-2 justify-between">
                    <h3 className="text-[10px] leading-[12.19px] md:text-[14px] md:leading-[17.07px] text-center">
                      {item?.catalog_number}
                    </h3>

                    <h3 className="text-[10px] leading-[12.19px] md:text-[14px] md:leading-[17.07px]">
                      {item?.article}
                    </h3>
                  </div>
                </div>

                {item?.quantity === 0 ? (
                  <span className="text-[#ffa900] text-sm font-medium text-left">
                    Під замовлення
                  </span>
                ) : (
                  <span className="text-[#00a046] text-sm font-medium text-left">
                    В наявності
                  </span>
                )}

                <div className="flex mobile_s:flex-col mobile_s:items-start mobile_m:flex-row mobile_m:items-center justify-between space-x-reverse gap-2">
                  <h3 className="text-sm font-semibold text-[#111111] text-center">
                    {Number(item?.price) === 0 && "Ціна договірна"}
                    {Number(item?.price) > 0 &&
                      USDollar.format(Number(item?.price))}
                  </h3>

                  <Modal
                    triggetBtn={
                      <Button
                        variant="ghost"
                        className="hover:bg-none bg-[#c0092a] mobile_s:w-full mobile_m:max-w-max leading-[14.63px] font-medium p-[12.5px] md:py-[14px] lg:p-4 flex items-center justify-center text-[#FFFDFD]"
                        onClick={() => handleAddItemToCart(item)}
                      >
                        Купити
                      </Button>
                    }
                    title="Товар доданий до Вашого кошика!"
                    dialogCancel={"Продовжити покупки"}
                    dialogAction={
                      <Link
                        href="/"
                        className="flex items-center justify-center text-white text-base font-semibold px-[25.5px] py-[10px]"
                      >
                        Оформити замовлення
                      </Link>
                    }
                  >
                    {orderItems?.length > 0 ? (
                      <div className="flex flex-col gap-3">
                        {orderItems?.map((orderItem: any) => (
                          <div
                            className="flex items-start gap-3 w-full rounded-[5px]"
                            key={orderItem?.orderItemId}
                          >
                            <div className="w-[65px] h-[65px] rounded-[5px] overflow-hidden relative">
                              <Image
                                src={`${process.env.BACKEND_URL}/products/${orderItem?.images?.[0]?.url}`}
                                alt={orderItem?.images?.[0]?.id}
                                fill
                                className="object-cover"
                                priority={true}
                              />
                            </div>
                            <div className="flex flex-col gap-3 w-full">
                              <div className="flex items-center justify-between w-full">
                                <div className="flex flex-col gap-2">
                                  <h3 className="text-[#484848] text-sm underline w-[167px] lg:w-full">
                                    {capitalizeFirstLetter(orderItem?.title)}
                                  </h3>
                                  {orderItem?.selectOptions?.map((opt: any) => (
                                    <h3
                                      className="text-xs text-foreground"
                                      key={opt?.id}
                                    >
                                      {opt?.optionTitle}: {opt?.optionValue}
                                    </h3>
                                  ))}
                                </div>
                                <Button
                                  variant="ghost"
                                  size="reset"
                                  onClick={() =>
                                    handleDeleteItem(orderItem?.orderItemId)
                                  }
                                >
                                  <Trash />
                                </Button>
                              </div>

                              <div className="flex items-center justify-between lg:items-start w-full lg:flex-col lg:gap-[10px]">
                                <span className="text-lg text-[#c0092a] font-bold">
                                  {USDollar.format(Number(orderItem?.price))}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="w-full h-full flex justify-center items-center">
                        <h3 className="text-[#484848] text-sm">
                          Корзина пуста :(
                        </h3>
                      </div>
                    )}
                  </Modal>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SimilarProductsSlider;
