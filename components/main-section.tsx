"use client";
import Categories from "@/app/[locale]/(routes)/(main)/_components/categories";
import React, { FC } from "react";
import SearchByModel from "../app/[locale]/(routes)/(main)/_components/search-by-model";
import { useCategories, useModels } from "@/features/catalog";
import SortProducts from "@/app/[locale]/(routes)/(main)/_components/sort";
import CustomizerLayout from "./сustomizer-layout";
import { useParams, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import SearchByStock from "@/app/[locale]/(routes)/(main)/_components/search-by-stock";
import Breadcrumbs from "./breadcrumb";

interface MainSectionProps {
  title: string;
  children: React.ReactNode;
  shouldBeCategories?: boolean;
  shouldBeModels?: boolean;
}

const MainSection: FC<MainSectionProps> = ({
  children,
  title,
  shouldBeCategories = true,
  shouldBeModels = true,
}) => {
  // isPending, не isLoading: у TanStack v5 isLoading на сервері false, а на
  // першому клієнтському рендері true — скелетон ламав гідратацію.
  const { data: categories = [], isPending } = useCategories();
  const { data: models = [] } = useModels();
  const pathname = usePathname();
  const queryParams = useParams();
  const shouldBeMargin =
    pathname.includes("/categories") || queryParams?.modelName;
  const isHomePage = pathname.endsWith("/");

  return (
    <section
      className={cn("mt-3 mb-6 ", {
        "mt-20": shouldBeMargin || isHomePage,
      })}
    >
      <div className="container flex flex-col gap-3">
        <div className="flex flex-col gap-4 lg:flex-row lg:gap-6">
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-3">
              {title && (
                <h1 className="text-[#484848] font-bold text-base">{title}</h1>
              )}
              <Breadcrumbs />
            </div>
            <div className="flex items-center md:hidden gap-3 justify-between">
              {title && (
                <h1 className="text-[#484848] font-bold text-base hidden lg:inline-block">
                  {title}
                </h1>
              )}
              <div className="md:hidden flex-1 min-w-0">
                <SearchByStock />
              </div>

              <div className="flex md:hidden items-center gap-4">
                <SortProducts />
                <CustomizerLayout />
              </div>
            </div>

            {shouldBeCategories && (
              <div className="hidden lg:block h-full">
                {isPending ? (
                  <div className="w-[302px] h-[500px] rounded-md bg-[#FFFDFD]" />
                ) : (
                  <div className="flex flex-col gap-4 h-full">
                    <Categories categories={categories} />
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="flex flex-col gap-3 w-full h-full">
            <div className="flex flex-col-reverse md:flex-row md:items-center md:justify-between gap-3">
              <div className="flex items-center gap-4">
                {shouldBeModels && <SearchByModel models={models} />}
                <div className="hidden md:block">
                  <SearchByStock />
                </div>
              </div>

              <div className="hidden md:flex items-center gap-6 ml-auto">
                <SortProducts />
                <CustomizerLayout />
              </div>
            </div>

            {children}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainSection;
