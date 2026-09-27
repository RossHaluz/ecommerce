"use client"
import { resetItems } from "@/redux/items/slice";
import Link from "next/link";
import React, { FC } from "react";
import type { Category } from "@/lib/types";
import { useDispatch } from "react-redux";

interface CategoriesProps {
  categories: Category[];
}

const Categories: FC<CategoriesProps> = ({ categories }) => {
  const dispatch = useDispatch();

  return (
    <>
      {categories && categories?.length > 0 && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {categories?.map((item) => {
            return (
              <ul className="flex flex-col gap-4" key={item?.id}>
                <li className="flex flex-col gap-2">
                  <Link
                    href={`/categories/${item?.category_name}`}
                    className="text-base font-bold"
                    onClick={() => dispatch(resetItems())}
                  >
                    {item?.name}
                  </Link>
                  {item?.children && item?.children?.length > 0 && (
                    <ul>
                      {item?.children?.map((item) => (
                        <li key={item?.id}>
                          <Link href={`/categories/${item?.category_name}`}>
                            {item?.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              </ul>
            );
          })}
        </div>
      )}
    </>
  );
};

export default Categories;
