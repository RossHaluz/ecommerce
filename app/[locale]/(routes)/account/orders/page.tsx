import { redirect } from "next/navigation";
import { getAccountOrders } from "@/actions/get-data";
import { AccountOrdersView } from "@/features/account/components/account-orders-view";
import { parseTab } from "@/features/account/model/order-stage";

interface OrdersPageProps {
  params: { locale: string };
  searchParams: { tab?: string; q?: string; cursor?: string };
}

const OrdersPage = async ({ params: { locale }, searchParams }: OrdersPageProps) => {
  const tab = parseTab(searchParams.tab);
  const query = searchParams.q?.trim() ?? "";
  const page = await getAccountOrders(locale, { tab, q: query, cursor: searchParams.cursor });
  if (!page) redirect("/");

  return <AccountOrdersView page={page} tab={tab} query={query} />;
};

export default OrdersPage;
