import { z } from "zod";
import { UA_PHONE_PATTERN } from "@/lib/format/ua-phone";
import { DELIVERY_METHODS, PAYMENT_METHODS } from "@/entities/order/model/order-options";

type Translate = (key: string) => string;

const required = (t: Translate, key: string) => z.string().trim().min(1, t(key));

const phone = (t: Translate) => z.string().min(1, t("phoneRequired")).regex(UA_PHONE_PATTERN, t("phoneInvalid"));

/**
 * Прізвище, місто й відділення обов'язкові: без них Нова пошта не видасть посилку,
 * і менеджер мусив передзвонювати по кожне замовлення.
 */
export const createCheckoutSchema = (t: Translate, isDrop: boolean) =>
  z
    .object({
      phone: phone(t),
      firstName: required(t, "firstNameRequired"),
      lastName: required(t, "lastNameRequired"),
      email: z.union([z.literal(""), z.string().trim().email(t("emailInvalid"))]),
      deliveryMethod: z.enum(DELIVERY_METHODS),
      paymentMethod: z.enum(PAYMENT_METHODS),
      city: z.string(),
      ref_city: z.string(),
      separation: z.string(),
      ref_separation: z.string(),
      address: z.string(),
      comment: z.string(),
      clientFirstName: isDrop ? required(t, "firstNameRequired") : z.string(),
      clientLastName: isDrop ? required(t, "lastNameRequired") : z.string(),
      clientPhone: isDrop ? phone(t) : z.string(),
    })
    .superRefine((values, ctx) => {
      const fail = (path: keyof typeof values, key: string) =>
        ctx.addIssue({ code: z.ZodIssueCode.custom, path: [path], message: t(key) });

      if (values.deliveryMethod === "pickup") return;
      // Місто з довідника (є ref) — інакше відділення не знайти; перевізнику досить назви.
      if (values.deliveryMethod === "transporter" ? !values.city.trim() : !values.ref_city) {
        fail("city", "cityRequired");
      }
      if (values.deliveryMethod === "warehouse" && !values.ref_separation) fail("separation", "warehouseRequired");
      if (values.deliveryMethod === "courier" && !values.address.trim()) fail("address", "addressRequired");
    });

export type CheckoutValues = z.infer<ReturnType<typeof createCheckoutSchema>>;
