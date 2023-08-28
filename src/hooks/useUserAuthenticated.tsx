import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const useUserAuthenticated = () => {
  const [error, setError] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const callApi = async () => {
      const response = await fetch(
        `https://spring-green-lion-vest.cyclic.cloud/auth/checkToken`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (response.status === 200) {
        setError(false);
        setTimeout(() => {
          router.push(`/ProfileDetails`);
        }, 1300);
        return;
      }
      setError(true);
      setTimeout(() => {
        router.push("/Login");
      }, 1300);
    };
    callApi();
  }, []);

  return { error };
};

export default useUserAuthenticated;
