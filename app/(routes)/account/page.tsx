import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AccountMobileNavigation from "./_components/account-mobile-navigation";
import AccountDescNavigation from "./_components/account-desc-navigation";
import { getCurrentUser } from "@/actions/get-data";

const AccountPage = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;
  const user = await getCurrentUser();

  if (!token || !user) {
    return redirect("/");
  }

  return (
    <div className="container pt-[10px] pb-[30px] lg:pt-[30px]">
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
