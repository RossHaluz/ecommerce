import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AccountMobileNavigation from "./_components/account-mobile-navigation";
import AccountDescNavigation from "./_components/account-desc-navigation";
import { getCurrentUser } from "@/actions/get-data";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Акаунт користувача",
  robots: {
    index: false,
    follow: true,
  },
};

const AccountPage = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;
  const user = await getCurrentUser();

  if (!token || !user) {
    return redirect("/");
  }

  return (
    <div className="container mt-6 mb-6 lg:mt-12">
      <AccountMobileNavigation
        token={token}
        user={user}
        ordersByUser={user?.orders}
      />
      <AccountDescNavigation
        token={token}
        user={user}
        ordersByUser={user?.orders}
      />
    </div>
  );
};

export default AccountPage;
