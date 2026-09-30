"use client";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { MessagesSquareIcon, Phone, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { handleClickOutside } from "@/utils/click-outside";
import { useDispatch } from "react-redux";
import { handleIsShowScrollUp } from "@/redux/scroll-up/slice";
import CallMe from "./call-me/call-me";
import Image from "next/image";
import { useIsSmallScreen } from "@/hooks/useIsSmallScreen";
import { createPortal } from "react-dom";
import { useMounted } from "@/hooks/use-mounted";

const ContactsWidget = () => {
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);
  const [showMore, setShowMore] = useState("");
  const widgetRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const isMobile = useIsSmallScreen(1280);
  const t = useTranslations("a11y");
  const mounted = useMounted();

  useEffect(() => {
    window.addEventListener(
      "mousedown",
      handleClickOutside(widgetRef, setIsOpen)
    );

    return () =>
      window.removeEventListener(
        "mousedown",
        handleClickOutside(widgetRef, setIsOpen)
      );
  });

  useEffect(() => {
    if (window.scrollY > 200) {
      dispatch(handleIsShowScrollUp(true));
    } else {
      dispatch(handleIsShowScrollUp(false));
    }
  }, [isOpen, dispatch]);

  // Портал — віджет вставляється напряму в body
  const widget = (
    <>
      {/* Фон */}
      <div
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsOpen(false);
        }}
        className={cn(
          "fixed w-full h-full left-0 top-0 bg-[#00000066] z-[90] opacity-0 pointer-events-none transform transition-opacity duration-300",
          {
            "opacity-100 pointer-events-auto": isOpen,
          }
        )}
      ></div>

      {/* Сам віджет */}
      <div
        className={cn(
          "fixed right-8 lg:bottom-14 flex flex-col items-end gap-4 z-[100]",
          {
            "bottom-20": pathname === "/" || pathname.startsWith("/categories"),
            "bottom-16":
              pathname !== "/" && !pathname.startsWith("/categories"),
          }
        )}
        ref={widgetRef}
      >
        <div
          className={cn(
            "flex flex-col items-end gap-3 transform transition-all duration-300",
            {
              "opacity-0 translate-y-10 pointer-events-none": !isOpen,
              "opacity-100 translate-y-0": isOpen,
            }
          )}
        >
          {/* Viber */}
          <Link
            aria-label="Написати у Viber"
            href="https://invite.viber.com/?number=380673834283"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "group relative max-w-max flex items-center justify-end",
              { hidden: !isOpen }
            )}
            onMouseLeave={() => setShowMore("")}
          >
            <div
              className={cn(
                "flex items-center gap-2 max-w-max overflow-hidden rounded-lg transform transition-all p-1 pl-3",
                { "bg-white": showMore === "viber" || isMobile }
              )}
            >
              <span
                className={cn("transition-opacity duration-300", {
                  "opacity-100 pointer-events-auto":
                    showMore === "viber" || isMobile,
                  "opacity-0 pointer-events-none":
                    showMore !== "viber" && !isMobile,
                })}
              >
                Viber
              </span>
              <div className="relative w-12 h-12 rounded-full overflow-hidden">
                <Image
                  src="/images/viber.svg"
                  fill
                  objectFit="cover"
                  alt="Viber logo"
                  onMouseEnter={() => setShowMore("viber")}
                />
              </div>
            </div>
          </Link>

          {/* Telegram */}
          <Link
            aria-label="Написати у Telegram"
            href="https://t.me/LOVESQ7TDI"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "group relative max-w-max flex items-center justify-end",
              { hidden: !isOpen }
            )}
            onMouseLeave={() => setShowMore("")}
          >
            <div
              className={cn(
                "flex items-center gap-2 max-w-max overflow-hidden rounded-lg transform transition-all p-1 pl-3",
                { "bg-white": showMore === "telegram" || isMobile }
              )}
            >
              <span
                className={cn("transition-opacity duration-300", {
                  "opacity-100 pointer-events-auto":
                    showMore === "telegram" || isMobile,
                  "opacity-0 pointer-events-none":
                    showMore !== "telegram" && !isMobile,
                })}
              >
                Telegram
              </span>
              <div className="relative w-12 h-12 rounded-full overflow-hidden">
                <Image
                  src="/images/telegram-icon.svg"
                  fill
                  objectFit="cover"
                  alt="Telegram logo"
                  onMouseEnter={() => setShowMore("telegram")}
                />
              </div>
            </div>
          </Link>

          {/* CallMe */}
          <CallMe
            isOpen={isOpen}
            setShowMore={setShowMore}
            showMore={showMore}
            setIsOpen={setIsOpen}
          />

          {/* Телефон */}
          <Link
            href="tel:+380673834283"
            className={cn("group relative max-w-max flex items-center", {
              hidden: !isOpen,
            })}
            onMouseLeave={() => setShowMore("")}
          >
            <div
              className={cn(
                "flex items-center gap-2 max-w-max overflow-hidden rounded-lg transform transition-all p-1 pl-3",
                { "bg-white": showMore === "phone" || isMobile }
              )}
            >
              <span
                className={cn("transition-opacity duration-300", {
                  "opacity-100 pointer-events-auto":
                    showMore === "phone" || isMobile,
                  "opacity-0 pointer-events-none":
                    showMore !== "phone" && !isMobile,
                })}
              >
                (067) 383 42-83
              </span>
              <div
                className="h-12 w-12 p-3 bg-[#15b76c] rounded-full flex items-center justify-center transition-colors duration-300 group-hover:bg-[#13a25f]"
                onMouseEnter={() => setShowMore("phone")}
              >
                <Phone stroke="#fff" />
              </div>
            </div>
          </Link>
        </div>

        <Button
          aria-label={isOpen ? t("close") : t("openChat")}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((prev) => !prev)}
          className={cn(
            "p-3 rounded-full shadow-2xl border-none h-12 w-12 bg-[#c0092a] flex items-center justify-center group hover:bg-[#ffffff] transition-all duration-300",
            {
              "bg-[#ffffff]": isOpen,
              "pulse-wave": !isOpen,
            }
          )}
        >
          {isOpen ? (
            <X stroke="#929292" />
          ) : (
            <MessagesSquareIcon className="group-hover:stroke-[#c0092a]" />
          )}
        </Button>
      </div>
    </>
  );

  // typeof window дає null на сервері, але портал на першому клієнтському
  // рендері — розбіжність гідратації (#418) на кожній сторінці.
  if (!mounted) return null;
  return createPortal(widget, document.body);
};

export default ContactsWidget;
