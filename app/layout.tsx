import type { Metadata } from "next";
import { Mulish } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProviderWrapper from "@/redux/provider";
import { GoogleAnalytics } from "@next/third-parties/google";

const inter = Mulish({ subsets: ["latin"] });

export const metadata: Metadata = {
  title:
    "Запчастини до Audi (Ауді) - купити запчастини на Audi (Ауді) в інтернет-магазині Audiparts.",
  description:
    "Купити запчастини на Audi (Ауді) в інтернет-магазині. ✓ Більше 4000 оригінальних деталей. ✓ Зачастини на Audi (Ауді) під модель A4, A5, A6, A7, A8, Q5, Q7, Q8. Доставка протягом 2-3 днів по всій Україні.",
  icons: {
    icon: "/favicon.ico",
  },
  twitter: {
    card: "summary_large_image",
  },
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
      <GoogleAnalytics gaId="G-5DKE9X66KP" />
    </html>
  );
}
