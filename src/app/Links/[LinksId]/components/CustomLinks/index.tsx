"use client";

import ButtonSecondary from "../../../../../components/ButtonSecondary/index";
import LinkPlatformSelector from "../LinkPlatformSelector";
import GetYouStarted from "../GetYouStarted";
import { useState } from "react";
import { linkSelectorProps } from "./CustomLinkTypes";

const CustomLink = () => {
  const [linkSelectors, setLinkSelectors] = useState<linkSelectorProps[]>([]);

  const handleClickButton = () => {
    const counter = 1;
    if (linkSelectors.length < 5) {
      const id = linkSelectors.length + counter;
      const component = (
        <LinkPlatformSelector
          removeLinkSelector={() => handleRemoveState(id)}
          key={id}
          id={id}
        />
      );

      setLinkSelectors((prevState) => [...prevState, { id, component }]);
    }
  };

  const handleRemoveState = (idComponentToRemove: number) => {
    setLinkSelectors((prevLinkSelectors) =>
      prevLinkSelectors.filter(
        (component) => component.id !== idComponentToRemove
      )
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
        label="+ Add new link"
        onClick={handleClickButton}
      />

      <div className="relative-overflow-y-scroll h-full">
        {linkSelectors.length === 0 && <GetYouStarted />}
        {linkSelectors.map((item) => (
          <div>{item.component}</div>
        ))}
      </div>
    </section>
  );
};

export default CustomLink;
