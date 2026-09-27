"use client";
import { Button } from "@/components/ui/button";
import React, { Dispatch, FC, SetStateAction } from "react";
import LogoutBtn from "./logout-btn";

interface AccountSidebarProps {
  token: string;
  activeNavigation: string;
  setActiveNavigation: Dispatch<SetStateAction<string>>;
}

const AccountSidebar: FC<AccountSidebarProps> = ({
  token,
  activeNavigation,
  setActiveNavigation,
}) => {
  return (
    <>
      <div className="flex flex-col gap-[30px] pr-6 border-r border-[#c0092a]">
        <Button
          variant="ghost"
          className={`p-0 text-left max-h-max ${
            activeNavigation === "personal-data" && "text-bold text-[#c0092a]"
          }`}
          onClick={() => setActiveNavigation("personal-data")}
        >
          Особисті дані
        </Button>

        <Button
          variant="ghost"
          className={`p-0 max-h-max text-left ${
            activeNavigation === "history" && "text-bold text-[#c0092a]"
          }`}
          onClick={() => setActiveNavigation("history")}
        >
          Історія замовлень
        </Button>

        <Button
          variant="ghost"
          className={`p-0 max-h-max text-left ${
            activeNavigation === "change-password" && "text-bold text-[#c0092a]"
          }`}
          onClick={() => setActiveNavigation("change-password")}
        >
          Зміна паролю
        </Button>

        <LogoutBtn token={token} />
      </div>
    </>
  );
};

export default AccountSidebar;
