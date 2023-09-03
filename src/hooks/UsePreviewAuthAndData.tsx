import { setData } from "@/redux/userLinks/reducer";
import { setPreviewData } from "@/redux/userProfileData/reducer";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const usePreviewAuthAndData = () => {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState();
  const [error, setError] = useState<boolean>();
  const [loading, setLoading] = useState<boolean>(false);
  const [loggedUser, setLoggedUser] = useState<boolean>(false);
  const baseurl = window.location.href;

  useEffect(() => {
    const authenticateAndFetchData = async () => {
      try {
        const uuidUrl = baseurl.split("/Preview/")[1];
        const [authResponse, profileResponse] = await Promise.all([
          await fetch(
            `https://spring-green-lion-vest.cyclic.cloud/auth/checkToken`,
            {
              method: "GET",
              credentials: "include",
            }
          ),
          await fetch(
            `https://spring-green-lion-vest.cyclic.cloud/Preview/${uuidUrl}`,
            {
              method: "GET",
            }
          ),
        ]);
        if (authResponse.status === 200) {
          setLoggedUser(true);
        } else {
          setLoggedUser(false);
        }
        if (profileResponse.status !== 200) {
          setError(true);
        }
        const {
          firstName,
          lastName,
          links,
          previewEmail,
          profileImageUrl,
          uuid,
        } = await profileResponse.json();

        dispatch(
          setPreviewData({
            firstName,
            lastName,
            links,
            previewEmail,
            uuid,
            profileImageUrl,
          })
        );

        dispatch(setData(links));
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    authenticateAndFetchData();
  }, []);

  return { userData, loading, loggedUser };
};

export default usePreviewAuthAndData;
