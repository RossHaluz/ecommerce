import React, { FC } from "react";
import CategoriesSlider from "./categories-slider";
import Section from "@/components/section";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface CategoriesProps {
  categories: {
    id: string;
    name: string;
    billboard: {
      label: string;
      imageUrl: string;
    };
  }[];
}

const Categories: FC<CategoriesProps> = ({ categories }) => {
  return (
    <Section title="Популярні категорії товарів">
      <div className="flex flex-col gap-[30px]">
        <CategoriesSlider categories={categories} />
        <div className="hidden lg:grid lg:grid-rows-2 lg:grid-cols-3  gap-[30px]">
          {categories?.map(
            (item: {
              id: string;
              name: string;
              billboard: { label: string; imageUrl: string };
            }) => {
              return (
                <Link
                  href={`/categories/${item?.id}`}
                  key={item?.id}
                  className="relative h-[250px] flex p-[30px] hover:scale-105 transition-all lg:first-of-type:w-full lg:first-of-type:col-span-2 lg:last-of-type:w-full lg:last-of-type:col-span-2"
                  style={{
                    backgroundImage: `url('${process.env.BACKEND_URL}/billboards/${item?.billboard?.imageUrl}')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-40"></div>

                  <h3 className="text-white  text-2xl font-semibold relative mt-auto lg:w-[293px]">
                    {item?.billboard?.label}
                  </h3>
                </Link>
              );
            }
          )}
        </div>

        <Button className="w-[244px] mx-auto rounded-[5px]">
          <Link href="/categories">Переглянути всі категорії</Link>
        </Button>
      </div>
    </Section>
  );
};

export default Categories;
