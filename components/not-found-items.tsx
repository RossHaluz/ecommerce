import React, { FC } from "react";
import { Button } from "./ui/button";
import Link from "next/link";

interface NotFoundItemsProps {
  text: string;
}

const NotFoundItems: FC<NotFoundItemsProps> = ({ text }) => {
  return (
    <div className="flex flex-col gap-4 md:gap-6 lg:gap-[30px]">
      <div className="p-[15px] bg-[#FFFDFD] rounded-[5px]">
        <h3 className="md:text-base text-[#484848]">{text}</h3>
      </div>
      <Button type="button" className="mx-auto max-w-max">
        <Link href="/categories">Перейти в каталог</Link>
      </Button>
    </div>
  );
};

export default NotFoundItems;
