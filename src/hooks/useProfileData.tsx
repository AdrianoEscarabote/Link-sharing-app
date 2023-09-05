import { useState, useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import {
  setProfileDetails,
  setProfileImageUrl,
  setUserUuid,
} from "@/redux/userProfileData/reducer";
import { setData } from "@/redux/userLinks/reducer";
import { useRouter } from "next/navigation";

const useProfileData = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [showModalLogin, setShowModalLogin] = useState<boolean>(false);
  const [error, setError] = useState<string | null>();

  const getData = useMemo(
    () => async () => {
      try {
        const response = await fetch(
          "https://spring-green-lion-vest.cyclic.cloud/profile/getProfileData",
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (response.status !== 200) {
          setShowModalLogin(true);
          setTimeout(() => {
            router.push("/Login");
          }, 2000);
          setError("Acesso negado! Token invalido ou expirado.");
          return;
        }

        const {
          firstName,
          lastName,
          previewEmail,
          uuid,
          profileImageUrl,
          links,
        } = await response.json();

        dispatch(
          setUserUuid({
            uuid,
          })
        );

        dispatch(
          setProfileDetails({
            firstName,
            lastName,
            previewEmail,
          })
        );

        dispatch(
          setProfileImageUrl({
            url: profileImageUrl,
          })
        );

        dispatch(setData(links));

        setLoading(false);
      } catch (error) {
        setError("Request error: " + error);
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    getData();
  }, [getData]);

  return {
    showModalLogin,
    loading,
    error,
  };
};

export default useProfileData;
