import Image from "next/image";
import { cn } from "@/lib/utils";

const LOGO_SRC = "/images/logo.webp";
const LOGO_WIDTH = 320;
const LOGO_HEIGHT = 167;

interface LogoProps {
  className?: string;
  priority?: boolean;
}

/**
 * Один дім для логотипа.
 *
 * Раніше його імпортували як SVG-компонент у трьох місцях, і @svgr інлайнив
 * розмітку прямо в HTML. Усередині тих SVG лежав PNG 1920×1000 у base64 —
 * 1.47 МБ на файл, тобто ~4.4 МБ у кожну сторінку. Тепер це звичайна картинка:
 * браузер тягне її один раз і кешує.
 */
const Logo = ({ className, priority = false }: LogoProps) => (
  <Image
    src={LOGO_SRC}
    width={LOGO_WIDTH}
    height={LOGO_HEIGHT}
    priority={priority}
    alt="Audiparts — запчастини до Audi"
    className={cn("object-contain", className)}
  />
);

export default Logo;
