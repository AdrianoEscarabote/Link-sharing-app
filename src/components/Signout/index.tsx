import { useEffect, useState } from "react";
import ButtonSecondary from "../ButtonSecondary";
import { useRouter } from "next/navigation";
import ButtonPrimary from "../ButtonPrimary";
import { useDispatch } from "react-redux";
import { handleResetData } from "@/redux/userProfileData/reducer";
import { handleResetLinks } from "@/redux/userLinks/reducer";
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
        "https://spring-green-lion-vest.cyclic.cloud/auth/logout",
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
  }, [signout]);

  useEffect(() => {
    const modalElement = document.getElementById("modal-overlay");
    modalElement?.focus();

    const handleTabKey = (e) => {
      const focusableElements = modalElement?.querySelectorAll(
        'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
      );

      if (focusableElements && focusableElements.length > 0) {
        const firstFocusableElement = focusableElements[0] as HTMLElement;
        const lastFocusableElement = focusableElements[
          focusableElements.length - 1
        ] as HTMLElement;

        if (e.key === "Tab" || e.keyCode === 9) {
          if (e.shiftKey) {
            if (document.activeElement === firstFocusableElement) {
              e.preventDefault();
              lastFocusableElement.focus();
            }
          } else {
            if (document.activeElement === lastFocusableElement) {
              e.preventDefault();
              firstFocusableElement.focus();
            }
          }
        }
      }
    };

    document.addEventListener("keydown", handleTabKey);

    return () => {
      document.removeEventListener("keydown", handleTabKey);
    };
  }, []);

  return (
    <div
      id="modal-overlay"
      tabIndex={-1}
      style={{ zIndex: "100" }}
      className="min-h-screen z-50 absolute top-0 left-0 flex items-center justify-center bg-neutral-600 bg-opacity-50 w-full"
    >
      <section className="w-full max-w-sm text-center p-5 flex items-center flex-col gap-3 bg-white rounded-2xl">
        <h2 className="mb-2 text-almost_dark HeadingS">
          Are you sure you want to sign out?
        </h2>
        <div className="w-full flex items-center gap-3 justify-center">
          <ButtonPrimary
            disabled={false}
            label="Logout"
            showLoadingComponent={showLoadingComponent}
            onClick={() => setSignout(true)}
            className={`bg-red text-white BodyM grid place-content-center ${style.hover}`}
          />
          <ButtonSecondary
            disabled={signout ? true : false}
            onClick={() => cancelSignout(false)}
            label="Cancel"
            data-testid="cancel-button"
          />
        </div>
      </section>
    </div>
  );
};

export default SignoutComponent;
