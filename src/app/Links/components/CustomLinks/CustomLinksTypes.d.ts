import { PlatformsName } from "@/redux/root-reducer-types";

interface linkSelectorProps {
  id: number;
  link: string;
  platformName: PlatformsName | string;
}

export { linkSelectorProps };
