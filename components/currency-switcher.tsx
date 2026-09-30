"use client";

import { useDispatch } from "react-redux";
import { setCurrency, type DisplayCurrency } from "@/redux/customizer/slice";
import { usePriceFormatter } from "@/hooks/use-price-formatter";
import { cn } from "@/lib/utils";
import { switcherOptionClass } from "@/components/ui/switcher-option";

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
          aria-pressed={code === currency}
          onClick={() => dispatch(setCurrency(code))}
          className={switcherOptionClass(code === currency)}
        >
          {label}
          <span className="sr-only"> {code}</span>
        </button>
      ))}
    </div>
  );
};

export default CurrencySwitcher;
