"use client";

import Image from "next/image";
import { AlertProps } from "./AlertProps";
import style from "./style.module.css";

const Alert = ({ show, imgPath, text, altImage }: AlertProps) => {
  return (
    <div
      role="alert"
      className={`${
        show ? style.alert : ""
      } HeadingS fixed bottom-0 w-full max-w-[422px] rounded-xl flex items-center gap-2 bg-almost_dark z-50 py-4 px-6`}
    >
      <Image src={imgPath} alt={altImage} width={20} height={20} />
      <span className="text-almost_white">{text}</span>
    </div>
  );
};

export default Alert;
