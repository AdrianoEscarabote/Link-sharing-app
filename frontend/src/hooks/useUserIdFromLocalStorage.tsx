import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { setUserId } from "@/redux/userProfileData/reducer";

const useUserIdFromLocalStorage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const callApi = async () => {
      try {
        const response = await fetch("https://localhost:auth/me", {
          method: "GET",
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          dispatch(setUserId({ id: data._id }));
        }
      } catch (error) {
        console.error("Error fetching user ID:", error);
      }
    };

    callApi();
  }, [dispatch]);
};

export default useUserIdFromLocalStorage;
