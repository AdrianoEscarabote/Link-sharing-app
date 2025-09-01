"use client";

import Image from "next/image";
import { useSelector } from "react-redux";

import PreviewLink from "@/components/PreviewLink";
import { rootState } from "@/redux/root-reducer-types";

import style from "./style.module.css";

const PreviewCard = () => {
  const { profileImageUrl, previewEmail, firstName, lastName } = useSelector(
    (rootReducer: rootState) => rootReducer.profileDataSlice
  );
  const { links } = useSelector(
    (rootReducer: rootState) => rootReducer.userLinksSlice
  );

  return (
    <main
      className={`${style.main} min-h-full flex items-center justify-center`}
    >
      <div
        className={`${style.card} flex flex-col items-center justify-start dark:border dark:border-border dark:bg-dark-bg-2 bg-white rounded-3xl w-full max-w-[349px] min-h-[529px] py-[48px] px-[56px] z-40 mb-5`}
      >
        <div className="w-[110px] h-[110px] border-4 border-dark_purple relative rounded-full overflow-hidden">
          <Image
            src={profileImageUrl}
            fill
            alt="profile image"
            className="object-cover"
          />
        </div>
        <h1 className="HeadingM text-almost_dark dark:text-grey-100">
          {firstName + lastName}
        </h1>
        <p className="BodyM mt-2">{previewEmail}</p>

        <ul className="mt-14 flex flex-col gap-5">
          {links.map((link) => (
            <li key={link.id}>
              <PreviewLink
                size="large"
                label={link.platform}
                link={link.link}
              />
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
};

export default PreviewCard;
