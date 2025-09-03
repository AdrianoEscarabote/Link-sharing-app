import { Url } from "next/dist/shared/lib/router/router";
import Image from "next/image";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

import style from "./style.module.css";
import { TabProps } from "./TabProps";

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
    } py-[11px] px-[27px] border border-transparent HeadingS flex items-center gap-2 text-gray hover:text-dark_purple rounded-lg
    ${
      active
        ? "bg-light_purple dark:bg-dark-bg-2 dark:border dark:border-border text-dark_purple "
        : "bg-transparent"
    }`,
    className
  );

  return (
    <Link href={href as Url} className={tabClassName} {...props}>
      <Image
        src={imagePath}
        style={{ width: "20px", height: "20px" }}
        width={20}
        height={20}
        alt=""
      />
      {label}
    </Link>
  );
};

export default Tab;
