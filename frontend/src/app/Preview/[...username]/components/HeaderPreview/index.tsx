"use client";

import Image from "next/image";
import { toast } from "sonner";

import ButtonPrimary from "@/components/ButtonPrimary";
import LinkSecondary from "@/components/LinkSecondary";
import usePreviewAuthAndData from "@/hooks/UsePreviewAuthAndData";

import style from "./style.module.css";

const ToastIcon = (
  <Image
    src="/assets/icon-link-copied-to-clipboard.svg"
    alt="Link copied"
    width={24}
    height={24}
  />
);

const HeaderPreview = () => {
  const { loggedUser } = usePreviewAuthAndData();

  const handleCopyButton = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast("The link has been copied to your clipboard!", {
        icon: ToastIcon,
      });
    } catch {
      toast.error("Failed to copy link.");
    }
  };

  return (
    <header className={`${style.header} fixed top-0 w-full p-6`}>
      <nav
        className={`${style.nav} bg-white dark:bg-dark-bg-2 dark:border dark:border-border w-full flex items-center justify-between py-4 px-6 rounded-xl z-50`}
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
          disabled={false}
          type="button"
          className={`${style.link}`}
          onClick={handleCopyButton}
        />
      </nav>
    </header>
  );
};

export default HeaderPreview;
