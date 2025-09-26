import { Dispatch, SetStateAction } from "react";

export const handleClickOutside = (
  ref: React.RefObject<HTMLDivElement>,
  settel: Dispatch<SetStateAction<boolean>>
) => {
  return (e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      settel(false);
    }
  };
};
