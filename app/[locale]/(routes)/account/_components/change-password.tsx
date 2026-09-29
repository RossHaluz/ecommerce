"use client";
import { Button } from "@/components/ui/button";
import ArrowDown from "/public/images/arrow-down.svg";
import { Dispatch, FC, SetStateAction } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ChangePasswordForm from "./change-password-form";

interface ChangePasswordProps {
  token: string;
  activeNavigation: string;
  setActiveNavigation: Dispatch<SetStateAction<string>>;
}

const ChangePassword: FC<ChangePasswordProps> = ({
  token,
  activeNavigation,
  setActiveNavigation,
}) => {
  return (
    <div className="flex flex-col gap-3">
      <Button
        onClick={() => setActiveNavigation("change-password")}
        variant="ghost"
        className={`p-0 flex items-center justify-between text-[#484848] ${
          activeNavigation === "change-password" ? "font-bold" : "font-semibold"
        }`}
      >
        Змінити пароль
        <ArrowDown
          className={`stroke-[#484848] ${
            activeNavigation === "change-password" && "rotate-180"
          } transform transition-all duration-150 lg:hidden`}
        />
      </Button>

      <AnimatePresence initial={false}>
        {activeNavigation === "change-password" && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "100%", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "linear" }}
          >
            <ChangePasswordForm token={token} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChangePassword;
