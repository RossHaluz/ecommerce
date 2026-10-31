import { notFound } from "next/navigation";
import { getAccountOrder } from "@/actions/get-data";
import { AccountOrderView } from "@/features/account/components/account-order-view";

const OrderPage = async ({ params: { locale, number } }: { params: { locale: string; number: string } }) => {
  const order = await getAccountOrder(locale, number);
  if (!order) notFound();

  return <AccountOrderView order={order} />;
};

export default OrderPage;
