"use client";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomInputMask from "@/utils/phone-mask";
import { cn } from "@/lib/utils";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { Button } from "../ui/button";
import { toast } from "react-toastify";
import { submitLead } from "@/features/leads/submit-lead";

interface SearchVinFormProps {
  setIsSuccess: Dispatch<SetStateAction<boolean>>
}

const formSchema = z.object({
  vinCode: z
    .string()
    .min(17, { message: "Вкажіть VIN-код — поле обов’язкове" }),
  phone: z
    .string()
    .regex(
      /^\+380\s?\d{3}\s?\d{2}\s?\d{2}\s?\d{2}$/,
      "Введіть коректний номер у форматі +380XXXXXXXXX або +380 XXX XX XX XX"
    ),
  desc: z.string().optional(),
});

const SearchVinForm: FC<SearchVinFormProps> = ({ setIsSuccess }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      vinCode: "",
      phone: "",
    },
  });
  const [selectFiles, setSelectFiles] = useState<File[]>([]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await submitLead({ ...values, files: selectFiles }, "vin");
      setIsSuccess(true);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong...");
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <div className="flex items-start gap-3">
          <div className="p-2 w-9 h-9 bg-[#C0092A] text-white flex items-center justify-center rounded-full">
            1
          </div>
          <FormField
            name="vinCode"
            render={({ field, fieldState }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel>
                  Вкажіть VIN код<span className="text-red-600">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="VIN-код"
                    {...field}
                    className={cn(
                      "py-3 lg:py-2 px-[15px] bg-[#FFFDFD] outline-none text-[#484848] text-sm lg:text-base lg:font-semibold border border-solid rounded-[5px]",
                      fieldState.invalid ? "border-red-500" : "border-[#484848]"
                    )}
                    onChange={(e) => {
                       let value = e.target.value.toUpperCase();
                  if (value.length > 17) {
                    value = value.slice(0, 17);
                  }
                  field.onChange(value);
                    }}
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
        </div>

        <div className="flex items-start gap-3">
          <div className="p-2 w-9 h-9 bg-[#C0092A] text-white flex items-center justify-center rounded-full">
            2
          </div>
          <FormField
            name="phone"
            render={({ field, fieldState }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel>
                  Номер телефону<span className="text-red-600">*</span>
                </FormLabel>
                <FormControl>
                  <CustomInputMask
                    mask="+380 999 99 99 99"
                    placeholder="Номер телефону"
                    {...field}
                    className={cn(
                      "py-3 lg:py-2 px-[15px] bg-[#FFFDFD] outline-none text-[#484848] text-sm lg:text-base lg:font-semibold border border-solid rounded-[5px]",
                      fieldState.invalid ? "border-red-500" : "border-[#484848]"
                    )}
                    onChange={(e) => {
                      const value = e.target.value.toString();
                      field.onChange(value);
                    }}
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
        </div>

        <div className="flex items-start gap-3">
          <div className="p-2 w-9 h-9 bg-[#C0092A] text-white flex items-center justify-center rounded-full">
            3
          </div>
          <FormField
            name="desc"
            render={({ field, fieldState }) => (
              <FormItem className="flex flex-col gap-1 w-full">
                <FormLabel>Вкажіть запчастини</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Назва запчастини або їй каталожний номер"
                    {...field}
                    className={cn(
                      "py-3 lg:py-2 px-[15px] bg-[#FFFDFD] text-[#484848] outline-none text-sm lg:text-base lg:font-semibold lg:border lg:border-solid rounded-[5px]",
                      fieldState.invalid ? "border-red-500" : "border-[#484848]"
                    )}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <Input
          type="file"
          multiple
          onChange={(e) => {
            const files = e.target.files ? Array.from(e.target.files) : [];
            setSelectFiles(files);
          }}
          className={cn(
            "max-w-max cursor-pointer border border-solid border-gray-300 rounded-lg",
            {
              "border-[#484848]": selectFiles?.length > 0,
            }
          )}
        />
        <Button type="submit" className="max-w-max">
          Відправити
        </Button>
      </form>
    </Form>
  );
};

export default SearchVinForm;
