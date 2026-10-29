"use client";

import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useTranslations } from "next-intl";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useModels } from "@/features/catalog";
import { rememberCar } from "@/redux/my-car/slice";
import { cn } from "@/lib/utils";
import type { PhoneLogin } from "../hooks/use-phone-login";

type Props = Pick<PhoneLogin, "saveName" | "skipName" | "isSavingName">;

const NAME_FIELDS = ["firstName", "lastName"] as const;
const FIELD = "h-[52px] w-full rounded-[10px] border bg-white px-3.5 text-base text-[#2E2E2E] outline-none focus:border-[#2E2E2E]";

/** Only for a new customer: the name goes on the Nova Poshta waybill, so it is asked once, here. */
export const LoginNameStep = ({ saveName, skipName, isSavingName }: Props) => {
  const t = useTranslations("auth");
  const dispatch = useDispatch();
  const { data: models = [] } = useModels();
  const schema = z.object({
    firstName: z.string().trim().min(1, t("firstNameRequired")).max(80),
    lastName: z.string().trim().max(80),
    modelName: z.string(),
  });
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { firstName: "", lastName: "", modelName: "" },
  });

  const onSubmit = ({ modelName, ...name }: z.infer<typeof schema>) => {
    const model = models.find((m) => m.modelName === modelName);
    if (model) dispatch(rememberCar({ modelName: model.modelName, name: model.name }));
    saveName(name);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-3.5" noValidate>
        {NAME_FIELDS.map((name, index) => (
          <FormField
            key={name}
            name={name}
            control={form.control}
            render={({ field, fieldState }) => (
              <FormItem className="flex flex-col gap-1.5">
                <FormLabel className="text-sm font-extrabold">{t(name)}</FormLabel>
                <FormControl>
                  <input
                    {...field}
                    autoFocus={index === 0}
                    autoComplete={name === "firstName" ? "given-name" : "family-name"}
                    className={cn(FIELD, fieldState.invalid ? "border-[#C0092A]" : "border-[#CFCFCF]")}
                  />
                </FormControl>
                <FormMessage className="text-sm text-[#C0092A]" />
              </FormItem>
            )}
          />
        ))}
        <FormField
          name="modelName"
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1.5">
              <FormLabel className="text-sm font-extrabold">
                {t("myAudi")} <span className="font-semibold text-[#6B6B6B]">({t("optional")})</span>
              </FormLabel>
              <FormControl>
                <select {...field} className={cn(FIELD, "border-[#CFCFCF]")}>
                  <option value="">{t("chooseModel")}</option>
                  {models.map((model) => (
                    <option key={model.id} value={model.modelName}>
                      {model.name}
                    </option>
                  ))}
                </select>
              </FormControl>
            </FormItem>
          )}
        />
        <button
          type="submit"
          disabled={isSavingName}
          className="h-[52px] w-full rounded-[10px] bg-[#C0092A] text-[17px] font-extrabold text-white hover:bg-[#E2153B] disabled:opacity-60"
        >
          {t("saveName")}
        </button>
        <button type="button" onClick={skipName} className="h-11 w-full text-[15px] font-bold text-[#484848]">
          {t("later")}
        </button>
      </form>
    </Form>
  );
};
