import { useTranslations } from "next-intl";

/**
 * Раніше приймав `currentNavigation`/`setCurrentNavigation` — плюмбінг під
 * перемикач вкладок (опис/характеристики/відгуки), якого так і не
 * побудували: рендерилась завжди тільки одна вкладка (опис), стан ніде не
 * читався. Прибрано разом з мертвими `ProductCharacteristics`/`ProductReviews`.
 */
const ProductNavigation = () => {
  const t = useTranslations("product");

  return (
    <div className="flex items-center gap-4 overflow-hidden overflow-x-auto">
      <h3 className="text-base font-bold">{t("description")}:</h3>
    </div>
  );
};

export default ProductNavigation;
