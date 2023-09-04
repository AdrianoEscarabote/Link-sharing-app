"use client";

import ButtonPrimary from "@/components/ButtonPrimary";
import CustomLink from "../CustomLinks";
import { useSelector } from "react-redux";
import { rootState } from "@/redux/root-reducer-types";
import { FormEvent, useState } from "react";
import Alert from "@/components/Alert";
import style from "./style.module.css";
import useLinksValid from "@/hooks/useLinksValid";

const LinkForm = () => {
  const { isUnavailableUrl } = useLinksValid();
  const [alertOpen, setAlertOpen] = useState<boolean>(false);
  const { links } = useSelector(
    (rootReducer: rootState) => rootReducer.userLinksSlice
  );
  const [showLoadingComponent, setShowLoadingComponent] =
    useState<boolean>(false);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const setData = async () => {
      setAlertOpen(true);
      setShowLoadingComponent(true);
      await fetch(`http://localhost:7000/links/setLinks`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ links }),
      });
      setShowLoadingComponent(false);
    };
    setData();
    setTimeout(() => {
      setAlertOpen(false);
    }, 2000);
  };

  return (
    <>
      <section
        className={"bg-white rounded-xl max-w-[808px] w-full min-h-full"}
      >
        <form onSubmit={onSubmit}>
          <div
            className={`${style.container_form} p-10 flex flex-col gap-6 relative`}
          >
            <CustomLink />
          </div>
          <div className="flex items-end justify-end w-full py-6 px-10 border-1 border-t border-light_gray">
            <ButtonPrimary
              maxWidth="91px"
              disabled={isUnavailableUrl}
              type="submit"
              label="Save"
              showLoadingComponent={showLoadingComponent}
            />
          </div>
        </form>
      </section>
      {alertOpen ? (
        <Alert
          altImage="icon saved"
          imgPath="/assets/icon-changes-saved.svg"
          text="Your changes have been successfully saved!"
          show={alertOpen}
        />
      ) : null}
    </>
  );
};

export default LinkForm;
