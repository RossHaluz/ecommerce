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
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface LoginFormProps {
  setIsRegister?: Dispatch<SetStateAction<boolean>>;
  setIsLogin?: Dispatch<SetStateAction<boolean>>;
  anotherStylesInput?: boolean;
  isCheckoutContactForm?: boolean;
}

const formSchema = z.object({
  email: z.string().min(1, { message: "Email is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

const LoginForm: FC<LoginFormProps> = ({
  setIsRegister,
  setIsLogin,
  anotherStylesInput = false,
  isCheckoutContactForm = false,
}) => {
  const [isShow, setIsShow] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleRegisterClick = () => {
    if (setIsRegister && setIsLogin) {
      setIsRegister(true);
      setIsLogin(false);
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const { data } = await axios.post(
        `${process.env.BACKEND_URL}/api/auth/login`,
        values
      );

      if (data?.data?.role !== "user") {
        throw new Error("Користувача не знайдено");
      }

      Cookies.set("token", data?.data?.token, { expires: 7 });
      axios.defaults.headers.common.Authorization = `Bearer ${data?.data?.token}`;
      if (!isCheckoutContactForm) {
        router.push("/account");
      }

      router.refresh();
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong...";
      console.error(error);
      setErrorMessage(errorMessage);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-10"
      >
        <div className="flex flex-col gap-5">
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
                    className={cn(
                      "bg-[#F2F2F2] border-none outline-none rounded-md",
                      {
                        "bg-[#FFFDFD] lg:text-base lg:font-semibold lg:border lg:border-solid lg:border-[#484848]":
                          anotherStylesInput,
                      }
                    )}
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
                      className={cn(
                        "bg-[#F2F2F2] border-none outline-none rounded-md",
                        {
                          "bg-[#FFFDFD] lg:text-base lg:font-semibold lg:border lg:border-solid lg:border-[#484848]":
                            anotherStylesInput,
                        }
                      )}
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
        </div>
        {errorMessage && (
          <p className="md:text-base text-red-500 font-medium">
            {errorMessage}
          </p>
        )}
        <div className="flex flex-col gap-[30px]">
          <Button
            variant="ghost"
            type="button"
            className="text-[#484848] lg:text-base font-medium underline max-w-max px-0"
          >
            Забули пароль?
          </Button>

          <div className="flex items-center justify-between">
            <Button
              type="submit"
              className="max-w-max py-[11.5px] px-[53px] lg:py-[10px] lg:px-12 font-semibold"
            >
              Увійти
            </Button>
            <Button
              variant="ghost"
              type="button"
              className="text-[#484848] lg:text-base font-medium underline"
              onClick={handleRegisterClick}
            >
              Зареєструватись
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default LoginForm;
