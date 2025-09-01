"use client";

import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";

import Login from "./components/LoginForm/index";

const LoginPage = () => {
  const { theme } = useTheme();

  return (
    <main className="min-h-screen flex items-center justify-center flex-col gap-12 bg-almost_white dark:bg-dark-bg-1">
      <Image
        src={`${
          theme === "dark"
            ? "/assets/logo-devlinks-large.svg"
            : "/assets/logo-devlinks-white.svg"
        }`}
        width="182"
        height="40"
        alt=""
      />

      <section className="rounded-md border border-border max-w-[476px] w-full flex flex-col p-5 md:p-8 bg-white dark:bg-dark-bg-2">
        <div className="mb-6">
          <h1 className="HeadingM text-almost_dark dark:text-white">Login</h1>
          <p className="BodyM text-gray dark:text-grey-300">
            Add your details below to get back into the app
          </p>
        </div>
        <Login />
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 mt-6">
          <p className="BodyM text-gray dark:text-grey-300">
            Don’t have an account?
          </p>
          <Link
            className="hover:underline BodyM text-dark_purple"
            href="/CreateAccount"
          >
            Create account
          </Link>
        </div>
      </section>
    </main>
  );
};

export default LoginPage;
