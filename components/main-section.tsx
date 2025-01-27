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

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getModels());
  }, [dispatch]);

  return (
    <section className="my-6 lg:my-12">
      <div className="container flex flex-col gap-3 md:gap-[30px] overflow-x-auto">
        <div className="flex items-center justify-between gap-3">
          {title && (
            <h2 className="text-[#484848] font-bold text-2xl lg:text-[32px] lg:leading-[40.16px]">
              {title}
            </h2>
          )}

          <div className="flex items-center gap-6">
            <SortProducts searchParams={params} />
            <CustomizerLayout />
          </div>
        </div>
        <div className="flex flex-col gap-4 lg:flex-row lg:gap-6">
          {shouldBeCategories && (
            <div className="hidden lg:block">
              {isLoading ? (
                <div className="w-[302px] h-[500px] rounded-md bg-[#FFFDFD]" />
              ) : (
                <Categories categories={categories} />
              )}
            </div>
          )}
          <div className="flex flex-col gap-4 md:gap-12 w-full">
            {shouldBeModels && <SearchByModel models={models} />}
            {children}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainSection;
