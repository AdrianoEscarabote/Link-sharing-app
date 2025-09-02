import Image from "next/image";

import SignoutComponent from "@/components/Signout";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import style from "./style.module.css";

const ProfileDetails = () => {
  return (
    <Dialog>
      <div
        className={`${style.container} w-full flex items-center justify-between`}
      >
        <div>
          <h1 className="HeadingM text-almost_dark dark:text-grey-100">
            Profile Details
          </h1>
          <p className="BodyM text-gray dark:text-grey-300">
            Add your details to create a personal touch to your profile.
          </p>
        </div>
        <DialogTrigger asChild>
          <button className="flex items-center gap-2 h-10 rounded-full">
            <span className="BodyM text-red">Logout</span>
            <Image
              src="/assets/logout-icon.svg"
              width={30}
              height={30}
              alt=""
            />
          </button>
        </DialogTrigger>
      </div>
      <DialogContent className="max-w-[432px]">
        <SignoutComponent cancelSignout={() => {}} />
      </DialogContent>
    </Dialog>
  );
};

export default ProfileDetails;
