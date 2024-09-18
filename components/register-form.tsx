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
    userName: z.string().min(1, { message: "User name is required" }),
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
      userName: "",
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
      const dataValues: {
        firstName?: string;
        lastName?: string;
        phoneNumber: string;
        email: string;
        password: string;
      } = {
        phoneNumber: values?.phoneNumber,
        email: values?.email,
        password: values?.password,
      };
      dataValues.firstName = values?.userName?.split(" ")[0];
      dataValues.lastName = values?.userName?.split(" ")[1];

      const { data } = await axios.post(
        `${process.env.SERVER_URL}api/auth/register`,
        dataValues
      );
      
      Cookies.set("token", data?.newUser?.token, { expires: 1 });
      axios.defaults.headers.common.Authorization = `Bearer ${data?.newUser?.token}`;
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
            name="userName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="lg:text-base text-[#484848] font-medium">
                  Ім&apos;я та Прізвище*
                </FormLabel>
                <FormControl>
                  <Input {...field}   className="bg-[#EAF2EB] border-none outline-none lg:border-[#7FAA84] rounded-md" />
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
                  <Input {...field}   className="bg-[#EAF2EB] border-none outline-none lg:border-[#7FAA84] rounded-md" />
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
                    className="bg-[#EAF2EB] border-none outline-none lg:border-[#7FAA84] rounded-md"
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
                <FormLabel className="lg:text-base text-[#484848] font-medium">Пароль*</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      {...field}
                     className="bg-[#EAF2EB] border-none outline-none lg:border-[#7FAA84] rounded-md"
                      type={isShow ? "text" : "password"}
                    />

                    <Button
                      variant="ghost"
                      className="absolute top-0 right-0"
                      onClick={() => setIsShow((prev) => !prev)}
                    >
                      {isShow ? (
                        <Eye className="text-[#7FAA84]" />
                      ) : (
                        <EyeOff className="text-[#7FAA84]" />
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
                        className="bg-[#EAF2EB] border-none outline-none lg:border-[#7FAA84] rounded-md"
                      type={isShowConfirmPass ? "text" : "password"}
                    />

                    <Button
                      variant="ghost"
                      className="absolute top-0 right-0"
                      onClick={() => setIsShowConfirmPass((prev) => !prev)}
                    >
                      {isShow ? (
                        <Eye className="text-[#7FAA84]" />
                      ) : (
                        <EyeOff className="text-[#7FAA84]" />
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
