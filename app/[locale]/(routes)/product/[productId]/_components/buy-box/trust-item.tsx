import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

/** One reason not to worry: an icon and a line, which may be a link or a button. */
export const TrustItem = ({ Icon, children }: { Icon: LucideIcon; children: ReactNode }) => (
  <li className="flex items-start gap-2.5">
    <Icon size={20} strokeWidth={1.8} className="shrink-0" aria-hidden />
    {children}
  </li>
);
