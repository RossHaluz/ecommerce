import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface HeaderIconLabelProps {
  icon: ReactNode;
  label: string;
  /** Лічильник над іконкою (кошик); 0 і порожнє не показуємо. */
  badge?: number;
  /** Телефон: лише іконка, підпис — для скрінрідера. */
  compact?: boolean;
}

/** Іконка з підписом під нею: без підпису людина вгадує, де вхід, а де кошик. */
export const HeaderIconLabel = ({ icon, label, badge, compact }: HeaderIconLabelProps) => (
  <span
    className={cn(
      "relative flex flex-col items-center justify-center gap-1 text-[11px] font-bold text-white",
      compact ? "h-11 w-11" : "h-14 min-w-[56px]"
    )}
  >
    {icon}
    <span className={cn(compact && "sr-only")}>{label}</span>
    {badge ? (
      <span
        className={cn(
          "absolute flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#C0092A] px-1 text-[11px] text-white",
          compact ? "right-0 top-2" : "right-2 top-1"
        )}
      >
        {badge}
      </span>
    ) : null}
  </span>
);
