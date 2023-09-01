"use client";

import PhoneMockup from "../../../../components/PhoneMockup";
import useProfileData from "@/hooks/useProfileData";
import LinkForm from "../LinkForm";
import useLinksData from "@/hooks/useLinksData";
import useUserIdFromLocalStorage from "@/hooks/useUserIdFromLocalStorage";
import ModalLogin from "@/components/ModalLogin";
import useMediaQuery from "@/hooks/useMediaQuery";

const LinkContainer = () => {
  useUserIdFromLocalStorage();
  useLinksData();
  const showPhoneMockup: boolean = useMediaQuery("(max-width: 1100px)");
  const { showModalLogin } = useProfileData();

  return (
    <section className="flex gap-6 w-full justify-center">
      {!showPhoneMockup && <PhoneMockup />}

      {showModalLogin ? <ModalLogin /> : null}

      <LinkForm />
    </section>
  );
};

export default LinkContainer;
