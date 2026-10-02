import { useTranslations } from "next-intl";
import { CopyrightIcon } from "lucide-react";

export const FooterCopyright = () => {
  const t = useTranslations("footer");

  return (
    <div className="flex flex-col gap-[15px] md:gap-12">
      <div className="w-full h-[1px] bg-[#FFFDFD4D]" />
      <div className="flex items-start justify-between gap-4 text-xs md:text-[14px] md:leading-[17.07px]">
        <p className="flex items-start gap-[10px]">
          <CopyrightIcon className="w-4 h-4 shrink-0" aria-hidden />
          {t("copyright")}
        </p>
        <p className="text-right">
          {t("developedBy")} -{" "}
          <a
            href="https://t.me/rosshaluzinskyi"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            Rostyslav Haluzinskiy
          </a>
        </p>
      </div>
    </div>
  );
};
