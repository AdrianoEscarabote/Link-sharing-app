import HeaderPreview from "./components/HeaderPreview";
import PreviewCard from "./components/PreviewCard";

export const metadata = {
  title: "Preview",
};

const Preview = () => {
  return (
    <>
      <HeaderPreview />
      <PreviewCard
        email="ben@example.com"
        img="/assets/icon-youtube.svg"
        name="Ben Wright"
      />
    </>
  );
};

export default Preview;
