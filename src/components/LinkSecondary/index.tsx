import Link from "next/link";
import { LinkSecondaryProps } from "./LinkSecondaryProps";
import style from "./style.module.css";
import { Url } from "next/dist/shared/lib/router/router";
import { twMerge } from "tailwind-merge";

const LinkSecondary: React.FC<LinkSecondaryProps> = ({
  label,
  disabled,
  href,
  maxWidth,
  className,
  ...props
}) => {
  const linkClassName = twMerge(
    `${
      disabled ? style.disabled : ""
    } py-[11px] px-[27px] rounded-lg flex justify-center w-full border border-solid border-dark_purple HeadingS text-dark_purple hover:bg-light_purple`,
    className
  );

  return (
    <Link
      href={href as Url}
      style={{ maxWidth: maxWidth ? maxWidth : "" }}
      className={linkClassName}
      {...props}
    >
      {label}
    </Link>
  );
};

export default LinkSecondary;
