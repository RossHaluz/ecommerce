"use client";

import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import queryString from "query-string";
import Logo from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface HeaderLogoLinkProps {
  className?: string;
}

/**
 * Клік по лого веде на головну, зберігаючи вибрану модель і сортування, якщо
 * вони були в URL (тому це не звичайний `<Link href="/">`, а `router.replace`
 * з перебудованим query). Рендериться двічі — десктоп/мобільний слот — з
 * різними класами видимості; це один компонент, а не дві копії розмітки.
 */
const HeaderLogoLink = ({ className }: HeaderLogoLinkProps) => {
  const router = useRouter();
  const t = useTranslations("nav");

  const goToHomePage = () => {
    const queryParams = queryString.parse(window.location.search);
    const modelId = queryParams?.modelId as string;
    const selectSort = queryParams?.sortByPrice as string;

    const url = queryString.stringifyUrl(
      {
        url: "/",
        query: {
          page: 1,
          modelId: modelId ? modelId : null,
          sortByPrice: selectSort ? selectSort : null,
        },
      },
      { skipEmptyString: true, skipNull: true }
    );

    router.replace(url);
  };

  return (
    <Button
      aria-label={t("logoAriaLabel")}
      size="reset"
      variant="ghost"
      className={cn("py-3 cursor-pointer", className)}
      onClick={goToHomePage}
    >
      <Logo className="h-[34px] w-[56px]" priority />
    </Button>
  );
};

export default HeaderLogoLink;
