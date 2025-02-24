"use client";
import { Button } from "@/components/ui/button";
import ArrowDown from "/public/images/arrow-down.svg";
import { Dispatch, FC, SetStateAction } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HistoryOrdersList from "./history-orders-list";

interface HistoryOrdersProps {
  ordersByUser: {
    id: string;
    city: string;
    firstName: string;
    lastName: string;
    phone: string;
    paymentMethod: string;
    orderNumber: string;
    postService: string;
    orderType: string;
    dropshipDetails: {
      clientFirstName: string;
      clientLastName: string;
      clientPhone: string;
    };
    separation: string;
    address: string;
    typeDelivary: string;
    createdAt: string;
    orderItems: any[];
  }[];
  activeNavigation: string;
  setActiveNavigation: Dispatch<SetStateAction<string>>;
}

const HistoryOrders: FC<HistoryOrdersProps> = ({
  ordersByUser,
  activeNavigation,
  setActiveNavigation,
}) => {
  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:gap-[103px]">
      <Button
        onClick={() => setActiveNavigation("history")}
        variant="ghost"
        className={`p-0 flex items-center justify-between text-[#484848] ${
          activeNavigation === "history" ? "font-bold" : "font-semibold"
        }`}
      >
        Історія замовлень
        <ArrowDown
          className={`${
            activeNavigation === "history" && "rotate-180"
          } transform transition-all duration-150 lg:hidden stroke-[#484848]`}
        />
      </Button>

      <AnimatePresence initial={false}>
        {activeNavigation === "history" && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "100%", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "linear" }}
          >
            <HistoryOrdersList ordersByUser={ordersByUser} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HistoryOrders;
