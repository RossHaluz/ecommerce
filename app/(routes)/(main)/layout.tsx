import MobileSidebar from "@/components/mobile-sidebar";
import React, { FC, Suspense } from "react";

interface HomeLayoutProps {
  children: React.ReactNode;
}

const HomeLayout: FC<HomeLayoutProps> = ({ children }) => {
  return (
    <>
      <Suspense fallback={<div>Loading..</div>}>{children}</Suspense>
      <MobileSidebar />
    </>
  );
};

export default HomeLayout;
