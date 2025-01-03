"use client";
import { Button } from "@/components/ui/button";
import ArrowDown from "/public/images/arrow-down.svg";
import { Dispatch, FC, SetStateAction, useState } from "react";
import PersonalDataForm from "./personal-data-form";
import { motion, AnimatePresence } from "framer-motion";

interface PersonalDataProps {
  user: {
    _id: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    avatar: string;
    token: string;
  };
  activeNavigation: string;
  setActiveNavigation: Dispatch<SetStateAction<string>>; 
}

const PersonalData: FC<PersonalDataProps> = ({ user, activeNavigation, setActiveNavigation }) => {
  return (
    <div className="flex flex-col gap-3">
      <Button
        onClick={() => setActiveNavigation("personal-data")}
        variant="ghost"
        className={`p-0 flex items-center justify-between text-[#484848] ${
          activeNavigation === "personal-data" ? "font-bold" : "font-semibold"
        }`}
      >
        Особисті дані
        <ArrowDown
          className={`${
            activeNavigation === "personal-data" && "rotate-180"
          } stroke-[#484848] transform transition-all duration-150 lg:hidden`}
        />
      </Button>

      <AnimatePresence initial={false}>
        {activeNavigation === "personal-data" && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "100%", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "linear" }}
          >
            <PersonalDataForm user={user} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PersonalData;
