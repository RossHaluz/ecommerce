"use client";
import Categories from "@/app/[locale]/(routes)/(main)/_components/categories";
import React, { FC } from "react";
import { useCategories } from "@/features/catalog";
import { ListToolbar } from "@/features/catalog/components/list-toolbar/list-toolbar";
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

  return (
    <section
      className="mt-3 mb-6"
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
            <ListToolbar withModel={shouldBeModels} />
            {children}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainSection;
