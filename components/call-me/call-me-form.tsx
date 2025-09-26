'use client'
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import CustomInputMask from "@/utils/phone-mask"
import { cn } from "@/lib/utils"
import { toast } from "react-toastify"
import axios from "axios"
import { Dispatch, FC, SetStateAction } from "react"

interface CallMeFormProps {
  setIsSuccess: Dispatch<SetStateAction<boolean>>
}

const formSchema = z.object({
  phone: z
    .string()
    .min(1, { message: "Це поле є обов'язковим для заповнення" })
    .regex(/^\+([1-9]\d{0,3}(\s?\d{2,3}){2,5})$/, {
      message: "Введіть коректний номер телефону у міжнародному форматі",
    }),
  name: z.string().optional(),
});

const CallMeForm: FC<CallMeFormProps> = ({ setIsSuccess }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: "",
      name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const storeId = process.env.STORE_ID;
    try {
      await axios.post(`/call-me/${storeId}`, values);
      setIsSuccess(true)
    } catch (error) {
      console.log(error);
      toast("Simething went wrong...");
    }
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <div className="flex flex-col gap-3">
          <FormField
            name="phone"
            render={({ field, fieldState }) => (
              <FormItem className="flex flex-col gap-2">
                <FormLabel>
                  Номер телефону <span className="text-red-600">*</span>
                </FormLabel>
                <FormControl>
                  <CustomInputMask
                    mask="+380 999 99 99 99"
                    placeholder="+380 999 99 99 99"
                    {...field}
                    className={cn(
                      "py-3 lg:py-2 px-[15px] bg-[#FFFDFD] text-[#484848] text-sm lg:text-base lg:font-semibold border border-solid rounded-[5px]",
                      fieldState.invalid ? "border-red-500" : "border-[#484848]"
                    )}
                  />
                </FormControl>
                {fieldState.invalid && (
                  <FormMessage className="text-red-500 text-sm">
                    {fieldState.error?.message}
                  </FormMessage>
                )}
              </FormItem>
            )}
          />

          <FormField
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <FormLabel>Ім&apos;я</FormLabel>
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="py-3 lg:py-2 px-[15px] bg-[#FFFDFD] text-[#484848] text-sm lg:text-base lg:font-semibold border border-solid rounded-[5px] border-[#484848]"
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <Button type="submit">Чекаю на дзвінок</Button>
      </form>
    </Form>
  );
};

export default CallMeForm
