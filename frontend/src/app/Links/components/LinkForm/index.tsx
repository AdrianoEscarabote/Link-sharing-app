"use client";

import { FormEvent, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import Alert from "@/components/Alert";
import ButtonPrimary from "@/components/ButtonPrimary";
import useLinksValid from "@/hooks/useInvalidLinks";
import { rootState } from "@/redux/root-reducer-types";
import { udpatedLinksId } from "@/redux/userLinks/reducer";

import CustomLink from "../CustomLinks";
import style from "./style.module.css";

const LinkForm = () => {
  const dispatch = useDispatch();
  const { invalidLinks } = useLinksValid();
  const [alertOpen, setAlertOpen] = useState<boolean>(false);
  const { links } = useSelector(
    (rootReducer: rootState) => rootReducer.userLinksSlice
  );
  const [showLoadingComponent, setShowLoadingComponent] =
    useState<boolean>(false);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    dispatch(udpatedLinksId());
    const setData = async () => {
      setAlertOpen(true);
      setShowLoadingComponent(true);
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/links/setLinks`, {
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
        className={
          "bg-white dark:bg-dark-bg-2 dark:border dark:border-border rounded-xl max-w-[808px] w-full min-h-full"
        }
      >
        <form onSubmit={onSubmit}>
          <div
            className={`${style.container_form} p-10 flex flex-col gap-6 relative`}
          >
            <CustomLink />
          </div>
          <div className="flex items-end justify-end w-full py-6 px-10 border-1 border-t border-light_gray dark:border-border">
            <ButtonPrimary
              maxWidth="91px"
              disabled={invalidLinks !== undefined || links.length === 0}
              type={
                invalidLinks !== undefined || links.length === 0
                  ? "button"
                  : "submit"
              }
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
