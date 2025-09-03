"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { LinkTypes, PlatformClass } from "./LinkTypes";
import style from "./style.module.css";

const PreviewLink: React.FC<LinkTypes> = ({
  link,
  label,
  target = "_blank",
  size,
  ...props
}) => {
  const [platformClass, setPlatformClass] = useState<PlatformClass>("");

  useEffect(() => {
    if (label === "Dev.to") {
      setPlatformClass("Devto");
    } else if (label === "Frontend Mentor") {
      setPlatformClass("FrontendMentor");
    } else if (label === "Stack Overflow") {
      setPlatformClass("StackOverflow");
    } else {
      setPlatformClass(label);
    }
  }, [label]);

  return (
    <a
      className={`${
        size === "large" ? "h-14" : "h-11"
      } flex items-center border-none justify-between text-white pl-[54px] BodyM w-60 p-4 border rounded-lg ${
        style[platformClass]
      }`}
      href={link}
      aria-label=""
      target={target}
      {...props}
    >
      {label}
      <Image alt="" src="/assets/icon-arrow-right.svg" width="16" height="16" />
    </a>
  );
};

export default PreviewLink;
