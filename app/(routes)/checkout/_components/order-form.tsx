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
import { FC, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
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
  postService: z.enum(["nova-poshta"], {
    required_error: "You need to select a post service.",
  }),
  city: z.string().min(1, { message: "Separation is required" }),
  address: z.string(),
  payment: z.enum(["monobank", "cashOnDelivary"], {
    required_error: "You need to select a payment method.",
  }),
  comment: z.string(),
  callBack: z.boolean().default(false),
  separation: z.string(),
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  phone: z.string().min(1, { message: "Phone number is required" }),
  email: z.string(),
});

const dropFormSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  phone: z.string().min(1, { message: "Phone number is required" }),
  callBack: z.boolean().default(false),
  separation: z.string(),
  email: z.string(),
  comment: z.string(),
  postService: z.enum(["nova-poshta"], {
    required_error: "You need to select a post service.",
  }),
  city: z.string().min(1, { message: "Separation is required" }),
  address: z.string(),
  payment: z.enum(["monobank", "cashOnDelivary"], {
    required_error: "You need to select a payment method.",
  }),
  clientFirstName: z.string().min(1, { message: "First name is required" }),
  clientLastName: z.string().min(1, { message: "Last name is required" }),
  clientPhone: z.string().min(1, { message: "Phone number is required" }),
});

const OrderForm: FC<OrderFormProps> = ({ currentUser }) => {
  const [currentDelivary, setCurrentDelivary] = useState("separation");
  const [isShowContact, setIsShowContact] = useState(false);
  const [isShowContactClient, setIsShowContactClient] = useState(true);
  const [separatios, setSeparatios] = useState<
    | {
        Present: string;
        DeliveryCit: string;
        Ref: string;
        MainDescription: string;
      }[]
    | null
  >(null);
  const [detachments, setDetachments] = useState<
    { Description: string | undefined }[]
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

  const form = useForm<z.infer<typeof dropFormSchema>>({
    resolver: zodResolver(
      currentUser?.type === "drop" ? dropFormSchema : formSchema
    ),
    defaultValues: {
      postService: "nova-poshta",
      city: "",
      address: "",
      payment: "monobank",
      comment: "",
      callBack: false,
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

  const currentPayment = form.getValues("payment");

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

  useEffect(() => {
    window.addEventListener("mousedown", handleClickOutsideCities);
    window.addEventListener("mousedown", handleClickOutsideDetachment);

    () => {
      window.removeEventListener("mousedown", handleClickOutsideCities);
      window.removeEventListener("mousedown", handleClickOutsideDetachment);
    };
  }, []);

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

      setSeparatios(responce?.data[0].Addresses);

      setIsShowSeparatios(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelectCity = async (data: {
    MainDescription: string;
    Present: string;
  }) => {
    try {
      form.setValue("city", data.Present);
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
        (item: { Description?: string }) => ({
          Description: item.Description,
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
        (item: { Description?: string }) => ({
          Description: item.Description,
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

      const detachments = response.data.map(
        (item: { Description?: string }) => ({
          Description: item.Description,
        })
      );

      setDetachments(detachments);
    } catch (error) {
      toast.error("Something went wrong...");
    }
  };

  const handleSelectDetachment = (detachment: string | undefined) => {
    detachment && form.setValue("separation", detachment);
    setIsShowDetachment(false);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const currentPayment = form.getValues("payment");

      if (currentPayment === "monobank") {
        const dataMono = {
          amount: 0,
          validity: 3600,
          paymentType: "debit",
          merchantPaymInfo: {
            basketOrder: [] as {
              name: string;
              qty: number;
              sum: number;
              code: string;
              icon?: string;
            }[],
          },
          redirectUrl: "https://audiparts.site/success",
          webHookUrl: `${process.env.BACKEND_URL}/api/${process.env.STORE_ID}/orders`,
        };
        let amount = 0;

        orderItems?.forEach((item: any) => {
          amount += item.price;
          dataMono.merchantPaymInfo.basketOrder.push({
            name: item?.title,
            qty: Number(item?.quantity),
            sum: Number(item?.price * 100),
            code: item?.article,
            icon: item.images[0].url,
          });
        });

        dataMono.amount = Math.round(amount * 100);
        const responce = await createInvoice(dataMono);

        if (responce) {
          const data: {
            products?: { productId: string; quantity: number }[];
            invoiceId: string;
          } = {
            products: [],
            invoiceId: responce.invoiceId,
            ...values,
          };

          if (orderItems?.length > 0) {
            data.products = orderItems?.map(
              (item: { id: string; quantity: number }) => ({
                productId: item?.id,
                quantity: item?.quantity,
              })
            );
          }

          const order = await createOrder(data);

          dispatch(setOrderDetails({ ...order, orderItems }));
          dispatch(removeUserContactDetails());
          dispatch(cleareOrderItems());
          return router.push(responce.pageUrl);
        }
      }

      const data: {
        products?: { productId: string; quantity: number }[];
      } = {
        products: [],
        ...values,
      };

      if (orderItems?.length > 0) {
        data.products = orderItems?.map(
          (item: { id: string; quantity: number }) => ({
            productId: item?.id,
            quantity: item?.quantity,
          })
        );
      }

      const order = await createOrder(data);

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
        className="flex flex-col gap-[30px]"
      >
        <div className="flex flex-col gap-[15px] lg:gap-[30px]">
          {/* Контактні дані  */}
          <div className="flex flex-col gap-[15px] lg:gap-[30px] w-full">
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

            <div
              className={cn(
                "flex-col gap-[15px] w-full transform transition-all duration-300 origin-top scale-y-0 hidden",
                {
                  "scale-y-100 flex": isShowContact,
                }
              )}
            >
              <FormField
                name="firstName"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
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
                name="lastName"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
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
                render={({ field }) => (
                  <FormItem>
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

              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
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
            </div>
          </div>

          {/* Дані клієнта дропшипера */}
          {currentUser?.type === "drop" && (
            <div className="flex flex-col gap-[15px] lg:gap-[30px] w-full">
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
                  "flex-col gap-[15px] w-full transform transition-all duration-300 origin-top scale-y-0 hidden",
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
          <div className="flex flex-col gap-[15px] lg:gap-[30px] w-full">
            <div className="flex items-center gap-[15px]">
              <div className="w-[30px] h-[30px] p-3 border border-solid border-[#c0092a] rounded-full flex items-center justify-center">
                <div className="text-[#484848] font-bold">
                  {currentUser?.type === "drop" ? "3" : "2"}
                </div>
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
                        </RadioGroup>
                      </FormControl>
                      <FormMessage className=" text-red-500 text-sm " />
                    </FormItem>
                  )}
                />

                <div className="flex items-center gap-2 justify-between overflow-x-auto no-scrollbar">
                  <Button
                    variant="ghost"
                    className={cn("text-base text-[#484848] p-0 font-medium", {
                      "text-[#c0092a] font-bold underline":
                        currentDelivary === "separation",
                    })}
                    onClick={() => setCurrentDelivary("separation")}
                    type="button"
                  >
                    Доставка на відділення
                  </Button>
                  <Button
                    variant="ghost"
                    className={cn("text-base text-[#484848] p-0 font-medium", {
                      "text-[#c0092a] font-bold underline":
                        currentDelivary === "address",
                    })}
                    onClick={() => setCurrentDelivary("address")}
                    type="button"
                  >
                    Доставка за адресою
                  </Button>
                </div>
              </div>

              <div className="flex flex-col gap-[15px]">
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
                    <div className="absolute top-[110%] z-50 left-0 w-full bg-white shadow-md rounded-md p-4 max-h-44 overflow-y-auto flex flex-col gap-4 items-start transform transition-all duration-150">
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
                                          handleSelectDetachment(
                                            item.Description
                                          )
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
            </div>
          </div>

          {/* Оплата */}
          <div className="flex flex-col gap-[15px] lg:gap-[30px] w-full">
            <div className="flex items-center gap-[15px]">
              <div className="w-[30px] h-[30px] p-3 border border-solid border-[#c0092a] rounded-full flex items-center justify-center">
                <div className="text-[#484848] font-bold">
                  {currentUser?.type === "drop" ? "4" : "3"}
                </div>
              </div>
              <h3 className="text-[#484848] font-bold">Оплата</h3>
            </div>
            <div className="p-[15px] lg:py-[30px] bg-[#FFFDFD] rounded-[5px]">
              <div className="flex flex-col gap-5 lg:gap-[30px]">
                <h3 className="text-[#484848] text-sm font-bold lg:text-base">
                  {currentPayment === "monobank" &&
                    "Безпечна оплата картою на сайті"}
                  {currentPayment === "cashOnDelivary" &&
                    "Оплачуйте товара при отриманні"}
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
                              <RadioGroupItem value="monobank" />
                            </FormControl>
                            <FormLabel className="text-sm text-[#484848] font-medium lg:text-base">
                              Онлайн оплата
                            </FormLabel>
                          </FormItem>

                          <FormItem className="flex items-center gap-[15px] lg:gap-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="cashOnDelivary" />
                            </FormControl>
                            <FormLabel className="text-sm text-[#484848] font-medium lg:text-base">
                              Оплата при отримані
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
