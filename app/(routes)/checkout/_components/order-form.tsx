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

import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, forwardRef, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { selectOrderItems } from "@/redux/order/selector";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { cleareOrderItems, setOrderDetails } from "@/redux/order/slice";
import ArrowDown from "/public/images/arrow-down.svg";
import { getSeparation } from "@/services/services";
import { createInvoice } from "@/services/monobank";
import { selectUserContactDetails } from "@/redux/auth/selectors";
import { removeUserContactDetails } from "@/redux/auth/slice";
import { createOrder } from "@/actions/get-data";
import { motion } from "framer-motion";
import { sendGAEvent } from "@next/third-parties/google";
import InputMask from "react-input-mask";

const CustomInputMask = forwardRef<
  HTMLInputElement,
  React.ComponentProps<typeof InputMask>
>((props, ref) => {
  return <InputMask {...props} inputRef={ref} />;
});
CustomInputMask.displayName = "CustomInputMask";

interface OrderFormProps {
  currentUser?: {
    _id: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    type: string;
    email: string;
    avatar: string;
  } | null;
}

const formSchema = z.object({
  postService: z.enum(["novaPoshta", "pickup", "transporter"]).optional(),
  city: z.string().optional(),
  address: z.string().optional(),
  paymentMethod: z.enum(["cashOnDelivary", "payByCard"]).optional(),
  ref_city: z.string().optional(),
  ref_separation: z.string().optional(),
  comment: z.string().optional(),
  separation: z.string().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  phone: z
    .string()
    .min(1, { message: "Номер телефону обов'язковий" })
    .regex(
      /^\+380 \d{3} \d{2} \d{2} \d{2}$/,
      "Введіть коректний номер у форматі +380 XXX XX XX XX"
    ),
  email: z.string().optional(),
});

const dropFormSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  phone: z.string().min(1, { message: "Phone number is required" }),
  separation: z.string(),
  ref_city: z.string().optional(),
  ref_separation: z.string().optional(),
  email: z.string(),
  comment: z.string(),
  postService: z.enum(["novaPoshta", "pickup", "transporter"], {
    required_error: "You need to select a post service.",
  }),
  city: z.string().optional(),
  address: z.string(),
  paymentMethod: z.enum(["cashOnDelivary", "payByCard"], {
    required_error: "You need to select a payment method.",
  }),
  clientFirstName: z.string().min(1, { message: "First name is required" }),
  clientLastName: z.string().min(1, { message: "Last name is required" }),
  clientPhone: z.string().min(1, { message: "Phone number is required" }),
});

const OrderForm: FC<OrderFormProps> = ({ currentUser }) => {
  const [currentDelivary, setCurrentDelivary] = useState("separation");
  const [isShowContact, setIsShowContact] = useState(
    currentUser?.type === "drop" ? false : true
  );
  const [isShowContactClient, setIsShowContactClient] = useState(true);
  const [isShowDelivary, setIsShowDelivary] = useState(false);
  const [isShowPayment, setIsShowPayment] = useState(false);
  const [separatios, setSeparatios] = useState<
    | {
        Present: string;
        DeliveryCity: string;
        Ref: string;
        MainDescription: string;
      }[]
    | null
  >(null);
  const [detachments, setDetachments] = useState<
    { Description: string; Ref: string }[]
  >([]);
  const [isShowSeparatios, setIsShowSeparatios] = useState(false);
  const [isShowDetachment, setIsShowDetachment] = useState(false);
  const [currentCity, setCurrentCity] = useState("");
  const userDetails = useSelector(selectUserContactDetails);
  const orderItems = useSelector(selectOrderItems);
  const router = useRouter();
  const dispatch = useDispatch();
  const cityRef = useRef<HTMLDivElement>(null);
  const detachmentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.addEventListener("mousedown", handleClickOutsideCities);
    window.addEventListener("mousedown", handleClickOutsideDetachment);

    () => {
      window.removeEventListener("mousedown", handleClickOutsideCities);
      window.removeEventListener("mousedown", handleClickOutsideDetachment);
    };
  }, []);

  const form = useForm<z.infer<typeof dropFormSchema>>({
    resolver: zodResolver(
      currentUser?.type === "drop" ? dropFormSchema : formSchema
    ),
    defaultValues: {
      postService: "novaPoshta",
      city: "",
      address: "",
      paymentMethod: "cashOnDelivary",
      comment: "",
      separation: "",
      firstName: userDetails?.firstName || currentUser?.firstName || "",
      lastName: userDetails?.lastName || currentUser?.lastName || "",
      phone: userDetails?.phoneNumber || currentUser?.phoneNumber || "",
      email: userDetails?.email || currentUser?.email || "",
      clientFirstName: "",
      clientLastName: "",
      clientPhone: "",
    },
  });

  const currentPostService = form.watch("postService");

  const handleClickOutsideDetachment = (e: MouseEvent) => {
    if (detachmentRef && !detachmentRef.current?.contains(e.target as Node)) {
      setIsShowDetachment(false);
      setDetachments([]);
    }
  };

  const handleClickOutsideCities = (e: MouseEvent) => {
    if (cityRef && !cityRef.current?.contains(e.target as Node)) {
      setIsShowSeparatios(false);
    }
  };

  const handleChangeCity = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      form.setValue("city", e.target.value);
      setCurrentCity(e.target.value);

      const responce = await getSeparation({
        apiKey: process.env.NOVA_POSHTA_KEY ? process.env.NOVA_POSHTA_KEY : "",
        modelName: "AddressGeneral",
        calledMethod: "searchSettlements",
        methodProperties: {
          CityName: e.target.value,
          Limit: "20",
          Language: "UA",
        },
      });

      if (!responce?.success) {
        throw new Error(responce.errors);
      }

      const formattedAddresses = responce?.data[0].Addresses.map(
        (address: {
          Present: string;
          DeliveryCity: string;
          MainDescription: string;
          Ref: string;
        }) => ({
          Present: address.Present,
          DeliveryCity: address.DeliveryCity,
          MainDescription: address.MainDescription,
          Ref: address.Ref,
        })
      );

      setSeparatios(formattedAddresses);

      setIsShowSeparatios(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelectCity = async (data: {
    MainDescription: string;
    Present: string;
    DeliveryCity: string;
  }) => {
    try {
      form.setValue("city", data.Present);
      form.setValue("ref_city", data.DeliveryCity);
      setCurrentCity(data.MainDescription);

      const response = await getSeparation({
        apiKey: process.env.NOVA_POSHTA_KEY ? process.env.NOVA_POSHTA_KEY : "",
        modelName: "AddressGeneral",
        calledMethod: "getWarehouses",
        methodProperties: {
          CityName: data.MainDescription,
          Limit: "20",
          Language: "UA",
        },
      });

      const formattedDetachments = response.data.map(
        (item: { Description?: string; Ref?: string }) => ({
          Description: item.Description ?? "",
          Ref: item?.Ref ?? "",
        })
      );

      setDetachments(formattedDetachments);
      setIsShowSeparatios(false);
      setIsShowDetachment(true);
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const onFocusSeparationInput = async () => {
    try {
      setIsShowDetachment(true);
      const response = await getSeparation({
        apiKey: process.env.NOVA_POSHTA_KEY ? process.env.NOVA_POSHTA_KEY : "",
        modelName: "AddressGeneral",
        calledMethod: "getWarehouses",
        methodProperties: {
          CityName: currentCity,
          Limit: "20",
          Language: "UA",
        },
      });

      const detachments = response.data.map(
        (item: { Description?: string; Ref?: string }) => ({
          Description: item.Description ?? "",
          Ref: item?.Ref ?? "",
        })
      );

      setDetachments(detachments);
    } catch (error) {
      toast.success("Sumething went wrong...");
    }
  };

  const onChangeDetachmentInput = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    try {
      form.setValue("separation", e.target.value);

      const response = await getSeparation({
        apiKey: process.env.NOVA_POSHTA_KEY ? process.env.NOVA_POSHTA_KEY : "",
        modelName: "AddressGeneral",
        calledMethod: "getWarehouses",
        methodProperties: {
          CityName: currentCity,
          Limit: "20",
          Language: "UA",
          WarehouseId: e.target.value,
        },
      });

      const detachments =
        response.data.map((item: { Description?: string; Ref?: string }) => ({
          Description: item.Description ?? "",
          Ref: item.Ref ?? "",
        })) || [];

      setDetachments(detachments);
    } catch (error) {
      toast.error("Something went wrong...");
    }
  };

  const handleSelectDetachment = (detachment: {
    Description: string;
    Ref: string;
  }) => {
    detachment && form.setValue("separation", detachment?.Description);
    form.setValue("ref_separation", detachment?.Ref);

    setIsShowDetachment(false);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const currentPayment = form.getValues("paymentMethod");

      // if (currentPayment === "monobank") {
      //   const dataMono = {
      //     amount: 0,
      //     validity: 3600,
      //     paymentType: "debit",
      //     merchantPaymInfo: {
      //       basketOrder: [] as {
      //         name: string;
      //         qty: number;
      //         sum: number;
      //         code: string;
      //         icon?: string;
      //       }[],
      //     },
      //     redirectUrl: "https://audiparts.com.ua",
      //     webHookUrl: `${process.env.BACKEND_URL}/api/order/${process.env.STORE_ID}/create`,
      //   };
      //   let amount = 0;

      //   orderItems?.forEach((item: any) => {
      //     amount += item.price;
      //     dataMono.merchantPaymInfo.basketOrder.push({
      //       name: item?.title,
      //       qty: Number(item?.quantity),
      //       sum: Number(item?.price * 43 * 100),
      //       code: item?.article,
      //       icon: item.images[0].url,
      //     });
      //   });

      //   dataMono.amount = Math.round(amount * 43 * 100);
      //   const responce = await createInvoice(dataMono);

      //   if (responce) {
      //     const data: {
      //       products?: { productId: string; quantity: number }[];
      //       invoiceId: string;
      //     } = {
      //       products: [],
      //       invoiceId: responce.invoiceId,
      //       ...values,
      //     };

      //     if (orderItems?.length > 0) {
      //       data.products = orderItems?.map(
      //         (item: {
      //           id: string;
      //           quantity: number;
      //           title: string;
      //           article: string;
      //           catalog_number: string;
      //         }) => ({
      //           productId: item?.id,
      //           quantity: item?.quantity,
      //           title: item?.title,
      //           article: item?.article,
      //           catalog_number: item?.catalog_number,
      //         })
      //       );
      //     }

      //     const order = await createOrder(data);

      //     dispatch(setOrderDetails({ ...order, orderItems }));
      //     dispatch(removeUserContactDetails());
      //     dispatch(cleareOrderItems());
      //     return router.push(responce.pageUrl);
      //   }
      // }

      const data: {
        products?: { productId: string; quantity: number; price: number }[];
      } = {
        products: [],
        ...values,
      };

      if (orderItems?.length > 0) {
        data.products = orderItems?.map(
          (item: {
            id: string;
            quantity: number;
            price: number;
            title: string;
            article: string;
            catalog_number: string;
          }) => ({
            productId: item?.id,
            quantity: item?.quantity,
            price: Number(item?.price),
            title: item?.title,
            article: item?.article,
            catalog_number: item?.catalog_number,
          })
        );
      }

      const order = await createOrder(data);

      sendGAEvent("event", "make_new_order", {
        items: orderItems?.map(
          (item: {
            title: string;
            price: number;
            quantity: number;
            id: string;
          }) => ({
            item_name: item.title,
            price: item.price,
            quantity: item.quantity,
            item_id: item.id,
          })
        ),
        total_value: order.totalPrice,
      });

      dispatch(setOrderDetails({ ...order, orderItems }));
      dispatch(cleareOrderItems());
      dispatch(removeUserContactDetails());
      router.push("/success");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong...");
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-3"
      >
        <div className="flex flex-col gap-3">
          {/* Контактні дані  */}
          <div className="flex flex-col gap-3 w-full">
            <Button
              variant="ghost"
              type="button"
              className="flex items-center justify-between p-0"
              onClick={() => setIsShowContact((prev) => !prev)}
            >
              <div className="flex items-center gap-[15px] p-0 justify-start">
                <div className="w-[30px] h-[30px] p-3 border border-solid border-[#c0092a] rounded-full flex items-center justify-center">
                  <div className="text-[#484848] font-bold">1</div>
                </div>
                <h3 className="text-[#484848] font-bold">
                  {currentUser?.type === "drop"
                    ? "Дані дропшипера"
                    : "Контактні дані"}
                </h3>
              </div>
              <ArrowDown
                className={cn(
                  "stroke-[#c0092a] transform transition-all duration-300 rotate-0",
                  {
                    "rotate-180": isShowContact,
                  }
                )}
              />
            </Button>

            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={
                isShowContact
                  ? { opacity: 1, height: "auto" }
                  : { opacity: 0, height: 0 }
              }
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden flex-col gap-3"
              style={{ display: isShowContact ? "flex" : "none" }}
            >
              <FormField
                name="firstName"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-bold">
                      Ім&apos;я
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ім'я"
                        className="py-3 lg:py-2 px-[15px] bg-[#FFFDFD] text-[#484848] text-sm lg:text-base lg:font-semibold lg:border lg:border-solid lg:border-[#484848] rounded-[5px]"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                name="lastName"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-bold">
                      Прізвище
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Прізвище"
                        className="py-3 lg:py-2 px-[15px] bg-[#FFFDFD] text-[#484848] text-sm lg:text-base lg:font-semibold lg:border lg:border-solid lg:border-[#484848] rounded-[5px]"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                name="phone"
                control={form.control}
                rules={{ required: "Введіть номер телефону" }}
                render={({ field, fieldState }) => (
                  <FormItem className="flex flex-col gap-1">
                    <FormLabel className="text-base font-bold">
                      Номер телефону <span className="text-red-600">*</span>
                    </FormLabel>
                    <FormControl>
                      <CustomInputMask
                        mask="+380 999 99 99 99"
                        placeholder="+380 999 99 99 99"
                        {...field}
                        className={cn(
                          "py-3 lg:py-2 px-[15px] bg-[#FFFDFD] text-[#484848] text-sm lg:text-base lg:font-semibold lg:border lg:border-solid rounded-[5px]",
                          fieldState.invalid
                            ? "border-red-500"
                            : "border-[#484848]"
                        )}
                      />
                    </FormControl>
                    {fieldState.invalid && (
                      <FormMessage className="text-red-500 text-sm">
                        {fieldState.error?.message}
                      </FormMessage>
                    )}
                  </FormItem>
                )}
              />

              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-bold">
                      E-mail
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Email"
                        className="py-3 lg:py-2 px-[15px] bg-[#FFFDFD] text-[#484848] text-sm lg:text-base lg:font-semibold lg:border lg:border-solid lg:border-[#484848] rounded-[5px]"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </motion.div>
          </div>

          {/* Дані клієнта дропшипера */}
          {currentUser?.type === "drop" && (
            <div className="flex flex-col gap-3 w-full">
              <Button
                variant="ghost"
                type="button"
                className="flex items-center justify-between p-0"
                onClick={() => setIsShowContactClient((prev) => !prev)}
              >
                <div className="flex items-center gap-[15px] p-0 justify-start">
                  <div className="w-[30px] h-[30px] p-3 border border-solid border-[#c0092a] rounded-full flex items-center justify-center">
                    <div className="text-[#484848] font-bold">2</div>
                  </div>
                  <h3 className="text-[#484848] font-bold">Дані клієнта</h3>
                </div>
                <ArrowDown
                  className={cn(
                    "stroke-[#c0092a] transform transition-all duration-300 rotate-0",
                    {
                      "rotate-180": isShowContactClient,
                    }
                  )}
                />
              </Button>

              <div
                className={cn(
                  "flex-col gap-3 w-full transform transition-all duration-300 origin-top scale-y-0 hidden",
                  {
                    "scale-y-100 flex": isShowContactClient,
                  }
                )}
              >
                <FormField
                  name="clientFirstName"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-bold">
                        Ім&apos;я клієнта{" "}
                        <span className="text-red-600">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Ім’я"
                          className="py-3 lg:py-2 px-[15px] bg-[#FFFDFD] text-[#484848] text-sm lg:text-base lg:font-semibold lg:border lg:border-solid lg:border-[#484848] rounded-[5px]"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  name="clientLastName"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-bold">
                        Прізвище клієнта <span className="text-red-600">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Прізвище"
                          className="py-3 lg:py-2 px-[15px] bg-[#FFFDFD] text-[#484848] text-sm lg:text-base lg:font-semibold lg:border lg:border-solid lg:border-[#484848] rounded-[5px]"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  name="clientPhone"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-bold">
                        Номер телефону клієнта{" "}
                        <span className="text-red-600">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Номер телефону"
                          className="py-3 lg:py-2 px-[15px] bg-[#FFFDFD] text-[#484848] text-sm  lg:text-base lg:font-semibold lg:border lg:border-solid lg:border-[#484848] rounded-[5px]"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
          )}

          {/* Достака  */}
          <div className="flex flex-col gap-3 w-full">
            <Button
              variant="ghost"
              type="button"
              className="flex items-center gap-4 justify-between px-0"
              onClick={() => setIsShowDelivary((prev) => !prev)}
            >
              <div className="flex items-center gap-[15px]">
                <div className="w-[30px] h-[30px] p-3 border border-solid border-[#c0092a] rounded-full flex items-center justify-center">
                  <div className="text-[#484848] font-bold">
                    {currentUser?.type === "drop" ? "3" : "2"}
                  </div>
                </div>
                <h3 className="text-[#484848] font-bold">Доставка</h3>
              </div>

              <ArrowDown
                className={cn(
                  "stroke-[#c0092a] transform transition-all duration-300 rotate-0",
                  {
                    "rotate-180": isShowDelivary,
                  }
                )}
              />
            </Button>

            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={
                isShowDelivary
                  ? { opacity: 1, height: "auto" }
                  : { opacity: 0, height: 0 }
              }
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="flex-col gap-4"
              style={{ display: isShowDelivary ? "flex" : "none" }}
            >
              <h3 className="text-base text-[#484848] font-medium">
                Оберіть поштовий сервіс
              </h3>

              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-3">
                  <FormField
                    control={form.control}
                    name="postService"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <RadioGroup
                            onValueChange={(value) => {
                              if (value === "transporter") {
                                setCurrentDelivary("address");
                              }
                              field.onChange(value);
                            }}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="novaPoshta" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Нова пошта
                              </FormLabel>
                            </FormItem>

                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="pickup" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Самовивіз
                              </FormLabel>
                            </FormItem>

                            {currentUser?.type === "drop" && (
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="transporter" />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  Перевізник
                                </FormLabel>
                              </FormItem>
                            )}
                          </RadioGroup>
                        </FormControl>
                        <FormMessage className=" text-red-500 text-sm " />
                      </FormItem>
                    )}
                  />

                  {currentPostService !== "pickup" && (
                    <div className="flex items-center gap-2 justify-between overflow-x-auto no-scrollbar">
                      <Button
                        variant="ghost"
                        disabled={currentPostService === "transporter"}
                        className={cn(
                          "text-base text-[#484848] p-0 font-medium",
                          {
                            "text-[#c0092a] font-bold underline":
                              currentDelivary === "separation",
                          }
                        )}
                        onClick={() => setCurrentDelivary("separation")}
                        type="button"
                      >
                        Доставка на відділення
                      </Button>
                      <Button
                        variant="ghost"
                        className={cn(
                          "text-base text-[#484848] p-0 font-medium",
                          {
                            "text-[#c0092a] font-bold underline":
                              currentDelivary === "address",
                          }
                        )}
                        onClick={() => setCurrentDelivary("address")}
                        type="button"
                      >
                        Доставка за адресою
                      </Button>
                    </div>
                  )}
                </div>
                {currentPostService !== "pickup" && (
                  <div className="flex flex-col gap-3">
                    <div className="relative" ref={cityRef}>
                      <FormField
                        name="city"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                value={field.value}
                                onChange={(e) => handleChangeCity(e)}
                                placeholder="Почніть водити назву населеного пункту"
                                className="border border-solid border-[#484848] bg-[#FFFDFD] rounded-[5px]"
                              />
                            </FormControl>
                            <FormMessage className=" text-red-500 text-sm " />
                          </FormItem>
                        )}
                      />
                      {isShowSeparatios && (
                        <div className="absolute top-[110%] z-50 left-0 w-full max-h-40 bg-white shadow-md rounded-md p-4 overflow-y-auto flex flex-col gap-4 items-start transform transition-all duration-150">
                          {separatios && separatios?.length > 0 ? (
                            separatios?.map((item) => {
                              return (
                                <Button
                                  type="button"
                                  variant="ghost"
                                  className="p-0"
                                  key={item?.Ref}
                                  onClick={() =>
                                    handleSelectCity({
                                      Present: item.Present,
                                      MainDescription: item.MainDescription,
                                      DeliveryCity: item?.DeliveryCity,
                                    })
                                  }
                                >
                                  {item?.Present}
                                </Button>
                              );
                            })
                          ) : (
                            <div className="w-full h-full">
                              <h3 className="text-center text-slate-600 text-xs">
                                Not found
                              </h3>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {currentDelivary === "separation" ? (
                      <FormField
                        name="separation"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <div className="relative" ref={detachmentRef}>
                                <Input
                                  value={field.value}
                                  disabled={!currentCity}
                                  onChange={(value) =>
                                    onChangeDetachmentInput(value)
                                  }
                                  placeholder="Введіть номер віділення"
                                  onFocus={onFocusSeparationInput}
                                  className="border border-solid border-[#484848] bg-[#FFFDFD] rounded-[5px]"
                                />
                                {isShowDetachment && (
                                  <div className="absolute top-[110%] z-50 left-0 w-full bg-white shadow-md rounded-md p-4 max-h-44 overflow-y-auto flex flex-col gap-4 items-start transform transition-all duration-150">
                                    {detachments && detachments?.length > 0 ? (
                                      detachments?.map((item) => {
                                        return (
                                          <Button
                                            type="button"
                                            variant="ghost"
                                            className="p-0"
                                            key={item?.Description}
                                            onClick={() =>
                                              handleSelectDetachment({
                                                Description:
                                                  item?.Description ?? "",
                                                Ref: item?.Ref ?? "",
                                              })
                                            }
                                          >
                                            {item?.Description}
                                          </Button>
                                        );
                                      })
                                    ) : (
                                      <div className="w-full h-full">
                                        <h3 className="text-center text-slate-600 text-xs">
                                          Not found
                                        </h3>
                                      </div>
                                    )}
                                  </div>
                                )}
                              </div>
                            </FormControl>
                            <FormMessage className=" text-red-500 text-sm " />
                          </FormItem>
                        )}
                      />
                    ) : (
                      currentDelivary === "address" && (
                        <FormField
                          name="address"
                          control={form.control}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  disabled={!currentCity}
                                  {...field}
                                  placeholder="Введіть адресу"
                                  className="border border-solid border-[#484848] bg-[#FFFDFD] rounded-[5px]"
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      )
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Оплата */}
          <div className="flex flex-col gap-3 w-full">
            <Button
              type="button"
              variant="ghost"
              className="flex items-center gap-4 justify-between px-0"
              onClick={() => setIsShowPayment((prev) => !prev)}
            >
              <div className="flex items-center gap-[15px]">
                <div className="w-[30px] h-[30px] p-3 border border-solid border-[#c0092a] rounded-full flex items-center justify-center">
                  <div className="text-[#484848] font-bold">
                    {currentUser?.type === "drop" ? "4" : "3"}
                  </div>
                </div>
                <h3 className="text-[#484848] font-bold">Оплата</h3>
              </div>

              <ArrowDown
                className={cn(
                  "stroke-[#c0092a] transform transition-all duration-300 rotate-0",
                  {
                    "rotate-180": isShowPayment,
                  }
                )}
              />
            </Button>
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={
                isShowPayment
                  ? { opacity: 1, height: "auto" }
                  : { opacity: 0, height: 0 }
              }
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="p-3 bg-[#FFFDFD] rounded-[5px]"
              style={{ display: isShowPayment ? "flex" : "none" }}
            >
              <div className="flex flex-col gap-3">
                <FormField
                  control={form.control}
                  name="paymentMethod"
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
                              <RadioGroupItem value="cashOnDelivary" />
                            </FormControl>
                            <FormLabel className="text-sm text-[#484848] font-medium lg:text-base">
                              Оплата при отримані
                            </FormLabel>
                          </FormItem>

                          <FormItem className="flex items-center gap-[15px] lg:gap-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="payByCard" />
                            </FormControl>
                            <FormLabel className="text-sm text-[#484848] font-medium lg:text-base">
                              Оплата на карту
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </motion.div>
          </div>

          {/* Коментар */}
          <div className="flex flex-col gap-3 w-full">
            <div className="flex items-center gap-[15px]">
              <div className="w-[30px] h-[30px] p-3 border border-solid border-[#c0092a] rounded-full flex items-center justify-center">
                <div className="text-[#484848] font-bold">
                  {currentUser?.type === "drop" ? "5" : "4"}
                </div>
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
                          className="border border-solid border-[#484848] rounded-[5px] bg-[#FFFDFD]"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
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
