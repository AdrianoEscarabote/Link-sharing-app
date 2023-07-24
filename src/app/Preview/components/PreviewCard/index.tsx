"use client";

import PreviewLink from "@/components/PreviewLink";
import Image from "next/image";
import style from "./style.module.css";
import { useSelector } from "react-redux";
import { rootState } from "@/redux/root-reducer-types";

const PreviewCard: React.FC<PreviewCardProps> = ({ img, name, email }) => {
  const { profileImage } = useSelector(
    (rootReducer: rootState) => rootReducer.profileDataSlice
  );

  return (
    <main className={`min-h-screen flex items-center justify-center`}>
      <div
        className={`${style.card} flex flex-col items-center justify-start bg-red rounded-3xl w-full max-w-[349px] min-h-[529px] py-[48px] px-[56px] z-40 mb-5`}
      >
        <div className="w-[110px] h-[110px] border-4 border-dark_purple relative rounded-full overflow-hidden">
          <Image
            src={profileImage}
            fill
            alt="profile image"
            className="object-cover"
          />
        </div>
        <h1 className="HeadingM">{name}</h1>
        <p className="BodyM mt-2">{email}</p>

        <ul className="mt-14 flex flex-col gap-5">
          <li>
            <PreviewLink
              size="large"
              label="GitHub"
              link="https://github.com/AdrianoEscarabote"
            />
          </li>

          <li>
            <PreviewLink
              size="large"
              label="LinkedIn"
              link="https://www.linkedin.com/in/adriano-escarabote-944b02233/"
            />
          </li>
          <li>
            <PreviewLink
              size="large"
              label="Frontend Mentor"
              link="https://www.linkedin.com/in/adriano-escarabote-944b02233/"
            />
          </li>
        </ul>
      </div>
    </main>
  );
};

export default PreviewCard;
