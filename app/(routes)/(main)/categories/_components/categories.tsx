import Link from "next/link";
import React, { FC } from "react";

interface CategoriesProps {
  categories: {
    id: string;
    name: string;
    category_name: string;
    children: {
      category_name: string;
      name: string;
      id: string;
    }[];
    billboard: {
      label: string;
      imageUrl: string;
    };
  }[];
}

const Categories: FC<CategoriesProps> = ({ categories }) => {
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
