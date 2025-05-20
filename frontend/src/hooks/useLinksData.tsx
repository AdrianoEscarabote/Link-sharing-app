import { rootState } from "@/redux/root-reducer-types";
import { setData } from "@/redux/userLinks/reducer";
import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const useLinksData = () => {
  const dispatch = useDispatch();
  const { links } = useSelector(
    (rootReducer: rootState) => rootReducer.userLinksSlice
  );

  const getData = useMemo(
    () => async () => {
      try {
        const response = await fetch(
          `https://link-sharing-backend.onrender.com/links/getLinks`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (response.status !== 200) {
          return;
        }

        const user = await response.json();

        dispatch(setData(user.links));
      } catch (error) {
        console.error(error);
      }
    },
    []
  );
  useEffect(() => {
    if (links.length === 0) {
      getData();
    }
  }, []);
};

export default useLinksData;
