import { PlatformsName } from "@/redux/root-reducer-types";

interface LinkPlatformSelectorTypes {
  removeLink: (idToRemove: string) => void;
  id: string;
  link: string;
  platform: PlatformsName;
  /* handleChangeInputLink: (id: string, link: string) => void; */
}

export { LinkPlatformSelectorTypes };
