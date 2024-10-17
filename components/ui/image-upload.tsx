"use client";
import { FC, ReactNode, useEffect, useState } from "react";
import { Button } from "./button";
import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary";
interface ImageUploadProps {
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove?: (value: string) => void;
  value: string[];
  children: ReactNode
}

const ImageUpload: FC<ImageUploadProps> = ({
  disabled,
  onChange,
  onRemove,
  value,
  children
}) => {
  const [isMounted, setIsMounted] = useState(false);
  
  console.log(value);
  

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onUpload = (result: any) => {
    console.log('Upload result:', result);
    onChange(result.info.secure_url);
  };
  

  if (!isMounted) {
    return null;
  }

  
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
       {value?.map(item => (
        <div
        className="relative w-[200px] h-[200px] rounded-md overflow-hidden"
        key={item}
      >
        <Image
          fill
          src={item}
          alt="Billbord image"
          className="object-cover"
        />
      </div>
       ))}
      </div>

      <CldUploadWidget onUpload={onUpload} uploadPreset="p655strs">
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
              className="max-w-max"
            >
              {children}
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUpload;
