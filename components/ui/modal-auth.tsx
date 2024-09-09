"use client";
import React, { FC, ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ModalAuthProps {
  children: ReactNode;
  triggetBtn: ReactNode;
  onOpenChange: () => void;
}

const ModalAuth: FC<ModalAuthProps> = ({ children, triggetBtn, onOpenChange }) => {

  return (
    <Dialog onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{triggetBtn}</DialogTrigger>
      <DialogContent className="bg-white text-[#484848] rounded-[5px] p-4 flex flex-col gap-[30px] w-[357px]">
<DialogTitle className="text-center font-bold">Вхід до особистого кабінету</DialogTitle>
          {children}
      </DialogContent>
    </Dialog>
  );
};

export default ModalAuth;
