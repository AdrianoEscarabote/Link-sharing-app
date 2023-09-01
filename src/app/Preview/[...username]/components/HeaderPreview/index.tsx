"use client";

import ButtonPrimary from "@/components/ButtonPrimary";
import LinkSecondary from "@/components/LinkSecondary";
import style from "./style.module.css";
import { useState } from "react";
import Alert from "@/components/Alert";
import usePreviewAuthAndData from "@/hooks/UsePreviewAuthAndData";

const HeaderPreview = () => {
  const { userData, loggedUser, loading } = usePreviewAuthAndData();
  const [alertOpen, setAlertOpen] = useState(false);

  const handleCopyButton = () => {
    navigator.clipboard.writeText(window.location.href);
    setAlertOpen(!alertOpen);

    setTimeout(() => {
      setAlertOpen(false);
    }, 2000);
  };

  return (
    <>
      <header className={`${style.header} fixed top-0 w-full p-6`}>
        <nav
          className={`${style.nav} bg-white w-full flex items-center justify-between py-4 px-6 rounded-xl z-50`}
        >
          {loggedUser ? (
            <LinkSecondary
              href="/ProfileDetails"
              disabled={false}
              label="Back to Editor"
              type="button"
              className={`${style.link}`}
            />
          ) : (
            <LinkSecondary
              href="/Login"
              disabled={false}
              label="Sign in"
              type="button"
              className={`${style.link}`}
            />
          )}
          <ButtonPrimary
            showLoadingComponent={false}
            label="Share Link"
            disabled={alertOpen ? true : false}
            type="button"
            className={`${style.link}`}
            onClick={handleCopyButton}
          />
        </nav>
      </header>
      {alertOpen ? (
        <Alert
          altImage="icon copied to clipboard"
          imgPath="/assets/icon-link-copied-to-clipboard.svg"
          text="The link has been copied to your clipboard!"
          show={alertOpen}
        />
      ) : null}
    </>
  );
};

export default HeaderPreview;
