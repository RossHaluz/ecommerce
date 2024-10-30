import { CopyrightIcon } from "lucide-react";
import Logo from "/public/images/logo.svg";
import Instagram from "/public/images/instagram.svg";
import Facebook from "/public/images/facebook.svg";
import Telegram from "/public/images/telegram.svg";
import Visa from "/public/images/visa.svg";
import Mastercard from "/public/images/mastercard.svg";
import ApplePay from "/public/images/apple-pay.svg";
import Private from "/public/images/private.svg";
import ArrowDown from "/public/images/arrow-down.svg";
import { Button } from "./ui/button";

const Footer = () => {
  return (

    <footer className="bg-[#EAF2EB]">
      <div className="container pt-5 pb-[28px] flex flex-col gap-[15px]">
        <div className=" md:grid md:grid-cols-3 lg:grid-cols-4 justify-between md:gap-8 lg:gap-[90px]">
          {/* Contact info start */}
          <div className="flex flex-col gap-[10px] mb-[15px]  items-start">
            <Logo className="h-[50px]" />
            <div className="flex flex-col gap-[15px]">
              <h3 className="font-semibold text-sm text-[#484848]">
                Контакти:
              </h3>
              <a
                href="tel:+380964009130"
                className="font-semibold text-sm text-[#484848]"
              >
                +38 (096) 400 91 30
              </a>
              <address className="text-[#484848] text-xs">
                Адреса: м. Хмельницький, вул. Молодіжна 15/1
              </address>
              <p className="text-[#484848] text-xs">
                пн-сб 10:00 - 18:00 нд - вихідний
              </p>
            </div>
          </div>
          {/* Contact info end */}

          {/* Catalog start  */}
          <div className="mb-[15px]">
            <Button className="font-semibold text-sm p-0 h-0 md:hidden" variant="ghost">
              Каталог товарів
              <ArrowDown />
            </Button>
            <h3 className="text-sm font-semibold hidden md:inline-block"> Каталог товарів</h3>
          </div>
          {/* Catalog end  */}

          {/* Info start  */}
          <div className="mb-[30px]">
            <Button className="font-semibold text-sm p-0 h-0 md:hidden" variant="ghost">
              Інформація
              <ArrowDown />
            </Button>
            <h3 className="text-sm font-semibold hidden md:inline-block">Інформація</h3>
          </div>
          {/* Info end  */}

          {/* Soacials start */}
          <div className="flex flex-col gap-[15px]">
            <h3 className="font-semibold text-sm text-[#484848]">
              Слідкуйте за нами у соцмережах:
            </h3>
            <div className="flex items-center gap-[30px]">
              <a href="/" target="_blank" rel="noopener noreferrer">
                <Instagram />
              </a>
              <a href="/" target="_blank" rel="noopener noreferrer">
                <Facebook />
              </a>
              <a href="/" target="_blank" rel="noopener noreferrer">
                <Telegram />
              </a>
            </div>

            <div className="w-full h-[1px] bg-[#48484880] md:hidden" />

            <div className="grid grid-cols-4 items-center gap-[7px] mx-auto md:ml-0">
              <div className="bg-white rounded-[5px] p-2 flex items-center justify-center">
                <Visa />
              </div>
              <div className="bg-white rounded-[5px] p-2 flex items-center justify-center">
                <Mastercard />
              </div>
              <div className="bg-white rounded-[5px] p-2 flex items-center justify-center">
                <ApplePay />
              </div>
              <div className="bg-white rounded-[5px] p-2 flex items-center justify-center">
                <Private />
              </div>
            </div>
          </div>
          {/* Soacials end */}
        </div>

        {/* Copyright start */}
        <div className="flex flex-col gap-[15px]">
          <div className="w-full h-[1px] bg-[#48484880]" />
          <div className="flex items-center gap-[10px] mx-auto">
            <CopyrightIcon className="w-4 h-4" />
            2022 KoalaDream права захищені
          </div>
          <p className="text-center text-[#484848] text-sm">
            Розробка сайту -{" "}
            <a
              href="https://hiweber.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-center text-[#484848] text-sm"
            >
              Hiweber
            </a>
          </p>
        </div>
        {/* Copyright end */}
      </div>
    </footer>

  );
};

export default Footer;
