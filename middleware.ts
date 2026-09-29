import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Пропускаємо статику, службові маршрути Next і файли, які мусять лишатись
  // на корені: robots.txt, sitemap.xml і верифікація Google.
  matcher: [
    "/((?!api|_next|_vercel|robots.txt|sitemap.xml|favicon.ico|images|.*\\..*).*)",
  ],
};
