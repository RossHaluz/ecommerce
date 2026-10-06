import type { FC, ReactNode } from "react";

interface ContactBlockProps {
  title: string;
  icon: ReactNode;
  children: ReactNode;
}

export const ContactBlock: FC<ContactBlockProps> = ({ title, icon, children }) => (
  <div className="flex flex-col gap-[13px]">
    <h2 className="text-[#484848] font-bold text-base">{title}</h2>
    <div className="flex items-start gap-[10px]">
      {icon}
      {children}
    </div>
  </div>
);
