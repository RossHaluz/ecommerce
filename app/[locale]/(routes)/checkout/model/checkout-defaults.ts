import { toMaskedPhone } from "@/lib/format/ua-phone";
import type { CheckoutValues } from "./checkout-schema";

export interface CheckoutUser {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  email?: string;
  type?: string;
}

export const isDropshipper = (user: CheckoutUser | null | undefined) => user?.type === "drop";

/** Залогіненому — його дані з профілю; доставка на відділення й оплата при отриманні — найчастіший вибір. */
export const checkoutDefaults = (user: CheckoutUser | null | undefined): CheckoutValues => ({
  phone: toMaskedPhone(user?.phoneNumber),
  firstName: user?.firstName ?? "",
  lastName: user?.lastName ?? "",
  email: user?.email ?? "",
  deliveryMethod: "warehouse",
  paymentMethod: "cashOnDelivary",
  city: "",
  ref_city: "",
  separation: "",
  ref_separation: "",
  address: "",
  comment: "",
  clientFirstName: "",
  clientLastName: "",
  clientPhone: "",
});
