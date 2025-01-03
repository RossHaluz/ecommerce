import MobileSidebar from "@/components/mobile-sidebar";
import React, { FC } from "react";

interface HomeLayoutProps {
  children: React.ReactNode;
}

const HomeLayout: FC<HomeLayoutProps> = async ({ children }) => {
  return (
    <div>
      {children}

      <MobileSidebar />
    </div>
  );
};

export default HomeLayout;
