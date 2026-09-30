"use client";

import { useDispatch } from "react-redux";
import { setCurrency, type DisplayCurrency } from "@/redux/customizer/slice";
import { usePriceFormatter } from "@/hooks/use-price-formatter";
import { cn } from "@/lib/utils";

const CURRENCIES: { code: DisplayCurrency; label: string }[] = [
  { code: "USD", label: "$" },
  { code: "UAH", label: "₴" },
];

interface CurrencySwitcherProps {
  className?: string;
}

const CurrencySwitcher = ({ className }: CurrencySwitcherProps) => {
  const dispatch = useDispatch();
  // Та сама валюта, що й у цінах (з урахуванням SSR-захисту в хуку).
  const { currency } = usePriceFormatter();

  return (
    <div className={cn("flex items-center gap-2 text-xs font-semibold", className)}>
      {CURRENCIES.map(({ code, label }) => (
        <button
          key={code}
          type="button"
          aria-label={code}
          aria-pressed={code === currency}
          onClick={() => dispatch(setCurrency(code))}
          className={cn("transition-colors", {
            "text-[#c0092a]": code === currency,
            "opacity-60 hover:opacity-100": code !== currency,
          })}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default CurrencySwitcher;
