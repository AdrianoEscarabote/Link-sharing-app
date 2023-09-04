"use client";

import PhoneMockup from "@/components/PhoneMockup";
import Form from "../Form";
import ImageContainer from "../ImageContainer";
import ProfileDetails from "../ProfileDetails";
import style from "./style.module.css";
import useProfileData from "@/hooks/useProfileData";
import useLinksData from "@/hooks/useLinksData";
import useUserIdFromLocalStorage from "@/hooks/useUserIdFromLocalStorage";
import ModalLogin from "@/components/ModalLogin";
import useMediaQuery from "@/hooks/useMediaQuery";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const ProfileContainer = () => {
  useUserIdFromLocalStorage();
  useLinksData();
  const { showModalLogin } = useProfileData();
  const showPhoneMockup: boolean = useMediaQuery("(max-width: 1100px)");

  return (
    <section className="w-full flex justify-center gap-6">
      <DndProvider backend={HTML5Backend}>
        {!showPhoneMockup && <PhoneMockup />}
        {showModalLogin ? <ModalLogin /> : null}
        <div
          className={`${style.container} p-10 rounded-xl w-full bg-white flex flex-col gap-10 max-w-[808px]`}
        >
          <ProfileDetails />
          <ImageContainer />
          <Form />
        </div>
      </DndProvider>
    </section>
  );
};

export default ProfileContainer;
