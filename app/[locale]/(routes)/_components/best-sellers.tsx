import Section from "@/components/section";
import { FC } from "react";
import BestSellersItem from "./best-sellers-item";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface BesrSellersProps {
  bestSellersProducts: {
    id: string;
    title: string;
    description: string;
    price: string;
    article: string;
    images: {
      id: string;
      url: string;
    }[];
  }[];
}

const BesrSellers: FC<BesrSellersProps> = ({ bestSellersProducts }) => {
  return (
    <Section title="Хіти продаж">
      <div className="flex flex-col gap-[30px]">
        <ul className="grid grid-cols-1 gap-5 md:grid-cols-3 lg:grid-cols-4 lg:gap-[30px]">
          {bestSellersProducts?.map((item) => {
            return <BestSellersItem key={item?.id} item={item} />;
          })}
        </ul>
        <Button className="max-w-max px-[17.5px] lg:px-[25px] lg:py-[15px] py-[11.5px] rounded-[5px] mx-auto">
          <Link href="/categories">Перейти в католог</Link>
        </Button>
      </div>
    </Section>
  );
};

export default BesrSellers;
