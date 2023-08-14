import { setData } from "@/redux/userLinks/reducer";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useLinksData = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(`https://localhost:3000/profile/links`, {
          method: "GET",
          credentials: "include",
        });

        if (response.status === 401) {
          return;
        }

        const links = await response.json();

        if (links.msg === "links vazio!") {
          return;
        }

        dispatch(setData(links.links));
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, []);
};

export default useLinksData;
