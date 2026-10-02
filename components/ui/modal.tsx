"use client";
import React, { FC, ReactNode } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useTranslations } from "next-intl";
import { Button } from "./button";
import { Link } from "@/i18n/routing";
import { selectOrderItems } from "@/redux/order/selector";
import { useHydratedSelector } from "@/hooks/use-hydrated-selector";

interface ModalProps {
  children: ReactNode;
  title?: string;
  triggetBtn: ReactNode;
}

const ACTION_CLASS = "p-[11.5px] text-white text-sm font-semibold rounded-[5px] bg-[#c0092a]";

const Modal: FC<ModalProps> = ({ children, title, triggetBtn }) => {
  const orderItems = useHydratedSelector(selectOrderItems);
  const t = useTranslations("cart");

  return (
    <Dialog>
      <DialogTrigger asChild>{triggetBtn}</DialogTrigger>
      <DialogContent className="bg-white text-[#484848] rounded-[5px]">
        <div className="flex flex-col gap-[15px] lg:gap-[30px]">
          <DialogHeader>
            <div className="flex flex-col gap-[15px] lg:gap-[30px]">
              <DialogTitle className="text-center">{title}</DialogTitle>
              <div className="w-full h-[1px] bg-[#4848484D]" />
            </div>
          </DialogHeader>
          <div className="max-h-56 overflow-y-auto">{children}</div>
        </div>

        <DialogFooter className="mt-[30px]">
          <div className="flex flex-col gap-[15px] mx-auto lg:gap-[30px] lg:flex-row-reverse">
            {/* Посилання саме собою, а не всередині кнопки; порожній кошик — неактивна кнопка. */}
            {orderItems?.length ? (
              <Button asChild variant="ghost" className={ACTION_CLASS}>
                <Link href="/checkout">{t("placeOrder")}</Link>
              </Button>
            ) : (
              <Button variant="ghost" className={ACTION_CLASS} disabled>
                {t("placeOrder")}
              </Button>
            )}

            <DialogClose className="border border-solid border-[#c0092a] p-[11.5px]  text-[#484848] text-sm font-semibold rounded-[5px] lg:border-none lg:underline">
              {t("continueShopping")}
            </DialogClose>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
