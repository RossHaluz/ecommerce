import { initials } from "../model/order-format";

interface AccountIdentityProps {
  firstName: string;
  lastName: string;
  phone: string;
}

export const AccountIdentity = ({ firstName, lastName, phone }: AccountIdentityProps) => (
  <div className="flex items-center gap-3 rounded-[14px] bg-white p-4">
    <span
      aria-hidden
      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#2E2E2E] text-lg font-extrabold text-white"
    >
      {initials(firstName, lastName)}
    </span>
    <span className="flex min-w-0 flex-col">
      <strong className="truncate text-base">{`${firstName} ${lastName}`.trim()}</strong>
      <span className="text-[13px] text-[#6B6B6B]">{phone}</span>
    </span>
  </div>
);
