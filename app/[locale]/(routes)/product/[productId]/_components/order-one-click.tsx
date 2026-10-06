"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputMask from "react-input-mask";
import { Button } from "@/components/ui/button";
import { FC, forwardRef, useState } from "react";
import { useTranslations } from "next-intl";
import { toast } from "react-toastify";
import { createOrder } from "@/actions/get-data";
import SuccessModel from "./success-model";
import { trackEvent } from "@/lib/analytics/gtag";
import { purchaseEvent } from "@/lib/analytics/ecommerce-events";

interface OrderOneClickProps {
  item: {
    price: string;
    productId: string;
    quantity: 1;
    title: string;
    article: string;
  };
}

const CustomInputMask = forwardRef<
  HTMLInputElement,
  React.ComponentProps<typeof InputMask>
>((props, ref) => {
  return <InputMask {...props} inputRef={ref} />;
});
CustomInputMask.displayName = "CustomInputMask";

const buildFormSchema = (t: (key: string) => string) =>
  z.object({
    phone: z
      .string()
      .min(1, t("phoneRequired"))
      .regex(/^\+380 \d{3} \d{2} \d{2} \d{2}$/, t("phoneInvalid")),
  });

const OrderOneClick: FC<OrderOneClickProps> = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [orderNumber, setOrderNumber] = useState<number | null>(null);
  const t = useTranslations("orderOneClick");
  const tCommon = useTranslations("common");
  const tProduct = useTranslations("product");
  const formSchema = buildFormSchema(t);

  const closeModel = () => {
    setIsOpen(false);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: "",
    },
  });

  const { isSubmitting } = form.formState;
  const { reset } = form;

  const onSubmit = async (value: z.infer<typeof formSchema>) => {
    try {
      const data: {
        phone: string;
        postService: string;
        paymentMethod: string;
        products: {
          price: string;
          productId: string;
          title: string;
          article: string;
        }[];
      } = {
        phone: value?.phone,
        postService: "novaPoshta",
        paymentMethod: "cashOnDelivary",
        products: [],
      };

      data.products.push(item);

      const order = await createOrder(data);

      if (!order) {
        throw new Error();
      }

      setOrderNumber(order?.orderNumber);
      trackEvent(
        "purchase",
        purchaseEvent(order.orderNumber, [{ id: item.productId, title: item.title, price: item.price }], "one_click")
      );
      setIsOpen(true);
      reset();
    } catch (error) {
      toast.error(tCommon("somethingWentWrong"));
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-1.5">
          <label htmlFor="one-click-phone" className="text-sm font-bold text-[#2E2E2E]">
            {tProduct("oneClickCta")}
          </label>
          <div className="flex flex-wrap items-start gap-2">
            <FormField
              name="phone"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex-1 min-w-[180px]">
                  <FormControl>
                    <CustomInputMask
                      id="one-click-phone"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      mask="+380 999 99 99 99"
                      placeholder={t("phonePlaceholder")}
                      {...field}
                      className="w-full h-12 px-4 rounded-lg border border-[#CFCFCF] text-base"
                    />
                  </FormControl>
                  <FormMessage className="text-[#A30722] text-sm" />
                </FormItem>
              )}
            />
            {/* Не вимикаємо до валідного номера: бліда кнопка читалась як зламана, помилку покаже сабміт. */}
            <Button
              type="submit"
              variant="outline"
              className="h-12 px-5 rounded-lg border-2 border-[#C0092A] text-[#C0092A] font-extrabold"
              disabled={isSubmitting}
            >
              {tProduct("oneClick")}
            </Button>
          </div>
        </form>
      </Form>
      <SuccessModel
        orderNumber={orderNumber}
        isOpen={isOpen}
        handleCloseModel={closeModel}
      />
    </>
  );
};

export default OrderOneClick;
