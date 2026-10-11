import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  /** dark — на темній шапці й футері; light — на білому (мобільне меню). */
  tone?: "dark" | "light";
}

// На темному #484848 фірмовий #C0092A майже не видно — світліший червоний.
const TONES = {
  dark: { audi: "text-white", parts: "text-[#F2364D]" },
  light: { audi: "text-[#2E2E2E]", parts: "text-[#C0092A]" },
} as const;

/**
 * Текстовий логотип замість картинки з кільцями Audi (чужий товарний знак).
 * Без файлу: нічого не вантажиться, і він не може «з'їсти» LCP.
 */
const Logo = ({ className, tone = "dark" }: LogoProps) => (
  <span className={cn("inline-block whitespace-nowrap text-2xl font-extrabold leading-none tracking-[-0.01em]", className)}>
    <span className={TONES[tone].audi}>Audi</span>
    <span className={TONES[tone].parts}>Parts</span>
  </span>
);

export default Logo;
