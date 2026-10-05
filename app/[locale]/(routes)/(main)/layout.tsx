import MobileSidebar from "@/components/mobile-sidebar";
import React, { FC } from "react";

interface HomeLayoutProps {
  children: React.ReactNode;
}

// Без Suspense навколо сторінки (і без loading.tsx): notFound() усередині межі
// стрімиться вже після статусу 200, і невідома адреса кешувалась як «200 + noindex».
const HomeLayout: FC<HomeLayoutProps> = ({ children }) => {
  return (
    <>
      {children}
      <MobileSidebar />
    </>
  );
};

export default HomeLayout;
