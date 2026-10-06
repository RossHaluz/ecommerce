import { useTranslations } from "next-intl";
import { MessageCircle, Phone, Send } from "lucide-react";
import { MAIN_PHONE_HREF, TELEGRAM_URL, VIBER_URL } from "@/entities/store/model/contacts";
import { cn } from "@/lib/utils";

const BUTTON = "flex items-center justify-center gap-1.5 h-12 rounded-lg text-sm font-bold text-white";

/** Viber · Telegram · Дзвінок — три найкоротші дороги до менеджера, одним рядом. */
export const ContactButtons = ({ withCall = true }: { withCall?: boolean }) => {
  const t = useTranslations("product");

  return (
    <div className={cn("grid gap-2", withCall ? "grid-cols-3" : "grid-cols-2")}>
      <a href={VIBER_URL} target="_blank" rel="noopener noreferrer" className={cn(BUTTON, "bg-[#5B47D6]")}>
        <MessageCircle size={18} aria-hidden />
        Viber
      </a>
      <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer" className={cn(BUTTON, "bg-[#1E6FA8]")}>
        <Send size={18} aria-hidden />
        Telegram
      </a>
      {withCall && (
        <a href={MAIN_PHONE_HREF} className={cn(BUTTON, "bg-[#484848]")}>
          <Phone size={18} aria-hidden />
          {t("call")}
        </a>
      )}
    </div>
  );
};
