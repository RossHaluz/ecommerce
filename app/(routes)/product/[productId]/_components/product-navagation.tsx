import React, { FC } from "react";

interface ProductNavigationProps {
  currentNavigation: string;
  setCurrentNavigation: React.Dispatch<React.SetStateAction<string>>;
}

const ProductNavigation: FC<ProductNavigationProps> = ({
  currentNavigation,
  setCurrentNavigation,
}) => {
  return (
    <div className="flex items-center gap-4 overflow-hidden overflow-x-auto">
      <div className="relative">
        <h3 className="text-base font-bold">Опис:</h3>
      </div>
    </div>
  );
};

export default ProductNavigation;
