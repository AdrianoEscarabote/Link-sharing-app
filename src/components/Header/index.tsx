"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Tab from "../Tab";
import LinkSecondary from "../LinkSecondary";
import style from "./style.module.css";
import { useSelector } from "react-redux";
import { rootState } from "@/redux/root-reducer-types";

const Header = () => {
  const { id } = useSelector(
    (rootReducer: rootState) => rootReducer.profileDataSlice
  );
  const [showText, setShowText] = useState<boolean>(true);
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

  useEffect(() => {
    const checkWidthScreen = () => {
      const widthScreen =
        window.innerWidth || document.documentElement.clientWidth;
      setShowText(widthScreen > 1100);
    };

    checkWidthScreen();

    window.addEventListener("resize", checkWidthScreen);
    return () => {
      window.removeEventListener("resize", checkWidthScreen);
    };
  }, []);

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
            label={showText ? "Links" : ""}
          />
          <Tab
            active={urlProfilePathImage.includes("purple") ? true : false}
            href={`/ProfileDetails/${id}`}
            imagePath={urlProfilePathImage}
            label={showText ? "Profile Details" : ""}
            className="flex items-center justify-center"
          />
        </div>

        <LinkSecondary
          maxWidth="114px"
          href="/Preview"
          disabled={false}
          className={`${style.link}`}
          label={showText ? "Preview" : ""}
        />
      </nav>
    </header>
  );
};

export default Header;
