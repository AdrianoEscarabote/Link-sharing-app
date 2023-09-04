"use client";

import Image from "next/image";
import style from "./style.module.css";
import { useEffect, useState } from "react";
import { OptionsSelectedTypes, SelectProps } from "./SelectTypes";
import { useSelector } from "react-redux";
import { PlatformsName, rootState } from "@/redux/root-reducer-types";

const platformsName = [
  { name: "GitHub", img: "github" },
  { name: "Frontend Mentor", img: "frontend-mentor" },
  { name: "Twitter", img: "twitter" },
  { name: "LinkedIn", img: "linkedin" },
  { name: "YouTube", img: "youtube" },
  { name: "Facebook", img: "facebook" },
  { name: "Twitch", img: "twitch" },
  { name: "Dev.to", img: "devto" },
  { name: "Codewars", img: "codewars" },
  { name: "freeCodeCamp", img: "freecodecamp" },
  { name: "GitLab", img: "gitlab" },
  { name: "Hashnode", img: "hashnode" },
  { name: "Stack Overflow", img: "stack-overflow" },
];

const Select = ({ id, platformSelected, onChange }: SelectProps) => {
  const { links } = useSelector(
    (rootReducer: rootState) => rootReducer.userLinksSlice
  );
  const [optionsOpen, setOptionsOpen] = useState<boolean>(false);
  const [optionsSelected, setOptionsSelected] = useState<OptionsSelectedTypes>({
    name: "GitHub",
    img: "github",
  });

  useEffect(() => {
    onChange(optionsSelected.name);
  }, [optionsSelected.name]);

  useEffect(() => {
    if (platformSelected) {
      handleSelecteOptions(platformSelected);
      setOptionsOpen(false);
    }
  }, []);

  const handleBlockOptionsAlreadySelected = () => {
    const selectedPlatformNames = links.map((link) => link.platform);

    return platformsName.map((platform) => ({
      ...platform,
      disabled: selectedPlatformNames.includes(platform.name as PlatformsName),
    }));
  };

  const handleSelecteOptions = (name: string) => {
    const selectedOption = platformsName.find(
      (platform) => platform.name === name
    );

    if (selectedOption) {
      setOptionsSelected(selectedOption);
    }
    setOptionsOpen(!optionsOpen);
  };

  const handleClickOptions = () => setOptionsOpen(!optionsOpen);

  return (
    <div
      id={id}
      className="w-full rounded-lg relative"
      onClick={handleClickOptions}
    >
      <button
        role="button"
        type="button"
        accessKey="s"
        className={`${style.select} border border-1 border-light_gray rounded-lg w-full cursor-pointer px-4 py-3 flex justify-between items-center`}
      >
        <div className={`${style.filter} flex items-center gap-3`}>
          <Image
            src={`/assets/icon-${optionsSelected.img}.svg`}
            alt=""
            width={16}
            style={{ width: "16px", height: "16px" }}
            height={16}
          />
          <p className="BodyM text-almost_dark">{optionsSelected.name}</p>
        </div>
        <Image
          src="/assets/icon-chevron-down.svg"
          width={12}
          height={14}
          alt=""
          style={
            optionsOpen
              ? { transform: "rotate(180deg)" }
              : { transform: "rotate(0deg)" }
          }
        />
      </button>
      {optionsOpen ? (
        <div
          onClick={(e) => e.stopPropagation()}
          className={`${style.container} custom_scrollbar z-50 px-4 relative top-2 flex flex-col items-start bg-white border border-1 border-light_gray w-full rounded-lg h-96 overflow-y-scroll `}
          style={{ boxShadow: "0px 0px 32px 0px rgba(0, 0, 0, 0.10)" }}
        >
          {handleBlockOptionsAlreadySelected().map((platform, index) => (
            <button
              type="button"
              role="button"
              key={index}
              disabled={platform.disabled}
              onClick={(e) => handleSelecteOptions(e.currentTarget.innerText)}
              className={`${platform.disabled ? style.button_disabled : ""} ${
                style.filter
              } ${
                optionsSelected.name === platform.name ? style.selected : ""
              } w-full py-3 border-1 border-b border-light_gray BodyM text-almost_dark flex items-center gap-3`}
            >
              <Image
                width={16}
                height={16}
                style={{ width: "16px", height: "16px" }}
                src={`/assets/icon-${platform.img}.svg`}
                alt={`icon of ${platform.name}`}
              />
              {platform.name}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default Select;
