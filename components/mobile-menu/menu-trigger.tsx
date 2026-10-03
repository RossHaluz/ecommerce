import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";

/** Пункт нижньої панелі, що відкриває мобільне меню на потрібній панелі. */
export const MenuTrigger = ({ icon, label, onClick }: { icon: ReactNode; label: string; onClick: () => void }) => (
  <Button
    variant="ghost"
    onClick={onClick}
    className="p-0 h-auto hover:bg-transparent flex flex-col items-center gap-1 text-[8px] leading-[9.75px] font-medium"
  >
    {icon}
    {label}
  </Button>
);
