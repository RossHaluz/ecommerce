"use client";
import Modal from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React, { FC, useState } from "react";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { selectOrderItems } from "@/redux/order/selector";
import { selectCurrentCustomizer } from "@/redux/customizer/selectors";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import ImageNotFound from "/public/images/image-not-found.jpg";
import { useIsSmallScreen } from "@/hooks/useIsSmallScreen";
import { usePriceFormatter } from "@/hooks/use-price-formatter";
import { productImageUrl } from "@/entities/product/model/product-image-url";
import { Product } from "@/lib/types";
import { CartPreview, useAddToCart, useRemoveFromCart } from "@/features/cart";
import { useHydratedSelector } from "@/hooks/use-hydrated-selector";

interface ProductItemProps {
  index: number;
  item: Product
}

/**
 * Раніше картинка мала три ідентичні гілки (`images.length <= 1` /
 * `isMobile` / інше) — усі три рендерили той самий блок; десктопний слайдер
 * тут лишається закоментованим (не наш scope прямо зараз). Звели до однієї.
 */
const ProductItem: FC<ProductItemProps> = ({ item, index }) => {
  const imageUrl = productImageUrl(item?.images?.[0]?.url);
  const orderItems = useHydratedSelector(selectOrderItems);
  const currentCustomizer = useHydratedSelector(selectCurrentCustomizer);
  const pathname = usePathname();
  const [isMouseEnter, setIsMouseEnter] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const isMobile = useIsSmallScreen();
  const { format } = usePriceFormatter();
  const addToCart = useAddToCart();
  const removeFromCart = useRemoveFromCart();
  const t = useTranslations();

  return (
    <li
      className={cn(
        "group grid gap-2 bg-[#FFFDFD] rounded hover:rounded-b-none transition-transform duration-300 ease-out cursor-pointer lg:hover:scale-105 max-h-max relative z-0 lg:hover:z-10  hover:shadow-xl",
        {
          "grid-cols-5 p-4 md:p-6": currentCustomizer === "list",
          "grid-cols-1": currentCustomizer === "grid",
        }
      )}
      onMouseEnter={() => setIsMouseEnter(item?.id)}
      onMouseLeave={() => setIsMouseEnter(null)}
    >
      <Link
        href={`/product/${item?.product_name}${
          pathname.split("/").filter(Boolean)?.length > 0 &&
          !pathname.includes("search")
            ? `?from=${encodeURIComponent(pathname)}`
            : ""
        }`}
        className={cn("w-full", {
          "col-span-2": currentCustomizer === "list",
        })}
        scroll={false}
      >
        <div
          className={cn(
            "relative w-full aspect-video flex justify-center items-center bg-white overflow-hidden",
            { "aspect-video": currentCustomizer === "list" }
          )}
        >
          {loading && (
            <div className="absolute inset-0 animate-pulse bg-gray-300" />
          )}

          <Image
            src={imageUrl ?? ImageNotFound}
            alt={item?.title || t("product.imageAlt")}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-contain"
            onLoad={() => setLoading(false)}
          />
        </div>
      </Link>

      <div
        className={cn("flex flex-col gap-2 h-full md:justify-between", {
          "col-span-3": currentCustomizer === "list",
          "p-3": currentCustomizer === "grid",
        })}
      >
        <div className="flex flex-col gap-2 md:gap-4">
          <Link href={`/product/${item?.product_name}`}>
            <h2
              className={cn(
                "text-[14px] leading-[17.07px] font-medium text-[#111111] uppercase line-clamp-1 md:text-[24px] md:leading-[33.6px]",
                {
                  "md:text-[14px] md:leading-[17.07px]":
                    currentCustomizer === "grid",
                }
              )}
            >
              {item?.title}
            </h2>
          </Link>

          <div className="flex items-center gap-2 justify-between">
            <h3
              className={cn(
                "text-[10px] leading-[12.19px] md:text-[14px] md:leading-[17.07px]",
                { "text-left": currentCustomizer === "grid" }
              )}
            >
              {item?.catalog_number}
            </h3>

            <h3 className="text-[10px] leading-[12.19px] md:text-[14px] md:leading-[17.07px]">
              {item?.article}
            </h3>
          </div>
        </div>

        {item?.quantity === 0 ? (
          <span className="text-[#ffa900] font-medium">{t("product.onOrder")}</span>
        ) : (
          <span className="text-[#00a046] font-medium">{t("product.inStock")}</span>
        )}

        <div className="flex mobile_s:flex-col mobile_m:flex-row mobile_s:items-start mobile_m:items-center justify-between space-x-reverse gap-2">
          <h3
            className={cn("text-sm font-semibold text-[#111111]", {
              "text-center": currentCustomizer === "grid",
            })}
          >
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

      {item?.models?.length > 0 && !isMobile && isMouseEnter && (
        <div
          className="absolute top-[98%] left-0 right-0 bg-white p-3 shadow-xl rounded-b
  opacity-0 translate-y-3
  group-hover:opacity-100 group-hover:translate-y-0
  transition-all duration-300 z-20 flex flex-col gap-2 text-xs"
        >
          <Separator />
          <span className="text-gray-700">
            {item?.models?.length === 1
              ? t("product.modelSingular")
              : t("product.modelPlural")}
          </span>
          {item?.models?.map((m) => m?.model?.name)?.join(", ")}
        </div>
      )}
    </li>
  );
};

export default ProductItem;
