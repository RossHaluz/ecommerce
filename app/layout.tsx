import type { Metadata } from "next";
import { Mulish } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProviderWrapper from "@/redux/provider";

const inter = Mulish({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Запчастини під усі моделі Audi",
  description:
    "Великий вибір запчастин під усі моделі Audi. Більше 4000 запчастин у наявності. Доставка по усій Україні. Можливо самовивіз. Вигідні ціни.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ProviderWrapper>
          <Header />
          <main className="">{children}</main>
          <Footer />
          <ToastContainer />
        </ProviderWrapper>
      </body>
    </html>
  );
}
