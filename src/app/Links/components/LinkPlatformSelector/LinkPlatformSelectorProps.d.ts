import { PlatformsName } from "@/redux/root-reducer-types";

interface LinkPlatformSelectorTypes {
  removeLink: (idToRemove: string) => void;
  id: string;
  link: string;
  platform: PlatformsName;
  index: number;
  moveLink: (fromIndex: number, toIndex: number) => void;
}

export { LinkPlatformSelectorTypes };
