"use client";

import Image from "next/image";
import style from "./style.module.css";
import Input from "@/components/Input";
import { MouseEventHandler } from "react";
import Select from "../Select";
import { LinkPlatformSelectorTypes } from "./LinkPlatformSelectorProps";

const LinkPlatformSelector = ({
  removeLinkSelector,
  id,
}: LinkPlatformSelectorTypes) => {
  const handleClickRemove: MouseEventHandler<HTMLButtonElement> = () =>
    removeLinkSelector();

  return (
    <div
      draggable
      className="bg-almost_white rounded-xl p-5 flex flex-col gap-3 mt-6 z-10"
      id={`${id}`}
    >
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-2 w-full justify-between">
          <div className="flex items-center gap-2">
            <Image
              src="/assets/icon-drag-and-drop.svg"
              alt=""
              width={16}
              height={12}
            />

            <p className="BodyM font-bold">Link #{id}</p>
          </div>

          <button className="BodyM" onClick={handleClickRemove}>
            Remove
          </button>
        </div>
      </div>

      <label
        htmlFor="selectInput"
        className={`${style.linkOptions} BodyS text-almost_dark`}
      >
        Platform
        <Select id="selectInput" />
      </label>

      <label
        htmlFor="link"
        className="w-full flex flex-col gap-1 BodyS text-almost_dark"
      >
        Link
        <Input
          className={`p-4 ${style.link_input}`}
          placeholder="e.g. https://www.github.com/johnappleseed"
        />
      </label>
    </div>
  );
};

export default LinkPlatformSelector;
