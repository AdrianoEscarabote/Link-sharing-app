"use client";

import Image from "next/image";
import style from "./style.module.css";
import Input from "@/components/Input";
import { MouseEventHandler, useEffect, useRef, useState } from "react";
import Select from "../Select";
import { LinkPlatformSelectorTypes } from "./LinkPlatformSelectorProps";
import { PlatformsName } from "@/redux/root-reducer-types";
import { useDispatch } from "react-redux";
import { changeSelectValue, changeValue } from "@/redux/userLinks/reducer";
import useLinksValid from "@/hooks/useInvalidLinks";
import { useDrag, useDrop } from "react-dnd";

const LinkPlatformSelector = ({
  removeLink,
  id,
  link,
  platform,
  index,
  moveLink,
}: LinkPlatformSelectorTypes) => {
  const { invalidLinks } = useLinksValid();
  const dispatch = useDispatch();
  const [platformValue, setPlatformValue] = useState<PlatformsName>(platform);
  const [linkValue, setLinkValue] = useState<string>(link);

  const linkRef = useRef(null);

  const [, drag] = useDrag({
    type: "LINK",
    item: { id, index },
  });

  const [, drop] = useDrop({
    accept: "LINK",
    drop: (draggedItem: LinkPlatformSelectorTypes) => {
      if (draggedItem.index !== index) {
        moveLink(draggedItem.index, index);
      }
    },
  });

  drag(linkRef);
  drop(linkRef);

  const handleClickRemove: MouseEventHandler<HTMLButtonElement> = () =>
    removeLink(id);

  useEffect(() => {
    dispatch(
      changeValue({
        idToUpdate: id,
        newValue: linkValue,
      })
    );
  }, [linkValue]);

  useEffect(() => {
    dispatch(
      changeSelectValue({
        idToUpdate: id,
        platformSelected: platformValue,
      })
    );
  }, [platformValue]);

  const handleChangeValueSelect = (newValue: PlatformsName) => {
    setPlatformValue(newValue);
  };

  return (
    <div
      draggable
      ref={linkRef}
      className="cursor-grab bg-almost_white rounded-xl p-5 flex flex-col gap-3 z-10"
      id={`${id}`}
    >
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-2 w-full justify-between">
          <div className="flex items-center gap-2">
            <Image
              className={`${style.image}`}
              src="/assets/icon-drag-and-drop.svg"
              alt=""
              style={{ width: "16px", height: "12px" }}
              width={16}
              height={12}
            />

            <p className="BodyM font-bold">Link #{id}</p>
          </div>

          <button className="BodyM" type="button" onClick={handleClickRemove}>
            Remove
          </button>
        </div>
      </div>

      <label
        htmlFor="selectInput"
        className={`${style.linkOptions} BodyS text-almost_dark`}
      >
        Platform
        <Select
          onChange={handleChangeValueSelect}
          id="selectInput"
          platformSelected={platformValue}
        />
      </label>

      <label
        htmlFor="link"
        className="w-full flex flex-col gap-1 BodyS text-almost_dark"
      >
        Link
        <Input
          className={`p-4 ${style.link_input}`}
          value={linkValue}
          onChange={(ev) => setLinkValue(ev.currentTarget.value)}
          placeholder="e.g. https://www.github.com/johnappleseed"
          error={invalidLinks?.id === id ? true : false}
          errorMessage="invalid link!"
        />
      </label>
    </div>
  );
};

export default LinkPlatformSelector;
