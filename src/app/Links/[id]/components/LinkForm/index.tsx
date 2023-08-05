"use client";

import ButtonPrimary from "@/components/ButtonPrimary";
import CustomLink from "../CustomLinks";
import { useSelector } from "react-redux";
import { rootState } from "@/redux/root-reducer-types";
import { FormEvent, useState } from "react";

const LinkForm = () => {
  const { links } = useSelector(
    (rootReducer: rootState) => rootReducer.userLinksSlice
  );
  const [showLoadingComponent, setShowLoadingComponent] =
    useState<boolean>(false);
  const { id } = useSelector(
    (rootReducer: rootState) => rootReducer.profileDataSlice
  );

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const setData = async () => {
      setShowLoadingComponent(true);
      await fetch(`http://localhost:3000/profile/setLinks/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ links }),
      });
      setShowLoadingComponent(false);
    };
    setData();
  };

  return (
    <section className="bg-white rounded-xl max-w-[808px] w-full min-h-[78vh]">
      <form onSubmit={onSubmit}>
        <div className="p-10 flex flex-col gap-6 relative">
          <CustomLink />
        </div>
        <div className="flex items-end justify-end w-full py-6 px-10 border-1 border-t border-light_gray">
          <ButtonPrimary
            maxWidth="91px"
            disabled={false}
            type="submit"
            label="Save"
            showLoadingComponent={showLoadingComponent}
          />
        </div>
      </form>
    </section>
  );
};

export default LinkForm;
