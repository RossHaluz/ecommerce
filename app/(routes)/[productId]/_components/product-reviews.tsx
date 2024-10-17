import React, { FC } from 'react'
import ProductReviewsList from './product-reviews-list';
import ProductReviewForm from './product-review-form';

interface ProductReviewsProps {
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

const ProductReviews: FC<ProductReviewsProps> = ({reviews}) => {
  return (
    <div className='flex flex-col gap-[30px] lg:gap-[42px]'>
      <ProductReviewsList reviews={reviews}/>
      <ProductReviewForm/>
    </div>
  )
}

export default ProductReviews
