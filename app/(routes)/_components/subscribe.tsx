"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import subscribe from "/public/images/subscribe.jpg";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Image from "next/image";

const formSchema = z.object({
  email: z.string().min(1, { message: "Email is required" }),
});

const Subscribe = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className="bg-[#EAF2EB] mb-[30px]">
      <div className="lg:grid grid-cols-3 items-center justify-center lg:justify-start gap-[30px] container">
        <div className="hidden lg:block h-[250px] relative col-span-1">
          <Image
            src={subscribe}
            fill
            priority
            alt="Subscribe"
            className="absolute top-0 left-0 object-cover"
          />
        </div>
        <div className="px-[37px] py-[30px] lg:px-0 lg:py-0 flex flex-col gap-[31px] col-span-2">
          <div className="flex flex-col gap-[30px]">
            <h2 className="mx-auto text-center text-base lg:text-2xl font-bold w-[228px] lg:w-full lg:text-left">
              Отримайте знижку 10% на першу покупку
            </h2>
            <h3 className="hidden lg:block text-base font-bold">
              за підписку на наші новини
            </h3>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-[15px] lg:flex-row lg:gap-5  w-full md:w-[350px] lg:w-full mx-auto"
            >
              <div className="w-full">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Введіть свій email"
                          {...field}
                          className="bg-[#FFFFFF] border-none text-[#48484880] text-sm px-[15px] py-[8px] lg:py-[13px] lg:px-5 lg:text-base rounded-[5px]  w-full"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <Button
                type="submit"
                className="rounded-[5px] lg:max-w-max lg:px-[58.5px] lg:py-[15px]"
              >
                Підписатись
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Subscribe;
