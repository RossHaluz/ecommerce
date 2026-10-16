"use client";

import { Search, X } from "lucide-react";
import { useTranslations } from "next-intl";
import type { SearchBoxState } from "../hooks/use-search-box";
import { SEARCH_LISTBOX_ID, searchOptionId } from "./suggest-products";

export const SearchInput = ({ box }: { box: SearchBoxState }) => {
  const t = useTranslations("search");

  return (
    <div className="flex h-11 w-full overflow-hidden rounded-[10px] bg-white lg:h-12">
      <label className="flex min-w-0 flex-1 items-center gap-2 pl-3 text-[#8A8A8A]">
        <span className="sr-only">{t("label")}</span>
        <Search aria-hidden className="h-5 w-5 shrink-0" />
        <input
          type="search"
          role="combobox"
          aria-expanded={box.isOpen}
          aria-controls={SEARCH_LISTBOX_ID}
          aria-autocomplete="list"
          aria-activedescendant={box.activeIndex >= 0 ? searchOptionId(box.activeIndex) : undefined}
          value={box.value}
          onChange={(event) => box.setValue(event.target.value)}
          onFocus={box.open}
          onKeyDown={box.onKeyDown}
          placeholder={t("placeholder")}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          enterKeyHint="search"
          className="h-full min-w-0 flex-1 bg-transparent text-base text-[#2E2E2E] outline-none placeholder:text-[#8A8A8A] [&::-webkit-search-cancel-button]:hidden"
        />
      </label>
      {box.value && (
        <button
          type="button"
          onClick={() => box.setValue("")}
          aria-label={t("clear")}
          className="flex w-10 shrink-0 items-center justify-center text-[#8A8A8A] hover:text-[#2E2E2E]"
        >
          <X aria-hidden className="h-5 w-5" />
        </button>
      )}
      <button type="submit" className="hidden shrink-0 bg-[#C0092A] px-5 text-base font-extrabold text-white hover:bg-[#A00823] lg:block">
        {t("submit")}
      </button>
    </div>
  );
};
