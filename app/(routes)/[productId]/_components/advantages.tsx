import Box from "/public/images/box.svg";
import Refresh from "/public/images/refresh.svg";
import Credit from "/public/images/credit.svg";

const Advantages = () => {
  return (
    <div className="p-[15px] bg-[#EAF2EB] md:bg-transparent md:grid-cols-2 lg:grid-cols-3 rounded-[5px] grid grid-cols-1 gap-6 lg:gap-[30px] pb-[30px]">
      <div className="flex items-center gap-[15px] md:bg-[#EAF2EB] p-[15px] md:rounded-md">
        <div className="max-w-max">
          <Box />
        </div>
        <p className="text-[#484848] text-sm">
          Безкоштовна доставка при замовленні на суму від 2000 грн
        </p>
      </div>
      <div className="flex items-center gap-[15px] md:bg-[#EAF2EB] p-[15px] md:rounded-md">
        <div className="max-w-max">
          <Refresh />
        </div>
        <p className="text-[#484848] text-sm">
          Гарантія обміну чи повернення протягом 14 днів
        </p>
      </div>
      <div className="flex items-center gap-[15px] md:bg-[#EAF2EB] p-[15px] md:rounded-md">
        <div className="max-w-max">
          <Credit />
        </div>
        <p className="text-[#484848] text-sm">
          Безпечна online-оплата на сайті через сервіс LiqPay
        </p>
      </div>
    </div>
  );
};

export default Advantages;