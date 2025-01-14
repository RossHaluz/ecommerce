"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { EyeOff, Eye } from "lucide-react";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

interface RegisterFormPops {
  setIsRegister: Dispatch<SetStateAction<boolean>>;
  setIsLogin: Dispatch<SetStateAction<boolean>>;
}

const formSchema = z
  .object({
    firstName: z.string().min(1, { message: "First name is required" }),
    lastName: z.string().min(1, { message: "Last name is required" }),
    phoneNumber: z.string().min(1, { message: "Phone number is required" }),
    email: z.string().min(1, { message: "Email is required" }),
    password: z.string().min(1, { message: "Password is required" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const RegisterForm: FC<RegisterFormPops> = ({ setIsRegister, setIsLogin }) => {
  const [isShow, setIsShow] = useState(false);
  const [isShowConfirmPass, setIsShowConfirmPass] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleLoginClick = () => {
    setIsRegister(false);
    setIsLogin(true);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
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

      router.push("/account");
      router.refresh();
      toast.success("Success register");
    } catch (error) {
      toast.error("Something went wrong...");
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-10 overflow-y-auto"
      >
        <div className="flex flex-col gap-5">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="lg:text-base text-[#484848] font-medium">
                  Ім&apos;я*
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="bg-[#F2F2F2] border-none outline-none  rounded-md"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="lg:text-base text-[#484848] font-medium">
                  Прізвище*
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="bg-[#F2F2F2] border-none outline-none  rounded-md"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="lg:text-base text-[#484848] font-medium">
                  Номер телефону*
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="bg-[#F2F2F2] border-none outline-none  rounded-md"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="lg:text-base text-[#484848] font-medium">
                  Електронна пошта*
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="bg-[#F2F2F2] border-none outline-none  rounded-md"
                    type="email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="lg:text-base text-[#484848] font-medium">
                  Пароль*
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      {...field}
                      className="bg-[#F2F2F2] border-none outline-none  rounded-md"
                      type={isShow ? "text" : "password"}
                    />

                    <Button
                      variant="ghost"
                      className="absolute top-0 right-0"
                      onClick={() => setIsShow((prev) => !prev)}
                    >
                      {isShow ? (
                        <Eye className="text-[#c0092a]" />
                      ) : (
                        <EyeOff className="text-[#c0092a]" />
                      )}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="lg:text-base text-[#484848] font-medium">
                  Підтвердження паролю*
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      {...field}
                      className="bg-[#F2F2F2] border-none outline-none lg:border-[#7FAA84] rounded-md"
                      type={isShowConfirmPass ? "text" : "password"}
                    />

                    <Button
                      variant="ghost"
                      className="absolute top-0 right-0"
                      onClick={() => setIsShowConfirmPass((prev) => !prev)}
                    >
                      {isShow ? (
                        <Eye className="text-[#c0092a]" />
                      ) : (
                        <EyeOff className="text-[#c0092a]" />
                      )}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex items-center justify-between">
          <Button
            type="submit"
            className="max-w-max py-[11.5px] px-3 lg:py-[10px] lg:px-12 font-semibold"
          >
            Зареєструватись
          </Button>
          <Button
            variant="ghost"
            type="button"
            className="text-[#484848] lg:text-base font-medium underline"
            onClick={handleLoginClick}
          >
            Увійти
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default RegisterForm;
