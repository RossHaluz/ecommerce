"use client";

import type { ReactNode } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Check } from "lucide-react";
import Logo from "@/components/ui/logo";
import { LoginBenefitsAside } from "./login-benefits-aside";
import { LoginCloseButton } from "./login-close-button";

interface LoginFrameProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  lead?: string;
  /** A small green confirmation above the title, e.g. «Номер підтверджено». */
  badge?: string;
  children: ReactNode;
}

/** Full screen on a phone (logo and ✕ on top); centred two-column window from `lg`, as in the mockup. */
export const LoginFrame = ({ open, onOpenChange, title, lead, badge, children }: LoginFrameProps) => (
  <Dialog.Root open={open} onOpenChange={onOpenChange}>
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 z-[110] bg-black/55" />
      <Dialog.Content
        aria-describedby={undefined}
        className="fixed inset-0 z-[110] flex flex-col overflow-y-auto bg-white text-[#2E2E2E] outline-none lg:inset-auto lg:left-1/2 lg:top-[110px] lg:grid lg:max-h-[calc(100vh-140px)] lg:w-[880px] lg:-translate-x-1/2 lg:grid-cols-[360px_minmax(0,1fr)] lg:overflow-hidden lg:rounded-[18px] lg:shadow-[0_24px_60px_rgba(0,0,0,.35)]"
      >
        <header className="flex h-[60px] shrink-0 items-center justify-between border-b border-[#EEEEEE] pl-4 pr-2 lg:hidden">
          <Logo tone="light" className="text-[22px]" />
          <LoginCloseButton />
        </header>
        <LoginBenefitsAside />
        <div className="relative flex flex-1 flex-col gap-4 px-4 pb-4 pt-6 lg:overflow-y-auto lg:px-10 lg:py-9">
          <LoginCloseButton className="absolute right-3 top-3 hidden lg:flex" />
          <div className="flex flex-col gap-1.5 lg:pr-8">
            {badge && (
              <span className="flex items-center gap-1.5 text-sm font-extrabold text-[#1E7B3C]">
                <Check size={16} strokeWidth={3} aria-hidden />
                {badge}
              </span>
            )}
            <Dialog.Title className="m-0 text-[26px] font-extrabold leading-8 lg:text-[28px]">{title}</Dialog.Title>
            {lead && <p className="m-0 text-[15px] leading-[21px] text-[#5C5C5C]">{lead}</p>}
          </div>
          {children}
        </div>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);
