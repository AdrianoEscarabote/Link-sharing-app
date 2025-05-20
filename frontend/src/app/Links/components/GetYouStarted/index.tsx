import Image from "next/image";
import style from "./style.module.css";

const GetYouStarted = () => {
  return (
    <section className="flex flex-col items-center gap-10 bg-almost_white p-5 rounded-xl">
      <Image
        alt="illustration empty links"
        className={`${style.image}`}
        width={250}
        height={160}
        src="/assets/illustration-empty.svg"
      />
      <div className="w-full max-w-[488px] flex flex-col items-center text-center justify-center gap-6">
        <h2 className="HeadingM text-almost_dark">Let’s get you started</h2>
        <p className="BodyM text-gray">
          Use the “Add new link” button to get started. Once you have more than
          one link, you can reorder and edit them. We’re here to help you share
          your profiles with everyone!
        </p>
      </div>
    </section>
  );
};

export default GetYouStarted;
