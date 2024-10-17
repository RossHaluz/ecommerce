"use client";

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
import { useForm } from "react-hook-form";
import ReactStars from "react-rating-stars-component";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import ImageUpload from "@/components/ui/image-upload";
import Clip from "/public/images/clip.svg";

const formSchema = z.object({
  userName: z.string().min(1, { message: "Обовʼязкове поле для заповнення" }),
  userEmail: z
    .string()
    .min(1, { message: "Обовʼязкове поле для заповнення" })
    .email("Невірно вказана електронна адреса"),
  evaluation: z.number().min(1, { message: "Обовʼязкове поле для заповнення" }),
  feedback: z.string().min(1, { message: "Обовʼязкове поле для заповнення" }),
  photos: z
    .array(
      z.object({
        url: z.string(),
      })
    )
    .optional(),
});

const ProductReviewForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userName: "",
      userEmail: "",
      evaluation: 0,
      feedback: "",
      photos: [],
    },
  });

  const ratingChanged = (newRating: number) => {
    form.setValue("evaluation", newRating);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      console.log(values);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col gap-[15px] lg:gap-[30px]">
      <h3 className="text-base text-[#484848]">Залиште свій відгук</h3>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-[15px]"
        >
          <div className="flex flex-col gap-[30px]">
            <FormField
              name="userName"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex flex-col gap-[5px] lg:gap-2">
                  <FormLabel className="font-semibold lg:text-base">
                    Ваше імʼя*
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="bg-transparent border border-solid border-[border: 1px solid #7FAA84] rounded-[5px]"
                    />
                  </FormControl>
                  <FormMessage className="text-[#EF787A] lg:text-base" />
                </FormItem>
              )}
            />

            <FormField
              name="userEmail"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex flex-col gap-[5px] lg:gap-2">
                  <FormLabel className="font-semibold lg:text-base">
                    Ваш Email*
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="bg-transparent border border-solid border-[border: 1px solid #7FAA84] rounded-[5px]"
                    />
                  </FormControl>
                  <FormMessage className="text-[#EF787A] lg:text-base" />
                </FormItem>
              )}
            />

            <FormField
              name="evaluation"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex flex-col gap-[5px] lg:gap-2">
                  <div className="flex items-center justify-between">
                    <FormLabel className="font-semibold lg:text-base">
                      Ваша оцінка*
                    </FormLabel>
                    <FormControl>
                      <ReactStars
                        count={5}
                        onChange={ratingChanged}
                        size={24}
                        activeColor="#7FAA84"
                      />
                    </FormControl>
                  </div>
                  <FormMessage className="text-[#EF787A] lg:text-base" />
                </FormItem>
              )}
            />

            <FormField
              name="feedback"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex flex-col gap-[5px] lg:gap-2">
                  <FormLabel className="font-semibold lg:text-base">
                    Ваш відгук*
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      className="h-[155px] resize-none bg-transparent border border-solid border-[#7FAA84] rounded-[5px]"
                    />
                  </FormControl>
                  <FormMessage className="text-[#EF787A] lg:text-base" />
                </FormItem>
              )}
            />
          </div>
          <FormField
            name="photos"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <ImageUpload
                    value={field.value?.map((image) => image.url) || []}
                    onChange={(url) => {
                      field.onChange([...(field.value ?? []), { url }]);
                    }}
                  >
                    <div className="text-[#7FAA84] flex items-center gap-[10px]">
                      <Clip />
                      Прикріпити фото
                    </div>
                  </ImageUpload>
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="py-[11.5px] px-[52px] max-w-max lg:py-2 lg:px-[32.5px] lg:text-base"
          >
            Надіслати
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ProductReviewForm;
