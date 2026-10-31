import { redirect } from "next/navigation";
import { getAccountOverview } from "@/actions/get-data";
import { AccountOverviewView } from "@/features/account/components/account-overview-view";

const AccountPage = async ({ params: { locale } }: { params: { locale: string } }) => {
  const overview = await getAccountOverview(locale);
  if (!overview) redirect("/");

  return <AccountOverviewView overview={overview} />;
};

export default AccountPage;
