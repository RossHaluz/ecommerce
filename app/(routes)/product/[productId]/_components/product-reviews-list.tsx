'use cliemt'
import React, { FC, useEffect, useState } from "react";
import QuotesLeft from "/public/images/quotes-left.svg";
import QuotesRight from "/public/images/quotes-right.svg";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface ProductReviewsListProps {
  reviews: {
    id: string;
    userName: string;
    userEmail: string;
    evaluation: number;
    feedback: string;
    photos: {
      id: string;
      url: string;
    }[];
  }[];
}

const ProductReviewsList: FC<ProductReviewsListProps> = ({ reviews }) => {
  const [countReview, setCountReview] = useState(0);  

  useEffect(() => {
    if (reviews && reviews.length > 0) {
      const totalRating = reviews?.reduce(
        (total, item) => total + Number(item?.evaluation),
        0
      );
      setCountReview(totalRating / reviews.length);
    }
  }, [reviews]);
  
  return (
    <>
      {reviews && reviews?.length > 0 ? (
        <div className="flex flex-col gap-[15px]">
          <div className="p-[15px] bg-[#EAF2EB] rounded-[5px] flex flex-col gap-[15px]">
            <div className="flex items-center gap-[15px]">
              <span>Оцінка {countReview.toFixed(1)}/5</span>
            </div>
            <Button type="button" className="max-w-max">
              <Link href='/'>Залишити відгук</Link>
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <div className="hidden md:block">
            <QuotesLeft />
          </div>
          <p className="text-center mx-auto">
            На жаль, у цього товару ще немає відгуків.<br /> Станьте першим, хто
            залишив відгук!
          </p>
          <div className="hidden md:block">
            <QuotesRight />
          </div>
        </div>
      )}
    </>
  );
};

export default ProductReviewsList;
