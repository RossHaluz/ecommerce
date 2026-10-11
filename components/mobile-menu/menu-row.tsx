import type { ReactNode } from "react";
import { ChevronRight } from "lucide-react";
import { Link } from "@/i18n/routing";

interface MenuRowProps {
  label: string;
  /** Праворуч: лічильник чи підпис; без нього — стрілка. */
  extra?: ReactNode;
  href?: string;
  onClick?: () => void;
}

const ROW = "flex min-h-12 w-full items-center justify-between gap-3 border-b border-[#F0F0F0] text-left text-base font-bold text-[#2E2E2E]";

/** Рядок меню: посилання або кнопка (відкрити вкладену панель) — виглядають однаково. */
export const MenuRow = ({ label, extra, href, onClick }: MenuRowProps) => {
  const tail = extra ?? <ChevronRight size={18} className="text-[#6B6B6B]" aria-hidden />;
  const content = (
    <>
      <span>{label}</span>
      <span className="text-sm font-bold text-[#6B6B6B]">{tail}</span>
    </>
  );

  return href ? (
    <Link href={href} prefetch={false} onClick={onClick} className={ROW}>
      {content}
    </Link>
  ) : (
    <button type="button" onClick={onClick} className={ROW}>
      {content}
    </button>
  );
};
