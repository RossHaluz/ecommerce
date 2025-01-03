import Phone from "/public/images/phone.svg";
import Time from "/public/images/time.svg";
import Message from "/public/images/message.svg";
import Address from "/public/images/address.svg";
import Instagram from "/public/images/instagram.svg";
import Facebook from "/public/images/facebook.svg";
import Telegram from "/public/images/telegram.svg";

const Contacts = () => {
  return (
    <div className="flex flex-col gap-[30px]">
      <div className="flex flex-col gap-[13px]">
        <h3 className="text-[#484848] font-bold">Телефон:</h3>
        <div className="flex items-center gap-[10px]">
          <Phone className="fill-[#c0092a]" />
          <a href="tel:++380964009130" className="text-[#484848] underline">
            +38 (096) 400 91 30
          </a>
        </div>
      </div>

      <div className="flex flex-col gap-[13px]">
        <h3 className="text-[#484848] font-bold">Графік роботи:</h3>
        <div className="flex items-start gap-[10px]">
          <Time className="fill-[#c0092a]" />
          <p className="text-[#484848]">
            ПН - ПТ: з 10:00 до 18:00
            <br /> СБ - НД: вихідний
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-[13px]">
        <h3 className="text-[#484848] font-bold">Email:</h3>
        <div className="flex items-start gap-[10px]">
          <Message />
          <a href="mailto:info@koaladream.com.ua" className="text-[#484848]">
            info@koaladream.com.ua
          </a>
        </div>
      </div>

      <div className="flex flex-col gap-[13px]">
        <h3 className="text-[#484848] font-bold">Адреса:</h3>
        <div className="flex items-start gap-[10px]">
          <Address />
          <address className="text-[#484848] not-italic">
            Адреса: м. Хмельницький,
            <br /> вул. Молодіжна 15/1
          </address>
        </div>
      </div>

      <div className="flex flex-col gap-[13px]">
        <h3 className="text-[#484848] font-bold">Слідкуйте за нами</h3>
        <div className="flex items-center gap-5">
          <a
            href="https://www.instagram.com/audi_parts_khm?igsh=ZDgyMHFxbjZ6bnB5"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Instagram />
          </a>
          <a href="/" target="_blank" rel="noopener noreferrer">
            <Facebook />
          </a>
          <a href="/" target="_blank" rel="noopener noreferrer">
            <Telegram />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contacts;