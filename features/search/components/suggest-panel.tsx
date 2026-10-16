"use client";

import { useTranslations } from "next-intl";
import { formatModelName } from "@/lib/seo/format-model-name";
import type { SearchBoxState } from "../hooks/use-search-box";
import { ModelOnlyToggle } from "./model-only-toggle";
import { RecentQueriesList } from "./recent-queries-list";
import { ShowAllButton } from "./show-all-button";
import { SuggestCategories } from "./suggest-categories";
import { SuggestProducts } from "./suggest-products";

export const SEARCH_PANEL_ID = "search-panel";

/** Випадна панель: до набору — історія, під час набору — категорії й товари. */
export const SuggestPanel = ({ box }: { box: SearchBoxState }) => {
  const t = useTranslations("search");
  const { suggestions, recentQueries } = box;
  const products = suggestions?.products ?? [];
  const nothingFound = box.hasQuery && !box.isLoading && suggestions && !suggestions.total;

  const recent = (
    <RecentQueriesList queries={recentQueries.recent} onSearch={box.search} onForget={recentQueries.forget} onClear={recentQueries.clear} />
  );

  return (
    <div
      id={SEARCH_PANEL_ID}
      className="absolute inset-x-0 top-full z-40 max-h-[calc(100dvh-64px)] overflow-y-auto border-t border-[#EEEEEE] bg-white p-3 text-[#2E2E2E] shadow-lg lg:right-auto lg:top-[calc(100%+8px)] lg:max-h-[min(640px,calc(100vh-140px))] lg:w-[min(880px,calc(100vw-340px))] lg:rounded-xl lg:border-0 lg:p-4"
    >
      <div className="flex flex-col gap-3">
        {box.myModel && (
          <ModelOnlyToggle modelName={formatModelName(box.myModel.name)} checked={box.onlyMyModel} onChange={box.setOnlyMyModel} />
        )}

        {!box.hasQuery && (recentQueries.recent.length ? recent : <p className="px-2 py-2 text-sm text-[#6B6B6B]">{t("typeMore")}</p>)}

        {box.hasQuery && (
          <div className="grid gap-4 lg:grid-cols-[minmax(0,260px)_minmax(0,1fr)]">
            <div className="flex flex-col gap-3">
              <SuggestCategories categories={suggestions?.categories ?? []} modelSlug={box.modelSlug} onPick={box.leave} />
              <div className="hidden lg:block">{recent}</div>
            </div>
            <div aria-live="polite" className="flex min-w-0 flex-col gap-2">
              {products.length > 0 && <SuggestProducts products={products} query={box.value} activeIndex={box.activeIndex} onPick={box.leave} />}
              {!products.length && box.isLoading && <p className="px-2 py-2 text-sm text-[#6B6B6B]">{t("searching")}</p>}
              {nothingFound && <p className="px-2 py-2 text-sm text-[#6B6B6B]">{t("nothingFound")}</p>}
            </div>
          </div>
        )}

        {box.hasQuery && Boolean(suggestions?.total) && <ShowAllButton total={suggestions!.total} onClick={() => box.search(box.value)} />}
      </div>
    </div>
  );
};
