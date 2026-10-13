/** Лічильник над іконкою вкладки; нуль не показуємо. */
export const TabBadge = ({ count }: { count: number }) =>
  count > 0 ? (
    <span className="absolute -top-1.5 left-1/2 ml-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#C0092A] px-1 text-[10px] font-bold text-white">
      {count}
    </span>
  ) : null;
