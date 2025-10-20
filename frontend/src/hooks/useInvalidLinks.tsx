import { useMemo } from "react";
import { useSelector } from "react-redux";

import { rootState } from "@/redux/root-reducer-types";

interface LinkInvalidTypes {
  id: string;
  platform: string;
  link: string;
}

const useLinksValid = () => {
  const { links } = useSelector(
    (rootReducer: rootState) => rootReducer.userLinksSlice
  );
  const isValidUrl = (url: string) => {
    if (!url) return false;
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };
  const invalidLinks = useMemo<LinkInvalidTypes | undefined>(() => {
    return links.find((l) => !isValidUrl(l.link));
  }, [links]);
  return { invalidLinks };
};

export default useLinksValid;
