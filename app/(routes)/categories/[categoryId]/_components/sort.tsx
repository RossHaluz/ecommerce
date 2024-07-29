import { Button } from "@/components/ui/button";
import Sort from "/public/images/sort.svg";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SortProducts = () => {
  return (
    <Select>
      <SelectTrigger className="w-full lg:w-[195px] bg-[#EAF2EB]">
        <SelectValue placeholder="Сортування" />
      </SelectTrigger>
      <SelectContent className="bg-[#EAF2EB]">
        <SelectItem value="light">За популярністю</SelectItem>
        <SelectItem value="dark">Від дешевших</SelectItem>
        <SelectItem value="system">Від дорожчих</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default SortProducts;
