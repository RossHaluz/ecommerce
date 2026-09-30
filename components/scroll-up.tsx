"use client";
import { ChevronUp } from "lucide-react";
import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { useDispatch } from "react-redux";
import { handleIsShowScrollUp } from "@/redux/scroll-up/slice";
import { useSelector } from "react-redux";
import { selectIsShow } from "@/redux/scroll-up/selectors";

const ScrollUp = () => {
 const dispatch = useDispatch();
 const isShow = useSelector(selectIsShow);
 const t = useTranslations("a11y");

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 200) {
        dispatch(handleIsShowScrollUp(true));
      } else {
         dispatch(handleIsShowScrollUp(false));
      }
    };

    window.addEventListener("scroll", toggleVisibility, { passive: true });

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, [dispatch]);

  const handleScrollUp = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Button
      type="button"
      aria-label={t("scrollToTop")}
      onClick={handleScrollUp}
      className={cn('fixed group right-8 bottom-36 lg:bottom-32  z-[11] h-12 w-12 p-3 rounded-full cursor-pointer shadow-custom-shadow bg-[#ffffff]  text-[#303030] border-none transition-all duration-300 flex items-center justify-center', {
        "opacity-100 translate-y-0": isShow,
        "opacity-0 translate-y-10 pointer-events-none": !isShow
      })}
    >
      <ChevronUp size={36} className=" group-hover:stroke-white" />
    </Button>
  );
};

export default ScrollUp;
