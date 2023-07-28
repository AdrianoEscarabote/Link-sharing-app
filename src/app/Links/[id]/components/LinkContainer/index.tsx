"use client";

import ButtonPrimary from "@/components/ButtonPrimary";
import CustomLink from "../CustomLinks";
import PhoneMockup from "../../../../../components/PhoneMockup";
import { useEffect, useState } from "react";
import useProfileData from "@/hooks/useProfileData";

const LinkContainer = () => {
  const [showPhoneMockup, setShowPhoneMockup] = useState<boolean>(true);

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

  useProfileData();

  return (
    <section className="flex gap-6 w-full justify-center">
      {showPhoneMockup && <PhoneMockup />}

      <section className="bg-white rounded-xl max-w-[808px] w-full min-h-[78vh]">
        <div className="p-10 flex flex-col gap-6 relative">
          <CustomLink />
        </div>
        <div className="flex items-end justify-end w-full py-6 px-10 border-1 border-t border-light_gray">
          <ButtonPrimary maxWidth="91px" disabled={false} label="Save" />
        </div>
      </section>
    </section>
  );
};

export default LinkContainer;
