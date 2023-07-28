import Header from "@/components/Header";
import LinkContainer from "./components/LinkContainer";

export const metadata = {
  title: "Links",
};

const Page = () => {
  return (
    <div className="wrapper bg-almost_white min-h-screen w-full p-6">
      <Header />
      <main className="mt-6">
        <LinkContainer />
      </main>
    </div>
  );
};

export default Page;
