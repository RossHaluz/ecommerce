"use client";
import React, { Dispatch, forwardRef, SetStateAction, useState } from "react";
import InputMask from "react-input-mask";
import { Button } from "./ui/button";
import { toast } from "react-toastify";
import axios from "axios";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";

const CustomInputMask = forwardRef<
  HTMLInputElement,
  React.ComponentProps<typeof InputMask>
>((props, ref) => {
  return <InputMask {...props} inputRef={ref} />;
});
CustomInputMask.displayName = "CustomInputMask";

const AuthorizationOtp = ({
  setIsOpen,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const [isOpenVerify, setIsOpenVerify] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("380");
  const [code, setCode] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  const nextStep = async () => {
    try {
      setIsOpenVerify(true);
      await axios.post(`${process.env.BACKEND_URL}/api/auth/send-otp`, {
        phoneNumber,
      });
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong...");
    }
  };

  const handleConfirm = async (number: string) => {
    try {
      const { data } = await axios.post(
        `${process.env.BACKEND_URL}/api/auth/verify-otp`,
        {
          phoneNumber: number,
          code,
        }
      );

      Cookies.set("token", data?.data?.token, { expires: 7 });
      axios.defaults.headers.common.Authorization = `Bearer ${data?.data?.token}`;

      if (!pathname.includes("checkout")) {
        router.push("/account");
      }

      router.refresh();
      setIsOpen(false);
      toast.success("Ви успішно зайшли у свій кабінет.");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong...");
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {!isOpenVerify ? (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-3">
            <h3>Номер телефону</h3>
            <CustomInputMask
              mask="389 999 99 99 99"
              placeholder="380 999 99 99 99"
              value={phoneNumber}
              onChange={(e) => {
                const value = e.target.value;
                setPhoneNumber(value);
              }}
              className="py-3 lg:py-2 px-[15px] border border-solid border-[#484848] bg-[#FFFDFD] text-[#484848] text-sm lg:text-base lg:font-semibold lg:border lg:border-solid lg:border-[#484848] rounded-[5px]"
            />
          </div>
          <Button type="button" onClick={nextStep}>
            Продовжити
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-3">
            <span className="font-bold text-base">Код підтвердження</span>
            <p>
              На <span className="font-bold">{phoneNumber}</span> був надісланий
              код для підтвердження
            </p>
          </div>
          <InputOTP
            maxLength={6}
            value={code}
            onChange={(value) => setCode(value)}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>

          <Button type="button" onClick={() => handleConfirm(phoneNumber)}>
            Підтвердити
          </Button>
        </div>
      )}
    </div>
  );
};

export default AuthorizationOtp;
