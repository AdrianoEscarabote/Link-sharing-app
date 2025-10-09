"use client";

import Image from "next/image";

import useUserAuthenticated from "@/hooks/useUserAuthenticated";

const CustomErrorPage = () => {
  useUserAuthenticated();

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Image
          className="mb-8"
          src={"/assets/logo-devlinks-large.svg"}
          alt=""
          width={180}
          height={70}
        />
        <h1 className="HeadingM text-dark_purple">
          The page you are looking for does not exist
        </h1>
        <h2 className="HeadingS">Returning to the home page!</h2>
      </div>
    </main>
  );
};

export default CustomErrorPage;
