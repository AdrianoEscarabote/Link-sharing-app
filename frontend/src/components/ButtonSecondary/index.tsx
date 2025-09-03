import { twMerge } from "tailwind-merge";

import { ButtonProps } from "./ButtonProps";
import style from "./style.module.css";

const ButtonSecondary: React.FC<ButtonProps> = ({
  label,
  disabled,
  maxWidth,
  className,
  ...props
}) => {
  const buttonClassName = twMerge(
    `${
      disabled ? style.disabled : ""
    } py-[11px] px-[27px] rounded-lg w-full border border-solid border-dark_purple HeadingS text-dark_purple hover:bg-light_purple`,
    className
  );

  return (
    <button
      style={{ maxWidth: maxWidth ? maxWidth : "" }}
      className={buttonClassName}
      tabIndex={disabled ? -1 : 0}
      {...props}
    >
      {label}
    </button>
  );
};

export default ButtonSecondary;
