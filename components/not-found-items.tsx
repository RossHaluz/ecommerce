"use client"
import React, { FC } from "react";
import { useTranslations } from "next-intl";
import { Button } from "./ui/button";
import { Link } from "@/i18n/routing";

interface NotFoundItemsProps {
  text: string;
}

const NotFoundItems: FC<NotFoundItemsProps> = ({ text }) => {
  const t = useTranslations("filters");

  return (
    <div className="flex flex-col gap-4 md:gap-6 lg:gap-[30px]">
      <div className="p-[15px] bg-[#FFFDFD] rounded-[5px]">
        <h3 className="md:text-base text-[#484848]">{text}</h3>
      </div>
      <Button asChild className="mx-auto max-w-max">
        <Link href="/categories">{t("goToCatalog")}</Link>
      </Button>
    </div>
  );
};

export default NotFoundItems;
