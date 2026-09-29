"use client";
import { FC, MouseEvent } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

interface SuccessModelProps {
  isOpen: boolean;
  handleCloseModel: () => void;
  orderNumber: number | null;
}

const SuccessModel: FC<SuccessModelProps> = ({
  isOpen = true,
  handleCloseModel,
  orderNumber,
}) => {
  const t = useTranslations("successModel");

  const closeBackdrop = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleCloseModel();
    }
  };

  return (
    <div
      className={cn(
        "fixed top-0 left-0 w-full h-full bg-black/80 flex items-center justify-center z-50 px-4 transform transition-all duration-300 scale-0 origin-center",
        {
          "scale-100 opacity-100": isOpen,
          "scale-0 opacity-0": !isOpen,
        }
      )}
      onClick={closeBackdrop}
    >
      <div className={"p-4 bg-white rounded-md relative"}>
        <Button
          type="button"
          variant="ghost"
          className="absolute top-0 right-0"
          onClick={handleCloseModel}
        >
          <X size={16} />
        </Button>
        <div className="flex flex-col gap-3">
          <h3 className="text-base font-semibold text-center">
            {t("thanks")}
          </h3>
          {orderNumber && (
            <h3 className="text-base font-semibold text-center">
              {t("orderNumber", { number: orderNumber })}
            </h3>
          )}
          <p className="text-center text-sm">{t("willContact")}</p>
        </div>
      </div>
    </div>
  );
};

export default SuccessModel;
