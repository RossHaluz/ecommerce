"use client";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

import { FC, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

import ImageNotFound from "/public/images/image-not-found.jpg";
import Modal from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import Arrow from "/public/images/arrow.svg";
import { selectOrderItems } from "@/redux/order/selector";
import { usePriceFormatter } from "@/hooks/use-price-formatter";
import { productImageUrl } from "@/entities/product/model/product-image-url";
import { StockStatus } from "@/entities/product/ui/stock-status";
import { CartPreview, useAddToCart, useRemoveFromCart } from "@/features/cart";
import type { Product } from "@/lib/types";
import { useHydratedSelector } from "@/hooks/use-hydrated-selector";

interface SimilarProductsSliderProps {
  similarProducts: Product[];
}

/**
 * П'ята копія дубльованого прев'ю кошика в цьому проєкті (після header.tsx,
 * product-item.tsx, product-btn.tsx, mobile-sidebar.tsx) — та сама причина
 * звести до `CartPreview`: тут теж рендерився завжди-порожній
 * `selectOptions.map()` (товар без опцій) і `priority={true}` на мініатюрі
 * в закритій модалці.
 */
const SimilarProductsSlider: FC<SimilarProductsSliderProps> = ({
  similarProducts,
}) => {
  const orderItems = useHydratedSelector(selectOrderItems);
  const addToCart = useAddToCart();
  const removeFromCart = useRemoveFromCart();
  const { format } = usePriceFormatter();
  const t = useTranslations();
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

  return (
    <div className="relative">
      <Swiper
        ref={swiperRef}
        modules={[Navigation]}
        // Ширини слайдів і відступ — у CSS (див. SwiperSlide), щоб розкладка в
        // SSR-HTML збігалась із розкладкою після ініціалізації: інакше до JS
        // кожен слайд займав всю ширину, а потім блок стискався (CLS 0,17).
        slidesPerView="auto"
        spaceBetween={0}
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

        {similarProducts?.map((item) => {
          const imageUrl = productImageUrl(item?.images?.[0]?.url);

          return (
            <SwiperSlide
              key={item?.id}
              className="mr-5 !w-[calc(50%-10px)] md:!w-[calc(33.333%-13.334px)] lg:!w-[calc(20%-16px)] border border-solid border-[#4848484D] rounded-md overflow-hidden"
            >
              <div className="flex flex-col gap-2 bg-[#FFFDFD] rounded">
                <Link href={`/product/${item?.product_name}`} className="w-full">
                  <div className="relative overflow-hidden aspect-video bg-white flex items-center justify-center">
                    <Image
                      src={imageUrl ?? ImageNotFound}
                      alt={item?.title || t("product.imageAlt")}
                      fill
                      sizes="(max-width: 767px) 50vw, (max-width: 1279px) 33vw, 20vw"
                      className="object-contain"
                    />
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

                  <StockStatus quantity={item?.quantity} className="text-sm" />

                  <div className="flex mobile_s:flex-col mobile_s:items-start mobile_m:flex-row mobile_m:items-center justify-between space-x-reverse gap-2">
                    <h3 className="text-sm font-semibold text-[#111111] text-center">
                      {Number(item?.price) === 0
                        ? t("product.negotiablePrice")
                        : format(item.price)}
                    </h3>

                    <Modal
                      triggetBtn={
                        <Button
                          variant="ghost"
                          className="hover:bg-none bg-[#c0092a] mobile_s:w-full mobile_m:max-w-max leading-[14.63px] font-medium p-[12.5px] md:py-[14px] lg:p-4 flex items-center justify-center text-[#FFFDFD]"
                          onClick={() => addToCart(item)}
                        >
                          {t("product.buy")}
                        </Button>
                      }
                      title={t("cart.added")}
                      dialogCancel={t("cart.continueShopping")}
                      dialogAction={
                        <Link
                          href="/"
                          className="flex items-center justify-center text-white text-base font-semibold px-[25.5px] py-[10px]"
                        >
                          {t("cart.placeOrder")}
                        </Link>
                      }
                    >
                      <CartPreview items={orderItems} onRemove={removeFromCart} />
                    </Modal>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default SimilarProductsSlider;
