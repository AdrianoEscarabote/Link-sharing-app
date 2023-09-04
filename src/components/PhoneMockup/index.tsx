"use client";

import Image from "next/image";
import style from "./style.module.css";
import PreviewLinkDraggable from "../PreviewLinkDraggable";
import { useSelector } from "react-redux";
import { rootState } from "../../redux/root-reducer-types";
import { useDispatch } from "react-redux";
import { setData } from "@/redux/userLinks/reducer";

const PhoneMockup = () => {
  const dispatch = useDispatch();
  const { links } = useSelector(
    (rootReducer: rootState) => rootReducer.userLinksSlice
  );

  const moveLink = (fromIndex: number, toIndex: number) => {
    const updatedLinks = [...links];
    const [movedLink] = updatedLinks.splice(fromIndex, 1);
    updatedLinks.splice(toIndex, 0, movedLink);

    dispatch(setData(updatedLinks));
  };

  const { profileImageUrl, lastName, previewEmail, firstName } = useSelector(
    (rootReducer: rootState) => rootReducer.profileDataSlice
  );

  return (
    <section className="p-6 flex items-center justify-center w-full max-w-[560px] bg-white rounded-xl relative">
      <div className="w-[307] h-[631] relative flex items-center justify-center">
        <Image
          className={`${style.image}`}
          src="/assets/illustration-phone-mockup.svg"
          alt=""
          width={307}
          height={631}
        />

        {previewEmail && (
          <div className="absolute w-[280px] h-[200px] top-[184px] text-center">
            <div className="relative">
              <p className="HeadingS text-almost_dark py-0 px-4 bg-white whitespace-nowrap overflow-hidden overflow-ellipsis">
                {firstName} {lastName}
              </p>
              {
                <p
                  className={`${style.email} text-center mt-1 text-gray BodyS py-1 px-2 bg-white`}
                >
                  {previewEmail}
                </p>
              }
            </div>
          </div>
        )}

        {profileImageUrl && (
          <div className="absolute top-[65px] w-[94px] h-[94px] border-4 border-dark_purple rounded-full overflow-hidden">
            <Image
              src={profileImageUrl}
              fill
              alt="profile image"
              className="object-cover"
            />
          </div>
        )}

        <div
          className={`${style.container} absolute top-[278px] w-[240px] max-h-[300px] rounded-lg overflow-y-scroll`}
        >
          <div
            className={`${style.container} relative w-full flex flex-col rounded-lg gap-5`}
          >
            {links.length > 0
              ? links.map((item, index) => (
                  <PreviewLinkDraggable
                    id={item.id}
                    index={index}
                    moveLink={moveLink}
                    key={index}
                    size="small"
                    label={item.platform}
                    link={item.link}
                  />
                ))
              : null}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PhoneMockup;
