"use client";

import { Suspense } from "react";
import { MyModelBar } from "@/features/car-model/components/my-model-bar";
import CustomizerLayout from "@/components/сustomizer-layout";
import { FiltersButton, FiltersButtonPlaceholder } from "./filters-button";
import { ActiveFilterChips } from "./active-filter-chips";
import { CategoryChips } from "./category-chips";

/** Модель і фільтри прилипають під шапкою: що звужує список, видно й змінюється з будь-якого місця. */
// withCategories: у пошуку чипи розділів каталогу не про запит — там свої «Уточніть».
export const ListToolbar = ({ withModel = true, withCategories = true }: { withModel?: boolean; withCategories?: boolean }) => (
  <>
    <div className="sticky top-16 z-10 -mx-4 bg-[#F2F2F2]/95 px-4 py-2 backdrop-blur lg:top-20 lg:mx-0 lg:px-0">
      <div className="flex items-center gap-2 md:gap-3">
        {withModel && <MyModelBar />}
        <Suspense fallback={<FiltersButtonPlaceholder />}>
          <FiltersButton />
        </Suspense>
        <Suspense fallback={null}>
          <ActiveFilterChips />
        </Suspense>
        <div className="ml-auto hidden md:block">
          <CustomizerLayout />
        </div>
      </div>
    </div>
    {withCategories && <CategoryChips />}
  </>
);
