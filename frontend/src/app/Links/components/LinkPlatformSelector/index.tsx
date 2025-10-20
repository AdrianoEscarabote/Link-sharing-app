"use client";

import Image from "next/image";
import { MouseEventHandler, useEffect, useRef, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { useDispatch } from "react-redux";

import Input from "@/components/Input";
import useLinksValid from "@/hooks/useInvalidLinks";
import { PlatformsName } from "@/redux/root-reducer-types";
import { changeSelectValue, changeValue } from "@/redux/userLinks/reducer";

import Select from "../Select";
import { LinkPlatformSelectorTypes } from "./LinkPlatformSelectorProps";
import style from "./style.module.css";

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
    if (linkValue !== link) {
      dispatch(
        changeValue({
          idToUpdate: id,
          newValue: linkValue,
        })
      );
    }
  }, [linkValue, link, dispatch, id]);

  useEffect(() => {
    if (platformValue !== platform) {
      dispatch(
        changeSelectValue({
          idToUpdate: id,
          platformSelected: platformValue,
        })
      );
    }
  }, [platformValue, platform, dispatch, id]);

  const handleChangeValueSelect = (newValue: PlatformsName) => {
    setPlatformValue(newValue);
  };

  return (
    <div
      draggable
      ref={linkRef}
      className="cursor-grab bg-almost_white dark:border dark:border-border dark:bg-dark-bg-1 rounded-xl p-5 flex flex-col gap-3 z-10"
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

            <p className="BodyM font-bold">Link #{index + 1}</p>
          </div>

          <button
            data-testid={`remove-link-${index}`}
            className="BodyM dark:text-red opacity-80 hover:underline"
            type="button"
            onClick={handleClickRemove}
          >
            Remove
          </button>
        </div>
      </div>

      <label
        htmlFor="selectInput"
        className={`${style.linkOptions} flex flex-col gap-1 BodyS text-almost_dark dark:text-grey-300`}
      >
        Platform
        <Select
          onChange={handleChangeValueSelect}
          id={`platform-select-${index}`}
          platformSelected={platformValue}
        />
      </label>

      <label
        htmlFor="link"
        className="w-full flex flex-col gap-1 BodyS text-almost_dark dark:text-grey-300"
      >
        Link
        <Input
          data-testid={`link-url-input-${index}`}
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
