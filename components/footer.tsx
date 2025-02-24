"use client";
import { CopyrightIcon, PhoneIcon } from "lucide-react";
import Logo from "/public/images/logo-header.svg";
import Telegram from "/public/images/telegram-icon.svg";
import Viber from "/public/images/viber-icon.svg";
import ArrowDown from "/public/images/arrow-down.svg";
import { Button } from "./ui/button";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useSelector } from "react-redux";
import { selectCategories } from "@/redux/categories/selectors";
import { usePathname } from "next/navigation";

const Footer = () => {
  const categories = useSelector(selectCategories);
  const [isShowCategories, setIsShowCategories] = useState(false);
  const [isShowPhoneNumbers, setIsShowPhoneNumbers] = useState(false);
  const [isShowInfo, setIsShowInfo] = useState(false);
  const categoriesRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const isHomePage = pathname === "/" || pathname.startsWith("/categories");
  const numbersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.addEventListener("mousedown", clickOutsidePhoneNumbers);

    return () => {
      window.removeEventListener("mousedown", clickOutsidePhoneNumbers);
    };
  }, []);

  const clickOutsidePhoneNumbers = (e: MouseEvent) => {
    if (numbersRef.current && !numbersRef.current.contains(e.target as Node)) {
      setIsShowPhoneNumbers(false);
    }
  };

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
              <div className="flex items-center gap-2">
                <PhoneIcon className="stroke-[#FFFDFD]" />
                <div className="relative" ref={numbersRef}>
                  <Button
                    variant="ghost"
                    onClick={() => setIsShowPhoneNumbers((prev) => !prev)}
                    className="p-0 flex items-center gap-2 text-[16px] leading-[19.5px] font-medium"
                  >
                    +38 (067) 383 42 83
                    <ArrowDown
                      className={cn(
                        "stroke-[#FFFDFD] transform transition-all duration-300",
                        {
                          "rotate-180": isShowPhoneNumbers,
                        }
                      )}
                    />
                  </Button>

                  <div
                    className={cn(
                      "bg-[#FFFDFD] rounded-md shadow-md absolute top-full left-0 p-4 origin-top scale-y-0 transform transition-all duration-300 border z-50 w-max flex flex-col gap-4",
                      {
                        "scale-y-100": isShowPhoneNumbers,
                      }
                    )}
                  >
                    <Link
                      href="tel:+380673834283"
                      className="text-[#111111] text-[16px] leading-[19.5px]"
                    >
                      +38 (067) 383 42 83 - Ігор
                    </Link>
                    <Link
                      href="tel:+380965722060"
                      className="text-[#111111] text-[16px] leading-[19.5px]"
                    >
                      +38 (096) 572 20 60 - Іван
                    </Link>

                    <Link
                      href="tel:+380979104659"
                      className="text-[#111111] text-[16px] leading-[19.5px]"
                    >
                      +38 (097) 910 46 59 - Богдан
                    </Link>
                  </div>
                </div>
              </div>
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
                (
                  item: { id: string; name: string; category_name: string },
                  index: number
                ) => {
                  if (index > 3) {
                    return;
                  }

                  return (
                    <Link
                      href={`/categories/${item?.category_name}`}
                      key={item?.id}
                    >
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
                (
                  item: { id: string; name: string; category_name: string },
                  index: number
                ) => {
                  if (index > 3) {
                    return;
                  }

                  return (
                    <li key={item?.id}>
                      <Link href={`/categories/${item?.category_name}`}>
                        {item?.name}
                      </Link>
                    </li>
                  );
                }
              )}
            </ul>
            {categories && categories?.length > 3 && (
              <Link
                aria-label="Переглфнути усі товари"
                href="/categories"
                className="underline font-bold"
              >
                Переглянути усі
              </Link>
            )}
          </div>
          {/* Catalog end  */}

          {/* Info start  */}
          <div className="mb-6 md:hidden">
            <Button
              aria-label="Інформація"
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
              <Link href="/contacts" aria-label="Контакти">
                Контакти
              </Link>
              <Link href="/about-us" aria-label="Про нас">
                Про нас
              </Link>
              <Link href="/delivary-payment" aria-label="Доставка та оплата">
                Доставка та оплата
              </Link>
            </div>
          </div>

          <div className="hidden md:flex flex-col gap-6">
            <div className="flex flex-col gap-5">
              <h3 className="text-[24px] leading-[33.6px]"> Інформація</h3>
              <ul className="flex flex-col gap-5 text-current">
                <li>
                  <Link href="/contacts" aria-label="Контакти">
                    Контакти
                  </Link>
                </li>
                <li>
                  <Link href="/about-us" aria-label="Про нас">
                    Про нас
                  </Link>
                </li>
                <li>
                  <Link
                    href="/delivary-payment"
                    aria-label="Доставка та оплата"
                  >
                    Доставка та оплата
                  </Link>
                </li>
              </ul>
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="text-[24px] leading-[33.6px]">Соціальні мережі</h3>
              <div className="flex items-center gap-6">
                <a
                  aria-label="Написати у Viber"
                  href="https://invite.viber.com/?number=380673834283"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-auto"
                >
                  <Viber />
                </a>
                <a
                  aria-label="Написати у Telegram"
                  href="https://t.me/+380673834283"
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
              aria-label="Написати у Viber"
              href="https://invite.viber.com/?number=380673834283"
              target="_blank"
              rel="noopener noreferrer"
              className="h-auto"
            >
              <Viber />
            </a>
            <a
              aria-label="Написати у Telegram"
              href="https://t.me/+380673834283"
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
                Розробка сайту -{" "}
                <a
                  aria-label="Розробник сайту"
                  href="https://t.me/rosshaluzinskyi"
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
