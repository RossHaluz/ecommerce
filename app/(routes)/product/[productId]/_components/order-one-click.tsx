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
import { toast } from "react-toastify";
import { createOrder } from "@/actions/get-data";
import SuccessModel from "./success-model";
import { sendGAEvent } from "@next/third-parties/google";

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
const formSchema = z.object({
  phone: z.string().min(1, "Номер телефону обов'язково"),
});

const OrderOneClick: FC<OrderOneClickProps> = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);

  const closeModel = () => {
    setIsOpen(false);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: "",
    },
  });

  const { isValid, isSubmitting } = form.formState;
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

      sendGAEvent("event", "make_order_one_click", {
        item_id: item.productId,
        item_name: item.title,
        price: Number(item.price),
        currency: "USD",
      });
      setIsOpen(true);
      reset();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex items-start gap-3 "
        >
          <FormField
            name="phone"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <CustomInputMask
                    mask="+380 999 99 99 99"
                    placeholder="+380 999 99 99 99"
                    {...field}
                    className="w-full px-4 border rounded-md h-12"
                  />
                </FormControl>
                <FormMessage className=" text-red-600 text-sm" />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="h-12 px-6"
            disabled={!isValid || isSubmitting}
          >
            В один клік
          </Button>
        </form>
      </Form>
      <SuccessModel isOpen={isOpen} handleCloseModel={closeModel} />
    </>
  );
};

export default OrderOneClick;
