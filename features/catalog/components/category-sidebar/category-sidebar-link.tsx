import { ChevronRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";

interface CategorySidebarLinkProps {
  href: string;
  label: string;
  isActive: boolean;
  hasChildren?: boolean;
  isChild?: boolean;
}

export const CategorySidebarLink = ({ href, label, isActive, hasChildren, isChild }: CategorySidebarLinkProps) => (
  <Link
    href={href}
    aria-current={isActive ? "page" : undefined}
    className={cn(
      "flex min-h-[40px] items-center justify-between gap-2 rounded-lg py-2 text-[15px] leading-snug",
      isChild ? "pl-6 pr-3 text-[14px]" : "px-3",
      isActive ? "bg-[#2E2E2E] font-extrabold text-white" : "text-[#2E2E2E] hover:bg-[#F2F2F2]"
    )}
  >
    {label}
    {hasChildren && <ChevronRight size={16} className="shrink-0 opacity-50" aria-hidden />}
  </Link>
);
