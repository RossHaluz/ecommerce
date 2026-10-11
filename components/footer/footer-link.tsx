import type { ReactNode } from "react";
import { Link } from "@/i18n/routing";

export const FOOTER_LINK = "flex h-10 items-center text-[15px] text-[#E4E4E4] hover:text-white md:h-auto md:text-sm";

export const FooterLink = ({ href, children }: { href: string; children: ReactNode }) => (
  <li>
    <Link href={href} className={FOOTER_LINK}>
      {children}
    </Link>
  </li>
);
