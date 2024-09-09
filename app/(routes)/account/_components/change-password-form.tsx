"use client";
import { EyeOff, Eye } from "lucide-react";

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
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import z from "zod";
import axios from "axios";

interface ChangePasswordFormProps {
    token: string
}

const formSchema = z
  .object({
    oldPassword: z.string().min(1, "Old password is require"),
    newPassword: z.string().min(1, "New password is require"),
    confirmNewPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const ChangePasswordForm: FC<ChangePasswordFormProps> = ({token}) => {
  const [isShowOldPassword, setIsShowOldPassword] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
  const [isShowNewPassword, setIsShowNewPassword] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const { isValid, isSubmitting } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
        const {data} = await axios.post(`${process.env.SERVER_URL}api/auth/change-password`, values, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });        
        toast.success(data?.message)
        
    } catch (error) { 
      toast.error("Something went wrong...");
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-[30px] lg:border-l lg:border-[#7FAA84] lg:pl-[30px] w-full lg:lg:w-[397px]"
      >
        <div className="flex flex-col gap-[5px]">
          <FormField
            name="oldPassword"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex flex-col gap-[5px]">
                <FormLabel>Старий пароль*</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      {...field}
                      type={isShowOldPassword ? "text" : "password"}
                      className="bg-transparent border border-solid border-[#7FAA84] shadow-none rounded-[5px] text-[#484848] py-4 pl-4 pr-12"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => setIsShowOldPassword((prev) => !prev)}
                      className="absolute top-0 right-0 text-[#7FAA84] "
                    >
                      {isShowOldPassword ? (
                        <Eye size={24} />
                      ) : (
                        <EyeOff size={24} />
                      )}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage className="text-sm text-[#EF787A] font-semibold" />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-[5px]">
          <FormField
            name="newPassword"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex flex-col gap-[5px]">
                <FormLabel>Новий пароль*</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      {...field}
                      type={isShowNewPassword ? "text" : "password"}
                      className="bg-transparent border border-solid border-[#7FAA84] shadow-none rounded-[5px] text-[#484848] py-4 pl-4 pr-12"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => setIsShowNewPassword((prev) => !prev)}
                      className="absolute top-0 right-0 text-[#7FAA84] "
                    >
                      {isShowNewPassword ? (
                        <Eye size={24} />
                      ) : (
                        <EyeOff size={24} />
                      )}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage className="text-sm text-[#EF787A] font-semibold" />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-[5px]">
          <FormField
            name="confirmNewPassword"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex flex-col gap-[5px]">
                <FormLabel>Підтвердіть новий пароль*</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      {...field}
                      type={isShowConfirmPassword ? "text" : "password"}
                      className="bg-transparent border border-solid border-[#7FAA84] shadow-none rounded-[5px] text-[#484848] py-4 pl-4 pr-12"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => setIsShowConfirmPassword((prev) => !prev)}
                      className="absolute top-0 right-0 text-[#7FAA84] "
                    >
                      {isShowConfirmPassword ? (
                        <Eye size={24} />
                      ) : (
                        <EyeOff size={24} />
                      )}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage className="text-sm text-[#EF787A] font-semibold" />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" disabled={!isValid || isSubmitting} className="max-w-max mx-auto lg:ml-0 lg:px-[42.5px] lg:py-[10px] px-[58.5px] py-[11.5px]">Змінити</Button>
      </form>
    </Form>
  );
};

export default ChangePasswordForm;
