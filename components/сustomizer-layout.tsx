"use client";
import React from "react";
import { Button } from "./ui/button";
import { LayoutGrid, List } from "lucide-react";
import { useDispatch } from "react-redux";
import { setCurrentCustomizer } from "@/redux/customizer/slice";
import { useSelector } from "react-redux";
import { selectCurrentCustomizer } from "@/redux/customizer/selectors";

const CustomizerLayout = () => {
  const currentCustomizer = useSelector(selectCurrentCustomizer);
  const dispatch = useDispatch();

  const handleSelectCustomizer = (customizer: string) => {
    dispatch(setCurrentCustomizer(customizer));
  };

  return (
    <div className="flex items-center gap-4">
      <Button
        variant="ghost"
        size="reset"
        onClick={() => handleSelectCustomizer("grid")}
      >
        <LayoutGrid
          color={currentCustomizer === "grid" ? "#AA0A27" : "#111111"}
        />
      </Button>

      <Button
        variant="ghost"
        size="reset"
        onClick={() => handleSelectCustomizer("list")}
      >
        <List color={currentCustomizer === "list" ? "#AA0A27" : "#111111"} />
      </Button>
    </div>
  );
};

export default CustomizerLayout;
