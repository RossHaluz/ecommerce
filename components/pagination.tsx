"use client";
import { usePathname, useRouter } from "next/navigation";
import { FC, useEffect } from "react";
import Arrow from "/public/images/arrow.svg";
import qs from "query-string";
import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  searchParams: {
    page?: string;
    sortByPrice?: string;
  };
}

const Pagination: FC<PaginationProps> = ({
  currentPage,
  totalPages,
  searchParams,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const { page } = searchParams;

  useEffect(() => {
    if (!page) return;
    localStorage.setItem("currentPage", page);
  }, [page]);

  const handlePreviousPage = () => {
    if (currentPage === 1) return;
    const queryParams = qs.parse(window.location.search);
    const sortByPrice = queryParams?.sortByPrice as string;
    const modelId = queryParams?.modelId as string;
    const stockStatus = queryParams.stockStatus as string;
    const searchValue = queryParams?.searchValue as string;
    const prevPage = currentPage - 1;
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          page: prevPage ? prevPage : null,
          sortByPrice: sortByPrice ? sortByPrice : null,
          stockStatus: stockStatus ? stockStatus : null,
          modelId: modelId ? modelId : null,
          searchValue: searchValue ? searchValue : null,
        },
      },
      { skipEmptyString: true, skipNull: true }
    );

    router.push(url);
  };

  const handleNextPage = () => {
    if (currentPage === totalPages) return;
    const queryParams = qs.parse(window.location.search);
    const sortByPrice = queryParams?.sortByPrice as string;
    const stockStatus = queryParams.stockStatus as string;
    const modelId = queryParams?.modelId as string;
    const searchValue = queryParams?.searchValue as string;

    const nextPage = currentPage + 1;
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          page: nextPage ? nextPage : null,
          sortByPrice: sortByPrice ? sortByPrice : null,
          stockStatus: stockStatus ? stockStatus : null,
          modelId: modelId ? modelId : null,
          searchValue: searchValue ? searchValue : null,
        },
      },
      { skipEmptyString: true, skipNull: true }
    );

    router.push(url);
  };

  const handlePageClick = (pageNumber: number) => {
    const queryParams = qs.parse(window.location.search);
    const sortByPrice = queryParams?.sortByPrice as string;
    const stockStatus = queryParams.stockStatus as string;
    const modelId = queryParams?.modelId as string;
    const searchValue = queryParams?.searchValue as string;
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          page: pageNumber ? pageNumber : null,
          sortByPrice: sortByPrice ? sortByPrice : null,
          stockStatus: stockStatus ? stockStatus : null,
          modelId: modelId ? modelId : null,
          searchValue: searchValue ? searchValue : null,
        },
      },
      { skipEmptyString: true, skipNull: true }
    );

    router.push(url);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage < maxPagesToShow - 1) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      const isCurrentPage = i === Number(currentPage);

      pageNumbers.push(
        <button
          key={i}
          className={cn(
            "text-[#484848] flex items-center justify-center w-[30px] h-[30px]",
            {
              "bg-[#c0092a] text-white rounded-full": isCurrentPage,
              "hover:bg-accent": !isCurrentPage,
            }
          )}
          onClick={() => handlePageClick(i)}
        >
          {i}
        </button>
      );
    }

    return pageNumbers;
  };

  return (
    <div className="flex items-center gap-4 mx-auto py-[10px]">
      <button
        aria-label="Повередня сторінка"
        className="flex items-center gap-2 disabled:text-gray-500 hover:bg-accent px-4 py-2 rounded-md"
        onClick={handlePreviousPage}
        disabled={currentPage === 1}
      >
        <Arrow size={24} />
      </button>

      {renderPageNumbers()}

      <button
        aria-label="Наступна сторінка"
        className="flex items-center gap-2 disabled:text-gray-500 hover:bg-accent px-4 py-2 rounded-md"
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
      >
        <Arrow size={24} className="rotate-180" />
      </button>
    </div>
  );
};

export default Pagination;
