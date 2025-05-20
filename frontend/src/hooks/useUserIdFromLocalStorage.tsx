import { setUserId } from "@/redux/userProfileData/reducer";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useUserIdFromLocalStorage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const callApi = async () => {
      try {
        const response = await fetch("https://localhost:auth/me", {
          method: "GET",
          credentials: "include", // Isso permite que os cookies sejam enviados com a requisição
        });

        if (response.ok) {
          const data = await response.json();
          dispatch(setUserId({ id: data._id }));
        } else {
          // Tratar erro de autenticação ou outro erro
        }
      } catch (error) {
        // Tratar erro de requisição
      }
    };

    callApi();
  }, []);
};

export default useUserIdFromLocalStorage;
