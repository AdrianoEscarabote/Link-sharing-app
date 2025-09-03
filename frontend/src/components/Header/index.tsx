"use client";

import { Moon, Sun } from "lucide-react";
import Image from "next/image";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import useMediaQuery from "@/hooks/useMediaQuery";
import { rootState } from "@/redux/root-reducer-types";

import LinkSecondary from "../LinkSecondary";
import Tab from "../Tab";
import { Button } from "../ui/button";
import style from "./style.module.css";

const Header = () => {
  const { setTheme, theme } = useTheme();
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
    <header
      className={`${style.header} bg-white dark:bg-dark-bg-2 rounded-xl dark:border dark:border-border`}
    >
      <nav className="w-full flex items-center justify-between">
        <Image
          key={theme}
          src={`${
            theme === "dark"
              ? "/assets/logo-devlinks-large.svg"
              : "/assets/logo-devlinks-white.svg"
          }`}
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

        <div className="flex gap-4 items-center">
          <div>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Toggle theme"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="border border-grey-500 text-grey-300 dark:border-border"
            >
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>
          </div>
          <LinkSecondary
            maxWidth="114px"
            href={`/Preview/${uuid}`}
            disabled={uuid ? false : true}
            className={`${style.link} dark:hover:bg-grey-500 dark:hover:text-grey-100 dark:hover:border-border`}
            label={!showText ? "Preview" : ""}
          />
        </div>
      </nav>
    </header>
  );
};

export default Header;
