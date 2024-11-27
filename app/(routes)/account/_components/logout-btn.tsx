"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import Cookies from "js-cookie";
import { FC } from "react";
import { toast } from "react-toastify";
import Logout from "/public/images/logout.svg";
import { useRouter } from "next/navigation";

interface LogoutBtnProps {
  token: string;
}

const LogoutBtn: FC<LogoutBtnProps> = ({ token }) => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      Cookies.remove("token");
      delete axios.defaults.headers.common["Authorization"];
      router.push("/");
      router.refresh();
      toast.success("Success logout");
    } catch (error) {
      toast.error("Something went wrong...");
    }
  };

  return (
    <div className="flex items-center justify-between lg:justify-normal lg:gap-4">
      <h3 className="text-base text-[#484848] lg:hidden">Особистий кабінет</h3>
      <h3 className="text-base text-[#484848] hidden lg:inline-block">Вихід</h3>
      <Button variant="ghost" onClick={handleLogout} className="p-0">
        <Logout />
      </Button>
    </div>
  );
};

export default LogoutBtn;
