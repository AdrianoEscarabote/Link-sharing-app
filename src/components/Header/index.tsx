"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Tab from "../Tab";
import LinkSecondary from "../LinkSecondary";
import style from "./style.module.css";
import { useSelector } from "react-redux";
import { rootState } from "@/redux/root-reducer-types";
import useMediaQuery from "@/hooks/useMediaQuery";

const Header = () => {
  const { id, uuid } = useSelector(
    (rootReducer: rootState) => rootReducer.profileDataSlice
  );
  const showText: boolean = useMediaQuery("(max-width: 1100px)");
  const [urlLinkPathImage, setUrlLinkPathImage] = useState(
    "/assets/icon-links-header.svg"
  );
  const [urlProfilePathImage, setUrlProfilePathImage] = useState(
    "/assets/icon-profile-details-header.svg"
  );
  const windowLocation = typeof window !== "undefined" ? window.location : null;

  useEffect(() => {
    if (window.location.href.includes("ProfileDetails")) {
      setUrlProfilePathImage("/assets/icon-profile-details-header-purple.svg");
      setUrlLinkPathImage("/assets/icon-links-header.svg");
    } else {
      setUrlLinkPathImage("/assets/icon-links-header-purple.svg");
      setUrlProfilePathImage("/assets/icon-profile-details-header.svg");
    }
  }, [windowLocation]);

  return (
    <header className={`${style.header} bg-white rounded-xl`}>
      <nav className="w-full flex items-center justify-between">
        <Image
          src="/assets/logo-devlinks-large.svg"
          alt=""
          width={146}
          height={32}
          className={`${style.logo_large}`}
        />

        <Image
          src="/assets/logo-devlinks-small.svg"
          alt=""
          width={32}
          height={32}
          className={`${style.logo_small}`}
        />

        <div className="flex items-center">
          <Tab
            active={urlLinkPathImage.includes("purple") ? true : false}
            href={`/Links/${id}`}
            imagePath={urlLinkPathImage}
            label={!showText ? "Links" : ""}
          />
          <Tab
            active={urlProfilePathImage.includes("purple") ? true : false}
            href={`/ProfileDetails/${id}`}
            imagePath={urlProfilePathImage}
            label={!showText ? "Profile Details" : ""}
            className="flex items-center justify-center"
          />
        </div>

        <LinkSecondary
          maxWidth="114px"
          href={`/Preview/${uuid}`}
          disabled={uuid ? false : true}
          className={`${style.link}`}
          label={!showText ? "Preview" : ""}
        />
      </nav>
    </header>
  );
};

export default Header;
