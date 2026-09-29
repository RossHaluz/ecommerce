import { ENDPOINTS } from "./endpoints";
import { request, orNull } from "./http";

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
