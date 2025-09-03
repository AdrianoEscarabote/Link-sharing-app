import { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

import { LinkPrimaryProps } from "./LinkPrimaryProps";
import style from "./style.module.css";

const LinkPrimary: React.FC<LinkPrimaryProps> = ({
  label,
  disabled,
  maxWidth,
  href,
  className,
  ...props
}) => {
  const linkClassName = twMerge(
    `${style.Link} ${
      disabled ? style.disabled : ""
    } HeadingS py-[11px] px-[27px] flex justify-center w-full rounded-lg text-white bg-dark_purple hover:bg-super_light_purple`,
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

export default LinkPrimary;
