import { forwardRef } from "react";
import InputMask from "react-input-mask";

const CustomInputMask = forwardRef<
  HTMLInputElement,
  React.ComponentProps<typeof InputMask>
>((props, ref) => {
  return <InputMask {...props} inputRef={ref} />;
});
CustomInputMask.displayName = "CustomInputMask";


export default CustomInputMask