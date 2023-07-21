import Image from "next/image";
import { TabProps } from "./TabProps";
import style from "./style.module.css";
import Link from "next/link";
import { Url } from "next/dist/shared/lib/router/router";
import { twMerge } from "tailwind-merge";

const Tab: React.FC<TabProps> = ({
  label,
  imagePath,
  href,
  active,
  className,
  ...props
}) => {
  const tabClassName = twMerge(
    `${
      style.tab
    } py-[11px] px-[27px] HeadingS flex items-center gap-2 text-gray hover:text-dark_purple rounded-lg
    ${active ? "bg-light_purple text-dark_purple" : "bg-transparent"}`,
    className
  );

  return (
    <Link href={href as Url} className={tabClassName} {...props}>
      <Image src={imagePath} width={"20"} height={"20"} alt="" />
      {label}
    </Link>
  );
};

export default Tab;
