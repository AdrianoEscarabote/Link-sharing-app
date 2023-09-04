import { rootState } from "@/redux/root-reducer-types";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

interface LinkInvalidTypes {
  id: string;
  platform: string;
  link: string;
}

const useLinksValid = () => {
  const { links } = useSelector(
    (rootReducer: rootState) => rootReducer.userLinksSlice
  );
  const [invalidLinks, setInvalidLinks] = useState<LinkInvalidTypes>();

  useEffect(() => {
    const handleVerifyLinksUrl = () => {
      const linkErrorFind = links.find((link) => !isValidUrl(link.link));
      setInvalidLinks(linkErrorFind);
    };

    const isValidUrl = (url: string) => {
      try {
        new URL(url);
        return true;
      } catch (error) {
        return false;
      }
    };
    handleVerifyLinksUrl();
  }, [links]);

  return {
    invalidLinks,
  };
};

export default useLinksValid;
