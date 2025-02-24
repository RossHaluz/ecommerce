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
import { ChangeEvent, useRef, useState } from "react";
import { ImagePlus } from "lucide-react";
import Image from "next/image";
import { nanoid } from "nanoid";
import { useParams } from "next/navigation";
import axios from "axios";

const formSchema = z.object({
  userName: z.string().min(1, { message: "Обовʼязкове поле для заповнення" }),
  userEmail: z
    .string()
    .min(1, { message: "Обовʼязкове поле для заповнення" })
    .email("Невірно вказана електронна адреса"),
  evaluation: z.number().min(1, { message: "Обовʼязкове поле для заповнення" }),
  feedback: z.string().min(1, { message: "Обовʼязкове поле для заповнення" }),
  photos: z.object({ url: z.string() }).array(),
});

const ProductReviewForm = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const selectRef = useRef<HTMLInputElement>(null);
  const { productId } = useParams();

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

  const { isSubmitting } = form.formState;
  const images = form.getValues("photos");

  const ratingChanged = (newRating: number) => {
    form.setValue("evaluation", newRating);
  };

  const handleSelectFiles = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setSelectedFiles(files);
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const formData = new FormData();
      if (selectedFiles && selectedFiles.length > 0) {
        for (let i = 0; i <= selectedFiles?.length; i++) {
          formData.append("photos", selectedFiles[i]);
        }
      }
      formData.append("userName", values.userName);
      formData.append("userEmail", values.userEmail);
      formData.append("evaluation", String(values.evaluation));
      formData.append("feedback", values.feedback);

      const { data } = await axios.post(
        `${process.env.BACKEND_URL}/api/${process.env.STORE_ID}/products/${productId}/review-product`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(data);
    } catch (error) {
      console.error(error);
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
          {selectedFiles?.length > 0 && (
            <div className="flex items-center gap-5">
              {selectedFiles?.map((item) => {
                return (
                  <div
                    className="relative w-[80px] h-[80px] overflow-hidden rounded-2xl"
                    key={nanoid()}
                  >
                    <Image
                      src={URL.createObjectURL(item)}
                      alt="Review photo"
                      fill
                      className="absolute top-0 left-0 object-cover"
                    />
                  </div>
                );
              })}
            </div>
          )}

          <input
            type="file"
            ref={selectRef}
            className="hidden"
            multiple
            onChange={handleSelectFiles}
          />
          <Button
            type="button"
            onClick={() => selectRef.current?.click()}
            variant="secondary"
            className=" max-w-max flex items-center gap-2"
          >
            <ImagePlus className="w-4 h-4" />
            Upload an image
          </Button>

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
