"use client";

import PhoneMockup from "@/components/PhoneMockup";
import Form from "../Form";
import ImageContainer from "../ImageContainer";
import ProfileDetails from "../ProfileDetails";
import { useEffect, useState } from "react";
import style from "./style.module.css";
import useProfileData from "@/hooks/useProfileData";

const ProfileContainer = () => {
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
    <section className="w-full flex justify-center gap-6">
      {showPhoneMockup && <PhoneMockup />}
      <div
        className={`${style.container} p-10 rounded-xl w-full bg-white flex flex-col gap-10 max-w-[808px]`}
      >
        <ProfileDetails />
        <ImageContainer />
        <Form />
      </div>
    </section>
  );
};

export default ProfileContainer;