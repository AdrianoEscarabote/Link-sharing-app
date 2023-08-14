import { PlatformsName } from "../root-reducer-types";

interface linksType {
  link: string;
  platform: PlatformsName;
  id: string;
}

interface setLinksType {
  link: string;
  platform: PlatformsName;
  id: string;
}

interface removeLinkType {
  idToRemove: string;
}

interface changeValueType {
  idToUpdate: string;
  newValue: string;
}

interface changeSelectValueType {
  idToUpdate: string;
  platformSelected: PlatformsName;
}

export {
  linksType,
  setLinksType,
  removeLinkType,
  changeValueType,
  changeSelectValueType,
};
