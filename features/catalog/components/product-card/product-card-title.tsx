import { Link } from "@/i18n/routing";
import { productTitle } from "@/entities/product/model/product-heading";

interface ProductCardTitleProps {
  title: string;
  href: string;
  prefetch: boolean;
}

/** Два рядки з резервом висоти: картки в ряду не скачуть, навіть коли назва коротка. */
export const ProductCardTitle = ({ title, href, prefetch }: ProductCardTitleProps) => (
  <Link
    href={href}
    prefetch={prefetch}
    scroll={false}
    className="line-clamp-2 min-h-[2.6em] text-sm font-bold leading-[1.3] text-[#2E2E2E] hover:text-[#C0092A] md:text-base"
  >
    {productTitle(title)}
  </Link>
);
