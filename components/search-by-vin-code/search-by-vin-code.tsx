'use client'
import { useState } from "react";
import { Button } from "../ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import SearchVinForm from "./search-vin-form";

const SearchByVinCode = () => {
  const [isSuccess, setIsSuccess] = useState(false);

  return (
    <Dialog defaultOpen={false} onOpenChange={() => setIsSuccess(false)}>
      <DialogTrigger asChild>
        <Button
          type="button"
          className="fixed md:static left-3 bottom-20 lg:bottom-10 lg:right-10 z-30 h-16 w-16 md:min-w-min md:rounded-md md:max-h-max p-2 overflow-hidden text-xs rounded-full break-words text-wrap md:whitespace-nowrap"
        >
          Підбір по VIN коду
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white flex flex-col gap-4 max-h-[80vh] overflow-y-auto">
        <DialogHeader className="flex flex-col gap-1 items-center">
          <DialogTitle>
            {isSuccess
              ? "Дякуємо за Ваше звернення!"
              : "Підбір запчастин спеціалістом!"}
          </DialogTitle>
          <DialogDescription>
            {isSuccess
              ? "Найближчим часом наш консультант зв'яжеться з вами."
              : " Підберемо запчастини професійно, для Вас!"}
          </DialogDescription>
        </DialogHeader>
        {!isSuccess && <SearchVinForm setIsSuccess={setIsSuccess} />}
      </DialogContent>
    </Dialog>
  );
}

export default SearchByVinCode
