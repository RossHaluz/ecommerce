"use client";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC } from "react";
import Arrow from '/public/images/arrow.svg';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    basePath: string;
}

const Pagination: FC<PaginationProps> = ({ currentPage, totalPages, basePath }) => {
  const router = useRouter();

  const handlePreviousPage = () => {
    if (currentPage === 1) return;
    const prevPage = currentPage - 1;
    router.push(`${basePath}?page=${prevPage}`);
  };

  const handleNextPage = () => {
    if (currentPage === totalPages) return;
    const nextPage = currentPage + 1;
    router.push(`${basePath}?page=${nextPage}`);
  };

  const handlePageClick = (pageNumber: number) => {
    router.push(`${basePath}?page=${pageNumber}`);
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
      pageNumbers.push(
        <button
          key={i}
          className={`text-[#484848] flex items-center justify-center w-[30px] h-[30px] ${i === currentPage ? 'bg-[#78AB7E] text-white rounded-full' : 'hover:bg-accent'}`}
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
        className="flex items-center gap-2 disabled:text-gray-500 hover:bg-accent px-4 py-2 rounded-md"
        onClick={handlePreviousPage}
        disabled={currentPage === 1}
      >
        <Arrow size={24}/>
        
      </button>

      {renderPageNumbers()}

      <button
        className="flex items-center gap-2 disabled:text-gray-500 hover:bg-accent px-4 py-2 rounded-md"
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
      >
        
        <Arrow size={24} className='rotate-180'/>
      </button>
    </div>
  );
};

export default Pagination;
