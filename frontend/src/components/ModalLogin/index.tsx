"use client";

import LoadingComponent from "../LoadingComponent";
import style from "./style.module.css";

const ModalLogin = () => {
  return (
    <div
      tabIndex={-1}
      className="min-h-screen flex items-center bg-neutral-800 bg-opacity-50 justify-center z-50 absolute top-0 left-0 w-full"
    >
      <section className="w-full max-w-sm text-center py-8 px-5 flex items-center justify-center bg-white dark:bg-dark-bg-1 dark:border dark:border-border rounded-2xl">
        <h1
          className={`${style.title} HeadingS flex flex-col dark:text-grey-100 text-almost_dark items-center`}
        >
          To access this page, you need to login.{" "}
          <span className="text-dark_purple">
            You will be redirected to the login page.
          </span>
        </h1>

        <LoadingComponent />
      </section>
    </div>
  );
};

export default ModalLogin;
