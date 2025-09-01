import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { handleResetLinks } from "@/redux/userLinks/reducer";
import { handleResetData } from "@/redux/userProfileData/reducer";

import ButtonPrimary from "../ButtonPrimary";
import ButtonSecondary from "../ButtonSecondary";
import { DialogClose, DialogDescription, DialogTitle } from "../ui/dialog";
import { SignoutComponentProps } from "./SignoutProps";
import style from "./style.module.css";

const SignoutComponent = ({ cancelSignout }: SignoutComponentProps) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [showLoadingComponent, setShowLoadingComponent] =
    useState<boolean>(false);
  const [signout, setSignout] = useState<boolean>();

  useEffect(() => {
    const handleLogout = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/logout`,
        {
          method: "POST",
          credentials: "include",
        }
      );
      if (response.status === 200) {
        dispatch(handleResetData());
        dispatch(handleResetLinks());
        router.push("/Login");
      }
    };
    if (signout) {
      setShowLoadingComponent(true);
      handleLogout();
    }
  }, [signout, dispatch, router]);

  return (
    <section className="w-full max-w-sm text-center flex items-center flex-col gap-3 rounded-2xl">
      <DialogTitle>Ready to sign out?</DialogTitle>
      <DialogDescription>
        You will be logged out and need to sign in again to access your account.
      </DialogDescription>
      <div className="w-full flex items-center gap-3 justify-center">
        <ButtonPrimary
          disabled={false}
          label="Logout"
          showLoadingComponent={showLoadingComponent}
          onClick={() => setSignout(true)}
          className={`bg-red text-white BodyM grid place-content-center ${style.hover}`}
        />
        <DialogClose asChild>
          <ButtonSecondary
            disabled={signout ? true : false}
            onClick={() => cancelSignout(false)}
            label="Cancel"
            data-testid="cancel-button"
          />
        </DialogClose>
      </div>
    </section>
  );
};

export default SignoutComponent;
