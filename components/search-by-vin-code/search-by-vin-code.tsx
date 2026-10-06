"use client";
import { ReactNode, useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import SearchVinForm from "./search-vin-form";

interface SearchByVinCodeProps {
  /** Своя кнопка, напр. «Перевірити за VIN-кодом» на картці; без неї — кнопка шапки. */
  trigger?: ReactNode;
}

const SearchByVinCode = ({ trigger }: SearchByVinCodeProps) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const t = useTranslations("vin");
  const tContact = useTranslations("contact");

  return (
    <Dialog defaultOpen={false} onOpenChange={() => setIsSuccess(false)}>
      <DialogTrigger asChild>
        {trigger ?? (
          <Button
            type="button"
            className="fixed md:static left-3 bottom-20 lg:bottom-10 lg:right-10 z-30 h-16 w-16 md:min-w-min md:rounded-md md:max-h-max p-2 overflow-hidden text-xs rounded-full break-words text-wrap md:whitespace-nowrap"
          >
            {t("trigger")}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="bg-white flex flex-col gap-4 max-h-[80vh] overflow-y-auto">
        <DialogHeader className="flex flex-col gap-1 items-center">
          <DialogTitle>{isSuccess ? tContact("callMeDialogThanks") : t("title")}</DialogTitle>
          <DialogDescription>{isSuccess ? tContact("callMeDialogSuccessDescription") : t("description")}</DialogDescription>
        </DialogHeader>
        {!isSuccess && <SearchVinForm setIsSuccess={setIsSuccess} />}
      </DialogContent>
    </Dialog>
  );
};

export default SearchByVinCode;
