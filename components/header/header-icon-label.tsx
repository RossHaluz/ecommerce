import type { ReactNode } from "react";

interface HeaderIconLabelProps {
  icon: ReactNode;
  label: string;
  /** Лічильник над іконкою (кошик); 0 і порожнє не показуємо. */
  badge?: number;
}

/** Іконка з підписом під нею: без підпису людина вгадує, де вхід, а де кошик. */
export const HeaderIconLabel = ({ icon, label, badge }: HeaderIconLabelProps) => (
  <span className="relative flex h-14 min-w-[56px] flex-col items-center justify-center gap-1 text-[11px] font-bold text-white">
    {icon}
    {label}
    {badge ? (
      <span className="absolute right-2 top-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#C0092A] px-1 text-[11px] text-white">
        {badge}
      </span>
    ) : null}
  </span>
);
