"use client";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import { PlatformsName, rootState } from "@/redux/root-reducer-types";
import {
  changeValue,
  removeLink,
  setData,
  setNewLink,
} from "@/redux/userLinks/reducer";

import ButtonSecondary from "../../../../components/ButtonSecondary/index";
import GetYouStarted from "../GetYouStarted";
import LinkPlatformSelector from "../LinkPlatformSelector";
import style from "./style.module.css";

const CustomLink = () => {
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

  const handleRemoveLink = (idToRemove: string) => {
    dispatch(
      removeLink({
        idToRemove,
      })
    );
  };

  const handleAddNewLink = () => {
    const counter = links.length + 1;
    if (links.length < 5) {
      const id = `${links.length + counter}`;
      const platforms = [
        "GitHub",
        "Facebook",
        "Frontend Mentor",
        "Twitter",
        "YouTube",
      ];

      const alreadySelected = links.map((link) => link.platform);

      const platformName = platforms.find((platform) => {
        return !alreadySelected.includes(platform as PlatformsName);
      });

      dispatch(
        setNewLink({
          id: id,
          link: "",
          platform: platformName as PlatformsName,
        })
      );
    }
  };

  const handleChangeInputLink = (id: string, newValue: string) => {
    dispatch(
      changeValue({
        idToUpdate: id,
        newValue,
      })
    );
  };

  return (
    <section>
      <h1
        className={`${style.title} HeadingM text-almost_dark dark:text-grey-100`}
      >
        Customize your links
      </h1>
      <p className="BodyM text-gray dark:text-grey-300">
        Add/edit/remove links below and then share all your profiles with the
        world!
      </p>
      <ButtonSecondary
        className="mt-10"
        disabled={links.length === 5 ? true : false}
        type="button"
        label="+ Add new link"
        onClick={handleAddNewLink}
      />

      <div
        className={`${style.container} relative overflow-y-scroll max-h-[46vh] min-h-[30rem] custom_scrollbar flex flex-col gap-6 mt-6`}
      >
        {links.length === 0 && <GetYouStarted />}

        {links.map((item, index) => (
          <LinkPlatformSelector
            removeLink={handleRemoveLink}
            key={item.id}
            id={JSON.stringify(index + 1)}
            index={index}
            link={item.link}
            platform={item.platform}
            moveLink={moveLink}
          />
        ))}
      </div>
    </section>
  );
};

export default CustomLink;
