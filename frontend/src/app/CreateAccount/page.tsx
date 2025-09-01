"use client";

import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";

import Form from "./components/CreateAccountForm/index";

const CreateAccountPage = () => {
  const { theme } = useTheme();

  return (
    <main className="min-h-screen flex items-center justify-center flex-col gap-12 bg-almost_white dark:bg-dark-bg-1">
      <Image
        src={`${
          theme === "dark"
            ? "/assets/logo-devlinks-white.svg"
            : "/assets/logo-devlinks-large.svg"
        }`}
        width="182"
        height="40"
        alt=""
      />
      <section className="max-w-[476px] w-full bg-white dark:bg-dark-bg-2 p-5 md:p-8 rounded-md border border-border">
        <div className="mb-6">
          <h1 className="HeadingM text-almost_dark dark:text-white">
            Create account
          </h1>
          <p className="BodyM text-gray dark:text-grey-300">
            Let’s get you started sharing your links!
          </p>
        </div>
        <Form />
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 mt-6">
          <p className="BodyM text-gray dark:text-grey-300">
            Already have an account?
          </p>
          <Link
            className="hover:underline BodyM text-dark_purple"
            href="/Login"
          >
            Login
          </Link>
        </div>
      </section>
    </main>
  );
};

export default CreateAccountPage;
