import { useEffect, useState } from "react";

const useMediaQuery = (initialQuery: string): boolean => {
  const [matches, setMatches] = useState<boolean>(false);

  const handleChange = (media: MediaQueryListEvent) => {
    setMatches(media.matches);
  };

  useEffect(() => {
    const media = window.matchMedia(initialQuery);
    setMatches(media.matches);

    media.addEventListener("change", handleChange);
    return () => {
      media.removeEventListener("change", handleChange);
    };
  }, [initialQuery]);

  return matches;
};

export default useMediaQuery;
