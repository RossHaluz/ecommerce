import Menu from "/public/images/menu.svg";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const MobileMenu = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <Menu />
      </SheetTrigger>
      <SheetContent side="left"></SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
