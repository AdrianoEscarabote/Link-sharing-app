import { rootState } from "@/redux/root-reducer-types";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const useLinksValid = () => {
  const { links } = useSelector(
    (rootReducer: rootState) => rootReducer.userLinksSlice
  );
  const [isUnavailableUrl, setIsUnavailableUrl] = useState<boolean>(true);

  useEffect(() => {
    const handleVerifyLinksUrl = () => {
      const linksUrl = links.map((item) => item.link);
      const hasInvalidUrl = linksUrl.some((url) => !isValidUrl(url));
      setIsUnavailableUrl(hasInvalidUrl);
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
    isUnavailableUrl,
  };
};

export default useLinksValid;
