"use client";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import ModalLogin from "@/components/ModalLogin";
import useLinksData from "@/hooks/useLinksData";
import useMediaQuery from "@/hooks/useMediaQuery";
import useProfileData from "@/hooks/useProfileData";
import useUserIdFromLocalStorage from "@/hooks/useUserIdFromLocalStorage";

import PhoneMockup from "../../../../components/PhoneMockup";
import LinkForm from "../LinkForm";

const LinkContainer = () => {
  useUserIdFromLocalStorage();
  useLinksData();
  const showPhoneMockup: boolean = useMediaQuery("(max-width: 1100px)");
  const { showModalLogin } = useProfileData();

  return (
    <section className="flex gap-6 w-full justify-center">
      <DndProvider backend={HTML5Backend}>
        {!showPhoneMockup && <PhoneMockup />}

        {showModalLogin ? <ModalLogin /> : null}

        <LinkForm />
      </DndProvider>
    </section>
  );
};

export default LinkContainer;
