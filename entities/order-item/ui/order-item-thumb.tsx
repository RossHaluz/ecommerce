import Image from "next/image";
import { productImageUrl } from "@/entities/product/model/product-image-url";
import { cn } from "@/lib/utils";

interface OrderItemThumbProps {
  imageUrl?: string;
  /** Розмір і рамку задає місце використання; без фото лишається сірий фон. */
  className: string;
  sizes: string;
}

export const OrderItemThumb = ({ imageUrl, className, sizes }: OrderItemThumbProps) => {
  const src = productImageUrl(imageUrl);

  return (
    <span className={cn("relative block shrink-0 overflow-hidden bg-[#F2F2F2]", className)}>
      {src && <Image src={src} alt="" fill sizes={sizes} className="object-cover" />}
    </span>
  );
};
