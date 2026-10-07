import { forwardRef } from "react";
import InputMask from "react-input-mask";

const CustomInputMask = forwardRef<
  HTMLInputElement,
  React.ComponentProps<typeof InputMask>
>((props, ref) => {
  return (
    // maskChar={null}: із шаблоном «___» дотик посередині ставив курсор у кінець, і цифри не вводились.
    <InputMask maskChar={null} {...props} inputRef={ref} />
  );
});
CustomInputMask.displayName = "CustomInputMask";


export default CustomInputMask