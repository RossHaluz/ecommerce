import type { ReactNode } from "react";

interface SectionCardProps {
  step: number;
  title: string;
  /** Праворуч від заголовка на комп'ютері, під ним на телефоні (напр. «Вже купували? Увійти»). */
  aside?: ReactNode;
  children: ReactNode;
}

/** Крок оформлення: номер у колі, заголовок, вміст. */
export const SectionCard = ({ step, title, aside, children }: SectionCardProps) => (
  <section className="flex flex-col gap-3 rounded-xl bg-white p-4 lg:p-6" aria-labelledby={`checkout-step-${step}`}>
    <div className="flex flex-col gap-1.5 lg:flex-row lg:items-center lg:justify-between">
      <h2 id={`checkout-step-${step}`} className="m-0 flex items-center gap-2.5 text-lg font-extrabold text-[#2E2E2E] lg:text-xl">
        <span aria-hidden className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#2E2E2E] text-sm text-white">
          {step}
        </span>
        {title}
      </h2>
      {aside}
    </div>
    {children}
  </section>
);
