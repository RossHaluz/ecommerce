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
    <div className="flex flex-col gap-[30px]">
      <Button
        variant="ghost"
        className={`p-0 max-h-max justify-start ${
          activeNavigation === "personal-data" && "text-bold"
        }`}
        onClick={() => setActiveNavigation("personal-data")}
      >
        Особистий замовлень
      </Button>

      <Button
        variant="ghost"
        className={`p-0 max-h-max justify-start ${
          activeNavigation === "history" && "text-bold"
        }`}
        onClick={() => setActiveNavigation("history")}
      >
        Історія замовлень
      </Button>

      <Button
        variant="ghost"
        className={`p-0 max-h-max justify-start ${
          activeNavigation === "history" && "text-bold"
        }`}
        onClick={() => setActiveNavigation("change-password")}
      >
        Зміна паролю
      </Button>

      <LogoutBtn token={token} />
    </div>
  );
};

export default AccountSidebar;
