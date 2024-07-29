import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SeparationDelivary = () => {
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

      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Виберіть відділення" />
        </SelectTrigger>
        <SelectContent className="bg-white">
          <SelectItem value="vidilenya_1" className=" cursor-pointer">
            Відділення №1
          </SelectItem>
          <SelectItem value="vidilenya_2" className=" cursor-pointer">
            Відділення №2
          </SelectItem>
          <SelectItem value="vidilenya_3" className=" cursor-pointer">
            Відділення №3
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SeparationDelivary;
