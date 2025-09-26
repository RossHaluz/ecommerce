"use client";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { useParams, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { MessagesSquareIcon, Phone,  X } from "lucide-react";
import { handleClickOutside } from "@/utils/click-outside";
import { useDispatch } from "react-redux";
import { handleIsShowScrollUp } from "@/redux/scroll-up/slice";
import CallMe from "./call-me/call-me";
import Image from "next/image";
import { useIsSmallScreen } from "@/hooks/useIsSmallScreen";


const ContactsWidget = () => {
  const pathname = usePathname();
  const params = useParams();
  const isHomeOrCategoryPage =
    pathname.endsWith("/") ||
    pathname.includes("categories") ||
    params?.modelName;
  const isCheckout = pathname.includes("checkout");
  const [isOpen, setIsOpen] = useState(false);
  const [showMore, setShowMore] = useState('');
  const widgetRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const isMobile = useIsSmallScreen(1280);

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
  })

useEffect(() => {
  if (window.screenY > 200) {
    dispatch(handleIsShowScrollUp(true));
  } else {
    dispatch(handleIsShowScrollUp(false));
  }
}, [isOpen, dispatch]);


  return (
    <>
      <div
        className={cn(
          "fixed w-full h-full left-0 top-0 bg-[#00000066] z-40 opacity-0 pointer-events-none transform transition-opacity duration-300",
          {
            "opacity-1": isOpen,
            "pointer-events-none": !isOpen,
          }
        )}
      ></div>
      <div className="flex flex-col items-end gap-4 z-50" ref={widgetRef}>
        <div
          className={cn(
            "flex flex-col items-end gap-3 transform transition-all duration-300",
            {
              "opacity-0 translate-y-10 pointer-events-none": !isOpen,
              "opacity-100 translate-y-0": isOpen,
            }
          )}
        >
          <Link
            aria-label="Написати у Viber"
            href="https://invite.viber.com/?number=380673834283"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "group relative max-w-max flex items-center justify-end",
              {
                hidden: !isOpen,
              }
            )}
            onMouseLeave={() => setShowMore("")}
          >
            <div
              className={cn(
                "flex items-center gap-2 max-w-max overflow-hidden rounded-lg transform transition-all duration-30 p-1 pl-3",
                {
                  "bg-white": showMore === "viber" || isMobile,
                }
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
          <Link
            aria-label="Написати у Telegram"
            href="https://t.me/LOVESQ7TDI"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "group relative max-w-max flex items-center justify-end",
              {
                hidden: !isOpen,
              }
            )}
            onMouseLeave={() => setShowMore("")}
          >
            <div
              className={cn(
                "flex items-center gap-2 max-w-max overflow-hidden rounded-lg transform transition-all duration-30 p-1 pl-3",
                {
                  "bg-white": showMore === "telegram" || isMobile,
                }
              )}
            >
              <span
                className={cn(
                  "opacity-0 transform transition-all duration-300",
                  {
                    "opacity-100 pointer-events-auto":
                      showMore === "telegram" || isMobile,
                    "opacity-0 pointer-events-none":
                      showMore !== "telegram" && !isMobile,
                  }
                )}
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
          <CallMe
            isOpen={isOpen}
            setShowMore={setShowMore}
            showMore={showMore}
            setIsOpen={setIsOpen}
          />
          <Link
            href="tel:+380673834283"
            className={cn("group relative max-w-max flex items-center", {
              hidden: !isOpen,
            })}
            onMouseLeave={() => setShowMore("")}
          >
            <div
              className={cn(
                "flex items-center gap-2 max-w-max overflow-hidden rounded-lg transform transition-all duration-30 p-1 pl-3",
                {
                  "bg-white": showMore === "phone" || isMobile,
                }
              )}
            >
              <span
                className={cn(
                  "opacity-0 transform transition-all duration-300",
                  {
                    "opacity-1": showMore === "phone" || isMobile,
                    "opacity-0 pointer-events-none":
                      showMore !== "phone" && !isMobile,
                  }
                )}
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
          onClick={() => setIsOpen((prev) => !prev)}
          className={cn(
            "p-3 rounded-full shadow-2xl border-none h-12 w-12 bg-[#c0092a] border flex items-center justify-center group hover:bg-[#ffffff] transform transition-all duration-300",
            {
              hidden: isCheckout,
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
};

export default ContactsWidget;
