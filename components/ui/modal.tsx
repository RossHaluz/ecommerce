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
import { Button } from "./button";
import { useSelector } from "react-redux";
import Link from "next/link";
import { selectOrderItems } from "@/redux/order/selector";

interface ModalProps {
  children: ReactNode;
  title?: string;
  dialogCancel?: string;
  dialogAction?: ReactNode;
  triggetBtn: ReactNode;
}

const Modal: FC<ModalProps> = ({ children, title, triggetBtn }) => {
  const orderItems = useSelector(selectOrderItems);

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
            <Button
              variant="ghost"
              className="p-[11.5px]  text-white text-sm font-semibold rounded-[5px] bg-[#c0092a]"
              disabled={orderItems?.length === 0}
            >
              <Link href="/checkout">Оформити замовлення</Link>
            </Button>

            <DialogClose className="border border-solid border-[#c0092a] p-[11.5px]  text-[#484848] text-sm font-semibold rounded-[5px] lg:border-none lg:underline">
              Продовжити покупки
            </DialogClose>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
