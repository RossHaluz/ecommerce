import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "@/components/ui/select";
import React, { FC } from "react";

interface ProductOptionProps {
  optionValues: {
    title: string;
    id: string;
    optionValue: {
      id: string;
      price: string;
      optionTitle?: string;
      optionValue: string;
      option: string;
    }[];
  }[];
  setCurrentPrice: React.Dispatch<React.SetStateAction<number>> | undefined;
  setSavePrice: React.Dispatch<React.SetStateAction<string>>;
  setSelectOptions: React.Dispatch<React.SetStateAction<any[]>>;
  setPriceForOne: React.Dispatch<React.SetStateAction<string>>;
}

const ProductOption: FC<ProductOptionProps> = ({
  optionValues,
  setCurrentPrice,
  setSavePrice,
  setSelectOptions,
  setPriceForOne,
}) => {
  const handleSelectOption = (data: {
    optionValueId: string;
    optionTitle: string;
  }) => {
    const { optionValueId, optionTitle } = data;

    const options = optionValues?.map((item) => item.optionValue);
    const optionValue = options
      ?.flatMap((item) => item)
      .map((item) => item)
      .find((item) => item?.id === optionValueId);

    if (optionValue) {
      optionValue.optionTitle = optionTitle;
    }

    setSelectOptions((prev) => {
      const findWhithTheSameOption = prev?.find(
        (item) => item?.option === optionValue?.option
      );

      let newPrev = [...prev];

      if (findWhithTheSameOption) {
        const findIndex = newPrev?.findIndex(
          (item) => item?.id === findWhithTheSameOption?.id
        );
        newPrev.splice(findIndex, 1);

        return newPrev?.length > 0 ? [...newPrev, optionValue] : [optionValue];
      }

      return newPrev?.length > 0 ? [...newPrev, optionValue] : [optionValue];
    });

    if (optionValue && optionValue?.price !== "0" && setCurrentPrice) {
      setCurrentPrice(Number(optionValue.price));
      setSavePrice(optionValue.price);
      setPriceForOne(optionValue.price);
    }
  };

  return (
    <div className="flex flex-col gap-[15px]">
      {optionValues?.map((option) => (
        <div
          className="grid grid-cols-1 gap-[10px] lg:grid-cols-2 items-center"
          key={option?.id}
        >
          <h3 className="text-base font-bold text-[#484848]">
            {option?.title}
          </h3>
          <Select
            onValueChange={(optionValueId) =>
              handleSelectOption({ optionValueId, optionTitle: option.title })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              {option?.optionValue?.flatMap((item) => (
                <SelectItem
                  className="cursor-pointer hover:underline"
                  value={item?.id}
                  key={item?.id}
                >
                  {item?.optionValue}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      ))}
    </div>
  );
};

export default ProductOption;
