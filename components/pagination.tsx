"use client";
import { usePathname, useRouter } from "next/navigation";
import { FC } from "react";
import { useTranslations } from "next-intl";
import Arrow from "/public/images/arrow.svg";
import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

const MAX_PAGES_TO_SHOW = 5;

const visiblePages = (currentPage: number, totalPages: number) => {
  let start = Math.max(1, currentPage - Math.floor(MAX_PAGES_TO_SHOW / 2));
  const end = Math.min(totalPages, start + MAX_PAGES_TO_SHOW - 1);
  start = Math.max(1, end - MAX_PAGES_TO_SHOW + 1);
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
};

/** Фільтри й сортування беруться з поточної адреси — змінюється лише номер сторінки. */
const Pagination: FC<PaginationProps> = ({ currentPage, totalPages }) => {
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("a11y");

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    const query = new URLSearchParams(window.location.search);
    if (page === 1) query.delete("page");
    else query.set("page", String(page));
    const search = query.toString();
    router.replace(search ? `${pathname}?${search}` : pathname);
  };

  return (
    <div className="flex items-center gap-4 mx-auto">
      <button
        aria-label={t("previousPage")}
        className="flex items-center gap-2 disabled:text-gray-500 hover:bg-accent px-4 py-2 rounded-md"
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <Arrow size={24} />
      </button>

      {visiblePages(currentPage, totalPages).map((page) => {
        const isCurrentPage = page === currentPage;
        return (
          <button
            key={page}
            aria-label={t("page", { number: page })}
            aria-current={isCurrentPage ? "page" : undefined}
            className={cn("text-[#484848] flex items-center justify-center w-[30px] h-[30px]", {
              "bg-[#c0092a] text-white rounded-full": isCurrentPage,
              "hover:bg-accent": !isCurrentPage,
            })}
            onClick={() => goToPage(page)}
          >
            {page}
          </button>
        );
      })}

      <button
        aria-label={t("nextPage")}
        className="flex items-center gap-2 disabled:text-gray-500 hover:bg-accent px-4 py-2 rounded-md"
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <Arrow size={24} className="rotate-180" />
      </button>
    </div>
  );
};

export default Pagination;
