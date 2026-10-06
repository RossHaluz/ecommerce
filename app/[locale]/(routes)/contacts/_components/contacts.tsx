import { useTranslations } from "next-intl";
import Phone from "/public/images/phone.svg";
import Time from "/public/images/time.svg";
import Message from "/public/images/message.svg";
import Address from "/public/images/address.svg";
import Instagram from "/public/images/instagram.svg";
import Telegram from "/public/images/telegram.svg";
import { PHONE_NUMBERS, STORE_EMAIL, TELEGRAM_URL } from "@/entities/store/model/contacts";
import { ContactBlock } from "./contact-block";

const INSTAGRAM_URL = "https://www.instagram.com/audi_parts_khm/";

const Contacts = () => {
  const t = useTranslations("contact");

  return (
    <div className="flex flex-col gap-[30px]">
      <ContactBlock title={t("phones")} icon={<Phone className="fill-[#c0092a]" />}>
        <div className="flex flex-col gap-3">
          {PHONE_NUMBERS.map(({ tel, display, manager }) => (
            <a key={tel} href={`tel:${tel}`} className="text-[#484848] underline">
              {display} — {t(`managers.${manager}`)}
            </a>
          ))}
        </div>
      </ContactBlock>

      <ContactBlock title={t("workingHours")} icon={<Time className="fill-[#c0092a]" />}>
        <p className="text-[#484848]">
          {t("scheduleWeekdays")}
          <br /> {t("scheduleWeekend")}
        </p>
      </ContactBlock>

      <ContactBlock title={t("email")} icon={<Message />}>
        <a href={`mailto:${STORE_EMAIL}`} className="text-[#484848] underline">
          {STORE_EMAIL}
        </a>
      </ContactBlock>

      <ContactBlock title={t("address")} icon={<Address />}>
        <address className="text-[#484848] not-italic">{t("addressValue")}</address>
      </ContactBlock>

      <ContactBlock title={t("followUs")} icon={null}>
        <div className="flex items-center gap-5">
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" aria-label={t("instagram")}>
            <Instagram />
          </a>
          <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer" aria-label={t("telegram")}>
            <Telegram />
          </a>
        </div>
      </ContactBlock>
    </div>
  );
};

export default Contacts;
