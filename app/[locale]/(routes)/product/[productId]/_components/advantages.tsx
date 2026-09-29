import { useTranslations } from "next-intl";
import Box from "/public/images/box.svg";
import Refresh from "/public/images/refresh.svg";
import Credit from "/public/images/credit.svg";

const Advantages = () => {
  const t = useTranslations("advantages");

  return (
    <div className="p-[15px] bg-[#FFFDFD] md:bg-transparent md:grid-cols-2 lg:grid-cols-3 rounded-[5px] grid grid-cols-1 gap-6 lg:gap-[30px] pb-[30px]">
      <div className="flex items-center gap-[15px] md:bg-[#FFFDFD] p-[15px] md:rounded-md">
        <div className="max-w-max">
          <Box />
        </div>
        <p className="text-[#484848] text-sm">{t("deliveryUkraine")}</p>
      </div>
      <div className="flex items-center gap-[15px] md:bg-[#FFFDFD] p-[15px] md:rounded-md">
        <div className="max-w-max">
          <Refresh />
        </div>
        <p className="text-[#484848] text-sm">{t("exchangeGuarantee")}</p>
      </div>
      <div className="flex items-center gap-[15px] md:bg-[#FFFDFD] p-[15px] md:rounded-md">
        <div className="max-w-max">
          <Credit />
        </div>
        <p className="text-[#484848] text-sm">{t("securePayment")}</p>
      </div>
    </div>
  );
};

export default Advantages;
