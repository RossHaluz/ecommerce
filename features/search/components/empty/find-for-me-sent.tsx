import { CircleCheck } from "lucide-react";
import { useTranslations } from "next-intl";
import { maskPhone } from "@/lib/format/mask-phone";

export const FindForMeSent = ({ query, phone }: { query: string; phone: string }) => {
  const t = useTranslations("search");

  return (
    <div role="status" className="flex flex-col items-start gap-2 rounded-lg bg-[#EEF6F0] p-4 text-[#1E5E34]">
      <p className="m-0 flex items-center gap-2 text-base font-extrabold">
        <CircleCheck aria-hidden className="h-5 w-5" />
        {t("sentTitle")}
      </p>
      <p className="m-0 text-sm">{t("sentText", { query, phone: maskPhone(phone) })}</p>
    </div>
  );
};
