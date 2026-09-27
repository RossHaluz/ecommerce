import { ENDPOINTS } from "./endpoints";
import { request, orNull, STORE_ID } from "./http";
import type { CreatedOrder } from "@/lib/types";

export const createOrder = (values: unknown) =>
  orNull(
    "createOrder",
    request<CreatedOrder>(ENDPOINTS.createOrder(STORE_ID), {
      method: "POST",
      body: values,
      auth: true,
      revalidate: false,
    })
  );
