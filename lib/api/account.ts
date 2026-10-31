import type { AccountOverview, OrderDetails, OrdersPage, OrdersTab } from "@/features/account/model/order-types";
import { ENDPOINTS } from "./endpoints";
import { request, orNull, STORE_ID } from "./http";

/**
 * Персональні дані — єдине місце, де читання cookie виправдане.
 *
 * `auth: true` тягне токен із cookie, а це робить маршрут динамічним і вимикає
 * ISR. Тому публічний каталог його не використовує: раніше кожна функція
 * читала cookie «про всяк випадок», і через це не кешувалась жодна сторінка.
 */
export const getCurrentUser = () =>
  orNull(
    "currentUser",
    request<{ user: unknown }>(ENDPOINTS.currentUser(), {
      auth: true,
      revalidate: false,
    }).then((payload) => (payload as any)?.user ?? payload)
  );

const signedIn = { auth: true, revalidate: false } as const;

export const getAccountOverview = (locale: string) =>
  orNull(
    "accountOverview",
    request<AccountOverview>(`${ENDPOINTS.accountOverview(STORE_ID)}?locale=${locale}`, signedIn)
  );

export const getAccountOrders = (locale: string, { tab, q, cursor }: { tab: OrdersTab; q?: string; cursor?: string }) => {
  const query = new URLSearchParams({ locale, tab, ...(q && { q }), ...(cursor && { cursor }) });
  return orNull("accountOrders", request<OrdersPage>(`${ENDPOINTS.accountOrders(STORE_ID)}?${query}`, signedIn));
};

export const getAccountOrder = (locale: string, number: string) =>
  orNull(
    "accountOrder",
    request<OrderDetails>(`${ENDPOINTS.accountOrder(STORE_ID, encodeURIComponent(number))}?locale=${locale}`, signedIn)
  );

export const updateUser = (values: unknown) =>
  orNull(
    "updateUser",
    request<unknown>(ENDPOINTS.updateUser(), {
      method: "PATCH",
      body: values,
      auth: true,
      revalidate: false,
    })
  );
