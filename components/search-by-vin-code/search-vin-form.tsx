"use client";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
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
import { NumberedStep } from "./numbered-step";

interface SearchVinFormProps {
  setIsSuccess: Dispatch<SetStateAction<boolean>>;
}

const VIN_LENGTH = 17;
const fieldClass = (invalid: boolean) =>
  cn(
    "py-3 lg:py-2 px-[15px] bg-[#FFFDFD] outline-none text-[#484848] text-base lg:font-semibold border border-solid rounded-[5px]",
    invalid ? "border-red-500" : "border-[#484848]"
  );

const buildSchema = (t: (key: string) => string, tPhone: (key: string) => string) =>
  z.object({
    vinCode: z.string().length(VIN_LENGTH, { message: t("vinRequired") }),
    phone: z.string().regex(/^\+380\s?\d{3}\s?\d{2}\s?\d{2}\s?\d{2}$/, tPhone("phoneInvalid")),
    desc: z.string().optional(),
  });

const SearchVinForm: FC<SearchVinFormProps> = ({ setIsSuccess }) => {
  const t = useTranslations("vin");
  const tPhone = useTranslations("orderOneClick");
  const tCommon = useTranslations("common");
  const formSchema = buildSchema(t, tPhone);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { vinCode: "", phone: "", desc: "" },
  });
  const [selectFiles, setSelectFiles] = useState<File[]>([]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await submitLead({ ...values, files: selectFiles }, "vin");
      setIsSuccess(true);
    } catch {
      toast.error(tCommon("somethingWentWrong"));
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <NumberedStep n={1}>
          <FormField
            name="vinCode"
            render={({ field, fieldState }) => (
              <FormItem className="flex flex-col gap-1 w-full">
                <FormLabel>
                  {t("vinLabel")}
                  <span className="text-red-600">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder={t("vinPlaceholder")}
                    autoCapitalize="characters"
                    spellCheck={false}
                    {...field}
                    className={fieldClass(fieldState.invalid)}
                    onChange={(e) => field.onChange(e.target.value.toUpperCase().slice(0, VIN_LENGTH))}
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
        </NumberedStep>

        <NumberedStep n={2}>
          <FormField
            name="phone"
            render={({ field, fieldState }) => (
              <FormItem className="flex flex-col gap-1 w-full">
                <FormLabel>
                  {t("phoneLabel")}
                  <span className="text-red-600">*</span>
                </FormLabel>
                <FormControl>
                  <CustomInputMask
                    mask="+380 999 99 99 99"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder={tPhone("phonePlaceholder")}
                    {...field}
                    className={fieldClass(fieldState.invalid)}
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
        </NumberedStep>

        <NumberedStep n={3}>
          <FormField
            name="desc"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1 w-full">
                <FormLabel>{t("partsLabel")}</FormLabel>
                <FormControl>
                  <Textarea placeholder={t("partsPlaceholder")} {...field} className={fieldClass(false)} />
                </FormControl>
              </FormItem>
            )}
          />
        </NumberedStep>

        <label className="flex flex-col gap-1 text-sm font-medium text-[#484848]">
          {t("filesLabel")}
          <Input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => setSelectFiles(e.target.files ? Array.from(e.target.files) : [])}
            className="max-w-max cursor-pointer border border-solid border-gray-300 rounded-lg"
          />
        </label>
        <Button type="submit" className="max-w-max" disabled={form.formState.isSubmitting}>
          {t("submit")}
        </Button>
      </form>
    </Form>
  );
};

export default SearchVinForm;
