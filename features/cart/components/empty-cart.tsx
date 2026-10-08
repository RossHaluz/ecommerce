import { useTranslations } from "next-intl";
import { ShoppingCart } from "lucide-react";
import { Link } from "@/i18n/routing";

export const EmptyCart = () => {
  const t = useTranslations("cart");

  return (
    // Висота як у заглушки до монтування — інакше футер підстрибує (CLS).
    <div className="min-h-[100svh]">
      <div className="flex flex-col items-center gap-4 rounded-xl bg-white px-4 py-12 text-center">
        <ShoppingCart size={40} className="text-[#9A9A9A]" aria-hidden />
        <p className="m-0 text-lg font-bold text-[#2E2E2E]">{t("empty")}</p>
        <Link href="/" className="flex h-12 items-center rounded-lg bg-[#C0092A] px-6 font-extrabold text-white">
          {t("continueShopping")}
        </Link>
      </div>
    </div>
  );
};
