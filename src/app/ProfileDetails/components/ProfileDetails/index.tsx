import ButtonPrimary from "@/components/ButtonPrimary";
import SignoutComponent from "@/components/Signout";
import Image from "next/image";
import { useState } from "react";

const ProfileDetails = () => {
  const [showSignoutComponent, setShowSignoutComponent] =
    useState<boolean>(false);
  return (
    <>
      <div className="w-full flex items-center justify-between">
        <div>
          <h1 className="HeadingM text-almost_dark">Profile Details</h1>
          <p className="BodyM text-gray">
            Add your details to create a personal touch to your profile.
          </p>
        </div>
        <button
          onClick={() => setShowSignoutComponent(true)}
          className="flex items-center gap-2 h-10 rounded-full"
        >
          <span className="BodyM text-red">Logout</span>
          <Image src="/assets/logout-icon.svg" width={30} height={30} alt="" />
        </button>
      </div>
      {showSignoutComponent ? (
        <SignoutComponent cancelSignout={setShowSignoutComponent} />
      ) : null}
    </>
  );
};

export default ProfileDetails;
