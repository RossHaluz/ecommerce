"use client";
import { usePathname, useSearchParams } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Home } from "lucide-react";
import { cn } from "@/lib/utils";
import latinToCyrillic from "@/utils/transliterate";
import React, { FC} from "react";
import { useSelector } from "react-redux";
import { selectCategories } from "@/redux/categories/selectors";

interface BreadcrumbsProps {
  productName?: string;
}

const Breadcrumbs: FC<BreadcrumbsProps> = ({productName}) => {
  const pathname = usePathname();
  const segments = pathname
    .split("/")
    .filter((item) => item !== "categories" && item !== "product")
    .filter(Boolean);
    const query = useSearchParams();
    const from = query.get('from');
    const searchValue = query.get("searchValue");
    const categoryName = from?.split('/').filter(item => item !== 'categories' && item !== 'product').filter(Boolean);
    const categories = useSelector(selectCategories) as {
      category_name: string;
      id: string;
      children: {
        category_name: string;
        id: string;
      }[]
    }[];
const parentCategories = categories.map((item) => item?.category_name);

const childCategories = categories.flatMap(
  (item) => item?.children?.map((child) => child?.category_name) || []
);

const allCategories = [...parentCategories, ...childCategories]
   
   
  return (
    <Breadcrumb
      className={cn("", {
        hidden: pathname === "/",
      })}
    >
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">
            <Home size={16} className="stroke-gray-500" />
          </BreadcrumbLink>
        </BreadcrumbItem>

        <>
          {productName ? (
            <>
              <BreadcrumbSeparator className="text-gray-500" />
              {from && categoryName && categoryName?.length > 0 && (
                <>
                  {categoryName?.map((item: string, index: number) => {                   
                    
                    return (
                      <BreadcrumbItem key={index} className="text-gray-600">
                        <BreadcrumbLink
                          href={
                            allCategories.includes(item)
                              ? `/categories/${item}`
                              : `/${item}`
                          }
                        >
                          {latinToCyrillic(item)}
                        </BreadcrumbLink>
                        <BreadcrumbSeparator />
                      </BreadcrumbItem>
                    );
                  })}
                </>
              )}
              <BreadcrumbPage>{productName}</BreadcrumbPage>
            </>
          ) : (
            segments
              .map((segment, index) => {
                const href = "/" + segments.slice(0, index + 1).join("/");
                const isLast = index === segments.length - 1;
                
                return (
                  <React.Fragment key={href}>
                    <BreadcrumbItem>
                      {isLast ? (
                        <>
                          <BreadcrumbSeparator />
                          <BreadcrumbPage className="break-word">
                            {segments?.length < 2
                              ? searchValue
                                ? searchValue
                                : latinToCyrillic(segment)
                              : latinToCyrillic(segment)}
                          </BreadcrumbPage>
                        </>
                      ) : (
                        <>
                          <BreadcrumbSeparator className="text-gray-500" />
                          <BreadcrumbLink
                            href={
                              allCategories.includes(segment)
                                ? `/categories/${segment}`
                                : `/${segment}${
                                    searchValue && `?searchValue=${searchValue}`
                                  }`
                            }
                            className="break-words text-gray-500"
                          >
                            {searchValue
                              ? searchValue
                              : latinToCyrillic(segment)}
                          </BreadcrumbLink>
                        </>
                      )}
                    </BreadcrumbItem>
                  </React.Fragment>
                );
              })
          )}
        </>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default Breadcrumbs;
