import React, { FC } from "react";
import QuotesLeft from "/public/images/quotes-left.svg";
import QuotesRight from "/public/images/quotes-right.svg";

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
  return (
    <>
      {reviews && reviews?.length > 0 ? (
        <div>List reviews</div>
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
