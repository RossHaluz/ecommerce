"use client";
import Categories from "@/app/(routes)/(main)/_components/categories";
import React, { FC, useEffect } from "react";
import SearchByModel from "../app/(routes)/(main)/_components/search-by-model";
import { useAppDispatch } from "@/redux/store";
import { getCategories } from "@/redux/categories/operetions";
import { useSelector } from "react-redux";
import {
  selectCategories,
  selectIsLoading,
} from "@/redux/categories/selectors";
import { selectModels } from "@/redux/models/selectors";
import { getModels } from "@/redux/models/operetions";
import SortProducts from "@/app/(routes)/(main)/_components/sort";
import CustomizerLayout from "./сustomizer-layout";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface MainSectionProps {
  title: string;
  children: React.ReactNode;
  shouldBeCategories?: boolean;
  shouldBeModels?: boolean;
  params: {
    filterIds?: string;
    page?: string;
    searchValue?: string;
    sortByPrice?: string;
    modelId?: string;
  };
}

const MainSection: FC<MainSectionProps> = ({
  children,
  title,
  params,
  shouldBeCategories = true,
  shouldBeModels = true,
}) => {
  const dispatch = useAppDispatch();
  const categories = useSelector(selectCategories);
  const isLoading = useSelector(selectIsLoading);
  const models = useSelector(selectModels);
  const pathname = usePathname();
  const shouldBeMargin = pathname.includes("/categories");
  const isHomePage = pathname.endsWith("/");

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getModels());
  }, [dispatch]);

  return (
    <section
      className={cn("mt-3 mb-6", {
        "mt-[70px]": shouldBeMargin || isHomePage,
      })}
    >
      <div className="container flex flex-col gap-3">
        <div className="flex flex-col gap-4 lg:flex-row lg:gap-6">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3 justify-between">
              {title && (
                <h2 className="text-[#484848] font-bold text-base">{title}</h2>
              )}
              <div className="flex md:hidden items-center gap-6">
                <SortProducts searchParams={params} />
                <CustomizerLayout />
              </div>
            </div>

            <div className="hidden lg:block">
              {isLoading ? (
                <div className="w-[302px] h-[500px] rounded-md bg-[#FFFDFD]" />
              ) : (
                <div className="flex flex-col gap-4">
                  <Categories categories={categories} />
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-3 w-full">
            <div className="flex flex-col-reverse md:flex-row md:items-center md:justify-between gap-3">
              <SearchByModel models={models} />

              <div className="hidden md:flex items-center gap-6 ml-auto">
                <SortProducts searchParams={params} />
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
