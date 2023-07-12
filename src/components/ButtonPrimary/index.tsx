import { twMerge } from "tailwind-merge";
import { ButtonProps } from "./ButtonProps";
import style from "./style.module.css";

const ButtonPrimary: React.FC<ButtonProps> = ({
  label,
  disabled,
  maxWidth,
  className,
  ...props
}) => {
  const buttonClassName = twMerge(
    `${style.ButtonPrimary} ${
      disabled ? style.disabled : ""
    } HeadingS w-full rounded-lg text-white bg-dark_purple hover:bg-super_light_purple`,
    className
  );

  return (
    <button
      style={{ maxWidth: maxWidth ? maxWidth : "" }}
      className={buttonClassName}
      {...props}
    >
      {label}
    </button>
  );
};

export default ButtonPrimary;
