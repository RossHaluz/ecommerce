import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

/** «Змінити» веде на сторінку кошика: там кількості, видалення й схожі товари. */
export const EditCartButton = () => {
  const t = useTranslations("checkout");

  return (
    <Link href="/cart" className="text-sm font-extrabold text-[#C0092A]">
      {t("editCart")}
    </Link>
  );
};
