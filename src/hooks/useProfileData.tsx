import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  setProfileDetails,
  setProfileImageUrl,
} from "@/redux/userProfileData/reducer";
import { setData } from "@/redux/userLinks/reducer";
import { useRouter } from "next/navigation";

const useProfileData = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [showModalLogin, setShowModalLogin] = useState<boolean>(false);
  const [error, setError] = useState<string | null>();

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(
          "https://graceful-leggings-worm.cyclic.app/profile/getData",
          {
            method: "POST",
            credentials: "include", // Certifique-se de incluir os cookies
          }
        );

        if (response.status === 401) {
          setShowModalLogin(true);
          setTimeout(() => {
            router.push("/Login");
          }, 2000);
          setError("Acesso negado! Token invalido ou expirado.");
          return;
        }

        const { user } = await response.json();

        dispatch(
          setProfileDetails({
            firstName: user.firstName,
            lastName: user.lastName,
            previewEmail: user.previewEmail,
          })
        );

        dispatch(
          setProfileImageUrl({
            url: user.profileImageUrl,
          })
        );

        dispatch(setData(user.links));

        setLoading(false);
      } catch (error) {
        setError("Erro na requisição: " + error);
        setLoading(false);
      }
    };

    getData();
  }, []);

  return {
    showModalLogin,
    loading,
    error,
  };
};

export default useProfileData;
