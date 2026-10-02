import Image from "next/image";
import { cn } from "@/lib/utils";

const LOGO_SRC = "/images/logo.webp";
const LOGO_WIDTH = 320;
const LOGO_HEIGHT = 167;

interface LogoProps {
  className?: string;
  /** Ширина, у якій лого показується; без неї Next віддає 640px для показу в 56px. */
  sizes?: string;
}

/**
 * Один дім для логотипа.
 *
 * Раніше його імпортували як SVG-компонент у трьох місцях, і @svgr інлайнив
 * розмітку прямо в HTML. Усередині тих SVG лежав PNG 1920×1000 у base64 —
 * 1.47 МБ на файл, тобто ~4.4 МБ у кожну сторінку. Тепер це звичайна картинка:
 * браузер тягне її один раз і кешує.
 */
const Logo = ({ className, sizes = "56px" }: LogoProps) => (
  <Image
    src={LOGO_SRC}
    width={LOGO_WIDTH}
    height={LOGO_HEIGHT}
    sizes={sizes}
    alt="Audiparts — запчастини до Audi"
    className={cn("object-contain", className)}
  />
);

export default Logo;
