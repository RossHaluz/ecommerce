"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { PhoneCall } from "lucide-react";
import ArrowDown from "/public/images/arrow-down.svg";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CallMeForm from "@/components/call-me/call-me-form";
import { handleClickOutside } from "@/utils/click-outside";
import { cn } from "@/lib/utils";

const PHONE_NUMBERS = [
  { tel: "+380673834283", label: "+38 (067) 383 42 83 - Ігор" },
  { tel: "+380965722060", label: "+38 (096) 572 20 60 - Іван" },
  { tel: "+380979104659", label: "+38 (097) 910 46 59 - Богдан" },
] as const;

/**
 * Номери телефонів і форма "Замовити дзвінок" — десктопний блок (мобільна
 * версія має власну кнопку виклику в шапці).
 *
 * Виправлено при переносі: усі три `<Link>` вели на `href="/"` замість
 * `tel:...` — клік по імені менеджера відкривав головну сторінку, дзвінок не
 * ініціювався. Мобільний виклик поруч (`tel:+380673834283`) працював
 * коректно, тому розбіжність не впадала в очі при звичайному тестуванні.
 */
const HeaderContact = () => {
  const [isShowPhoneNumbers, setIsShowPhoneNumbers] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const numbersRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("contact");

  useEffect(() => {
    const handleOutsideClick = handleClickOutside(
      numbersRef,
      setIsShowPhoneNumbers
    );
    window.addEventListener("mousedown", handleOutsideClick);
    return () => window.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return (
    <div className="lg:flex lg:flex-col gap-1 hidden">
      <div className="flex items-center gap-2">
        <PhoneCall className="stroke-[#FFFDFD]" />
        <div className="relative" ref={numbersRef}>
          <Button
            aria-label={t("phoneNumbersAriaLabel")}
            variant="ghost"
            onClick={() => setIsShowPhoneNumbers((prev) => !prev)}
            className="p-0 h-auto flex items-center gap-2 text-[16px] leading-[19.5px] font-medium"
          >
            +38 (067) 383 42 83
            <ArrowDown
              className={cn(
                "stroke-[#FFFDFD] transform transition-all duration-300",
                { "rotate-180": isShowPhoneNumbers }
              )}
            />
          </Button>

          <div
            className={cn(
              "bg-[#FFFDFD] rounded-md shadow-md absolute top-full left-0 p-4 origin-top scale-y-0 transform transition-all duration-300 border z-50 w-max flex flex-col gap-4",
              { "scale-y-100": isShowPhoneNumbers }
            )}
          >
            {PHONE_NUMBERS.map(({ tel, label }) => (
              <Link
                key={tel}
                href={`tel:${tel}`}
                className="text-[#111111] text-[16px] leading-[19.5px]"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <Dialog>
        <DialogTrigger className="underline">{t("orderCall")}</DialogTrigger>
        <DialogContent className="bg-white">
          <div className="flex flex-col gap-3">
            <DialogHeader className="flex flex-col gap-3">
              <DialogTitle className="font-bold">
                {isSuccess ? t("callMeDialogThanks") : t("callMe")}
              </DialogTitle>
              <DialogDescription>
                {isSuccess
                  ? t("callMeDialogSuccessDescription")
                  : t("callMeDialogDescription")}
              </DialogDescription>
            </DialogHeader>
            {!isSuccess && <CallMeForm setIsSuccess={setIsSuccess} />}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HeaderContact;
