"use client";

import PhoneMockup from "../../../../../components/PhoneMockup";
import { useEffect, useState } from "react";
import useProfileData from "@/hooks/useProfileData";
import LinkForm from "../LinkForm";
import useLinksData from "@/hooks/useLinksData";
import useUserIdFromLocalStorage from "@/hooks/useUserIdFromLocalStorage";
import ModalLogin from "@/components/ModalAlert";

const LinkContainer = () => {
  const { showModalLogin } = useUserIdFromLocalStorage();
  const [showPhoneMockup, setShowPhoneMockup] = useState<boolean>(true);
  useLinksData();
  useProfileData();

  useEffect(() => {
    const checkWidth = () => {
      const widthScreen =
        window.innerWidth || document.documentElement.clientWidth;
      setShowPhoneMockup(widthScreen > 1100);
    };

    checkWidth();

    window.addEventListener("resize", checkWidth);
    return () => {
      window.removeEventListener("resize", checkWidth);
    };
  }, []);

  return (
    <section className="flex gap-6 w-full justify-center">
      {showPhoneMockup && <PhoneMockup />}

      {showModalLogin ? <ModalLogin /> : null}

      <LinkForm />
    </section>
  );
};

export default LinkContainer;
