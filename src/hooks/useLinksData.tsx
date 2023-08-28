import { setData } from "@/redux/userLinks/reducer";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useLinksData = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(
          `https://spring-green-lion-vest.cyclic.cloud/links/getLinks`,
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
    };
    getData();
  }, []);
};

export default useLinksData;
