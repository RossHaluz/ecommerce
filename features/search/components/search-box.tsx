"use client";

import { useSearchBox } from "../hooks/use-search-box";
import { SearchInput } from "./search-input";
import { SuggestPanel } from "./suggest-panel";

/**
 * Пошук у шапці. На телефоні панель розгортається на всю ширину шапки (обгортка без position),
 * на комп'ютері — під самим полем.
 */
export const SearchBox = () => {
  const box = useSearchBox();

  return (
    <>
      {/* data-search-open: за ним шапка піднімається над нижньою панеллю й плаваючими кнопками. */}
      <div data-search-open={box.isOpen || undefined} className="min-w-0 flex-1 lg:relative lg:z-30">
        {/* Поле над темною підкладкою, інакше дотик до нього закривав би панель. */}
        <form
          role="search"
          className="relative z-30"
          onSubmit={(event) => {
            event.preventDefault();
            box.search(box.value);
          }}
        >
          <SearchInput box={box} />
        </form>
        {box.isOpen && <SuggestPanel box={box} />}
      </div>
      {box.isOpen && <div aria-hidden onClick={box.close} className="fixed inset-0 z-20 bg-[rgba(20,20,20,0.45)]" />}
    </>
  );
};
