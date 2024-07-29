"use client";
import { Button } from "@/components/ui/button";
import NewClientForm from "./new-client-form";
import { FC, useState } from "react";
import RegularClientForm from "./regular-client-form";
import { cn } from "@/lib/utils";
import ArrowDown from "/public/images/arrow-down.svg";
import { useSelector } from "react-redux";
import { selectUserContactDetails } from "@/redux/auth/selectors";

const CheckoutContactForm = () => {
  const [currentForm, setCurrentForm] = useState("new");
  const userContactDetails = useSelector(selectUserContactDetails);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col gap-[30px] w-full">
      <div className="flex flex-col gap-[15px]">
        {userContactDetails ? (
          <Button
            variant="ghost"
            className="flex items-center text-base justify-between w-full p-0"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <div className="flex items-center gap-[15px]">
              <div className="w-[30px] h-[30px] p-3 border border-solid border-[#7FAA8480] rounded-full flex items-center justify-center">
                <div className="text-[#484848] font-bold">1</div>
              </div>
              <h3 className="text-[#484848] font-bold">Контактні дані</h3>
            </div>

            <ArrowDown />
          </Button>
        ) : (
          <div className="flex items-center gap-[15px]">
            <div className="w-[30px] h-[30px] p-3 border border-solid border-[#7FAA8480] rounded-full flex items-center justify-center">
              <div className="text-[#484848] font-bold">1</div>
            </div>
            <h3 className="text-[#484848] font-bold">Контактні дані</h3>
          </div>
        )}
        {!userContactDetails && (
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              className={cn("text-[#484848] text-sm", {
                "font-bold underline": currentForm === "new",
              })}
              onClick={() => setCurrentForm("new")}
            >
              Я новий користувач
            </Button>
            <Button
              variant="ghost"
              className={cn("text-[#484848] text-sm", {
                "font-bold underline": currentForm === "regular",
              })}
              onClick={() => setCurrentForm("regular")}
            >
              Я постійний покупець
            </Button>
          </div>
        )}
      </div>
      {currentForm === "new" && <NewClientForm isOpen={isOpen} />}
      {currentForm === "regular" && <RegularClientForm />}
    </div>
  );
};

export default CheckoutContactForm;
