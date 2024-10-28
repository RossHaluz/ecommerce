"use client";
import { FC, useEffect, useState } from "react";
import { Button } from "./button";
import { ImagePlus, Trash } from "lucide-react";
import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary";
interface ImageUploadProps {
  disabled: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string[];
}

const ImageUpload: FC<ImageUploadProps> = ({
  disabled,
  onChange,
  onRemove,
  value,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  console.log('images', value);
  

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onUpload = (result: any) => {
    console.log(typeof result);
    
    onChange(result.info.secure_url);
  };
  

  if (!isMounted) {
    return null;
  }
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        {value?.map((url) => {
          return (
            <div
              className="relative w-32 h-32 rounded-md overflow-hidden"
              key={url}
            >
              <Button
                variant="destructive"
                className="absolute right-2 top-2 text-white bg-red-500 z-10 "
                onClick={() => onRemove(url)}
              >
                <Trash className="w-4 h-5" />
              </Button>
              <Image
                fill
                src={url}
                alt="Billbord image"
                className="object-cover absolute top-0 left-0"
              />
            </div>
          );
        })}
      </div>

      <CldUploadWidget onSuccess={onUpload} uploadPreset="p655strs" options={{multiple: true}}>
        {({ open }) => {
          const onClick = () => {
            open();
          };

          return (
            <Button
              type="button"
              disabled={disabled}
              variant="secondary"
              onClick={onClick}
              className=" max-w-max flex items-center gap-2"
            >
              <ImagePlus className="w-4 h-4" />
              Upload an image
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUpload;
