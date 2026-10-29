import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { GoogleCallback } from "@/features/auth";

export const metadata: Metadata = { robots: { index: false, follow: false } };

const AuthCallbackPage = ({ params: { locale } }: { params: { locale: string } }) => {
  setRequestLocale(locale);

  return (
    <div className="bg-[#F2F2F2]">
      <div className="container py-6 lg:py-12">
        <GoogleCallback />
      </div>
    </div>
  );
};

export default AuthCallbackPage;
