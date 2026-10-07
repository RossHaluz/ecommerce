import { cn } from "@/lib/utils";

interface OptionCardProps {
  name: string;
  value: string;
  checked: boolean;
  onSelect: (value: string) => void;
  title: string;
  description: string;
}

/** Радіо-варіант карткою: уся картка клікабельна (label), вибраний — червона рамка. */
export const OptionCard = ({ name, value, checked, onSelect, title, description }: OptionCardProps) => (
  <label
    className={cn(
      "flex cursor-pointer gap-3 rounded-[10px] p-3.5",
      checked ? "border-2 border-[#C0092A] bg-[#FFF7F8]" : "border border-[#DDDDDD]"
    )}
  >
    <input
      type="radio"
      name={name}
      value={value}
      checked={checked}
      onChange={() => onSelect(value)}
      className="mt-0.5 h-5 w-5 shrink-0 accent-[#C0092A]"
    />
    <span className="flex flex-col gap-0.5">
      <span className="text-[15px] font-extrabold text-[#2E2E2E]">{title}</span>
      <span className="text-[13px] leading-[18px] text-[#6B6B6B]">{description}</span>
    </span>
  </label>
);
