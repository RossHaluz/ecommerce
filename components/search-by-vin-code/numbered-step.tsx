import type { ReactNode } from "react";

/** Крок форми з номером у колі — щоб форма читалась як «1, 2, 3», а не стіна полів. */
export const NumberedStep = ({ n, children }: { n: number; children: ReactNode }) => (
  <div className="flex items-start gap-3">
    <span aria-hidden className="w-9 h-9 shrink-0 rounded-full bg-[#C0092A] text-white flex items-center justify-center">
      {n}
    </span>
    {children}
  </div>
);
