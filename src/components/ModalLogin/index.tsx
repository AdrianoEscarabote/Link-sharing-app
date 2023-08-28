"use client";

import { useEffect } from "react";
import style from "./style.module.css";
import LoadingComponent from "../LoadingComponent";

const ModalLogin = () => {
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
      className="min-h-screen flex items-center bg-neutral-600 bg-opacity-50 justify-center z-50 absolute top-0 left-0 w-full"
    >
      <section className="w-full max-w-sm text-center p-5 flex items-center justify-center bg-white rounded-2xl">
        <h1
          className={`${style.title} HeadingM flex flex-col text-almost_dark items-center`}
        >
          To access this page, you need to login.{" "}
          <span className="text-dark_purple">
            You will be redirected to the login page.
          </span>
        </h1>
        <LoadingComponent />
        <button></button>
      </section>
    </div>
  );
};

export default ModalLogin;
