import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";

interface SubcategoriesProps {
  subcategories: {
    id: string;
    name: string;
    billboard: {
      label: string;
      imageUrl: string;
    };
  }[];
}

const Subcategories: FC<SubcategoriesProps> = ({ subcategories }) => {
  return (
    <div className="flex items-center gap-4 overflow-x-auto w-full">
      {subcategories?.map((item) => {
        return (
          <Link
            href={`/categories/${item?.id}`}
            className="flex flex-col items-center gap-3 shrink-0"
            key={item?.id}
          >
            <Image
              src={`${process.env.BACKEND_URL}/public/billboards/${item?.billboard?.imageUrl}`}
              alt={item?.billboard?.label}
              width={80}
              height={80}
              unoptimized={true}
            />

            <h3 className="md:base font-medium">{item?.name}</h3>
          </Link>
        );
      })}
    </div>
  );
};

export default Subcategories;
