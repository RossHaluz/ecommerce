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

interface LoginFormProps {
  setIsRegister: Dispatch<SetStateAction<boolean>>;
  setIsLogin: Dispatch<SetStateAction<boolean>>;
}

const formSchema = z.object({
  email: z.string().min(1, { message: "Email is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

const LoginForm: FC<LoginFormProps> = ({ setIsRegister, setIsLogin }) => {
  const [isShow, setIsShow] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleRegisterClick = () => {
    setIsRegister(true);
    setIsLogin(false);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const { data } = await axios.post(
        `${process.env.SERVER_URL}api/auth/login`,
        values
      );

      Cookies.set("token", data?.loginUser?.token, { expires: 1 });
       axios.defaults.headers.common.Authorization = `Bearer ${data?.loginUser?.token}`
      router.push("/account");
      router.refresh();
      toast.success("Success login");
    } catch (error) {
      toast.error("Something went wrong...");
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
        </div>

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
