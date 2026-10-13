interface FilterOptionGroupProps<T extends string> {
  legend: string;
  name: string;
  options: readonly T[];
  labels: Record<T, string>;
  value: T;
  onChange: (value: T) => void;
}

/** Справжні radio з label: великі зони дотику й робота з клавіатури без зайвого коду. */
export const FilterOptionGroup = <T extends string>({ legend, name, options, labels, value, onChange }: FilterOptionGroupProps<T>) => (
  <fieldset className="flex flex-col gap-1">
    <legend className="pb-1.5 text-[15px] font-extrabold text-[#2E2E2E]">{legend}</legend>
    {options.map((option) => (
      <label key={option} className="flex h-12 cursor-pointer items-center gap-3 text-base text-[#2E2E2E]">
        <input
          type="radio"
          name={name}
          checked={value === option}
          onChange={() => onChange(option)}
          className="h-5 w-5 accent-[#C0092A]"
        />
        {labels[option]}
      </label>
    ))}
  </fieldset>
);
