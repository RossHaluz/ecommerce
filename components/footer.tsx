"use client";
import { CopyrightIcon } from "lucide-react";
import Logo from "/public/images/logo-header.svg";
import Telegram from "/public/images/telegram-icon.svg";
import Viber from "/public/images/viber-icon.svg";
import ArrowDown from "/public/images/arrow-down.svg";
import { Button } from "./ui/button";
import { useRef, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useSelector } from "react-redux";
import { selectCategories } from "@/redux/categories/selectors";
import { usePathname } from "next/navigation";

const Footer = () => {
  const categories = useSelector(selectCategories);
  const [isShowCategories, setIsShowCategories] = useState(false);
  const [isShowInfo, setIsShowInfo] = useState(false);
  const categoriesRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const isHomePage = pathname === "/" || pathname.startsWith("/categories");

  return (
    <footer className="bg-[#484848] text-[#FFFDFD] overflow-hidden">
      <div
        className={cn(
          "container pt-6 pb-20 lg:py-12 flex flex-col gap-[15px]",
          {
            "pb-6": !isHomePage,
          }
        )}
      >
        <div className="md:flex justify-between md:gap-8 lg:gap-[90px]">
          {/* Contact info start */}
          <div className="flex flex-col gap-[10px] mb-[15px] items-start">
            <Logo />
            <div className="flex flex-col gap-[15px]">
              <a
                href="tel:+380964009130"
                className="font-semibold text-sm text-current"
              >
                +38 (096) 400 91 30
              </a>
              <address className="text-current text-xs">
                Адреса: м. Хмельницький, вул. Молодіжна 15/1
              </address>
              <p className="text-current text-xs">
                пн-сб 10:00 - 18:00 нд - вихідний
              </p>
            </div>
          </div>
          {/* Contact info end */}

          {/* Catalog start  */}
          <div className="mb-6 md:hidden">
            <Button
              className="font-semibold text-sm p-0 h-auto md:hidden mb-[15px] flex items-center justify-between w-full"
              variant="ghost"
              onClick={() => setIsShowCategories((prev) => !prev)}
            >
              Каталог товарів
              <ArrowDown
                className={cn(
                  "stroke-current transform transition-all duration-300",
                  {
                    "rotate-180": isShowCategories,
                  }
                )}
              />
            </Button>

            <div
              ref={categoriesRef}
              className={cn(
                "flex-col gap-[15px] transform transition-all duration-300 overflow-hidden text-current scale-y-0 origin-top hidden",
                {
                  "scale-y-100 flex": isShowCategories,
                }
              )}
            >
              {categories?.map(
                (item: { id: string; name: string }, index: number) => {
                  if (index > 3) {
                    return;
                  }

                  return (
                    <Link href={`/categories/${item?.id}`} key={item?.id}>
                      {item?.name}
                    </Link>
                  );
                }
              )}
              {categories && categories?.length > 3 && (
                <Link
                  href="/categories"
                  className="underline font-medium text-[#c0092a]"
                >
                  Переглянути усі
                </Link>
              )}
            </div>
          </div>

          <div className="hidden md:flex flex-col gap-5">
            <h3 className="text-sm font-semibold md:text-[24px] md:leading-[33.6px] hidden md:inline-block">
              {" "}
              Каталог товарів
            </h3>
            <ul className="flex flex-col gap-5 text-current">
              {categories?.map(
                (item: { id: string; name: string }, index: number) => {
                  if (index > 3) {
                    return;
                  }

                  return (
                    <li key={item?.id}>
                      <Link href={`/categories/${item?.id}`}>{item?.name}</Link>
                    </li>
                  );
                }
              )}
            </ul>
            {categories && categories?.length > 3 && (
              <Link
                href="/categories"
                className="underline font-medium text-[#c0092a]"
              >
                Переглянути усі
              </Link>
            )}
          </div>
          {/* Catalog end  */}

          {/* Info start  */}
          <div className="mb-6 md:hidden">
            <Button
              className="font-semibold text-sm p-0 h-auto md:hidden mb-[15px]  flex items-center justify-between w-full"
              variant="ghost"
              onClick={() => setIsShowInfo((prev) => !prev)}
            >
              Інформація
              <ArrowDown
                className={cn(
                  "stroke-current transform transition-all duration-300",
                  {
                    "rotate-180": isShowInfo,
                  }
                )}
              />
            </Button>
            <div
              className={cn(
                "flex-col gap-[15px] transform transition-max-height duration-300 overflow-hidden text-current scale-y-0 origin-top hidden",
                {
                  "scale-y-100 flex": isShowInfo,
                }
              )}
            >
              <Link href="/contacts">Контакти</Link>
              <Link href="/about-us">Про нас</Link>
              <Link href="/reviews">Відгуки</Link>
              <Link href="/delivary-payment">Доставка та оплата</Link>
            </div>
          </div>

          <div className="hidden md:flex flex-col gap-6">
            <div className="flex flex-col gap-5">
              <h3 className="text-[24px] leading-[33.6px]"> Інформація</h3>
              <ul className="flex flex-col gap-5 text-current">
                <li>
                  <Link href="/contacts">Контакти</Link>
                </li>
                <li>
                  <Link href="/about-us">Про нас</Link>
                </li>
                <li>
                  <Link href="/reviews">Відгуки</Link>
                </li>
                <li>
                  <Link href="/delivary-payment">Доставка та оплата</Link>
                </li>
              </ul>
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="text-[24px] leading-[33.6px]">Соціальні мережі</h3>
              <div className="flex items-center gap-6">
                <a
                  href="/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-auto"
                >
                  <Viber />
                </a>
                <a
                  href="/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-auto"
                >
                  <Telegram />
                </a>
              </div>
            </div>
          </div>
          {/* Info end  */}

          {/* Soacials start */}

          <div className="flex items-center justify-center gap-4 md:hidden">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="h-auto"
            >
              <Viber />
            </a>
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="h-auto"
            >
              <Telegram />
            </a>
          </div>

          {/* Soacials end */}
        </div>

        {/* Copyright start */}
        <div className="flex flex-col gap-[15px] md:gap-12">
          <div className="w-full h-[1px] bg-[#FFFDFD4D]" />
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-[10px] text-xs md:text-[14px] md:leading-[17.07px]">
              <CopyrightIcon className="w-4 h-4" />
              2020 Audiparts права захищені
            </div>
            <div className="flex flex-col gap-2 lg:flex-row lg:gap-16 text-xs md:text-[14px] md:leading-[17.07px]">
              <p className="text-right text-current">
                Дизайн сайту -{" "}
                <a
                  href="https://hiweber.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-current underline"
                >
                  Anastasiia Reiman
                </a>
              </p>
              <p className="text-right text-current">
                Розробка сайту -{" "}
                <a
                  href="https://hiweber.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-current underline"
                >
                  Rostyslav Haluzinskiy
                </a>
              </p>
            </div>
          </div>
        </div>
        {/* Copyright end */}
      </div>
    </footer>
  );
};

export default Footer;
