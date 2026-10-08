"use client";

import { useTranslations } from "next-intl";
import { useDispatch } from "react-redux";
import { Link } from "@/i18n/routing";
import { CartTotal, TrustNotes } from "@/features/cart";
import { cartPieces, cartTotal } from "@/features/cart/model/cart-total";
import { toOneClickItems } from "@/features/cart/model/to-one-click-items";
import { OrderOneClick } from "@/features/one-click/order-one-click";
import { usePriceFormatter } from "@/hooks/use-price-formatter";
import { cleareOrderItems, type OrderItem } from "@/redux/order/slice";

/** Скільки, за що й дві дороги далі: повне оформлення або лише телефон. */
export const CartSummary = ({ items }: { items: OrderItem[] }) => {
  const t = useTranslations();
  const { format } = usePriceFormatter();
  const dispatch = useDispatch();

  return (
    <section className="flex flex-col gap-3" aria-label={t("cart.total")}>
      <div className="flex flex-col gap-2 rounded-xl bg-white p-4 text-[15px] lg:p-6">
        <div className="flex justify-between gap-3">
          <span>{t("cart.itemsPieces", { count: cartPieces(items) })}</span>
          <span>{format(cartTotal(items))}</span>
        </div>
        <div className="flex justify-between gap-3">
          <span>{t("checkout.deliveryCost")}</span>
          <span className="text-right text-[#6B6B6B]">{t("checkout.delivery.warehouse.cost")}</span>
        </div>
        <CartTotal items={items} />
      </div>
      <Link href="/checkout" className="flex h-[52px] items-center justify-center rounded-lg bg-[#C0092A] text-[17px] font-extrabold text-white">
        {t("cart.placeOrder")}
      </Link>
      <OrderOneClick items={toOneClickItems(items)} sheetOnly onSuccessClose={() => dispatch(cleareOrderItems())} />
      <TrustNotes />
    </section>
  );
};
