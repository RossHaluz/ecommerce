"use client";

import { useState, type KeyboardEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SuggestInputProps<T> {
  id: string;
  value: string;
  onChange: (text: string) => void;
  options: T[];
  optionKey: (option: T) => string;
  renderOption: (option: T) => ReactNode;
  onPick: (option: T) => void;
  loading?: boolean;
  /** Показується, коли пошук нічого не дав. */
  emptyText?: string;
  loadingText?: string;
  placeholder?: string;
  disabled?: boolean;
  invalid?: boolean;
  describedBy?: string;
  className?: string;
}

/** Поле з випадним списком підказок (ARIA combobox): стрілки, Enter, Esc. */
export function SuggestInput<T>({
  id,
  value,
  onChange,
  options,
  optionKey,
  renderOption,
  onPick,
  loading,
  emptyText,
  loadingText,
  placeholder,
  disabled,
  invalid,
  describedBy,
  className,
}: SuggestInputProps<T>) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const listId = `${id}-list`;
  const status = loading ? loadingText : !options.length && value.trim() ? emptyText : undefined;
  const expanded = open && (options.length > 0 || Boolean(status));

  const pick = (option: T) => {
    onPick(option);
    setOpen(false);
    setActive(-1);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape") return setOpen(false);
    if (!options.length) return;
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      setOpen(true);
      const step = event.key === "ArrowDown" ? 1 : -1;
      setActive((index) => (index + step + options.length) % options.length);
    } else if (event.key === "Enter" && open && active >= 0) {
      event.preventDefault();
      pick(options[active]);
    }
  };

  return (
    <div className="relative">
      <input
        id={id}
        role="combobox"
        aria-expanded={expanded}
        aria-controls={listId}
        aria-autocomplete="list"
        aria-activedescendant={expanded && active >= 0 ? `${listId}-${active}` : undefined}
        aria-invalid={invalid}
        aria-describedby={describedBy}
        autoComplete="off"
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        onChange={(event) => {
          onChange(event.target.value);
          setOpen(true);
          setActive(-1);
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onKeyDown={onKeyDown}
        className={className}
      />
      {expanded && (
        <ul
          id={listId}
          role="listbox"
          className="absolute inset-x-0 top-full z-30 m-0 mt-1 max-h-72 list-none overflow-y-auto rounded-lg border border-[#E4E4E4] bg-white p-1 shadow-[0_6px_16px_rgba(0,0,0,0.08)]"
        >
          {status ? (
            <li className="px-3 py-2.5 text-sm text-[#6B6B6B]">{status}</li>
          ) : (
            options.map((option, index) => (
              <li
                key={optionKey(option)}
                id={`${listId}-${index}`}
                role="option"
                aria-selected={index === active}
                // mousedown, а не click: інакше blur поля закриває список раніше, ніж спрацює вибір.
                onMouseDown={(event) => {
                  event.preventDefault();
                  pick(option);
                }}
                className={cn("cursor-pointer rounded-md px-3 py-2.5", index === active && "bg-[#F2F2F2]")}
              >
                {renderOption(option)}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
