import type { ReactNode } from "react";
import { AccountIdentity } from "./account-identity";
import { AccountNav } from "./account-nav";

interface AccountShellProps {
  firstName: string;
  lastName: string;
  phone: string;
  children: ReactNode;
}

/** The sidebar is desktop only: on a phone the overview itself is the menu, as in the mockup. */
export const AccountShell = ({ firstName, lastName, phone, children }: AccountShellProps) => (
  <div className="bg-[#F2F2F2] text-[#2E2E2E]">
    <div className="container grid grid-cols-1 items-start gap-5 py-4 lg:grid-cols-[280px_minmax(0,1fr)] lg:py-5">
      <aside className="hidden flex-col gap-3 lg:flex">
        <AccountIdentity firstName={firstName} lastName={lastName} phone={phone} />
        <AccountNav />
      </aside>
      <main className="flex min-w-0 flex-col gap-3 lg:gap-[18px]">{children}</main>
    </div>
  </div>
);
