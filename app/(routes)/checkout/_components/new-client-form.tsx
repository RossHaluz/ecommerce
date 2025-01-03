"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createUserContactDetails } from "@/redux/auth/slice";
import { AppDispatch } from "@/redux/store";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { z } from "zod";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  firstName: z.string().min(1, {
    message: "First name is required",
  }),
  lastName: z.string().min(1, {
    message: "Last name is required",
  }),
  phoneNumber: z.string().min(1, {
    message: "Phone number is required",
  }),
});

const formSchemaRegister = z
  .object({
    firstName: z.string().min(1, {
      message: "First name is required",
    }),
    lastName: z.string().min(1, {
      message: "Last name is required",
    }),
    phoneNumber: z.string().min(1, {
      message: "Phone number is required",
    }),
    email: z.string().email("Type a valid email"),
    password: z
      .string()
      .min(6, { message: "Password is required and should have 6 length" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const NewClientForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [isRegister, setIsRegister] = useState<boolean | string>(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchemaRegister>>({
    resolver: zodResolver(isRegister ? formSchemaRegister : formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const checkedRegister = (e: boolean | string) => {
    setIsRegister(e);
  };

  const onSubmit = async (values: z.infer<typeof formSchemaRegister>) => {
    try {
      if (!isRegister) {
        dispatch(createUserContactDetails(values));
        toast.success("Success add user details");
        return;
      }

      if (isRegister) {
        const formData = {
          firstName: values.firstName,
          lastName: values.lastName,
          phoneNumber: values.phoneNumber,
          email: values.email,
          password: values.password,
        };

        const { data } = await axios.post(
          `${process.env.BACKEND_URL}/api/auth/register`,
          formData
        );

        Cookies.set("token", data?.data?.newUser?.token, { expires: 1 });
        axios.defaults.headers.common.Authorization = `Bearer ${data?.data?.token}`;

        dispatch(createUserContactDetails(values));
        toast.success("Success register");
        router.refresh();
        return;
      }

      dispatch(createUserContactDetails(values));
      toast.success("Success");
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-[15px] lg:gap-[30px]">
            <div className="flex flex-col gap-[15px] w-full">
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
                        className="py-3 lg:py-2 px-[15px] bg-[#FFFDFD] text-[#484848] text-sm  lg:text-base lg:font-semibold lg:border lg:border-solid lg:border-[#484848] rounded-[5px]"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                name="phoneNumber"
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

              {isRegister && (
                <>
                  <FormField
                    name="email"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="Email"
                            className="py-3 lg:py-2 px-[15px] bg-[#FFFDFD] text-[#484848] text-sm  lg:text-base lg:font-semibold lg:border lg:border-solid lg:border-[#484848] rounded-[5px]"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    name="password"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Password"
                            className="py-3 lg:py-2 px-[15px] bg-[#FFFDFD] text-[#484848] text-sm  lg:text-base lg:font-semibold lg:border lg:border-solid lg:border-[#484848] rounded-[5px]"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="confirmPassword"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Confirm Password"
                            className="py-3 lg:py-2 px-[15px] bg-[#FFFDFD] text-[#484848] text-sm  lg:text-base lg:font-semibold lg:border lg:border-solid lg:border-[#484848] rounded-[5px]"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </>
              )}
            </div>
            <div className="flex flex-col gap-[30px]">
              <div className="flex items-start gap-[15px]">
                <Checkbox
                  id="register"
                  className="rounded-md"
                  onCheckedChange={(e) => checkedRegister(e)}
                />
                <label htmlFor="register" className="text-[#484848] text-sm">
                  Я хочу зареєструватись та <br /> користуватись бонусною
                  системою
                </label>
              </div>

              <Button
                disabled={isSubmitting || !isValid}
                type="submit"
                className="p-[11.5px] w-[220px] mx-auto md:ml-0 md:w-[115px] md:p-[10px]"
              >
                Далі
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </>
  );
};

export default NewClientForm;
