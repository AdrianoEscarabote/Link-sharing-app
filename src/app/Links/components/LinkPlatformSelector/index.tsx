"use client";

import Image from "next/image";
import style from "./style.module.css";
import Input from "@/components/Input";
import { MouseEventHandler, useEffect, useState } from "react";
import Select from "../Select";
import { LinkPlatformSelectorTypes } from "./LinkPlatformSelectorProps";
import { isURL } from "validator";
import { PlatformsName } from "@/redux/root-reducer-types";
import { useDispatch } from "react-redux";
import { changeSelectValue, changeValue } from "@/redux/userLinks/reducer";

const LinkPlatformSelector = ({
  removeLink,
  id,
  link,
  platform,
}: LinkPlatformSelectorTypes) => {
  const dispatch = useDispatch();
  const [errorInputLink, setErrorInputLink] = useState<boolean>(false);
  const [platformValue, setPlatformValue] = useState<PlatformsName>(platform);
  const [linkValue, setLinkValue] = useState<string>(link);

  const handleClickRemove: MouseEventHandler<HTMLButtonElement> = () =>
    removeLink(id);

  // Sua função de validação do link social
  function validateSocialLink(link: string): boolean {
    // A função isURL irá verificar se o link é uma URL válida
    return isURL(link, { require_protocol: true });
  }

  useEffect(() => {
    dispatch(
      changeValue({
        idToUpdate: id,
        newValue: linkValue,
      })
    );
  }, [linkValue]);

  useEffect(() => {
    const isValid = validateSocialLink(linkValue);
    setErrorInputLink(isValid);
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
      className="bg-almost_white rounded-xl p-5 flex flex-col gap-3 z-10"
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
          error={!errorInputLink}
          errorMessage="invalid link!"
        />
      </label>
    </div>
  );
};

export default LinkPlatformSelector;
