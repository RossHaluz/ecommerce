"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import React, { FC, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import UserAvatar from "/public/images/account-avatar.svg";
import Image from "next/image";

interface PersonalDataFormProps {
  user: {
    _id: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    avatar: string;
    token: string;
  };
}

const formSchema = z.object({
  username: z.string().min(1),
  phoneNumber: z.string().min(1),
  email: z.string().min(1).email(),
  avatar: z.string(),
});

const PersonalDataForm: FC<PersonalDataFormProps> = ({ user }) => {
  const token = Cookies.get("token");
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  const [selectFile, setSelectFile] = useState<File | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: user
      ? {
          username: `${user?.firstName} ${user?.lastName}`,
          phoneNumber: user?.phoneNumber,
          email: user?.email,
          avatar: user?.avatar,
        }
      : {
          username: "",
          phoneNumber: "",
          email: "",
          avatar: "",
        },
  });

  const handleSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setSelectFile(file);
    }
  };

  const { isValid, isSubmitting } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const formData = new FormData();
      formData.append("username", values.username);
      formData.append("phoneNumber", values.phoneNumber);
      formData.append("email", values.email);

      if (selectFile) {
        formData.append("avatar", selectFile);
      }

      await axios.patch(`${process.env.SERVER_URL}api/auth/update`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      router.refresh();
      toast.success("User success update");
    } catch (error) {
      toast.error("Something went wrong...");
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex items-start gap-[228px] lg:border-l lg:border-[#7FAA84] lg:pl-[30px]"
      >
        <div className="flex flex-col gap-[30px] w-full lg:lg:w-[397px]">
          <div className="flex flex-col gap-[15px]">
            <FormField
              name="username"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ім&apos;я та Прізвище</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="bg-[#EAF2EB] shadow-none rounded-[5px] text-[#484848] border-none p-4"
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
                  <FormLabel>Номер телефону</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="bg-[#EAF2EB] shadow-none rounded-[5px] text-[#484848] border-none p-4"
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
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="bg-[#EAF2EB] shadow-none rounded-[5px] text-[#484848] border-none p-4"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" className="mx-auto max-w-max lg:ml-0">
            Редагувати дані
          </Button>
        </div>

<div className="hidden lg:block">
        <input
          type="file"
          className="hidden"
          ref={fileRef}
          onChange={handleSelectFile}
        />
        <FormField
          name="avatar"
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-[5px] items-center">
              <div className="relative h-20 w-20 rounded-full border border-solid border-[#7FAA84] overflow-hidden">
                {(selectFile && (
                  <Image
                    src={URL.createObjectURL(selectFile)}
                    alt="User avatar"
                    fill
                    objectFit="cover"
                  />
                )) ||
                  (!selectFile && !user?.avatar && <UserAvatar />) ||
                  (user?.avatar && (
                    <Image
                      src={`${process.env.SERVER_URL}avatars/${user?.avatar}`}
                      alt="User avatar"
                      fill
                      objectFit="cover"
                    />
                  ))}
              </div>
              <FormControl>
                {fileRef && (
                  <h3
                    className="underline text-base cursor-pointer"
                    onClick={() => fileRef?.current?.click()}
                  >
                    Змінити фото
                  </h3>
                )}
              </FormControl>
            </FormItem>
          )}
        />
        </div>
      </form>
    </Form>
  );
};

export default PersonalDataForm;
