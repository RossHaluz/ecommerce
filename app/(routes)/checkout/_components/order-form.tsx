"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { useSelector } from "react-redux";
import { selectUserContactDetails } from "@/redux/auth/selectors";
import { toast } from "react-toastify";
import axios from "axios";
import { selectOrderItems } from "@/redux/order/selector";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { cleareOrderItems, setOrderDetails } from "@/redux/order/slice";
import { removeUserContactDetails } from "@/redux/auth/slice";

const formSchema = z.object({
  postService: z.enum(["nova-poshta", "ukr-poshta", "justin"], {
    required_error: "You need to select a post service.",
  }),
  city: z.string().min(1, {
    message: "City is required",
  }),
  address: z.string(),
  payment: z.enum(["liqpay", "monobank"], {
    required_error: "You need to select a payment method.",
  }),
  comment: z.string(),
  callBack: z.boolean().default(false),
  separation: z.string(),
});

const OrderForm = () => {
  const [currentDelivary, setCurrentDelivary] = useState("separation");
  const userDetails = useSelector(selectUserContactDetails);
  const orderItems = useSelector(selectOrderItems);
  const router = useRouter();
  const dispatch = useDispatch();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      postService: "nova-poshta",
      city: "",
      address: "",
      payment: "liqpay",
      comment: "",
      callBack: false,
      separation: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const data: {
        products?: { productId: string; quantity: number }[];
        firstName: string;
        lastName: string;
        phone: string;
      } = {
        ...values,
        firstName: userDetails?.firstName,
        lastName: userDetails?.lastName,
        phone: userDetails?.phoneNumber,
      };

      if (orderItems?.length > 0) {
        data.products = orderItems?.map(
          (item: { id: string; quantity: number }) => ({
            productId: item?.id,
            quantity: item?.quantity,
          })
        );
      }

      const { data: responce } = await axios.post(
        "http://localhost:3001/api/42e0b4fa-a9a3-46b2-85ad-78f2833bf90c/orders",
        data
      );

      dispatch(setOrderDetails({ ...responce, orderItems }));
      dispatch(cleareOrderItems());
      dispatch(removeUserContactDetails());
      router.push("/success");
    } catch (error) {
      toast.error("Something went wrong...");
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-[30px]"
      >
        <div className="flex flex-col gap-[15px] lg:gap-[30px]">
          {/* Достака  */}
          <div className="flex flex-col gap-[15px] lg:gap-[30px] w-full">
            <div className="flex items-center gap-[15px]">
              <div className="w-[30px] h-[30px] p-3 border border-solid border-[#7FAA8480] rounded-full flex items-center justify-center">
                <div className="text-[#484848] font-bold">2</div>
              </div>
              <h3 className="text-[#484848] font-bold">Доставка</h3>
            </div>

            <h3 className="text-base text-[#484848] font-medium">
              Оберіть поштовий сервіс
            </h3>

            <div className="flex flex-col gap-[15px]">
              <div className="flex flex-col gap-[13px]">
                <FormField
                  control={form.control}
                  name="postService"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="nova-poshta" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Нова пошта
                            </FormLabel>
                          </FormItem>

                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="ukr-poshta" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Укр-пошта
                            </FormLabel>
                          </FormItem>

                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="justin" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Justin
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage className=" text-red-500 text-sm " />
                    </FormItem>
                  )}
                />

                <div className="flex items-center gap-2 justify-between">
                  <Button
                    variant="ghost"
                    className={cn("text-base text-[#484848] p-0 font-medium", {
                      "text-[#7FAA84] font-bold underline":
                        currentDelivary === "separation",
                    })}
                    onClick={() => setCurrentDelivary("separation")}
                  >
                    Доставка на відділення
                  </Button>
                  <Button
                    variant="ghost"
                    className={cn("text-base text-[#484848] p-0 font-medium", {
                      "text-[#7FAA84] font-bold underline":
                        currentDelivary === "address",
                    })}
                    onClick={() => setCurrentDelivary("address")}
                  >
                    Доставка за даресою
                  </Button>
                </div>
              </div>

              {currentDelivary === "separation" && (
                <div className="flex flex-col gap-[15px]">
                  <FormField
                    name="city"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Виберіть місто" />
                            </SelectTrigger>
                            <SelectContent className="bg-white">
                              <SelectItem
                                value="Хмельницький"
                                className=" cursor-pointer"
                              >
                                Хмельницький
                              </SelectItem>
                              <SelectItem
                                value="Київ"
                                className=" cursor-pointer"
                              >
                                Київ
                              </SelectItem>
                              <SelectItem
                                value="Вінниця"
                                className=" cursor-pointer"
                              >
                                Вінниця
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage className=" text-red-500 text-sm " />
                      </FormItem>
                    )}
                  />

                  <FormField
                    name="separation"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Виберіть відділення" />
                            </SelectTrigger>
                            <SelectContent className="bg-white">
                              <SelectItem
                                value="Відділення №1"
                                className=" cursor-pointer"
                              >
                                Відділення №1
                              </SelectItem>
                              <SelectItem
                                value="Відділення №2"
                                className=" cursor-pointer"
                              >
                                Відділення №2
                              </SelectItem>
                              <SelectItem
                                value="Відділення №3"
                                className=" cursor-pointer"
                              >
                                Відділення №3
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage className=" text-red-500 text-sm " />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {currentDelivary === "address" && (
                <div className="flex flex-col gap-[15px]">
                  <FormField
                    name="city"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Виберіть місто" />
                            </SelectTrigger>
                            <SelectContent className="bg-white">
                              <SelectItem
                                value="Хмельницький"
                                className=" cursor-pointer"
                              >
                                Хмельницький
                              </SelectItem>
                              <SelectItem
                                value="Київ"
                                className=" cursor-pointer"
                              >
                                Київ
                              </SelectItem>
                              <SelectItem
                                value="Вінниця"
                                className=" cursor-pointer"
                              >
                                Вінниця
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    name="address"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Видіть адресу"
                            className="border border-solid border-[#7FAA84] bg-transparent rounded-[5px]"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Оплата */}
          <div className="flex flex-col gap-[15px] lg:gap-[30px] w-full">
            <div className="flex items-center gap-[15px]">
              <div className="w-[30px] h-[30px] p-3 border border-solid border-[#7FAA8480] rounded-full flex items-center justify-center">
                <div className="text-[#484848] font-bold">3</div>
              </div>
              <h3 className="text-[#484848] font-bold">Оплата</h3>
            </div>
            <div className="p-[15px] lg:py-[30px] bg-[#EAF2EB] rounded-[5px]">
              <div className="flex flex-col gap-5 lg:gap-[30px]">
                <h3 className="text-[#484848] text-sm font-bold lg:text-base">
                  Безпечна оплата картою на сайті
                </h3>

                <FormField
                  control={form.control}
                  name="payment"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col gap-[15px] lg:gap-5"
                        >
                          <FormItem className="flex items-center gap-[15px] lg:gap-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="liqpay" />
                            </FormControl>
                            <FormLabel className="text-sm text-[#484848] font-medium lg:text-base">
                              Кредитна/розрахункова карта (Liqpay)
                            </FormLabel>
                          </FormItem>

                          <FormItem className="flex items-center gap-[15px] lg:gap-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="monobank" />
                            </FormControl>
                            <FormLabel className="text-sm text-[#484848] font-medium lg:text-base">
                              Кредитна/дебетова карта (Monobank Acquiring)
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          {/* Коментар */}
          <div className="flex flex-col gap-[15px] lg:gap-4 w-full">
            <div className="flex items-center gap-[15px]">
              <div className="w-[30px] h-[30px] p-3 border border-solid border-[#7FAA8480] rounded-full flex items-center justify-center">
                <div className="text-[#484848] font-bold">4</div>
              </div>
              <h3 className="text-[#484848] font-bold">
                Коментар до замовлення
              </h3>
            </div>
            <div className="flex flex-col gap-[15px] lg:gap-[30px]">
              <div className="flex flex-col gap-[30px] lg:gap-5">
                <FormField
                  name="comment"
                  control={form?.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="Введіть коментар"
                          className="border border-solid border-[#7FAA84] rounded-[5px] bg-transparent"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  name="callBack"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="flex items-center lg:items-start gap-[15px] space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel>
                        Не телефонувати мені для підтвердження замовлення та
                        консультації
                      </FormLabel>
                    </FormItem>
                  )}
                />
              </div>
              <p className="text-[#484848] text-xs lg:text-sm">
                Підтверджуючи замовлення, ви приймаєте умови{" "}
                <Link href="/" className="underline">
                  договору оферти.
                </Link>
              </p>
            </div>
          </div>
        </div>

        <Button
          type="submit"
          className="max-w-max py-3 px-[22px] mx-auto lg:py-[10px] md:px-[25.5px] md:ml-0"
        >
          Оформити замовлення
        </Button>
      </form>
    </Form>
  );
};

export default OrderForm;
