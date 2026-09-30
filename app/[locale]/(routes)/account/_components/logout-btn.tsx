"use client";
import { Button } from "@/components/ui/button";
import { FC } from "react";
import { toast } from "react-toastify";
import Logout from "/public/images/logout.svg";
import { useRouter } from "next/navigation";
import { useSession } from "@/features/account";

interface LogoutBtnProps {
  token: string;
}

const LogoutBtn: FC<LogoutBtnProps> = ({ token }) => {
  const { signOut } = useSession();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      signOut();
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
