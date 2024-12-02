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
import { updateUser } from "@/actions/get-data";

interface PersonalDataFormProps {
  user: {
    _id: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    token: string;
    avatar: string;
  };
}

const formSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  phoneNumber: z.string().min(1),
  email: z.string().min(1).email(),
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
          ...user,
          firstName: user?.firstName,
          lastName: user?.lastName,
          phoneNumber: user?.phoneNumber,
          email: user?.email,
        }
      : {
          firstName: "",
          lastName: "",
          phoneNumber: "",
          email: "",
        },
  });

  const handleSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setSelectFile(file);
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const formData = new FormData();
      formData.append("firstName", values.firstName);
      formData.append("lastName", values.lastName);
      formData.append("phoneNumber", values.phoneNumber);
      formData.append("email", values.email);

      if (selectFile) {
        formData.append("avatar", selectFile);
      }

      await updateUser(formData);

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
        className="flex items-start gap-[228px] lg:border-l lg:border-[#c0092a] lg:pl-[30px]"
      >
        <div className="flex flex-col gap-[30px] w-full lg:lg:w-[397px]">
          <div className="flex flex-col gap-[15px]">
            <FormField
              name="firstName"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ім&apos;я</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="bg-[#F2F2F2] shadow-none rounded-[5px] text-[#484848] border-none p-4"
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
                  <FormLabel>Прізвище</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="bg-[#F2F2F2] shadow-none rounded-[5px] text-[#484848] border-none p-4"
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
                      className="bg-[#F2F2F2] shadow-none rounded-[5px] text-[#484848] border-none p-4"
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
                      className="bg-[#F2F2F2] shadow-none rounded-[5px] text-[#484848] border-none p-4"
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

          <div className="flex flex-col gap-[5px] items-center">
            <div className="relative h-20 w-20 rounded-full border border-solid border-[#c0092a] overflow-hidden">
              {!selectFile && !user?.avatar ? (
                <UserAvatar className="stroke-[#c0092a]" />
              ) : (
                user?.avatar &&
                !selectFile && (
                  <Image
                    src={`${process.env.BACKEND_URL}/avatars/${user?.avatar}`}
                    alt="User avatarb"
                    fill
                    objectFit="cover"
                  />
                )
              )}
              {selectFile && (
                <Image
                  src={URL.createObjectURL(selectFile)}
                  alt="Select avatar"
                  fill
                  objectFit="cover"
                />
              )}
            </div>

            <Button
              className="p-0"
              variant="ghost"
              type="button"
              onClick={() => fileRef.current?.click()}
            >
              Змінити фото
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default PersonalDataForm;
