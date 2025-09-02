import Header from "@/components/Header";

import LinkContainer from "./components/LinkContainer";

export const metadata = {
  title: "Links",
};

const Page = () => {
  return (
    <div className="wrapper wrapper_nopd bg-almost_white dark:bg-dark-bg-1 min-h-screen w-full p-6">
      <Header />
      <main className="mt-6">
        <LinkContainer />
      </main>
    </div>
  );
};

export default Page;
