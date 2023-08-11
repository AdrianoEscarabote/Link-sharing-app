"use client";

import ButtonSecondary from "../../../../components/ButtonSecondary/index";
import LinkPlatformSelector from "../LinkPlatformSelector";
import GetYouStarted from "../GetYouStarted";
import { useSelector } from "react-redux";
import { PlatformsName, rootState } from "@/redux/root-reducer-types";
import { useDispatch } from "react-redux";
import { changeValue, removeLink, setNewLink } from "@/redux/userLinks/reducer";

const CustomLink = () => {
  const dispatch = useDispatch();
  const { links } = useSelector(
    (rootReducer: rootState) => rootReducer.userLinksSlice
  );

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
      <h1 className="HeadingM text-almost_dark">Customize your links</h1>
      <p className="BodyM text-gray">
        Add/edit/remove links below and then share all your profiles with the
        world!
      </p>
      <ButtonSecondary
        className="mt-10"
        disabled={false}
        type="button"
        label="+ Add new link"
        onClick={handleAddNewLink}
      />

      <div className="relative overflow-y-scroll max-h-[46vh] custom_scrollbar flex flex-col gap-6 mt-6">
        {links.length === 0 && <GetYouStarted />}

        {links.map((item) => (
          <div>
            <LinkPlatformSelector
              removeLink={handleRemoveLink}
              key={item.id}
              id={item.id}
              link={item.link}
              platform={item.platform}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default CustomLink;
