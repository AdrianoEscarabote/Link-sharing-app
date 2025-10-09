import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";

import { setData } from "@/redux/userLinks/reducer";
import {
  setProfileDetails,
  setProfileImageUrl,
  setUserUuid,
} from "@/redux/userProfileData/reducer";

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
          `${process.env.NEXT_PUBLIC_API_URL}/profile/getProfileData`,
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
