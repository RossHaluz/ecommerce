import Image from 'next/image';
import Link from 'next/link';
import React, { FC } from 'react'

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

const Categories: FC<CategoriesProps> = ({categories}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-rows-2 lg:grid-cols-3  gap-[30px]">
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
          >
            <Image
              src={item?.billboard?.imageUrl}
              alt={item?.billboard?.label}
              priority
              fill
              className="absolute top-0 left-0 object-cover"
            />

            <h3 className="text-[#484848] text-2xl font-semibold relative mt-auto lg:w-[293px]">
              {item?.billboard?.label}
            </h3>
          </Link>
        );
      }
    )}
  </div>
  )
}

export default Categories
