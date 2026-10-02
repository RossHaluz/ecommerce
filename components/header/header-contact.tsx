"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { PhoneCall } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CallMeForm from "@/components/call-me/call-me-form";
import { PhoneNumbersDropdown } from "@/components/phone-numbers-dropdown";

/** Телефони й «Замовити дзвінок» — десктопний блок; на телефоні є окрема кнопка виклику. */
const HeaderContact = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const t = useTranslations("contact");

  return (
    <div className="lg:flex lg:flex-col gap-1 hidden">
      <div className="flex items-center gap-2">
        <PhoneCall className="stroke-[#FFFDFD]" />
        <PhoneNumbersDropdown />
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
