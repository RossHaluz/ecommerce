import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { titleBadges } from "../model/title-badges";

/** Бейджі на фото: різницю між майже однаковими деталями видно, не читаючи назви. */
export const TitleBadges = ({ title }: { title: string }) => {
  const t = useTranslations("productBadge");
  const badges = titleBadges(title);
  if (!badges.length) return null;

  return (
    <span className="pointer-events-none absolute left-2 top-2 flex max-w-[70%] flex-wrap gap-1">
      {badges.map((key, index) => (
        <span
          key={key}
          // На вузькій картці телефона третій бейдж ставав стовпчиком на півфото.
          className={cn(
            "rounded-md bg-[rgba(20,20,20,0.78)] px-1.5 py-0.5 text-[11px] font-extrabold leading-4 text-white md:text-xs",
            index >= 2 && "max-md:hidden",
          )}
        >
          {t(key)}
        </span>
      ))}
    </span>
  );
};
