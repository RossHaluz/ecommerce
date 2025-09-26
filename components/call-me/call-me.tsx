'use client'
import React, { Dispatch, FC, SetStateAction, useState } from 'react'
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { PhoneIncomingIcon } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CallMeForm from './call-me-form';
import { useIsSmallScreen } from '@/hooks/useIsSmallScreen';

interface CallMeProps {
  showMore: string;
  isOpen: boolean;
  setShowMore: Dispatch<SetStateAction<string>>;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const CallMe: FC<CallMeProps> = ({ isOpen, setShowMore, showMore, setIsOpen }) => {
  const isMobile = useIsSmallScreen(1280);
  const [isSuccess, setIsSuccess] = useState(false)
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          onClick={() => setIsOpen((prev) => !prev)}
          className={cn("group relative flex items-center h-auto p-0", {
            hidden: !isOpen,
          })}
          variant="ghost"
          onMouseLeave={() => setShowMore("")}
        >
          <div
            className={cn(
              "flex items-center gap-2 max-w-max overflow-hidden rounded-lg transform transition-all duration-30 p-1 pl-3",
              {
                " bg-white opacity-1": showMore === "callMe" || isMobile,
              }
            )}
          >
            <span
              className={cn("opacity-0 transform transition-all duration-300", {
                "opacity-100 pointer-events-auto":
                  isMobile || showMore === "callMe",
                "opacity-0 pointer-events-none":
                  showMore !== "callMe" && !isMobile,
              })}
            >
              Перезвоніть мені
            </span>

            <div
              className="h-12 w-12 p-3 bg-[#5285cc] rounded-full flex items-center justify-center transition-colors duration-300"
              onMouseEnter={() => setShowMore("callMe")}
            >
              <PhoneIncomingIcon stroke="#fff" />
            </div>
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white">
        <div className="flex flex-col gap-3">
          <DialogHeader className="flex flex-col gap-3">
            <DialogTitle className="font-bold">
              {isSuccess ? "Дякуємо за Ваше звернення!" : "Передзвоніть мені"}
            </DialogTitle>
            <DialogDescription>
              {isSuccess
                ? "Найближчим часом наш консультант зв'яжеться з вами."
                : "Є питання чи потрібна консультація? Залиште свій номер телефону і ми вам передзвонимо."}
            </DialogDescription>
          </DialogHeader>
          {!isSuccess && <CallMeForm setIsSuccess={setIsSuccess} />}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CallMe
