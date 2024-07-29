import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AddressDelivary = () => {
  return (
    <div className="flex flex-col gap-[15px]">
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Виберіть місто" />
        </SelectTrigger>
        <SelectContent className="bg-white">
          <SelectItem value="khmelnytsky" className=" cursor-pointer">
            Хмельницький
          </SelectItem>
          <SelectItem value="kyiv" className=" cursor-pointer">
            Київ
          </SelectItem>
          <SelectItem value="vinnitsa" className=" cursor-pointer">
            Вінниця
          </SelectItem>
        </SelectContent>
      </Select>

      <Input
        placeholder="Видіть адресу"
        className="border border-solid border-[#7FAA84] bg-transparent rounded-[5px]"
      />
    </div>
  );
};

export default AddressDelivary;
