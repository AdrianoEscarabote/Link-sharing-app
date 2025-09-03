"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useDrag, useDrop } from "react-dnd";

import {
  LinkDragTypes,
  LinkTypes,
  PlatformClass,
} from "./PreviewLinkDraggableTypes";
import style from "./style.module.css";

const PreviewLinkDraggable: React.FC<LinkTypes> = ({
  link,
  label,
  target = "_blank",
  size,
  moveLink,
  index,
  id,
  ...props
}) => {
  const [platformClass, setPlatformClass] = useState<PlatformClass>("");

  useEffect(() => {
    if (label === "Dev.to") {
      setPlatformClass("Devto");
    } else if (label === "Frontend Mentor") {
      setPlatformClass("FrontendMentor");
    } else if (label === "Stack Overflow") {
      setPlatformClass("StackOverflow");
    } else {
      setPlatformClass(label);
    }
  }, [label]);

  const linkRef = useRef(null);

  const [, drag] = useDrag({
    type: "LINK",
    item: { id, index },
  });

  const [, drop] = useDrop({
    accept: "LINK",
    drop: (draggedItem: LinkDragTypes) => {
      if (draggedItem.index !== index) {
        moveLink(draggedItem.index, index);
      }
    },
  });

  drag(linkRef);
  drop(linkRef);

  return (
    <a
      draggable
      ref={linkRef}
      className={`${
        size === "large" ? "h-14" : "h-11"
      } flex cursor-grab items-center border-none justify-between text-white pl-[54px] BodyM w-60 p-4 border rounded-lg ${
        style[platformClass]
      }`}
      href={link}
      aria-label=""
      target={target}
      {...props}
    >
      {label}
      <Image alt="" src="/assets/icon-arrow-right.svg" width="16" height="16" />
    </a>
  );
};

export default PreviewLinkDraggable;
