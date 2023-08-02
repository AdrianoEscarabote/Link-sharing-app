import { twMerge } from "tailwind-merge";
import { ButtonProps } from "./ButtonProps";
import style from "./style.module.css";
import LoadingComponent from "../LoadingComponent";

const ButtonPrimary: React.FC<ButtonProps> = ({
  label,
  disabled,
  maxWidth,
  className,
  showLoadingComponent,
  ...props
}) => {
  const buttonClassName = twMerge(
    `${style.ButtonPrimary} ${
      disabled ? style.disabled : ""
    } HeadingS min-h-[46px] w-full relative rounded-lg text-white bg-dark_purple hover:bg-super_light_purple
    ${showLoadingComponent ? `bg-super_light_purple ${style.shadow}` : ""}
    `,
    className
  );

  return (
    <button
      style={{ maxWidth: maxWidth ? maxWidth : "" }}
      className={buttonClassName}
      {...props}
    >
      {showLoadingComponent ? <LoadingComponent /> : label}
    </button>
  );
};

export default ButtonPrimary;
