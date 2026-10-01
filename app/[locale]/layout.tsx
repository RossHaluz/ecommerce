import type { Metadata } from "next";
import { Mulish } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";
import { GoogleAnalytics } from "@next/third-parties/google";
import { ToastContainer } from "react-toastify";
import { HydrationBoundary } from "@tanstack/react-query";

import "../globals.css";
import "react-toastify/dist/ReactToastify.css";

import Header from "@/components/header";
import Footer from "@/components/footer";
import ProviderWrapper from "@/redux/provider";
import ReactQueryProvider from "@/components/react-query-provider";
import ScrollToTop from "@/components/scroll-to-top";
import ScrollUp from "@/components/scroll-up";
import ContactsWidget from "@/components/contacts-widget";
import { prefetchCatalog } from "@/features/catalog/prefetch-catalog";
import {
  DEFAULT_LOCALE,
  LOCALES,
  LOCALE_HTML_LANG,
  isLocale,
  type Locale,
} from "@/i18n/locales";

const mulish = Mulish({ subsets: ["latin", "cyrillic"] });

const SITE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://audiparts.com.ua";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

/**
 * hreflang будується з LOCALES, а не перелічується руками.
 *
 * `x-default` вказує на українську версію: вона на корені, тому саме її Google
 * має показувати відвідувачу, чия мова не збігається ні з якою нашою.
 */
export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const locale = isLocale(params.locale) ? params.locale : DEFAULT_LOCALE;
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    metadataBase: new URL(SITE_URL),
    title: t("defaultTitle"),
    description: t("defaultDescription"),
    // canonical/hreflang/og:url — лише в сторінках (buildAlternates): layout не
    // знає шляху, і раніше всі сторінки оголошували себе копією головної.
    icons: { icon: "/favicon.ico" },
    openGraph: {
      type: "website",
      siteName: t("siteName"),
      title: t("defaultTitle"),
      description: t("defaultDescription"),
      locale: LOCALE_HTML_LANG[locale].replace("-", "_"),
    },
    twitter: { card: "summary_large_image" },
  };
}

const LocaleLayout = async ({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) => {
  if (!isLocale(params.locale)) notFound();

  const locale = params.locale as Locale;
  setRequestLocale(locale);
  const [messages, catalogState] = await Promise.all([
    getMessages(),
    prefetchCatalog(),
  ]);

  return (
    <html lang={LOCALE_HTML_LANG[locale]}>
      <body className={mulish.className}>
        <NextIntlClientProvider messages={messages}>
          <ProviderWrapper>
            <ReactQueryProvider>
              <HydrationBoundary state={catalogState}>
                <ScrollToTop />
                <ScrollUp />
                <ContactsWidget />

                <Header />
                <main>{children}</main>
                <Footer />
                <ToastContainer />
              </HydrationBoundary>
            </ReactQueryProvider>
          </ProviderWrapper>
        </NextIntlClientProvider>
      </body>
      <GoogleAnalytics gaId="G-B4KDN9DYQQ" />
    </html>
  );
};

export default LocaleLayout;
